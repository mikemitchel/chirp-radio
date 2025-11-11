import Foundation
import Capacitor
import AVFoundation
import MediaPlayer

@objc(NativeAudioPlayer)
public class NativeAudioPlayer: CAPPlugin, CAPBridgedPlugin {

    public let identifier = "NativeAudioPlayer"
    public let jsName = "NativeAudioPlayer"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "play", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pause", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setStreamUrl", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateMetadata", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPlaybackState", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startBackgroundPolling", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stopBackgroundPolling", returnType: CAPPluginReturnPromise)
    ]

    private var player: AVPlayer?
    private var playerItem: AVPlayerItem?
    private var currentStreamUrl: String?
    private var isPlaying = false
    private var itemObservers: [NSKeyValueObservation] = []
    private var backgroundPollingTimer: Timer?
    private var pollingApiUrl: String?
    private var lastTrackId: String = ""
    private var backgroundSession: URLSession?
    private var timeObserverToken: Any?
    private var lastPollTime: Date = Date.distantPast
    private var isPollingActive: Bool = false

    public override func load() {
        print("🎵 NativeAudioPlayer plugin loaded")

        // Configure audio session for background playback
        configureAudioSession()

        // Setup remote command handlers
        setupRemoteCommands()

        // Listen for audio session interruptions
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleAudioSessionInterruption),
            name: AVAudioSession.interruptionNotification,
            object: nil
        )

        // Listen for route changes (headphones unplugged, etc.)
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleRouteChange),
            name: AVAudioSession.routeChangeNotification,
            object: nil
        )
    }

    deinit {
        backgroundPollingTimer?.invalidate()
        backgroundPollingTimer = nil

        // Remove time observer
        if let token = timeObserverToken {
            player?.removeTimeObserver(token)
            timeObserverToken = nil
        }

        NotificationCenter.default.removeObserver(self)
        cleanupPlayerObservers()
    }

    private func configureAudioSession() {
        do {
            let audioSession = AVAudioSession.sharedInstance()
            try audioSession.setCategory(.playback, mode: .default, options: [])
            try audioSession.setActive(true)
            print("✅ Audio session configured for native playback")
        } catch {
            print("❌ Failed to configure audio session: \(error)")
        }
    }

    @objc private func handleAudioSessionInterruption(notification: Notification) {
        guard let userInfo = notification.userInfo,
              let typeValue = userInfo[AVAudioSessionInterruptionTypeKey] as? UInt,
              let type = AVAudioSession.InterruptionType(rawValue: typeValue) else {
            return
        }

        print("🔔 Audio session interruption: \(type == .began ? "BEGAN" : "ENDED")")

        if type == .ended {
            // Interruption ended - reactivate audio session
            configureAudioSession()

            // Resume playback if we were playing
            if isPlaying {
                print("🔄 Resuming playback after interruption")
                playAudio()
            }
        } else {
            // Interruption began
            isPlaying = false
            notifyJavaScriptStateChange(isPlaying: false)
        }
    }

    @objc private func handleRouteChange(notification: Notification) {
        guard let userInfo = notification.userInfo,
              let reasonValue = userInfo[AVAudioSessionRouteChangeReasonKey] as? UInt,
              let reason = AVAudioSession.RouteChangeReason(rawValue: reasonValue) else {
            return
        }

        print("🎧 Audio route changed: reason \(reasonValue)")

        // If headphones were unplugged, pause playback
        if reason == .oldDeviceUnavailable {
            print("⏸️ Audio device disconnected - pausing")
            pauseAudio()
            notifyJavaScriptStateChange(isPlaying: false)
        }
    }

    private func cleanupPlayerObservers() {
        itemObservers.forEach { $0.invalidate() }
        itemObservers.removeAll()
    }

    private func setupRemoteCommands() {
        let commandCenter = MPRemoteCommandCenter.shared()

        print("🎵 NativeAudioPlayer: Setting up remote commands")

        // Set up direct command handlers (no NotificationCenter delay)
        commandCenter.playCommand.isEnabled = true
        commandCenter.playCommand.addTarget { [weak self] event in
            print("🎵 NativeAudioPlayer: Direct PLAY command")
            self?.handleRemotePlay()
            return .success
        }

        commandCenter.pauseCommand.isEnabled = true
        commandCenter.pauseCommand.addTarget { [weak self] event in
            print("⏸️ NativeAudioPlayer: Direct PAUSE command")
            self?.handleRemotePause()
            return .success
        }

        print("✅ NativeAudioPlayer: Direct remote commands configured")
    }

    private func handleRemotePlay() {
        print("🎵 NativeAudioPlayer.handleRemotePlay() called")
        playAudio()
        updateNowPlayingPlaybackState()
        notifyJavaScriptStateChange(isPlaying: true)
    }

    private func handleRemotePause() {
        print("⏸️ NativeAudioPlayer.handleRemotePause() called")
        pauseAudio()
        updateNowPlayingPlaybackState()
        notifyJavaScriptStateChange(isPlaying: false)
    }

    private func notifyJavaScriptStateChange(isPlaying: Bool) {
        // Use Capacitor's notifyListeners method instead of evalWithPlugin
        DispatchQueue.main.async {
            self.notifyListeners("playbackStateChanged", data: [
                "isPlaying": isPlaying
            ])
            print("📡 Notified listeners: isPlaying = \(isPlaying)")
        }
    }

    private func updateNowPlayingPlaybackState() {
        // Update Now Playing Info playback rate
        if var nowPlayingInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo {
            nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0
            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
            print("🔄 Updated Now Playing playback rate: \(isPlaying ? 1.0 : 0.0)")
        }
    }

    @objc func setStreamUrl(_ call: CAPPluginCall) {
        guard let url = call.getString("url") else {
            call.reject("URL is required")
            return
        }

        print("📻 Setting stream URL: \(url)")
        currentStreamUrl = url

        // Create new player item
        guard let streamURL = URL(string: url) else {
            call.reject("Invalid URL")
            return
        }

        // Stop current playback if any
        if isPlaying {
            player?.pause()
        }

        // Remove time observer from OLD player before creating new one
        if let token = timeObserverToken, let oldPlayer = player {
            oldPlayer.removeTimeObserver(token)
            timeObserverToken = nil
            print("🔄 Removed time observer from old player before creating new one")
        }

        // Clean up old observers
        cleanupPlayerObservers()

        // Create new player item and player
        playerItem = AVPlayerItem(url: streamURL)
        player = AVPlayer(playerItem: playerItem)

        // Set audio to prefer high quality
        player?.automaticallyWaitsToMinimizeStalling = true

        // Enable external playback for CarPlay
        player?.allowsExternalPlayback = true
        player?.usesExternalPlaybackWhileExternalScreenIsActive = true
        print("✅ External playback enabled for CarPlay")

        // Set up player item monitoring
        setupPlayerItemMonitoring()

        // Set initial Now Playing info for CarPlay to recognize the app
        setInitialNowPlayingInfo()

        // Re-attach time observer if polling was active (CRITICAL FIX)
        // setStreamUrl creates a NEW player, destroying the old time observer
        if isPollingActive {
            print("🔄 Re-attaching time observer to new player (polling is active)")
            setupTimeObserver()
        }

        print("✅ Stream URL set and player initialized")
        call.resolve()
    }

    private func setInitialNowPlayingInfo() {
        var nowPlayingInfo = [String: Any]()
        nowPlayingInfo[MPMediaItemPropertyTitle] = "CHIRP Radio"
        nowPlayingInfo[MPMediaItemPropertyArtist] = "Chicago Independent Radio Project"
        nowPlayingInfo[MPMediaItemPropertyAlbumTitle] = "Live Stream"
        nowPlayingInfo[MPNowPlayingInfoPropertyIsLiveStream] = true
        nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = 0.0 // Not playing yet

        MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
        print("🎵 Initial Now Playing info set for CarPlay discovery")
    }

    private func setupPlayerItemMonitoring() {
        guard let playerItem = playerItem else { return }

        // Monitor playback stalled
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(playerItemStalled),
            name: .AVPlayerItemPlaybackStalled,
            object: playerItem
        )

        // Monitor failed to play to end time
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(playerItemFailedToPlay),
            name: .AVPlayerItemFailedToPlayToEndTime,
            object: playerItem
        )

        // Monitor player item status changes
        let statusObserver = playerItem.observe(\.status, options: [.new, .old]) { [weak self] item, change in
            guard let self = self else { return }
            print("📊 Player item status changed: \(item.status.rawValue)")

            if item.status == .failed {
                print("❌ Player item entered FAILED state")
                if let error = item.error {
                    print("   Error: \(error.localizedDescription)")
                }
                // Attempt recovery
                self.recoverFromFailedState()
            }
        }

        itemObservers.append(statusObserver)
    }

    @objc private func playerItemStalled(notification: Notification) {
        print("⚠️ Player item playback STALLED")

        // For live streams, stalling often means we need to reconnect
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) { [weak self] in
            guard let self = self else { return }

            // Check if still stalled after 2 seconds
            if let player = self.player,
               player.timeControlStatus == .waitingToPlayAtSpecifiedRate {
                print("🔄 Still stalled after 2s - recreating player item")
                self.recreatePlayerItem()
            }
        }
    }

    private func recoverFromFailedState() {
        print("🔄 Attempting to recover from failed state")
        recreatePlayerItem()
    }

    private func recreatePlayerItem() {
        guard let currentUrl = currentStreamUrl,
              let streamURL = URL(string: currentUrl) else {
            print("❌ Cannot recreate player item - no URL available")
            return
        }

        print("🔄 Recreating player item with URL: \(currentUrl)")

        let wasPlaying = isPlaying
        isPlaying = false

        // Clean up old observers
        cleanupPlayerObservers()

        // Create fresh player item
        let newItem = AVPlayerItem(url: streamURL)
        playerItem = newItem

        // Replace in existing player or create new one
        if let player = player {
            player.replaceCurrentItem(with: newItem)
        } else {
            player = AVPlayer(playerItem: newItem)
            player?.automaticallyWaitsToMinimizeStalling = true
        }

        // Set up monitoring for new item
        setupPlayerItemMonitoring()

        // Resume playback if we were playing
        if wasPlaying {
            print("▶️ Resuming playback after recreation")
            // Wait for item to be ready before playing
            waitForPlayerItemReady(completion: { [weak self] success in
                if success {
                    self?.playAudio()
                } else {
                    print("❌ Player item failed to become ready")
                }
            })
        }

        print("✅ Player item recreated")
    }

    private func waitForPlayerItemReady(maxAttempts: Int = 10, completion: @escaping (Bool) -> Void) {
        guard let playerItem = playerItem else {
            completion(false)
            return
        }

        var attempts = 0

        func checkStatus() {
            attempts += 1

            switch playerItem.status {
            case .readyToPlay:
                print("✅ Player item is ready")
                completion(true)
            case .failed:
                print("❌ Player item failed")
                completion(false)
            case .unknown:
                if attempts < maxAttempts {
                    print("⏳ Player item not ready yet (attempt \(attempts)/\(maxAttempts))")
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                        checkStatus()
                    }
                } else {
                    print("⚠️ Player item timeout after \(maxAttempts) attempts")
                    completion(false)
                }
            @unknown default:
                completion(false)
            }
        }

        checkStatus()
    }

    @objc private func playerItemFailedToPlay(notification: Notification) {
        print("❌ Player item failed to play")
        if let error = notification.userInfo?[AVPlayerItemFailedToPlayToEndTimeErrorKey] as? Error {
            print("   Error: \(error.localizedDescription)")
        }

        // Attempt recovery
        recoverFromFailedState()

        // Notify JavaScript
        notifyListeners("playerError", data: ["error": "Playback failed"])
    }

    @objc func play(_ call: CAPPluginCall) {
        print("▶️ Play called from JavaScript")

        // Check if player exists
        guard let player = player else {
            print("❌ ERROR: Player not initialized - cannot play")
            call.reject("Player not initialized. Call setStreamUrl first.")
            return
        }

        // Check if player item exists
        guard let playerItem = playerItem else {
            print("❌ ERROR: Player item is nil - cannot play")
            call.reject("Player item not initialized")
            return
        }

        // Check player item status
        print("📊 Player item status: \(playerItem.status.rawValue)")
        print("📊 Player time control status: \(player.timeControlStatus.rawValue)")
        print("📊 Current isPlaying state: \(isPlaying)")

        playAudio()
        updateNowPlayingPlaybackState()
        call.resolve(["isPlaying": true])
    }

    private func playAudio() {
        guard let player = player else {
            print("❌ Player not initialized in playAudio()")
            return
        }

        guard let playerItem = playerItem else {
            print("❌ Player item is nil in playAudio()")
            return
        }

        // Check if player item has failed or become stale
        if playerItem.status == .failed {
            print("❌ Player item has FAILED status - recreating")
            recreatePlayerItem()
            return
        }

        // Ensure audio session is active (might have been deactivated)
        configureAudioSession()

        print("🎬 Calling player.play() - item status: \(playerItem.status.rawValue)")
        player.play()
        isPlaying = true

        print("✅ Native playback started - rate: \(player.rate)")
    }

    @objc func pause(_ call: CAPPluginCall) {
        print("⏸️ Pause called from JavaScript")
        pauseAudio()
        updateNowPlayingPlaybackState()
        call.resolve(["isPlaying": false])
    }

    private func pauseAudio() {
        player?.pause()
        isPlaying = false
        print("✅ Native playback paused")
    }

    @objc func stop(_ call: CAPPluginCall) {
        print("⏹️ Stop called")
        player?.pause()
        player?.seek(to: .zero)
        isPlaying = false
        call.resolve()
    }

    @objc func updateMetadata(_ call: CAPPluginCall) {
        let title = call.getString("title") ?? ""
        let artist = call.getString("artist") ?? ""
        let album = call.getString("album") ?? ""
        let albumArtUrl = call.getString("albumArt") ?? ""

        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("📝 NativeAudioPlayer.updateMetadata() called")
        print("   Title: \(title)")
        print("   Artist: \(artist)")
        print("   Album: \(album)")
        print("   Current playback state: \(isPlaying ? "PLAYING" : "PAUSED")")

        var nowPlayingInfo = [String: Any]()
        nowPlayingInfo[MPMediaItemPropertyTitle] = title
        nowPlayingInfo[MPMediaItemPropertyArtist] = artist
        nowPlayingInfo[MPMediaItemPropertyAlbumTitle] = album

        // Mark as live stream
        nowPlayingInfo[MPNowPlayingInfoPropertyIsLiveStream] = true
        nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0

        // Load album art if provided
        if !albumArtUrl.isEmpty, let url = URL(string: albumArtUrl) {
            print("🖼️ Loading album art: \(albumArtUrl)")
            URLSession.shared.dataTask(with: url) { [weak self] data, response, error in
                if let error = error {
                    print("❌ Error loading album art: \(error)")
                }

                if let data = data, let image = UIImage(data: data) {
                    print("✅ Album art loaded, size: \(image.size)")
                    let artwork = MPMediaItemArtwork(boundsSize: image.size) { size in
                        return image
                    }
                    nowPlayingInfo[MPMediaItemPropertyArtwork] = artwork

                    DispatchQueue.main.async {
                        MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                        print("✅ Metadata set WITH artwork")
                        print("   Lock screen should now show: \(nowPlayingInfo[MPMediaItemPropertyTitle] as? String ?? "")")
                        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
                    }
                } else {
                    DispatchQueue.main.async {
                        MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                        print("✅ Metadata set WITHOUT artwork")
                        print("   Lock screen should now show: \(nowPlayingInfo[MPMediaItemPropertyTitle] as? String ?? "")")
                        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
                    }
                }
            }.resume()
        } else {
            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
            print("✅ Metadata set (no artwork)")
            print("   Lock screen should now show: \(nowPlayingInfo[MPMediaItemPropertyTitle] as? String ?? "")")
            print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        }

        call.resolve()
    }


    @objc func getPlaybackState(_ call: CAPPluginCall) {
        call.resolve([
            "isPlaying": isPlaying,
            "currentTime": player?.currentTime().seconds ?? 0
        ])
    }

    // MARK: - Background Polling

    // Setup time observer on the current player for background polling
    private func setupTimeObserver() {
        guard let player = player else {
            print("❌ Cannot setup time observer - player not initialized")
            return
        }

        // Remove existing observer if any (should only happen if called multiple times on same player)
        if let token = timeObserverToken {
            player.removeTimeObserver(token)
            timeObserverToken = nil
            print("🔄 Removed existing time observer from current player before creating new one")
        }

        // Use AVPlayer's periodic time observer - this WILL work in background during playback
        // Check every 1 second, but only poll API every 5 seconds
        let interval = CMTime(seconds: 1.0, preferredTimescale: CMTimeScale(NSEC_PER_SEC))

        // Use dedicated background queue with userInitiated QoS
        let observerQueue = DispatchQueue(label: "com.chirpradio.polling", qos: .userInitiated)

        timeObserverToken = player.addPeriodicTimeObserver(forInterval: interval, queue: observerQueue) { [weak self] time in
            guard let self = self else { return }

            let now = Date()
            let timeSinceLastPoll = now.timeIntervalSince(self.lastPollTime)

            // Only poll every 5 seconds
            if timeSinceLastPoll >= 5.0 {
                let timestamp = now.timeIntervalSince1970
                print("⏰ [TIME OBSERVER FIRED] \(timestamp) - \(String(format: "%.1f", timeSinceLastPoll))s since last poll")
                print("   Player time: \(time.seconds)s")
                print("   Thread: \(Thread.isMainThread ? "MAIN" : "BACKGROUND")")

                // Get app state on main thread to avoid checker warning
                DispatchQueue.main.async {
                    let appState = UIApplication.shared.applicationState.rawValue
                    print("   App state: \(appState) (0=active, 1=inactive, 2=background)")
                }

                self.lastPollTime = now
                self.pollNowPlayingAPI()
            }
        }

        print("✅ Time observer added to AVPlayer - will fire every 1s during playback")
        print("   API polling will occur every 5s")
    }

    @objc func startBackgroundPolling(_ call: CAPPluginCall) {
        guard let apiUrl = call.getString("apiUrl") else {
            call.reject("API URL is required")
            return
        }

        pollingApiUrl = apiUrl
        isPollingActive = true

        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("📡 Starting background polling with AVPlayer time observer: \(apiUrl)")
        print("   Player exists: \(player != nil)")
        print("   Audio session active: \(AVAudioSession.sharedInstance().isOtherAudioPlaying)")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

        guard player != nil else {
            print("❌ Cannot start polling - player not initialized")
            call.reject("Player not initialized")
            return
        }

        // Setup time observer
        setupTimeObserver()

        // Immediate first poll
        print("🚀 Executing immediate first poll...")
        lastPollTime = Date()
        pollNowPlayingAPI()

        call.resolve(["status": "started", "method": "time_observer", "interval": 5.0])
    }

    @objc func stopBackgroundPolling(_ call: CAPPluginCall) {
        print("🛑 Stopping background polling")
        isPollingActive = false

        backgroundPollingTimer?.invalidate()
        backgroundPollingTimer = nil

        // Remove time observer
        if let token = timeObserverToken {
            player?.removeTimeObserver(token)
            timeObserverToken = nil
            print("✅ Time observer removed")
        }

        call.resolve(["status": "stopped"])
    }

    private func pollNowPlayingAPI() {
        guard let urlString = pollingApiUrl,
              let url = URL(string: urlString) else {
            print("❌ [POLL] Invalid API URL for polling")
            return
        }

        let pollStartTime = Date()
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("🔄 [POLL START] Polling now playing API at \(pollStartTime.timeIntervalSince1970)")
        print("   URL: \(urlString)")
        print("   App state: \(UIApplication.shared.applicationState.rawValue) (0=active, 1=inactive, 2=background)")
        print("   Is playing: \(isPlaying)")

        let task = URLSession.shared.dataTask(with: url) { [weak self] data, response, error in
            guard let self = self else {
                print("❌ [POLL] Self is nil in completion handler")
                return
            }

            let pollEndTime = Date()
            let duration = pollEndTime.timeIntervalSince(pollStartTime)
            print("⏱️ [POLL] API response received in \(String(format: "%.2f", duration))s")

            if let error = error {
                print("❌ [POLL ERROR] \(error.localizedDescription)")
                return
            }

            guard let data = data else {
                print("❌ [POLL] No data received from API")
                return
            }

            print("✅ [POLL] Received \(data.count) bytes of data")

            do {
                // Parse JSON response
                if let json = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let nowPlaying = json["now_playing"] as? [String: Any] {

                    let artist = nowPlaying["artist"] as? String ?? "Unknown Artist"
                    let track = nowPlaying["track"] as? String ?? "Unknown Track"
                    let album = nowPlaying["album"] as? String ?? nowPlaying["release"] as? String ?? "Unknown Album"

                    // Create track ID to detect changes
                    let trackId = "\(artist)|\(track)"

                    print("📊 [POLL] Current track: \(trackId)")
                    print("   Last track: \(self.lastTrackId)")

                    if trackId != self.lastTrackId {
                        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
                        print("🎵 [TRACK CHANGE DETECTED]")
                        print("   Old: \(self.lastTrackId)")
                        print("   New: \(trackId)")
                        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

                        self.lastTrackId = trackId

                        // Get album art URL
                        var albumArtUrl = ""
                        if let albumArt = nowPlaying["albumArt"] as? String {
                            albumArtUrl = albumArt
                        } else if let lastfmUrls = nowPlaying["lastfm_urls"] as? [String: Any] {
                            albumArtUrl = lastfmUrls["large_image"] as? String ??
                                         lastfmUrls["med_image"] as? String ??
                                         lastfmUrls["sm_image"] as? String ?? ""
                        }

                        print("🖼️ [POLL] Album art URL: \(albumArtUrl.isEmpty ? "NONE" : albumArtUrl)")

                        // Update lock screen metadata on main thread
                        DispatchQueue.main.async {
                            print("📝 [MAIN THREAD] Updating lock screen metadata...")
                            self.updateLockScreenMetadata(
                                title: track,
                                artist: artist,
                                album: album,
                                albumArtUrl: albumArtUrl
                            )

                            // Notify JavaScript layer about the track change
                            print("📡 [MAIN THREAD] Notifying JavaScript listeners...")
                            self.notifyListeners("trackChanged", data: [
                                "artist": artist,
                                "track": track,
                                "album": album,
                                "albumArt": albumArtUrl
                            ])
                            print("✅ [TRACK CHANGE COMPLETE]")
                            print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
                        }
                    } else {
                        print("ℹ️ [POLL] No track change - same track playing")
                        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
                    }
                } else {
                    print("❌ [POLL] Failed to parse now_playing from JSON")
                }
            } catch {
                print("❌ [POLL PARSE ERROR] \(error.localizedDescription)")
                print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
            }
        }

        task.resume()
        print("✅ [POLL] URL task started (resumed)")
    }

    private func updateLockScreenMetadata(title: String, artist: String, album: String, albumArtUrl: String) {
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("📝 [LOCK SCREEN UPDATE START]")
        print("   Title: \(title)")
        print("   Artist: \(artist)")
        print("   Album: \(album)")
        print("   Album Art URL: \(albumArtUrl.isEmpty ? "NONE" : albumArtUrl)")
        print("   Is Playing: \(isPlaying)")
        print("   Thread: \(Thread.isMainThread ? "MAIN" : "BACKGROUND")")

        var nowPlayingInfo = [String: Any]()
        nowPlayingInfo[MPMediaItemPropertyTitle] = title
        nowPlayingInfo[MPMediaItemPropertyArtist] = artist
        nowPlayingInfo[MPMediaItemPropertyAlbumTitle] = album
        nowPlayingInfo[MPNowPlayingInfoPropertyIsLiveStream] = true
        nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0

        // Load album art if provided
        if !albumArtUrl.isEmpty, let url = URL(string: albumArtUrl) {
            print("🖼️ [LOCK SCREEN] Loading album art from: \(albumArtUrl)")
            let artStartTime = Date()

            URLSession.shared.dataTask(with: url) { data, response, error in
                let artDuration = Date().timeIntervalSince(artStartTime)
                print("⏱️ [LOCK SCREEN] Album art fetch completed in \(String(format: "%.2f", artDuration))s")

                if let error = error {
                    print("❌ [LOCK SCREEN] Error loading album art: \(error.localizedDescription)")
                }

                if let data = data, let image = UIImage(data: data) {
                    print("✅ [LOCK SCREEN] Album art loaded: \(image.size.width)x\(image.size.height), \(data.count) bytes")
                    let artwork = MPMediaItemArtwork(boundsSize: image.size) { _ in image }
                    nowPlayingInfo[MPMediaItemPropertyArtwork] = artwork

                    DispatchQueue.main.async {
                        print("📱 [LOCK SCREEN] Setting MPNowPlayingInfoCenter WITH artwork on main thread")
                        print("   App state: \(UIApplication.shared.applicationState.rawValue)")
                        MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                        print("✅ [LOCK SCREEN] MPNowPlayingInfoCenter updated WITH artwork")
                        print("   Verify: \(MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPMediaItemPropertyTitle] as? String ?? "NIL")")
                        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
                    }
                } else {
                    print("⚠️ [LOCK SCREEN] Failed to create UIImage from data")
                    DispatchQueue.main.async {
                        print("📱 [LOCK SCREEN] Setting MPNowPlayingInfoCenter WITHOUT artwork on main thread")
                        MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                        print("✅ [LOCK SCREEN] MPNowPlayingInfoCenter updated WITHOUT artwork")
                        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
                    }
                }
            }.resume()
        } else {
            print("📱 [LOCK SCREEN] No album art URL - setting metadata without artwork")
            print("   Thread: \(Thread.isMainThread ? "MAIN" : "BACKGROUND - DISPATCHING TO MAIN")")

            // Always dispatch to main thread for safety
            DispatchQueue.main.async {
                print("📱 [LOCK SCREEN] Setting MPNowPlayingInfoCenter (no artwork) on main thread")
                print("   App state: \(UIApplication.shared.applicationState.rawValue)")
                MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                print("✅ [LOCK SCREEN] MPNowPlayingInfoCenter updated (no artwork)")
                print("   Verify: \(MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPMediaItemPropertyTitle] as? String ?? "NIL")")
                print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
            }
        }
    }
}

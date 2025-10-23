import Foundation
import Capacitor
import MediaPlayer

@objc(NowPlayingPlugin)
public class NowPlayingPlugin: CAPPlugin, CAPBridgedPlugin {

    public let identifier = "NowPlayingPlugin"
    public let jsName = "NowPlayingPlugin"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "updateNowPlaying", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setPlaybackState", returnType: CAPPluginReturnPromise)
    ]

    private var enforcementTimer: Timer?

    public override func load() {
        // Start a timer to continuously enforce Now Playing settings
        // This prevents WKWebView from overriding our custom metadata
        enforcementTimer = Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true) { [weak self] _ in
            self?.enforceNowPlayingSettings()
        }
        print("✅ Now Playing enforcement timer started")
        // Listen for remote control commands
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleRemotePlay),
            name: NSNotification.Name("RemotePlay"),
            object: nil
        )

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleRemotePause),
            name: NSNotification.Name("RemotePause"),
            object: nil
        )
    }

    @objc func handleRemotePlay() {
        // Notify JavaScript via webView
        self.bridge?.evalWithPlugin(self, js: "window.dispatchEvent(new Event('RemotePlay'))")
    }

    @objc func handleRemotePause() {
        // Notify JavaScript via webView
        self.bridge?.evalWithPlugin(self, js: "window.dispatchEvent(new Event('RemotePause'))")
    }

    @objc func updateNowPlaying(_ call: CAPPluginCall) {
        let title = call.getString("title") ?? ""
        let artist = call.getString("artist") ?? ""
        let album = call.getString("album") ?? ""
        let albumArtUrl = call.getString("albumArt") ?? ""

        print("NowPlayingPlugin - updateNowPlaying called")
        print("  Title: \(title)")
        print("  Artist: \(artist)")
        print("  Album: \(album)")
        print("  Album Art URL: \(albumArtUrl)")

        DispatchQueue.main.async {
            var nowPlayingInfo = [String: Any]()
            nowPlayingInfo[MPMediaItemPropertyTitle] = title
            nowPlayingInfo[MPMediaItemPropertyArtist] = artist
            nowPlayingInfo[MPMediaItemPropertyAlbumTitle] = album

            // Critical: Mark as live stream to prevent skip buttons and timeline scrubber
            nowPlayingInfo[MPNowPlayingInfoPropertyIsLiveStream] = true
            nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = 1.0

            // DO NOT set elapsed time or duration for live streams
            // This ensures iOS shows "Live" instead of a timeline

            print("📻 Setting Now Playing Info as LIVE STREAM")
            print("   isLiveStream: true")
            print("   playbackRate: 1.0")
            print("   (no duration or elapsed time - shows as Live)")

            // Load album art if URL is provided
            if !albumArtUrl.isEmpty, let url = URL(string: albumArtUrl) {
                print("🖼️ Loading album art from URL: \(albumArtUrl)")
                URLSession.shared.dataTask(with: url) { data, response, error in
                    if let error = error {
                        print("❌ Error loading album art: \(error)")
                    }

                    if let data = data, let image = UIImage(data: data) {
                        print("✅ Album art loaded successfully, size: \(image.size)")
                        let artwork = MPMediaItemArtwork(boundsSize: image.size) { size in
                            return image
                        }
                        nowPlayingInfo[MPMediaItemPropertyArtwork] = artwork

                        DispatchQueue.main.async {
                            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                            print("✅ Now Playing Info set WITH artwork")
                            self.debugNowPlayingInfo()
                        }
                    } else {
                        // Set info without artwork if image fails to load
                        print("⚠️ Failed to load album art image")
                        DispatchQueue.main.async {
                            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                            print("✅ Now Playing Info set WITHOUT artwork")
                            self.debugNowPlayingInfo()
                        }
                    }
                }.resume()
            } else {
                // Set info without artwork
                print("ℹ️ No album art URL provided")
                MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                print("✅ Now Playing Info set (no artwork)")
                self.debugNowPlayingInfo()
            }

            // CRITICAL: Re-configure remote commands EVERY time we update Now Playing
            // This overrides any WebView configuration
            self.configureRemoteCommands()
        }

        call.resolve()
    }

    private func configureRemoteCommands() {
        let commandCenter = MPRemoteCommandCenter.shared()

        // Aggressively disable all skip/seek commands
        commandCenter.skipForwardCommand.isEnabled = false
        commandCenter.skipBackwardCommand.isEnabled = false
        commandCenter.seekForwardCommand.isEnabled = false
        commandCenter.seekBackwardCommand.isEnabled = false
        commandCenter.nextTrackCommand.isEnabled = false
        commandCenter.previousTrackCommand.isEnabled = false
        commandCenter.changePlaybackPositionCommand.isEnabled = false
        commandCenter.changePlaybackRateCommand.isEnabled = false

        print("🔒 Remote commands re-configured (skip/seek disabled)")
    }

    @objc func setPlaybackState(_ call: CAPPluginCall) {
        let isPlaying = call.getBool("isPlaying") ?? false

        print("NowPlayingPlugin - setPlaybackState called: \(isPlaying ? "playing" : "paused")")

        DispatchQueue.main.async {
            // IMPORTANT: Only update playback rate if nowPlayingInfo already exists
            // Don't create a new empty dict - that would wipe out metadata
            if var nowPlayingInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo {
                nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0
                MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                print("✅ Playback state updated (preserving existing metadata)")
            } else {
                // If no existing info, create minimal info to enable controls
                var nowPlayingInfo = [String: Any]()
                nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0
                nowPlayingInfo[MPNowPlayingInfoPropertyIsLiveStream] = true
                MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                print("⚠️ Playback state set (no existing metadata to preserve)")
            }
            self.debugNowPlayingInfo()
        }

        call.resolve()
    }

    private func debugNowPlayingInfo() {
        let info = MPNowPlayingInfoCenter.default().nowPlayingInfo
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("📊 Current Now Playing Info Center Status:")
        if let info = info {
            print("   Title: \(info[MPMediaItemPropertyTitle] as? String ?? "nil")")
            print("   Artist: \(info[MPMediaItemPropertyArtist] as? String ?? "nil")")
            print("   Album: \(info[MPMediaItemPropertyAlbumTitle] as? String ?? "nil")")
            print("   Is Live Stream: \(info[MPNowPlayingInfoPropertyIsLiveStream] as? Bool ?? false)")
            print("   Playback Rate: \(info[MPNowPlayingInfoPropertyPlaybackRate] as? Double ?? 0.0)")
            print("   Has Artwork: \(info[MPMediaItemPropertyArtwork] != nil)")
        } else {
            print("   ⚠️ NOW PLAYING INFO IS NIL!")
        }
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    }

    private func enforceNowPlayingSettings() {
        // Re-enforce that this is a live stream
        // This prevents WKWebView from changing the settings
        guard var nowPlayingInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo else {
            return
        }

        var needsUpdate = false
        var issues: [String] = []

        // Ensure isLiveStream is always true
        if nowPlayingInfo[MPNowPlayingInfoPropertyIsLiveStream] as? Bool != true {
            nowPlayingInfo[MPNowPlayingInfoPropertyIsLiveStream] = true
            needsUpdate = true
            issues.append("isLiveStream was false")
        }

        // Remove any duration or elapsed time that might have been added by WebView
        if let elapsed = nowPlayingInfo[MPNowPlayingInfoPropertyElapsedPlaybackTime] {
            nowPlayingInfo.removeValue(forKey: MPNowPlayingInfoPropertyElapsedPlaybackTime)
            needsUpdate = true
            issues.append("removed elapsedTime: \(elapsed)")
        }

        if let duration = nowPlayingInfo[MPMediaItemPropertyPlaybackDuration] {
            nowPlayingInfo.removeValue(forKey: MPMediaItemPropertyPlaybackDuration)
            needsUpdate = true
            issues.append("removed duration: \(duration)")
        }

        if needsUpdate {
            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
            print("⚡ ENFORCEMENT: Fixed issues: \(issues.joined(separator: ", "))")
        }

        // Always re-disable skip commands (even if no update needed)
        let commandCenter = MPRemoteCommandCenter.shared()
        if commandCenter.skipForwardCommand.isEnabled || commandCenter.skipBackwardCommand.isEnabled {
            commandCenter.skipForwardCommand.isEnabled = false
            commandCenter.skipBackwardCommand.isEnabled = false
            commandCenter.changePlaybackPositionCommand.isEnabled = false
            commandCenter.seekForwardCommand.isEnabled = false
            commandCenter.seekBackwardCommand.isEnabled = false
            print("⚡ ENFORCEMENT: Re-disabled skip commands")
        }
    }
}

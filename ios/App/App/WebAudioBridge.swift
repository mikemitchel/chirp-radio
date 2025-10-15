//
//  WebAudioBridge.swift
//  App
//
//  Bridges web audio player to iOS media controls and CarPlay
//

import UIKit
import MediaPlayer
import Capacitor

class WebAudioBridge: NSObject {

    var currentArtistName: String = ""
    var currentSongName: String = ""
    var currentAlbumArtURL: String?
    var currentDj: String = ""
    var isPlaying: Bool = false

    // Singleton
    static let shared = WebAudioBridge()

    override private init() {
        super.init()
        setupRemoteControls()
        setupAudioSession()
    }

    // MARK: - Setup

    private func setupAudioSession() {
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            print("Audio Session error: \(error)")
        }
    }

    private func setupRemoteControls() {
        let commandCenter = MPRemoteCommandCenter.shared()

        // Disable commands we don't support
        commandCenter.changePlaybackRateCommand.isEnabled = false
        commandCenter.nextTrackCommand.isEnabled = false
        commandCenter.previousTrackCommand.isEnabled = false
        commandCenter.seekBackwardCommand.isEnabled = false
        commandCenter.seekForwardCommand.isEnabled = false
        commandCenter.skipBackwardCommand.isEnabled = false
        commandCenter.skipForwardCommand.isEnabled = false

        // Enable play/pause
        commandCenter.playCommand.addTarget { [weak self] _ in
            self?.handlePlay()
            return .success
        }

        commandCenter.pauseCommand.addTarget { [weak self] _ in
            self?.handlePause()
            return .success
        }

        commandCenter.togglePlayPauseCommand.addTarget { [weak self] _ in
            self?.handleTogglePlayPause()
            return .success
        }
    }

    // MARK: - Update Now Playing Info

    func updateNowPlaying(title: String, artist: String, albumArtUrl: String?, dj: String) {
        currentSongName = title
        currentArtistName = artist
        currentAlbumArtURL = albumArtUrl
        currentDj = dj

        var nowPlayingInfo: [String: Any] = [
            MPMediaItemPropertyTitle: title,
            MPMediaItemPropertyArtist: artist,
            MPNowPlayingInfoPropertyIsLiveStream: true,
            MPMediaItemPropertyAlbumTitle: "DJ: \(dj)"
        ]

        // Load album artwork asynchronously
        if let urlString = albumArtUrl,
           let url = URL(string: urlString) {
            Task {
                let artwork = await getAlbumArtwork(from: url)
                await MainActor.run {
                    nowPlayingInfo[MPMediaItemPropertyArtwork] = artwork
                    MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                }
            }
        } else {
            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
        }

        // Notify CarPlay to update
        NotificationCenter.default.post(name: Notification.Name("needRecentlyPlayedUpdate"), object: nil)
    }

    func updatePlaybackState(isPlaying: Bool) {
        self.isPlaying = isPlaying

        var nowPlayingInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [String: Any]()
        nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0
        MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo

        // Notify UI
        NotificationCenter.default.post(name: Notification.Name("playStateUpdated"), object: nil)
    }

    private func getAlbumArtwork(from url: URL) async -> MPMediaItemArtwork? {
        guard let data = try? Data(contentsOf: url),
              let image = UIImage(data: data) else {
            return nil
        }

        return MPMediaItemArtwork(boundsSize: image.size) { _ in image }
    }

    // MARK: - Playback Control Handlers

    private func handlePlay() {
        // Send message to web layer to play
        NotificationCenter.default.post(
            name: Notification.Name("webAudioCommand"),
            object: nil,
            userInfo: ["command": "play"]
        )
    }

    private func handlePause() {
        // Send message to web layer to pause
        NotificationCenter.default.post(
            name: Notification.Name("webAudioCommand"),
            object: nil,
            userInfo: ["command": "pause"]
        )
    }

    private func handleTogglePlayPause() {
        if isPlaying {
            handlePause()
        } else {
            handlePlay()
        }
    }

    // MARK: - For CarPlay

    func getAlbumArtworkSync() -> UIImage {
        guard let urlString = currentAlbumArtURL,
              let url = URL(string: urlString),
              let data = try? Data(contentsOf: url),
              let image = UIImage(data: data) else {
            return UIImage(named: "AppIcon") ?? UIImage()
        }
        return image
    }
}

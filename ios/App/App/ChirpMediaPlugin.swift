//
//  ChirpMediaPlugin.swift
//  App
//
//  Capacitor plugin for CarPlay/Media Controls integration
//

import Foundation
import Capacitor

@objc(ChirpMediaPlugin)
public class ChirpMediaPlugin: CAPPlugin {

    private var commandObserver: NSObjectProtocol?

    override public func load() {
        // Initialize the WebAudioBridge singleton
        _ = WebAudioBridge.shared

        // Listen for commands from native controls (CarPlay, Lock Screen, etc.)
        commandObserver = NotificationCenter.default.addObserver(
            forName: Notification.Name("webAudioCommand"),
            object: nil,
            queue: .main
        ) { [weak self] notification in
            guard let command = notification.userInfo?["command"] as? String else { return }

            // Notify web layer
            self?.notifyListeners("mediaCommand", data: ["command": command])
        }
    }

    deinit {
        if let observer = commandObserver {
            NotificationCenter.default.removeObserver(observer)
        }
    }

    // MARK: - Update Now Playing Info

    @objc func updateNowPlaying(_ call: CAPPluginCall) {
        let title = call.getString("title") ?? ""
        let artist = call.getString("artist") ?? ""
        let albumArtUrl = call.getString("albumArtUrl")
        let dj = call.getString("dj") ?? ""

        WebAudioBridge.shared.updateNowPlaying(
            title: title,
            artist: artist,
            albumArtUrl: albumArtUrl,
            dj: dj
        )

        call.resolve()
    }

    // MARK: - Update Playback State

    @objc func setPlaybackState(_ call: CAPPluginCall) {
        let isPlaying = call.getBool("isPlaying") ?? false

        WebAudioBridge.shared.updatePlaybackState(isPlaying: isPlaying)

        call.resolve()
    }

    // MARK: - Get Current State

    @objc func getCurrentState(_ call: CAPPluginCall) {
        let bridge = WebAudioBridge.shared

        call.resolve([
            "isPlaying": bridge.isPlaying,
            "title": bridge.currentSongName,
            "artist": bridge.currentArtistName,
            "dj": bridge.currentDj
        ])
    }
}

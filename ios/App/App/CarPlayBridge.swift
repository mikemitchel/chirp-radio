//
//  CarPlayBridge.swift
//  App
//
//  CarPlay integration - provides audio app interface
//

import CarPlay
import MediaPlayer
import UIKit

class CarPlayBridge: UIResponder, CPTemplateApplicationSceneDelegate {

    weak var interfaceController: CPInterfaceController?
    private var nowPlayingTemplate: CPNowPlayingTemplate?
    private var tabBarTemplate: CPTabBarTemplate?

    // Shared singleton for direct access from NativeAudioPlayer
    static var shared: CarPlayBridge?

    // CarPlay connected
    func templateApplicationScene(_ templateApplicationScene: CPTemplateApplicationScene,
                                  didConnect interfaceController: CPInterfaceController) {

        print("🚗🎵 CarPlay scene connected! Setting up audio app interface...")

        self.interfaceController = interfaceController
        CarPlayBridge.shared = self

        // Create Now Playing template
        nowPlayingTemplate = CPNowPlayingTemplate.shared
        configureLiveStreamNowPlaying()

        // Create tab bar with CHIRP Radio icon
        let nowPlayingTab = CPTemplate()
        nowPlayingTab.tabTitle = "CHIRP Radio"
        nowPlayingTab.tabImage = UIImage(named: "AppIcon") ?? UIImage(systemName: "radio")

        // Create tab bar template
        tabBarTemplate = CPTabBarTemplate(templates: [nowPlayingTemplate!])

        // Set tab bar as root template - this makes CHIRP Radio appear as an app
        interfaceController.setRootTemplate(tabBarTemplate!, animated: false, completion: nil)

        print("🚗 CarPlay tab bar interface configured")
        print("🚗 CHIRP Radio should now appear in CarPlay app grid")

        // Debug current state
        debugNowPlayingInfo()
        debugRemoteCommands()

        // Listen for metadata updates
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            self?.checkForMetadataUpdates()
        }
    }

    func templateApplicationSceneDidDisconnect(_ templateApplicationScene: CPTemplateApplicationScene) {
        print("🚗 CarPlay disconnected")
        CarPlayBridge.shared = nil
    }

    private var lastMetadataHash: Int = 0

    private func checkForMetadataUpdates() {
        guard let info = MPNowPlayingInfoCenter.default().nowPlayingInfo else {
            return
        }

        // Create a simple hash of the metadata to detect changes
        let title = info[MPMediaItemPropertyTitle] as? String ?? ""
        let artist = info[MPMediaItemPropertyArtist] as? String ?? ""
        let hashValue = (title + artist).hashValue

        if hashValue != lastMetadataHash && hashValue != 0 {
            lastMetadataHash = hashValue
            print("🚗 Metadata changed detected - refreshing CarPlay")
            debugNowPlayingInfo()
        }
    }


    private func configureLiveStreamNowPlaying() {
        guard let nowPlayingTemplate = nowPlayingTemplate else { return }

        // For live streams, we want album art to display but no skip/seek controls
        // The play/pause will come from MPRemoteCommandCenter automatically

        // Set isUpNextButtonEnabled to false since this is a live stream
        nowPlayingTemplate.isUpNextButtonEnabled = false

        // Set isAlbumArtistButtonEnabled to false - we don't need navigation to artist
        nowPlayingTemplate.isAlbumArtistButtonEnabled = false

        // Empty button array - rely entirely on MPRemoteCommandCenter for play/pause
        nowPlayingTemplate.updateNowPlayingButtons([])

        print("🚗 Configured Now Playing as live stream (no skip, no up next)")
    }

    private func debugNowPlayingInfo() {
        let info = MPNowPlayingInfoCenter.default().nowPlayingInfo
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("🚗 CarPlay - Current Now Playing Info:")
        if let info = info {
            print("   Title: \(info[MPMediaItemPropertyTitle] as? String ?? "nil")")
            print("   Artist: \(info[MPMediaItemPropertyArtist] as? String ?? "nil")")
            print("   Album: \(info[MPMediaItemPropertyAlbumTitle] as? String ?? "nil")")
            print("   Is Live Stream: \(info[MPNowPlayingInfoPropertyIsLiveStream] as? Bool ?? false)")
            print("   Has Artwork: \(info[MPMediaItemPropertyArtwork] != nil)")
        } else {
            print("   ⚠️ NOW PLAYING INFO IS NIL - waiting for audio to start")
        }
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    }

    private func debugRemoteCommands() {
        let commandCenter = MPRemoteCommandCenter.shared()
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("🚗 CarPlay - Remote Command Center Status:")
        print("   Play enabled: \(commandCenter.playCommand.isEnabled)")
        print("   Pause enabled: \(commandCenter.pauseCommand.isEnabled)")
        print("   Skip forward enabled: \(commandCenter.skipForwardCommand.isEnabled)")
        print("   Skip backward enabled: \(commandCenter.skipBackwardCommand.isEnabled)")
        print("   Next track enabled: \(commandCenter.nextTrackCommand.isEnabled)")
        print("   Previous track enabled: \(commandCenter.previousTrackCommand.isEnabled)")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    }
}

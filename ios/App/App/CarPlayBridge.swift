//
//  CarPlayBridge.swift
//  App
//
//  Updated CarPlay integration using WebAudioBridge
//

import CarPlay

class CarPlayBridge: UIResponder, CPTemplateApplicationSceneDelegate {

    // CarPlay connected
    func templateApplicationScene(_ templateApplicationScene: CPTemplateApplicationScene,
                                  didConnect interfaceController: CPInterfaceController) {

        // Create the list item with default text and image
        let item = CPListItem(
            text: "CHIRP Radio",
            detailText: nil,
            image: UIImage(named: "AppIcon"),
            accessoryImage: nil,
            accessoryType: .disclosureIndicator
        )

        // Set it to push the "now playing" template on selection
        item.handler = { item, completion in
            interfaceController.pushTemplate(CPNowPlayingTemplate.shared, animated: true, completion: nil)

            // If not playing, start playback when user taps
            if !WebAudioBridge.shared.isPlaying {
                NotificationCenter.default.post(
                    name: Notification.Name("webAudioCommand"),
                    object: nil,
                    userInfo: ["command": "play"]
                )
            }

            completion()
        }

        // Populate album/artist info
        updateListItem(item)

        // Subscribe to updates
        NotificationCenter.default.addObserver(
            forName: Notification.Name("needRecentlyPlayedUpdate"),
            object: nil,
            queue: .main
        ) { [weak self] _ in
            self?.updateListItem(item)
        }

        let section = CPListSection(items: [item])
        let listTemplate = CPListTemplate(title: "CHIRP Radio", sections: [section])
        interfaceController.setRootTemplate(listTemplate, animated: true, completion: nil)
    }

    private func updateListItem(_ listItem: CPListItem) {
        let bridge = WebAudioBridge.shared

        if !bridge.currentSongName.isEmpty {
            listItem.setText(bridge.currentSongName)
        }

        if !bridge.currentArtistName.isEmpty {
            listItem.setDetailText(bridge.currentArtistName)
        }

        if bridge.currentAlbumArtURL != nil {
            Task {
                let image = await getAlbumArtwork()
                await MainActor.run {
                    listItem.setImage(image)
                }
            }
        }
    }

    private func getAlbumArtwork() async -> UIImage {
        let bridge = WebAudioBridge.shared
        guard let urlString = bridge.currentAlbumArtURL,
              let url = URL(string: urlString),
              let data = try? Data(contentsOf: url),
              let image = UIImage(data: data) else {
            return UIImage(named: "AppIcon") ?? UIImage()
        }
        return image
    }
}

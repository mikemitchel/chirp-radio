//
//  CarPlaySceneDelegate.swift
//  RadioApp
//
//  Created by Jerry Beers on 3/3/24.
//  Copyright © 2024 Interapt. All rights reserved.
//

import CarPlay

class CarPlaySceneDelegate: UIResponder, CPTemplateApplicationSceneDelegate {
	// CarPlay connected
	func templateApplicationScene(_ templateApplicationScene: CPTemplateApplicationScene,
								  didConnect interfaceController: CPInterfaceController) {
		// If the CarPlay UI is launched and the app hasn't been, we need to load the info first, which is a side effect of this singleton
		_ = NowPlayingBannerViewController.sharedInstance
		
		// Create the list item with default text and image
		let item = CPListItem(text: "Chirp Radio", detailText: nil, image: Config.Images.logo, accessoryImage: nil, accessoryType: .disclosureIndicator)
		
		// Set it to push the "now playing" template on selection
		item.handler = { item, completion in
			interfaceController.pushTemplate(CPNowPlayingTemplate.shared, animated: true, completion: nil)
			// Since "now playing" doesn't populate until the item starts playing, and because the user took an action to start playback, kick it off
			// If we wanted to push to "now playing" without starting playback, we'd have to figure out how to get it to populate
			if NowPlayingManager.sharedInstance.playing == false {
				NowPlayingManager.sharedInstance.handlePauseOrPlay()
			}
			// Let CarPlay know that we're done handling the item selection
			completion()
		}
		
		// Populate album/artist info, if we have it
		addNowPlayingInfo(toListItem: item)
		
		// Subscribe to the notification so the list item is always up to date with what is playing
		NotificationCenter.default.addObserver(forName: Notification.Name("needRecentlyPlayedUpdate"), object: nil, queue: .main) { [weak self] _ in
			self?.addNowPlayingInfo(toListItem: item)
		}
		
		let section = CPListSection(items: [item])
		let listTemplate = CPListTemplate(title: "Chirp Radio", sections: [section])
		interfaceController.setRootTemplate(listTemplate, animated: true, completion: nil)
	}
	
	private func addNowPlayingInfo(toListItem listItem: CPListItem) {
		if !NowPlayingManager.sharedInstance.currentSongName.isEmpty {
			listItem.setText(NowPlayingManager.sharedInstance.currentSongName)
		}
		if !NowPlayingManager.sharedInstance.currentArtistName.isEmpty {
			listItem.setDetailText(NowPlayingManager.sharedInstance.currentArtistName)
		}
		if NowPlayingManager.sharedInstance.currentAlbumArtURL != nil {
			Task {
				let image = await NowPlayingManager.sharedInstance.getAlbumArtwork()
				await MainActor.run {
					listItem.setImage(image)
				}
			}
		}
	}
}

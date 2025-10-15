//
//  NowPlayingObject.swift
//  RadioApp
//
//  Created by Interapt Pairing 2 on 6/24/15.
//  Copyright (c) 2015 Interapt. All rights reserved.
//

import UIKit
import AVFoundation
import MediaPlayer

class NowPlayingObject: NSObject {
    
    var currentDjName: String!
    var currentArtistName: String!
    var currentSongName: String!
    
    var playing: Bool = false
    
    var nowPlayingPlayer: AVPlayer = AVPlayer(URL: NSURL(string: Config.highQualityStreamURL))
    
    class var sharedInstance: NowPlayingObject {
        struct Singleton {
            static let instance = NowPlayingObject()
        }
        return Singleton.instance
    }
    
    override init()
    {
        super.init()
        self.currentArtistName = "Artist"//RecentlyPlayedObject.sharedInstance.recentSongsData[0].artist
        self.currentSongName = "Song"//RecentlyPlayedObject.sharedInstance.recentSongsData[0].title
        self.currentDjName = "the DJ"//RecentlyPlayedObject.sharedInstance.recentSongsData[0].dj

        //add a listener for pause/play messages
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "handlePauseOrPlay:", name: "pauseOrPlay", object: nil)
        
        //start playing the radio stream right away if we're configured to do so
        if Config.playStreamAtStart
        {
            self.nowPlayingPlayer.play()
            self.playing = true
        }
        else
        {
            self.playing = false
        }
        
        //initialize lockscreen media player
        MPNowPlayingInfoCenter.defaultCenter().nowPlayingInfo = [
            MPMediaItemPropertyTitle:"Buzzcut Season",
            MPMediaItemPropertyArtist:"Lorde"
        ]
        MPRemoteCommandCenter.sharedCommandCenter().skipBackwardCommand.enabled = false
        MPRemoteCommandCenter.sharedCommandCenter().skipForwardCommand.enabled = false
        
        //allow control center play/pause actions
        if (AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback, error: nil)) {
            println("receiving remote control events")
            UIApplication.sharedApplication().beginReceivingRemoteControlEvents()
        } else {
            println("Audio Session error.")
        }
    }
    
    func handlePauseOrPlay(notification: NSNotification)
    {
        if self.playing
        {
            self.playing = false
            self.nowPlayingPlayer.pause()
        }
        else if !self.playing
        {
            self.playing = true
            self.nowPlayingPlayer.play()
        }
    }
}

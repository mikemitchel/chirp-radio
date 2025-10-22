import Foundation
import Capacitor
import MediaPlayer

@objc(NowPlayingPlugin)
public class NowPlayingPlugin: CAPPlugin {

    public override func load() {
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

            // Set playback rate to indicate live streaming
            nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = 1.0
            nowPlayingInfo[MPNowPlayingInfoPropertyIsLiveStream] = true

            // Load album art if URL is provided
            if !albumArtUrl.isEmpty, let url = URL(string: albumArtUrl) {
                print("Loading album art from URL...")
                URLSession.shared.dataTask(with: url) { data, response, error in
                    if let error = error {
                        print("Error loading album art: \(error)")
                    }

                    if let data = data, let image = UIImage(data: data) {
                        print("Album art loaded successfully, size: \(image.size)")
                        let artwork = MPMediaItemArtwork(boundsSize: image.size) { size in
                            return image
                        }
                        nowPlayingInfo[MPMediaItemPropertyArtwork] = artwork

                        DispatchQueue.main.async {
                            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                            print("Now Playing Info set WITH artwork")
                        }
                    } else {
                        // Set info without artwork if image fails to load
                        print("Failed to load album art image")
                        DispatchQueue.main.async {
                            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                            print("Now Playing Info set WITHOUT artwork")
                        }
                    }
                }.resume()
            } else {
                // Set info without artwork
                print("No album art URL provided")
                MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
                print("Now Playing Info set (no artwork)")
            }
        }

        call.resolve()
    }

    @objc func setPlaybackState(_ call: CAPPluginCall) {
        let isPlaying = call.getBool("isPlaying") ?? false

        print("NowPlayingPlugin - setPlaybackState called: \(isPlaying ? "playing" : "paused")")

        DispatchQueue.main.async {
            var nowPlayingInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [String: Any]()
            nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0
            MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
            print("Playback state updated")
        }

        call.resolve()
    }
}

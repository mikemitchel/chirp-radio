import UIKit
import Capacitor
import AVFoundation
import MediaPlayer
import WebKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.

        // Set window background to CHIRP red to prevent white flash
        if let window = window {
            window.backgroundColor = UIColor(red: 0.917647, green: 0.109804, blue: 0.172549, alpha: 1.0)
        }

        // Configure WKWebView to disable automatic media controls
        configureWebViewMediaSettings()

        // Register custom plugins after a delay to ensure bridge is ready
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            if let bridge = (self.window?.rootViewController as? CAPBridgeViewController)?.bridge {
                print("🎵 Registering custom plugins with bridge")
                bridge.registerPluginInstance(NowPlayingPlugin())
                bridge.registerPluginInstance(NativeAudioPlayer())
                print("🎵 Custom plugins registered successfully")
            } else {
                print("❌ Failed to get bridge reference")
            }
        }

        // Configure audio session for background playback
        configureAudioSession()

        // Set up remote command center (lock screen controls)
        setupRemoteCommandCenter()

        return true
    }

    func configureWebViewMediaSettings() {
        // Configure WKWebView to prevent it from managing Now Playing Info
        // This ensures our custom plugin has full control
        if #available(iOS 14.5, *) {
            let config = WKWebViewConfiguration()
            config.allowsInlineMediaPlayback = true
            config.mediaTypesRequiringUserActionForPlayback = []
            print("✅ WebView media settings configured")
        }
    }

    func configureAudioSession() {
        do {
            let audioSession = AVAudioSession.sharedInstance()
            try audioSession.setCategory(.playback, mode: .default, options: [])
            try audioSession.setActive(true)
            print("✅ Audio session configured for background playback")
        } catch {
            print("❌ Failed to configure audio session: \(error)")
        }
    }

    func setupRemoteCommandCenter() {
        let commandCenter = MPRemoteCommandCenter.shared()

        // Enable play command
        commandCenter.playCommand.isEnabled = true
        commandCenter.playCommand.addTarget { event in
            print("🎵 Remote PLAY command received")
            NotificationCenter.default.post(name: NSNotification.Name("RemotePlay"), object: nil)
            return .success
        }

        // Enable pause command
        commandCenter.pauseCommand.isEnabled = true
        commandCenter.pauseCommand.addTarget { event in
            print("⏸️ Remote PAUSE command received")
            NotificationCenter.default.post(name: NSNotification.Name("RemotePause"), object: nil)
            return .success
        }

        // Disable skip commands (for live stream)
        // IMPORTANT: We need to both disable AND add handlers that return .commandFailed
        // This prevents iOS from showing the buttons at all
        commandCenter.skipForwardCommand.isEnabled = false
        commandCenter.skipForwardCommand.addTarget { _ in .commandFailed }

        commandCenter.skipBackwardCommand.isEnabled = false
        commandCenter.skipBackwardCommand.addTarget { _ in .commandFailed }

        commandCenter.seekForwardCommand.isEnabled = false
        commandCenter.seekForwardCommand.addTarget { _ in .commandFailed }

        commandCenter.seekBackwardCommand.isEnabled = false
        commandCenter.seekBackwardCommand.addTarget { _ in .commandFailed }

        commandCenter.nextTrackCommand.isEnabled = false
        commandCenter.nextTrackCommand.addTarget { _ in .commandFailed }

        commandCenter.previousTrackCommand.isEnabled = false
        commandCenter.previousTrackCommand.addTarget { _ in .commandFailed }

        commandCenter.changePlaybackPositionCommand.isEnabled = false
        commandCenter.changePlaybackPositionCommand.addTarget { _ in .commandFailed }

        print("✅ Remote command center configured")
        print("   - Skip forward enabled: \(commandCenter.skipForwardCommand.isEnabled)")
        print("   - Skip backward enabled: \(commandCenter.skipBackwardCommand.isEnabled)")

        // Required for lock screen controls to appear (even though Apple says it's deprecated)
        UIApplication.shared.beginReceivingRemoteControlEvents()
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

}

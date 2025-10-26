import UIKit
import Capacitor
import AVFoundation
import MediaPlayer
import WebKit
import CarPlay

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.

        // Configure WKWebView to disable automatic media controls
        configureWebViewMediaSettings()

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

        print("🎛️ Setting up Remote Command Center...")

        // Commands are set up in NativeAudioPlayer plugin
        // Just disable skip/seek commands for live stream
        commandCenter.skipForwardCommand.isEnabled = false
        commandCenter.skipForwardCommand.removeTarget(nil)

        commandCenter.skipBackwardCommand.isEnabled = false
        commandCenter.skipBackwardCommand.removeTarget(nil)

        commandCenter.seekForwardCommand.isEnabled = false
        commandCenter.seekForwardCommand.removeTarget(nil)

        commandCenter.seekBackwardCommand.isEnabled = false
        commandCenter.seekBackwardCommand.removeTarget(nil)

        commandCenter.nextTrackCommand.isEnabled = false
        commandCenter.nextTrackCommand.removeTarget(nil)

        commandCenter.previousTrackCommand.isEnabled = false
        commandCenter.previousTrackCommand.removeTarget(nil)

        commandCenter.changePlaybackPositionCommand.isEnabled = false
        commandCenter.changePlaybackPositionCommand.removeTarget(nil)

        commandCenter.changePlaybackRateCommand.isEnabled = false
        commandCenter.changePlaybackRateCommand.removeTarget(nil)

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

    // MARK: - UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.

        print("🚗 Scene connecting with role: \(connectingSceneSession.role.rawValue)")

        if connectingSceneSession.role == UISceneSession.Role(rawValue: "CPTemplateApplicationSceneSessionRoleApplication") {
            // CarPlay scene
            print("🚗 Creating CarPlay scene configuration")
            let sceneConfig = UISceneConfiguration(name: "CarPlay", sessionRole: connectingSceneSession.role)
            sceneConfig.delegateClass = CarPlayBridge.self
            return sceneConfig
        }

        // Main app scene
        print("📱 Creating main app scene configuration")
        let sceneConfig = UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
        sceneConfig.delegateClass = SceneDelegate.self
        return sceneConfig
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
    }

}

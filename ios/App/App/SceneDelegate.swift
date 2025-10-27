//
//  SceneDelegate.swift
//  App
//
//  Scene-based lifecycle for Capacitor app
//

import UIKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = (scene as? UIWindowScene) else { return }

        // Create the window
        window = UIWindow(windowScene: windowScene)

        // Set window background to CHIRP red to prevent white flash
        window?.backgroundColor = UIColor(red: 0.917647, green: 0.109804, blue: 0.172549, alpha: 1.0)

        // Create and set the Capacitor view controller
        let rootViewController = CAPBridgeViewController()
        window?.rootViewController = rootViewController
        window?.makeKeyAndVisible()

        // Register custom plugins immediately - bridge is ready at this point
        if let bridge = rootViewController.bridge {
            print("🎵 Registering custom plugins with bridge")
            bridge.registerPluginInstance(NowPlayingPlugin())
            bridge.registerPluginInstance(NativeAudioPlayer())
            print("🎵 Custom plugins registered successfully")
        } else {
            print("❌ Failed to get bridge reference")
        }
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        // Called as the scene is being released by the system.
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        // Called when the scene has moved from an inactive state to an active state.
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Called when the scene will move from an active state to an inactive state.
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        // Called as the scene transitions from the background to the foreground.
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // Called as the scene transitions from the foreground to the background.
    }
}

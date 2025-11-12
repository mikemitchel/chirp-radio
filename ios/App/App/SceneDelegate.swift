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
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("🎬 [SCENE] willConnectTo called")
        print("   Time: \(Date())")
        print("   Session: \(session.configuration.name ?? "Unknown")")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

        guard let windowScene = (scene as? UIWindowScene) else {
            print("❌ [SCENE] Failed to cast scene to UIWindowScene")
            return
        }

        print("✅ [SCENE] Got windowScene")

        // Create the window
        print("🪟 [WINDOW] Creating window...")
        window = UIWindow(windowScene: windowScene)

        // Set window background to CHIRP red to prevent white flash
        window?.backgroundColor = UIColor(red: 0.917647, green: 0.109804, blue: 0.172549, alpha: 1.0)
        print("✅ [WINDOW] Window created with CHIRP red background (#EA1C2C)")
        print("🔍 [DEBUG] Window background color: \(window?.backgroundColor?.description ?? "nil")")
        print("🔍 [DEBUG] Window is hidden: \(window?.isHidden ?? true)")
        print("🔍 [DEBUG] Window alpha: \(window?.alpha ?? 0)")
        print("🔍 [DEBUG] WindowScene background: \(windowScene.windows.count) windows total")

        // Create and set the Capacitor view controller
        print("🎮 [VIEW CONTROLLER] Creating CAPBridgeViewController...")
        let rootViewController = CAPBridgeViewController()
        print("✅ [VIEW CONTROLLER] CAPBridgeViewController created")

        // Set WebView background to CHIRP red to prevent black screen
        rootViewController.view.backgroundColor = UIColor(red: 0.917647, green: 0.109804, blue: 0.172549, alpha: 1.0)
        print("🔧 [FIX] Set root VC background to CHIRP red to prevent black screen")

        print("🎮 [VIEW CONTROLLER] Setting as root view controller...")
        window?.rootViewController = rootViewController
        print("✅ [VIEW CONTROLLER] Root view controller set")
        print("🔍 [DEBUG] Root VC view background: \(rootViewController.view?.backgroundColor?.description ?? "nil")")
        print("🔍 [DEBUG] Window background after VC set: \(window?.backgroundColor?.description ?? "nil")")

        print("🪟 [WINDOW] Making window key and visible...")
        window?.makeKeyAndVisible()
        print("✅ [WINDOW] Window is now key and visible")
        print("   Window bounds: \(window?.bounds ?? .zero)")
        print("   Window frame: \(window?.frame ?? .zero)")

        // Register custom plugins immediately - bridge is ready at this point
        if let bridge = rootViewController.bridge {
            print("🎵 Registering custom plugins with bridge")
            bridge.registerPluginInstance(NowPlayingPlugin())
            bridge.registerPluginInstance(NativeAudioPlayer())
            print("🎵 Custom plugins registered successfully")
        } else {
            print("❌ Failed to get bridge reference")
        }

        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("✅ [SCENE] willConnectTo completed")
        print("   Window should now be visible with CHIRP red background")
        print("   WebView will start loading...")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        // Called as the scene is being released by the system.
        print("🔌 [SCENE] sceneDidDisconnect - Scene released")
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        // Called when the scene has moved from an inactive state to an active state.
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("✅ [SCENE] sceneDidBecomeActive")
        print("   Time: \(Date())")
        print("   App is now fully active and visible")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Called when the scene will move from an active state to an inactive state.
        print("⏸️ [SCENE] sceneWillResignActive - App going inactive")
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        // Called as the scene transitions from the background to the foreground.
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print("🌅 [SCENE] sceneWillEnterForeground")
        print("   Time: \(Date())")
        print("   App returning from background")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // Called as the scene transitions from the foreground to the background.
        print("🌙 [SCENE] sceneDidEnterBackground - App in background")
    }
}

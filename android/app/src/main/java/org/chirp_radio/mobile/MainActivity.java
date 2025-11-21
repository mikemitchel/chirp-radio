package org.chirp_radio.mobile;

import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d("CHIRP_NAV_BAR", "=== NAVIGATION BAR DEBUG START ===");

        // Check nav bar color BEFORE anything
        Window window = getWindow();
        Log.d("CHIRP_NAV_BAR", "BEFORE super.onCreate() - navigationBarColor: " + window.getNavigationBarColor());

        // Register custom plugins before calling super.onCreate()
        registerPlugin(NowPlayingPlugin.class);
        registerPlugin(NativeAudioBridgePlugin.class);
        registerPlugin(ChirpMediaPlugin.class);
        registerPlugin(NavigationBarPlugin.class);

        super.onCreate(savedInstanceState);

        // Check nav bar color AFTER super.onCreate() (after Capacitor initializes)
        Log.d("CHIRP_NAV_BAR", "AFTER super.onCreate() - navigationBarColor: " + window.getNavigationBarColor());

        // Configure edge-to-edge and navigation bar for all Android versions
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

        // Enable edge-to-edge: content draws behind navigation bar
        WindowCompat.setDecorFitsSystemWindows(window, false);

        // Make navigation bar transparent so we can draw our own colored background behind it
        window.setNavigationBarColor(android.graphics.Color.TRANSPARENT);

        // Android 15+: Disable contrast enforcement to allow full transparency
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
            window.setNavigationBarContrastEnforced(false);
            Log.d("CHIRP_NAV_BAR", "Android 15+: Transparent nav bar with no contrast enforcement");
        } else {
            Log.d("CHIRP_NAV_BAR", "Android <15: Transparent nav bar (app draws own background)");
        }

        // Set navigation bar buttons to light color (for dark background)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            WindowInsetsControllerCompat insetsController = WindowCompat.getInsetsController(window, window.getDecorView());
            insetsController.setAppearanceLightNavigationBars(false); // false = light buttons on dark bg
            Log.d("CHIRP_NAV_BAR", "Set navigation bar buttons to LIGHT (for dark background)");
        }

        Log.d("CHIRP_NAV_BAR", "=== Navigation bar setup complete ===");

        // Lock to portrait orientation on phones, but allow any orientation on Automotive
        boolean isAutomotive = getPackageManager().hasSystemFeature(PackageManager.FEATURE_AUTOMOTIVE);
        if (!isAutomotive) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }

        // Start the Media Service when the app opens (for Android Auto support)
        // Note: Service is started automatically by ChirpMediaPlugin when audio is initialized
        // Intent intent = new Intent(this, ChirpMediaService.class);
        // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        //     startForegroundService(intent);
        // } else {
        //     startService(intent);
        // }
    }


    @Override
    public void onDestroy() {
        super.onDestroy();

        // Service is managed automatically by ChirpMediaPlugin
        // It stays running for background audio playback
    }
}

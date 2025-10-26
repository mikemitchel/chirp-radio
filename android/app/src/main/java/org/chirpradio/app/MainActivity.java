package org.chirpradio.app;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Register custom plugins before calling super.onCreate()
        registerPlugin(NowPlayingPlugin.class);

        super.onCreate(savedInstanceState);

        // Lock to portrait orientation on phones, but allow any orientation on Automotive
        boolean isAutomotive = getPackageManager().hasSystemFeature(PackageManager.FEATURE_AUTOMOTIVE);
        if (!isAutomotive) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }

        // Start the Media Service when the app opens
        Intent intent = new Intent(this, ChirpMediaService.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(intent);
        } else {
            startService(intent);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        // Stop the Media Service when the app is closed
        Intent intent = new Intent(this, ChirpMediaService.class);
        stopService(intent);
    }
}

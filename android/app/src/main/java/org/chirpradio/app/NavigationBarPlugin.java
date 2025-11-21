package org.chirpradio.app;

import android.os.Build;
import android.view.View;
import android.view.WindowInsets;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "NavigationBarInfo")
public class NavigationBarPlugin extends Plugin {

    @PluginMethod
    public void getNavigationBarHeight(PluginCall call) {
        getBridge().executeOnMainThread(() -> {
            View decorView = getActivity().getWindow().getDecorView();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                // Android 11+ (API 30+)
                WindowInsets insets = decorView.getRootWindowInsets();
                if (insets != null) {
                    android.graphics.Insets navBarInsets = insets.getInsets(WindowInsets.Type.navigationBars());
                    int navBarHeight = navBarInsets.bottom;

                    JSObject result = new JSObject();
                    result.put("height", navBarHeight);
                    call.resolve(result);
                    return;
                }
            } else {
                // Android 10 and below - use WindowInsetsCompat
                WindowInsetsCompat insetsCompat = ViewCompat.getRootWindowInsets(decorView);
                if (insetsCompat != null) {
                    Insets navBarInsets = insetsCompat.getInsets(WindowInsetsCompat.Type.navigationBars());
                    int navBarHeight = navBarInsets.bottom;

                    JSObject result = new JSObject();
                    result.put("height", navBarHeight);
                    call.resolve(result);
                    return;
                }
            }

            // Fallback if insets not available
            JSObject result = new JSObject();
            result.put("height", 0);
            call.resolve(result);
        });
    }
}

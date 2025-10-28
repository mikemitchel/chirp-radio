package org.chirpradio.app

import android.content.Intent
import android.os.Build
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

/**
 * Bridge to control native audio playback through ChirpMediaService
 * This allows the webview to trigger native audio playback for Android Auto
 */
@CapacitorPlugin(name = "NativeAudioBridge")
class NativeAudioBridgePlugin : Plugin() {

    override fun load() {
        super.load()
        android.util.Log.d("NativeAudioBridge", "Plugin loaded")

        // Set up callback to notify web when service changes playback state
        ChirpMediaService.onPlaybackStateChanged = { isPlaying ->
            android.util.Log.d("NativeAudioBridge", "Playback state changed: $isPlaying")
            notifyListeners("playbackStateChanged", JSObject().apply {
                put("isPlaying", isPlaying)
            })
        }
    }

    private fun ensureServiceStarted() {
        if (ChirpMediaService.instance == null) {
            android.util.Log.d("NativeAudioBridge", "Service not running, starting it")
            val context = activity ?: context
            val intent = Intent(context, ChirpMediaService::class.java)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }
            // Give service time to start
            Thread.sleep(100)
        }
    }

    @PluginMethod
    fun play(call: PluginCall) {
        try {
            android.util.Log.d("NativeAudioBridge", "play() called from web")
            ensureServiceStarted()

            val service = ChirpMediaService.instance
            if (service != null) {
                service.onPlay()
                call.resolve()
            } else {
                call.reject("Service not available")
            }
        } catch (e: Exception) {
            android.util.Log.e("NativeAudioBridge", "Failed to play", e)
            call.reject("Failed to play", e)
        }
    }

    @PluginMethod
    fun pause(call: PluginCall) {
        try {
            android.util.Log.d("NativeAudioBridge", "pause() called from web")
            val service = ChirpMediaService.instance
            if (service != null) {
                service.onPause()
                call.resolve()
            } else {
                call.reject("Service not available")
            }
        } catch (e: Exception) {
            android.util.Log.e("NativeAudioBridge", "Failed to pause", e)
            call.reject("Failed to pause", e)
        }
    }

    @PluginMethod
    fun stop(call: PluginCall) {
        try {
            android.util.Log.d("NativeAudioBridge", "stop() called from web")
            val service = ChirpMediaService.instance
            if (service != null) {
                service.onStop()
                call.resolve()
            } else {
                call.reject("Service not available")
            }
        } catch (e: Exception) {
            android.util.Log.e("NativeAudioBridge", "Failed to stop", e)
            call.reject("Failed to stop", e)
        }
    }

    @PluginMethod
    fun isPlaying(call: PluginCall) {
        try {
            val service = ChirpMediaService.instance
            val isPlaying = service?.mediaSessionManager?.isPlaying ?: false

            val ret = JSObject()
            ret.put("isPlaying", isPlaying)
            call.resolve(ret)
        } catch (e: Exception) {
            android.util.Log.e("NativeAudioBridge", "Failed to check playing state", e)
            call.reject("Failed to check playing state", e)
        }
    }
}

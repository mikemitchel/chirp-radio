package org.chirpradio.app

import android.content.Intent
import android.os.Build
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

/**
 * Capacitor plugin for updating Now Playing information
 * This wraps ChirpMediaPlugin to match the iOS interface
 */
@CapacitorPlugin(name = "NowPlayingPlugin")
class NowPlayingPlugin : Plugin() {

    override fun load() {
        super.load()

        android.util.Log.d("NowPlayingPlugin", "Plugin loaded, setting up callbacks")

        // Set up callbacks from service to web - THIS IS CRITICAL FOR SYNC
        ChirpMediaService.onPlayCommand = {
            android.util.Log.d("NowPlayingPlugin", "onPlayCommand triggered from native")
            notifyListeners("mediaCommand", com.getcapacitor.JSObject().apply {
                put("command", "play")
            })
        }

        ChirpMediaService.onPauseCommand = {
            android.util.Log.d("NowPlayingPlugin", "onPauseCommand triggered from native")
            notifyListeners("mediaCommand", com.getcapacitor.JSObject().apply {
                put("command", "pause")
            })
        }
    }

    private fun ensureServiceStarted() {
        if (ChirpMediaService.instance == null) {
            android.util.Log.d("NowPlayingPlugin", "Service not running, starting it")
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
    fun updateNowPlaying(call: PluginCall) {
        try {
            val title = call.getString("title") ?: ""
            val artist = call.getString("artist") ?: ""
            val album = call.getString("album") ?: ""
            val albumArt = call.getString("albumArt")

            android.util.Log.d("NowPlayingPlugin", "updateNowPlaying called: title=$title, artist=$artist, album=$album, albumArt=$albumArt")

            ensureServiceStarted()

            val service = ChirpMediaService.instance
            if (service != null) {
                android.util.Log.d("NowPlayingPlugin", "Service is available, updating metadata")
                service.updateNowPlaying(title, artist, albumArt, album)
            } else {
                android.util.Log.e("NowPlayingPlugin", "Service is still null after ensureServiceStarted")
            }

            call.resolve()
        } catch (e: Exception) {
            android.util.Log.e("NowPlayingPlugin", "Failed to update now playing", e)
            call.reject("Failed to update now playing", e)
        }
    }

    @PluginMethod
    fun setPlaybackState(call: PluginCall) {
        try {
            val isPlaying = call.getBoolean("isPlaying", false) ?: false

            android.util.Log.d("NowPlayingPlugin", "setPlaybackState called: isPlaying=$isPlaying")

            ensureServiceStarted()

            val service = ChirpMediaService.instance
            if (service != null) {
                android.util.Log.d("NowPlayingPlugin", "Service is available, updating playback state")
                service.updatePlaybackState(isPlaying)
            } else {
                android.util.Log.e("NowPlayingPlugin", "Service is still null after ensureServiceStarted")
            }

            call.resolve()
        } catch (e: Exception) {
            android.util.Log.e("NowPlayingPlugin", "Failed to set playback state", e)
            call.reject("Failed to set playback state", e)
        }
    }
}

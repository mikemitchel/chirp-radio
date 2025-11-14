package org.chirpradio.app

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.PowerManager
import androidx.media3.common.MediaItem
import androidx.media3.common.PlaybackException
import androidx.media3.common.Player
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.source.ProgressiveMediaSource
import androidx.media3.datasource.DefaultHttpDataSource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * Native audio player for CHIRP Radio stream using ExoPlayer
 * Handles background playback and integrates with MediaSession
 */
class NativeAudioPlayer(private val context: Context) {

    private var player: ExoPlayer? = null
    private var streamUrl: String? = null
    private var isInitialized = false
    private var audioManager: AudioManager? = null
    private var audioFocusRequest: AudioFocusRequest? = null
    private var wakeLock: PowerManager.WakeLock? = null
    private val mainHandler = Handler(Looper.getMainLooper())
    private var pauseTimestamp: Long? = null

    // Callbacks
    var onPlaybackStateChanged: ((isPlaying: Boolean, isBuffering: Boolean) -> Unit)? = null
    var onError: ((error: String) -> Unit)? = null

    companion object {
        private const val PAUSE_THRESHOLD_MS = 5 * 60 * 1000L // 5 minutes
    }

    init {
        initializePlayer()
        audioManager = context.getSystemService(Context.AUDIO_SERVICE) as AudioManager

        // Acquire wake lock to keep CPU running during playback
        val powerManager = context.getSystemService(Context.POWER_SERVICE) as PowerManager
        wakeLock = powerManager.newWakeLock(
            PowerManager.PARTIAL_WAKE_LOCK,
            "ChirpRadio::AudioPlaybackWakeLock"
        )
    }

    private fun initializePlayer() {
        if (isInitialized) return

        player = ExoPlayer.Builder(context)
            .build()
            .apply {
                // Set up player listener
                addListener(object : Player.Listener {
                    override fun onPlaybackStateChanged(playbackState: Int) {
                        // Don't report playing state here - let onIsPlayingChanged handle it
                        // This prevents false "paused" states during buffering
                        when (playbackState) {
                            Player.STATE_ENDED -> {
                                releaseAudioFocus()
                            }
                        }
                    }

                    override fun onIsPlayingChanged(isPlaying: Boolean) {
                        // This is the authoritative source for playing state
                        onPlaybackStateChanged?.invoke(isPlaying, false)
                        if (isPlaying) {
                            wakeLock?.acquire(10 * 60 * 60 * 1000L /*10 hours*/)
                        } else {
                            if (wakeLock?.isHeld == true) {
                                wakeLock?.release()
                            }
                        }
                    }

                    override fun onPlayerError(error: PlaybackException) {
                        onError?.invoke(error.message ?: "Unknown playback error")

                        // Try to recover from error
                        CoroutineScope(Dispatchers.Main).launch {
                            try {
                                player?.prepare()
                                player?.play()
                            } catch (e: Exception) {
                                onError?.invoke("Failed to recover from error: ${e.message}")
                            }
                        }
                    }
                })

                // Set audio attributes for media playback
                setAudioAttributes(
                    androidx.media3.common.AudioAttributes.Builder()
                        .setContentType(androidx.media3.common.C.AUDIO_CONTENT_TYPE_MUSIC)
                        .setUsage(androidx.media3.common.C.USAGE_MEDIA)
                        .build(),
                    false // Don't handle audio focus - let MediaSession handle it for Android Auto compatibility
                )

                // Prepare for streaming
                playWhenReady = false
            }

        isInitialized = true
    }

    private fun requestAudioFocus(): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val audioAttributes = AudioAttributes.Builder()
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .build()

            audioFocusRequest = AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                .setAudioAttributes(audioAttributes)
                .setWillPauseWhenDucked(false)
                .setOnAudioFocusChangeListener { }
                .build()

            audioManager?.requestAudioFocus(audioFocusRequest!!) == AudioManager.AUDIOFOCUS_REQUEST_GRANTED
        } else {
            @Suppress("DEPRECATION")
            audioManager?.requestAudioFocus(
                { },
                AudioManager.STREAM_MUSIC,
                AudioManager.AUDIOFOCUS_GAIN
            ) == AudioManager.AUDIOFOCUS_REQUEST_GRANTED
        }
    }

    private fun releaseAudioFocus() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            audioFocusRequest?.let {
                audioManager?.abandonAudioFocusRequest(it)
            }
        } else {
            @Suppress("DEPRECATION")
            audioManager?.abandonAudioFocus { }
        }
    }

    fun setStreamUrl(url: String) {
        streamUrl = url

        // Ensure player operations run on main thread
        mainHandler.post {
            // Create media source for HLS stream
            val dataSourceFactory = DefaultHttpDataSource.Factory()
                .setAllowCrossProtocolRedirects(true)
                .setConnectTimeoutMs(10000)
                .setReadTimeoutMs(10000)

            val mediaSource = ProgressiveMediaSource.Factory(dataSourceFactory)
                .createMediaSource(MediaItem.fromUri(Uri.parse(url)))

            player?.apply {
                setMediaSource(mediaSource)
                prepare()
            }
        }
    }

    fun play() {
        mainHandler.post {
            if (!isInitialized) {
                initializePlayer()
            }

            if (streamUrl == null) {
                onError?.invoke("No stream URL set")
                return@post
            }

            // Check if paused for too long - reinitialize to get live edge
            val pauseDuration = pauseTimestamp?.let { System.currentTimeMillis() - it }
            if (pauseDuration != null && pauseDuration > PAUSE_THRESHOLD_MS) {
                android.util.Log.d("NativeAudioPlayer", "Paused for ${pauseDuration / 1000}s (> ${PAUSE_THRESHOLD_MS / 1000}s) - reinitializing player to seek to live edge")

                // Release old player
                player?.release()
                isInitialized = false

                // Reinitialize to force reconnection to live stream
                initializePlayer()
                streamUrl?.let { setStreamUrl(it) }
            }

            // Clear pause timestamp
            pauseTimestamp = null

            // Request audio focus before playing
            if (requestAudioFocus()) {
                player?.play()
            } else {
                onError?.invoke("Failed to gain audio focus")
            }
        }
    }

    fun pause() {
        mainHandler.post {
            player?.pause()
            pauseTimestamp = System.currentTimeMillis()
            android.util.Log.d("NativeAudioPlayer", "Paused at timestamp: $pauseTimestamp")
        }
    }

    fun stop() {
        mainHandler.post {
            player?.stop()
            releaseAudioFocus()
        }
    }

    fun isPlaying(): Boolean {
        return player?.isPlaying == true
    }

    fun release() {
        releaseAudioFocus()
        if (wakeLock?.isHeld == true) {
            wakeLock?.release()
        }
        player?.release()
        player = null
        isInitialized = false
    }
}

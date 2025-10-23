package org.chirpradio.app

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.net.Uri
import android.os.Build
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

    // Callbacks
    var onPlaybackStateChanged: ((isPlaying: Boolean, isBuffering: Boolean) -> Unit)? = null
    var onError: ((error: String) -> Unit)? = null

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
                        when (playbackState) {
                            Player.STATE_BUFFERING -> {
                                onPlaybackStateChanged?.invoke(false, true)
                            }
                            Player.STATE_READY -> {
                                onPlaybackStateChanged?.invoke(player?.isPlaying == true, false)
                            }
                            Player.STATE_ENDED -> {
                                onPlaybackStateChanged?.invoke(false, false)
                                releaseAudioFocus()
                            }
                            Player.STATE_IDLE -> {
                                onPlaybackStateChanged?.invoke(false, false)
                            }
                        }
                    }

                    override fun onIsPlayingChanged(isPlaying: Boolean) {
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
                    true // Handle audio focus automatically
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

    fun play() {
        if (!isInitialized) {
            initializePlayer()
        }

        if (streamUrl == null) {
            onError?.invoke("No stream URL set")
            return
        }

        // Request audio focus before playing
        if (requestAudioFocus()) {
            player?.play()
        } else {
            onError?.invoke("Failed to gain audio focus")
        }
    }

    fun pause() {
        player?.pause()
    }

    fun stop() {
        player?.stop()
        releaseAudioFocus()
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

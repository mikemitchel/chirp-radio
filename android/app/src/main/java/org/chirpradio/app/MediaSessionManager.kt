package org.chirpradio.app

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.support.v4.media.MediaMetadataCompat
import android.support.v4.media.session.MediaSessionCompat
import android.support.v4.media.session.PlaybackStateCompat
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.net.URL

/**
 * Manages MediaSession for Android Auto and media controls
 * Bridges web audio player to native Android media session
 */
class MediaSessionManager(private val context: Context) {

    private var mediaSession: MediaSessionCompat? = null
    private var callback: MediaSessionCallback? = null

    // Current state
    var currentTitle: String = ""
        private set
    var currentArtist: String = ""
        private set
    var currentAlbumArtUrl: String? = null
        private set
    var currentDj: String = ""
        private set
    var isPlaying: Boolean = false
        private set

    interface MediaSessionCallback {
        fun onPlay()
        fun onPause()
        fun onStop()
    }

    fun initialize(sessionCallback: MediaSessionCallback) {
        this.callback = sessionCallback

        // Create media session
        mediaSession = MediaSessionCompat(context, "ChirpRadioSession").apply {
            // Set capabilities
            setFlags(
                MediaSessionCompat.FLAG_HANDLES_MEDIA_BUTTONS or
                MediaSessionCompat.FLAG_HANDLES_TRANSPORT_CONTROLS
            )

            // Set callback for media button events
            setCallback(object : MediaSessionCompat.Callback() {
                override fun onPlay() {
                    callback?.onPlay()
                }

                override fun onPause() {
                    callback?.onPause()
                }

                override fun onStop() {
                    callback?.onStop()
                }

                override fun onSkipToNext() {
                    // Live stream - no skip
                }

                override fun onSkipToPrevious() {
                    // Live stream - no skip
                }
            })

            // Set initial metadata so lock screen knows this is a media app
            val initialMetadata = MediaMetadataCompat.Builder()
                .putString(MediaMetadataCompat.METADATA_KEY_TITLE, "CHIRP Radio")
                .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, "107.1 FM Chicago")
                .putString(MediaMetadataCompat.METADATA_KEY_ALBUM, "Independent Music")
                .putLong(MediaMetadataCompat.METADATA_KEY_DURATION, -1) // Live stream
                .build()
            setMetadata(initialMetadata)

            // Set initial playback state
            setPlaybackState(buildPlaybackState(PlaybackStateCompat.STATE_PAUSED))

            // Activate session
            isActive = true
        }
    }

    fun updateNowPlaying(title: String, artist: String, albumArtUrl: String?, dj: String) {
        currentTitle = title
        currentArtist = artist
        currentAlbumArtUrl = albumArtUrl
        currentDj = dj

        // Build base metadata
        val metadataBuilder = MediaMetadataCompat.Builder()
            .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title)
            .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, artist)
            .putString(MediaMetadataCompat.METADATA_KEY_ALBUM, "DJ: $dj")
            .putLong(MediaMetadataCompat.METADATA_KEY_DURATION, -1) // Live stream

        // Set metadata immediately without album art
        mediaSession?.setMetadata(metadataBuilder.build())

        // Load album art asynchronously with retry
        albumArtUrl?.let { url ->
            if (url.isNotEmpty()) {
                CoroutineScope(Dispatchers.IO).launch {
                    val bitmap = loadAlbumArtWithRetry(url, maxRetries = 3)
                    bitmap?.let {
                        withContext(Dispatchers.Main) {
                            // Update metadata with album art
                            val updatedMetadata = MediaMetadataCompat.Builder()
                                .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title)
                                .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, artist)
                                .putString(MediaMetadataCompat.METADATA_KEY_ALBUM, "DJ: $dj")
                                .putLong(MediaMetadataCompat.METADATA_KEY_DURATION, -1)
                                .putBitmap(MediaMetadataCompat.METADATA_KEY_ALBUM_ART, it)
                                .build()
                            mediaSession?.setMetadata(updatedMetadata)
                        }
                    }
                }
            }
        }
    }

    fun updatePlaybackState(playing: Boolean) {
        isPlaying = playing
        val state = if (playing) {
            PlaybackStateCompat.STATE_PLAYING
        } else {
            PlaybackStateCompat.STATE_PAUSED
        }
        mediaSession?.setPlaybackState(buildPlaybackState(state))
    }

    private fun buildPlaybackState(state: Int): PlaybackStateCompat {
        val actions = PlaybackStateCompat.ACTION_PLAY_PAUSE or
                PlaybackStateCompat.ACTION_PLAY or
                PlaybackStateCompat.ACTION_PAUSE or
                PlaybackStateCompat.ACTION_STOP

        return PlaybackStateCompat.Builder()
            .setState(state, PlaybackStateCompat.PLAYBACK_POSITION_UNKNOWN, 1.0f)
            .setActions(actions)
            .build()
    }

    private suspend fun loadAlbumArt(urlString: String): Bitmap? = withContext(Dispatchers.IO) {
        try {
            val url = URL(urlString)
            val connection = url.openConnection()
            connection.connectTimeout = 10000 // 10 second timeout
            connection.readTimeout = 10000
            BitmapFactory.decodeStream(connection.getInputStream())
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    private suspend fun loadAlbumArtWithRetry(urlString: String, maxRetries: Int): Bitmap? {
        repeat(maxRetries) { attempt ->
            val bitmap = loadAlbumArt(urlString)
            if (bitmap != null) {
                return bitmap
            }
            // Wait before retry (exponential backoff)
            if (attempt < maxRetries - 1) {
                kotlinx.coroutines.delay(500L * (attempt + 1))
            }
        }
        return null
    }

    fun getMediaSessionToken() = mediaSession?.sessionToken

    fun release() {
        mediaSession?.apply {
            isActive = false
            release()
        }
        mediaSession = null
    }
}

package org.chirpradio.app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.support.v4.media.MediaBrowserCompat
import android.support.v4.media.MediaDescriptionCompat
import android.support.v4.media.session.MediaSessionCompat
import androidx.core.app.NotificationCompat
import androidx.media.MediaBrowserServiceCompat
import androidx.media.session.MediaButtonReceiver

/**
 * MediaBrowserService for Android Auto integration
 * This service allows Android Auto to discover and control the CHIRP Radio stream
 */
class ChirpMediaService : MediaBrowserServiceCompat(), MediaSessionManager.MediaSessionCallback {

    private lateinit var mediaSessionManager: MediaSessionManager
    private var isForeground = false

    companion object {
        private const val MEDIA_ROOT_ID = "chirp_radio_root"
        private const val LIVE_STREAM_ID = "chirp_live_stream"
        private const val NOTIFICATION_ID = 1
        private const val CHANNEL_ID = "chirp_playback_channel"

        // Static reference for plugin communication
        var instance: ChirpMediaService? = null

        // Callbacks to web layer
        var onPlayCommand: (() -> Unit)? = null
        var onPauseCommand: (() -> Unit)? = null
    }

    override fun onCreate() {
        super.onCreate()
        instance = this

        // Initialize media session manager
        mediaSessionManager = MediaSessionManager(this).apply {
            initialize(this@ChirpMediaService)
        }

        // Set session token for MediaBrowserService
        sessionToken = mediaSessionManager.getMediaSessionToken()

        createNotificationChannel()
    }

    override fun onDestroy() {
        super.onDestroy()
        mediaSessionManager.release()
        instance = null
        onPlayCommand = null
        onPauseCommand = null
    }

    // MediaSessionCallback implementation
    override fun onPlay() {
        onPlayCommand?.invoke()
        mediaSessionManager.updatePlaybackState(true)
        showNotification()
    }

    override fun onPause() {
        onPauseCommand?.invoke()
        mediaSessionManager.updatePlaybackState(false)
        showNotification()
    }

    override fun onStop() {
        onPauseCommand?.invoke()
        mediaSessionManager.updatePlaybackState(false)
        stopForeground(true)
        isForeground = false
    }

    // MediaBrowserService implementation
    override fun onGetRoot(
        clientPackageName: String,
        clientUid: Int,
        rootHints: Bundle?
    ): BrowserRoot {
        // Return the root for browsing
        return BrowserRoot(MEDIA_ROOT_ID, null)
    }

    override fun onLoadChildren(
        parentId: String,
        result: Result<MutableList<MediaBrowserCompat.MediaItem>>
    ) {
        val mediaItems = mutableListOf<MediaBrowserCompat.MediaItem>()

        when (parentId) {
            MEDIA_ROOT_ID -> {
                // Add the live stream as a playable item
                val description = MediaDescriptionCompat.Builder()
                    .setMediaId(LIVE_STREAM_ID)
                    .setTitle("CHIRP Radio - Live Stream")
                    .setSubtitle("Chicago Independent Radio Project")
                    .setDescription("107.1 FM Chicago - Independent Music")
                    .build()

                mediaItems.add(
                    MediaBrowserCompat.MediaItem(
                        description,
                        MediaBrowserCompat.MediaItem.FLAG_PLAYABLE
                    )
                )
            }
        }

        result.sendResult(mediaItems)
    }

    // Public methods for plugin to call
    fun updateNowPlaying(title: String, artist: String, albumArtUrl: String?, dj: String) {
        mediaSessionManager.updateNowPlaying(title, artist, albumArtUrl, dj)
        if (isForeground) {
            showNotification()
        }
    }

    fun updatePlaybackState(isPlaying: Boolean) {
        mediaSessionManager.updatePlaybackState(isPlaying)
        if (isPlaying && !isForeground) {
            showNotification()
        } else if (!isPlaying && isForeground) {
            // Keep notification but update play/pause button
            showNotification()
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "CHIRP Radio Playback",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Media playback controls for CHIRP Radio"
                setShowBadge(false)
                lockscreenVisibility = Notification.VISIBILITY_PUBLIC
            }

            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun showNotification() {
        val mediaSession = mediaSessionManager.getMediaSessionToken()
        val controller = mediaSession?.let { MediaSessionCompat.Token.fromToken(it) }

        // Intent to open app
        val intent = packageManager.getLaunchIntentForPackage(packageName)?.apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
        }
        val contentIntent = PendingIntent.getActivity(
            this,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        // Build notification
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(mediaSessionManager.currentTitle.ifEmpty { "CHIRP Radio" })
            .setContentText(mediaSessionManager.currentArtist.ifEmpty { "107.1 FM Chicago" })
            .setSubText("DJ: ${mediaSessionManager.currentDj}")
            .setSmallIcon(R.drawable.ic_notification) // You'll need to add this icon
            .setContentIntent(contentIntent)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setOnlyAlertOnce(true)
            .setShowWhen(false)
            .apply {
                // Add play/pause action
                if (mediaSessionManager.isPlaying) {
                    addAction(
                        NotificationCompat.Action(
                            R.drawable.ic_pause, // You'll need to add this icon
                            "Pause",
                            MediaButtonReceiver.buildMediaButtonPendingIntent(
                                this@ChirpMediaService,
                                PlaybackStateCompat.ACTION_PAUSE
                            )
                        )
                    )
                } else {
                    addAction(
                        NotificationCompat.Action(
                            R.drawable.ic_play, // You'll need to add this icon
                            "Play",
                            MediaButtonReceiver.buildMediaButtonPendingIntent(
                                this@ChirpMediaService,
                                PlaybackStateCompat.ACTION_PLAY
                            )
                        )
                    )
                }

                // Set style for media
                setStyle(
                    androidx.media.app.NotificationCompat.MediaStyle()
                        .setMediaSession(mediaSession)
                        .setShowActionsInCompactView(0)
                        .setShowCancelButton(true)
                        .setCancelButtonIntent(
                            MediaButtonReceiver.buildMediaButtonPendingIntent(
                                this@ChirpMediaService,
                                PlaybackStateCompat.ACTION_STOP
                            )
                        )
                )
            }
            .build()

        startForeground(NOTIFICATION_ID, notification)
        isForeground = true
    }
}

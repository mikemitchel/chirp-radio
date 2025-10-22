#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(NowPlayingPlugin, "NowPlayingPlugin",
    CAP_PLUGIN_METHOD(updateNowPlaying, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(setPlaybackState, CAPPluginReturnPromise);
)

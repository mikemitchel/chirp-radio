#import <Foundation/Foundation.h>

#if __has_attribute(swift_private)
#define AC_SWIFT_PRIVATE __attribute__((swift_private))
#else
#define AC_SWIFT_PRIVATE
#endif

/// The resource bundle ID.
static NSString * const ACBundleID AC_SWIFT_PRIVATE = @"org.chirpradio.app";

/// The "LaunchBackgroundColor" asset catalog color resource.
static NSString * const ACColorNameLaunchBackgroundColor AC_SWIFT_PRIVATE = @"LaunchBackgroundColor";

/// The "Splash" asset catalog image resource.
static NSString * const ACImageNameSplash AC_SWIFT_PRIVATE = @"Splash";

#undef AC_SWIFT_PRIVATE

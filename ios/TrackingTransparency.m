#import "TrackingTransparency.h"
#import <AppTrackingTransparency/AppTrackingTransparency.h>

@interface TrackingTransparency ()
@property (weak) id _observer;
@end

@implementation TrackingTransparency

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getTrackingStatus:(RCTPromiseResolveBlock)resolve rejector:(RCTPromiseRejectBlock)reject)
{
    if (@available(iOS 14, *)) {
        resolve([TrackingTransparency convertTrackingStatusToString:[ATTrackingManager trackingAuthorizationStatus]]);
    } else {
        resolve(@"unavailable");
    }
}

RCT_EXPORT_METHOD(requestTrackingPermission:(RCTPromiseResolveBlock)resolve rejector:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (@available(iOS 14, *)) {
            if (UIApplication.sharedApplication.applicationState == UIApplicationStateActive) {
                [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
                    resolve([TrackingTransparency convertTrackingStatusToString:status]);
                }];
            }
            else {
                __weak TrackingTransparency *weakSelf = self;
                
                self._observer = [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationDidBecomeActiveNotification object:nil queue: [NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
                    
                    [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
                        resolve([TrackingTransparency convertTrackingStatusToString:status]);
                    }];
                    
                    [[NSNotificationCenter defaultCenter] removeObserver:weakSelf._observer];
                }];
            }
        } else {
            resolve(@"unavailable");
        }
    });
}

+ (NSString *) convertTrackingStatusToString:(ATTrackingManagerAuthorizationStatus) status API_AVAILABLE(ios(14)) {
    switch (status) {
        case ATTrackingManagerAuthorizationStatusDenied:
            return @"denied";
        case ATTrackingManagerAuthorizationStatusAuthorized:
            return @"authorized";
        case ATTrackingManagerAuthorizationStatusRestricted:
            return @"restricted";
        case ATTrackingManagerAuthorizationStatusNotDetermined:
            return @"not-determined";
    }
}

@end

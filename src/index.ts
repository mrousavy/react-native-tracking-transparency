import { NativeModules, Platform } from 'react-native';

const TrackingTransparency = NativeModules.TrackingTransparency;

/**
 * The Tracking Authorization Status. See [ATTrackingManager.AuthorizationStatus](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus)
 */
export type TrackingStatus =
  | 'unavailable'
  | 'denied'
  | 'authorized'
  | 'restricted'
  | 'not-determined';

/**
 * Requests permission to track the user. Requires an [`NSUserTrackingUsageDescription`](https://developer.apple.com/documentation/bundleresources/information_property_list/nsusertrackingusagedescription) key in your `Info.plist`. (See [iOS 14 Tracking API](https://developer.apple.com/documentation/apptrackingtransparency))
 *
 * @platform iOS 14
 */
export async function requestTrackingPermission(): Promise<TrackingStatus> {
  if (Platform.OS !== 'ios') return 'unavailable';
  return await TrackingTransparency.requestTrackingPermission();
}

/**
 * Gets the current tracking status. On devices
 *
 * @platform iOS 14
 */
export async function getTrackingStatus(): Promise<TrackingStatus> {
  if (Platform.OS !== 'ios') return 'unavailable';
  return await TrackingTransparency.getTrackingStatus();
}

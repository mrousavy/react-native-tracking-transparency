import { NativeModules, Platform } from 'react-native';

const TrackingTransparency = NativeModules.TrackingTransparency;

export type TrackingStatus =
  | 'unavailable'
  | 'denied'
  | 'authorized'
  | 'restricted'
  | 'not-determined';

/**
 *
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

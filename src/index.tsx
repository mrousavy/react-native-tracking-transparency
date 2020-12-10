import { NativeModules } from 'react-native';

type TrackingTransparencyType = {
  multiply(a: number, b: number): Promise<number>;
};

const { TrackingTransparency } = NativeModules;

export default TrackingTransparency as TrackingTransparencyType;

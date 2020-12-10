import * as React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import {
  getTrackingStatus,
  requestTrackingPermission,
  TrackingStatus,
} from 'react-native-tracking-transparency';

export default function App() {
  const [trackingStatus, setTrackingStatus] = React.useState<
    TrackingStatus | '(loading)'
  >('(loading)');

  React.useEffect(() => {
    getTrackingStatus()
      .then((status) => {
        setTrackingStatus(status);
      })
      .catch((e) => Alert.alert('Error', e?.toString?.() ?? e));
  }, []);
  const request = React.useCallback(async () => {
    try {
      const status = await requestTrackingPermission();
      setTrackingStatus(status);
    } catch (e) {
      Alert.alert('Error', e?.toString?.() ?? e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Tracking Status: {trackingStatus}</Text>
      <Button title="Request Tracking Permission" onPress={request} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

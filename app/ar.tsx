import React from 'react';
import { View, Image, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { ViroARScene, ViroARPlane, ViroBox, ViroTrackingReason, ViroTrackingState, ViroARSceneNavigator } from '@reactvision/react-viro';


async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera for AR experience.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

export default function ARScreen() {

    React.useEffect(() => {
        requestCameraPermission();
    }, []);

    return (
        <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
            autofocus={true}
            initialScene={{ scene: MyARScene }}
            style={{ flex: 1 }}
        />
        </View>
    );
}

const MyARScene = () => {
    const handleTrackingUpdated = (state: ViroTrackingState, reason: ViroTrackingReason) => {
        console.log("Tracking updated:", state, reason);
    };

    return <ViroARScene onTrackingUpdated={handleTrackingUpdated}>
        <ViroARPlane>
            <ViroBox position={[0, .5, 0]} />
        </ViroARPlane>
    </ViroARScene>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fullscreenImage: {
        width: '100%',
        height: '100%',
    },
});


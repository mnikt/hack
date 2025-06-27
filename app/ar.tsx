import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
    ViroARScene,
    ViroARPlane,
    ViroBox,
    ViroTrackingReason,
    ViroTrackingState,
    ViroARSceneNavigator,
    ViroText,
    ViroScene, ViroVRSceneNavigator, Viro3DObject
} from '@reactvision/react-viro';
import {useCameraPermissions} from "expo-camera";


export default function ARScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionTitle}>📸 Potrzebne uprawnienia</Text>
                <Text style={styles.message}>Aby uzyskać dostęp do inteligentnego skanera udziel dostępu do aparatu.</Text>
                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermission}
                >
                    <Text style={styles.permissionButtonText}>Udziel dostęp</Text>
                </TouchableOpacity>
            </View>
        );
    }

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

    return <ViroARScene>
        <Viro3DObject
            resources={[
                require('../assets/models/cat/cat.png'),
                // require('../assets/models/cat/cat.mtl'),
            ]}
            source={require('../assets/models/cat/cat.obj')}

            type="OBJ"
            position={[0.0, 0.0, -1]}
            scale={[0.1, 0.1, 0.1]}
        />
    </ViroARScene>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 24,
        fontSize: 16,
        color: '#666',
    },
    permissionButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 8,
        elevation: 3,
    },
    permissionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    fullscreenImage: {
        width: '100%',
        height: '100%',
    },
});


import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
    ViroARScene,
    ViroARPlane,
    ViroARSceneNavigator,
    ViroText, Viro3DObject, ViroAmbientLight, ViroNode
} from '@reactvision/react-viro';
import {useCameraPermissions} from "expo-camera";
import {getUser} from "@/logic/user";


export default function ARScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionTitle}>📸 Potrzebne uprawnienia</Text>
                <Text style={styles.message}>Aby uzyskać dostęp do funkcjonalości AR udziel dostępu do aparatu.</Text>
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
    const [user, setUser] = useState<string>("");

    useEffect(() => {
        getUser().then(user => setUser(user?.name || ""));
    }, []);

    console.log(user);

    return <ViroARScene dragType={"FixedToPlane"}>
        <ViroAmbientLight color="#FFFFFF"/>
        <ViroARPlane minHeight={0.5} minWidth={0.5} alignment={"Horizontal"}>
            <ViroNode scale={[0.1, 0.1, 0.1]}>
                <Viro3DObject
                    resources={[
                        require('../assets/models/cat/sleeping_cat_0627165553_texture.png'),
                        require('../assets/models/cat/sleeping_cat_0627165553_texture.mtl'),
                    ]}
                    source={require('../assets/models/cat/sleeping_cat_0627165553_texture.obj')}
                    type="OBJ"
                    position={[0, 0, -2]}
                    scale={[0.3, 0.3, 0.3]}
                />
                <ViroText text={user} color={"#16aa11"} position={[0, 0.7, -2]} transformBehaviors={"billboard"} />
                <ViroText text="Poziom 1" color={"#da2121"} position={[0, 0.5, -2]} transformBehaviors={"billboard"} />
            </ViroNode>
        </ViroARPlane>
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


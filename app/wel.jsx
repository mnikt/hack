import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function Wel() {
    const router = useRouter();

    return (
        <ImageBackground
            source={require('../assets/images/elkomelo.png')} // <- ścieżka do twojego tła
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <TouchableOpacity onPress={() => router.push('/GrowieScreen')}>
                    <Text style={styles.linkText}>r</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start', // żeby padding miał wpływ
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: '100%',
        height: '100%',
        paddingTop: 554,  // przesunięcie w dół
        paddingLeft: 51, // przesunięcie w prawo
    },

    linkText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
});


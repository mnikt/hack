
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';



// Ukrycie nagłówka w expo-router
export const screenOptions = {
    headerShown: false,
};

export default function WydarzeniaScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/kalendarzyk.png')}
                style={styles.fullscreenImage}
                resizeMode="cover" // dopasuj obrazek do całej powierzchni
            />
        </View>
    );
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


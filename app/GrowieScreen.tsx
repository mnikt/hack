import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

export default function TwoImagesWithDescriptions() {
    const [showVideo, setShowVideo] = useState(false);

    const handlePlay = () => {
        setShowVideo(true);
    };

    if (showVideo) {
        return (
            <View style={styles.fullScreenVideoWrapper}>
                <WebView
                    style={styles.fullScreenVideo}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsFullscreenVideo={true}
                    source={{
                        uri: 'https://www.youtube.com/embed/hAtE0bYrlaM?controls=0&modestbranding=1&rel=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=hAtE0bYrlaM'
                    }}
                />
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            {/* Rząd 1 */}
            <View style={styles.row}>
                <View style={styles.imageBox}>
                    <Image
                        source={require('../assets/images/bialykot.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.textBox}>UPLOAD</Text>
                </View>
            </View>

            {/* Rząd 2 */}
            <View style={styles.row}>
                <View style={styles.imageBox}>
                    <Image
                        source={require('../assets/images/bialykotanime.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.textBox}>YOUR GROWIE</Text>
                </View>
            </View>

            {/* Przycisk odtwarzania */}
            <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
                <Text style={styles.playText}>▶ MEET YOUR GROWIE</Text>
            </TouchableOpacity>

            {/* Podpis */}
            {/*<Text style={styles.footerBox}></Text>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    imageBox: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textWrapper: {
        marginLeft: 24,
        justifyContent: 'center',
    },
    textBox: {
        borderWidth: 2,
        borderColor: '#000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        fontSize: 16,
        fontWeight: 'bold',
    },
    playButton: {
        marginVertical: 20,
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 6,
        alignSelf: 'center',
    },
    playText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerBox: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
    },
    fullScreenVideoWrapper: {
        flex: 1,
        backgroundColor: '#000',
    },
    fullScreenVideo: {
        width: width,
        height: height,
    },
});

import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Canvas, useImage, Image} from "@shopify/react-native-skia";

const canvasWidth = Dimensions.get('window').width - 32;
const canvasHeight = canvasWidth / 2;

const GrowieCanvas = () => {
    const bgImage = useImage(require("../assets/images/tlo.png"));

    return (
        <View style={styles.container}>
            <Canvas style={styles.canvas}>
                <Image
                    image={bgImage}
                    fit="fitWidth"
                    x={0}
                    y={0}
                    width={canvasWidth}
                    height={canvasHeight}
                />
            </Canvas>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: canvasWidth,
        height: canvasHeight
    },
    canvas: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export default GrowieCanvas;

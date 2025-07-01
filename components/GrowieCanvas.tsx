import React, {useMemo} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Canvas, useImage, Image, Paragraph, Skia, TextAlign, useFonts} from "@shopify/react-native-skia";

const canvasWidth = Dimensions.get('window').width - 32;
const canvasHeight = canvasWidth / 2;

const GrowieCanvas = (props: {text?: string}) => {
    const bgImage = useImage(require("../assets/images/tlo.png"));
    const growieImage = useImage(require("../assets/images/growie_standing.png"));
    const bubbleImage = useImage(require("../assets/images/bubble.png"));

    const fontMgr = useFonts({
        VarelaRound: [
            require("../assets/fonts/VarelaRound-Regular.ttf"),
        ],
    });

    const paragraph = useMemo(() => {
        if (!fontMgr || !props.text) {
            return null;
        }
        const paragraphStyle = {
            textAlign: TextAlign.Center
        };
        const textStyle = {
            color: Skia.Color("black"),
            fontFamilies: ["VarelaRound"],
            fontSize: 21,
        };
        return Skia.ParagraphBuilder.Make(paragraphStyle, fontMgr)
            .pushStyle(textStyle)
            .addText(props.text)
            .pop()
            .build();
    }, [fontMgr]);

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
                <Image
                    image={growieImage}
                    fit="contain"
                    x={canvasWidth * 0.6}
                    y={canvasHeight * 0.15}
                    width={canvasWidth * 0.4}
                    height={canvasWidth * 0.4}
                />
                {fontMgr && props.text && (
                    <>
                        <Image
                            image={bubbleImage}
                            fit="fill"
                            x={canvasWidth * 0.05}
                            y={canvasHeight * 0.1}
                            width={canvasWidth * 0.6}
                            height={canvasHeight * 0.8}
                        />
                        <Paragraph
                            paragraph={paragraph}
                            x={canvasWidth * 0.07}
                            y={canvasHeight * 0.5 - (paragraph?.getHeight() || 0) / 2}
                            width={canvasWidth * 0.5}
                        />
                    </>
                )}
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

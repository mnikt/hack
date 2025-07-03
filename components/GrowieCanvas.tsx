import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Canvas, useImage, Image, Paragraph, Skia, TextAlign, useFonts} from "@shopify/react-native-skia";
import GrowieCommunicatesManager from "@/logic/GrowieCommunicatesManager";

const canvasWidth = Dimensions.get('window').width - 32;
const canvasHeight = canvasWidth / 2;

const GrowieCanvas = () => {
    const bgImage = useImage(require("../assets/images/tlo.png"));
    const growieImage = useImage(require("../assets/images/growie_standing.png"));
    const bubbleImage = useImage(require("../assets/images/bubble.png"));
    const buildingImage = useImage(require("../assets/images/building.png"));
    const [text, setText] = React.useState<string | undefined>();

    useEffect(() => {
        GrowieCommunicatesManager.getInstance().subscribe(setText);
    }, []);

    const fontMgr = useFonts({
        VarelaRound: [
            require("../assets/fonts/VarelaRound-Regular.ttf"),
        ],
    });

    const paragraph = (!fontMgr || !text) ? null :
        Skia.ParagraphBuilder.Make({
            textAlign: TextAlign.Center
        }, fontMgr)
            .pushStyle({
                color: Skia.Color("black"),
                fontFamilies: ["VarelaRound"],
                fontSize: 21,
            })
            .addText(text)
            .pop()
            .build();

    paragraph?.layout(canvasWidth * 0.5);

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
                <Image
                    image={buildingImage}
                    fit="contain"
                    x={0}
                    y={0}
                    width={canvasHeight}
                    height={canvasHeight}
                />
                {fontMgr && text && (
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
                            x={canvasWidth * 0.069}
                            y={canvasHeight * 0.5 - (paragraph?.getHeight() || canvasHeight * 0.65) / 2}
                            width={canvasWidth * 0.48}
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

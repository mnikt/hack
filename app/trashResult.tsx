import { StyleSheet, Text, View, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function TrashResultScreen(props: {text: string, imageUri: string}): JSX.Element {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width, height }]}> 
      <Image 
        source={{ uri: props.imageUri as string }}
        style={[styles.backgroundImage, { width, height }]} 
      />
      <Text style={styles.centeredText}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  centeredText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
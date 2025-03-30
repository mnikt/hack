import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import SvgUri from 'react-native-svg-uri';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

<View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>2</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>3</Text>
        </View>
        <View style={styles.cell}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/trash')}>
          <Image resizeMode="contain" style={styles.image} source={require('../assets/images/kafelek1.png')}></Image>
        </TouchableOpacity>
      </View>
      </View>

      <Text>Home Page</Text>
      <Button title="Go to AR" onPress={() => router.push('/ar')} />
      <Button title="Go to Trash shieeeet" onPress={() => router.push('/trash')} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cell: {
    width: 140,
    height: 140,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    flex: 1
  }
});
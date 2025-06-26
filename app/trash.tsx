import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import TrashResultScreen from './trashResult';

export default function TrashScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [result, setResult] = useState<string>("");
    const [imageUri, setImageUri] = useState<string>("");

    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    const takePhoto = async () => {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync({quality: 0.2});
          setImageUri(photo?.uri as string);

          const formData = new FormData();
          
          if (photo){
            const base64 = await FileSystem.readAsStringAsync(photo?.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            
            formData.append('photo', base64);

            try{
              fetch('http://10.9.0.174:8000/scaner/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: formData,
              }).then(response => response.json()).then(data => showResult(data.data)).catch(e => console.error(e));
          } catch (e) {console.error(e)}
        }
      }
    };

    const showResult = (data: string) => {
        setResult(data);
        setTimeout(() => {
            setImageUri("");
        }, 5000);
    }
  
    return (
      <View style={styles.container}>
        { imageUri ? <TrashResultScreen text={result} imageUri={imageUri} /> :
        <CameraView style={styles.camera} facing={'back'} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.text}>Sprawdź materiał</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
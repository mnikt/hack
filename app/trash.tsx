import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
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
      return (

          <View style={styles.permissionContainer}>
              <Text style={styles.permissionTitle}>📸 Potrzebne uprawnienia</Text>
              <Text style={styles.message}>Aby uzyskać dostęp do inteligentnego skanera udziel dostępu do aparatu.</Text>
              <TouchableOpacity
                  style={styles.permissionButton}
                  onPress={requestPermission}
              >
                  <Text style={styles.permissionButtonText}>Udziel dostęp</Text>
              </TouchableOpacity>
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
              fetch('http://20.86.144.2:8000/scaner/', {
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
        data = data.replaceAll(".", "").trim();
        if (data.split(" ").length === 1) {
            setResult(data);
        } else {
            setResult("Brak rekomendacji");
        }
        setTimeout(() => {
            setImageUri("");
            setResult("");
        }, 3000);
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
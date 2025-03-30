import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';
// import serviceAccountKey from '../magnetic-guild-437016-c0-b9ec372486a0.json';
// import { GoogleAuth } from 'google-auth-library';

// const getAccessToken = async (): Promise<string | null> => {
//     const auth = new GoogleAuth({
//         credentials: serviceAccountKey,
//         scopes: ['https://www.googleapis.com/auth/cloud-platform'],
//     });

//     const client = await auth.getClient();
//     const token = await client.getAccessToken();
//     console.log(token);
//     return token.token || null;
// };

export default function TrashResultScreen() {
    const { photoUri } = useLocalSearchParams<{ photoUri?: string }>();
    const [result, setResult] = useState<string>("");

    useEffect(() => {
        if (!photoUri) return;
        const base64String = FileSystem.readAsStringAsync(photoUri, {
            encoding: FileSystem.EncodingType.Base64,
          });

        sendToVertexAI(base64String);

    }, [photoUri]);
      
    if (!photoUri) {
      return <View><Text>No image found</Text></View>;
    }

    const sendToVertexAI = async (encoded: Promise<string>) => {
        const apiUrl = 'https://europe-central2-aiplatform.googleapis.com/v1/projects/magnetic-guild-437016-c0/locations/europe-central2/endpoints/';

        const body = JSON.stringify({
            instances: [
            {
                // content: await encoded
                prompt: "Co jest na zdjęciu?"
            },
            ],
        });
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${"AAAA"}`,
            },
            body,
        });
        console.log(await response.text());
        setResult(response.statusText);

        
        // const result = await response.json();
        // setResult(result);
    };
  
    return (
      <View style={styles.container}>
        <Text>{result}</Text>
        <Image source={{ uri: photoUri as string }} style={styles.image} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: '80%', resizeMode: 'contain' },
  });
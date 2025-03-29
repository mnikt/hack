import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';

export default function TrashResultScreen() {
    const { photoUri } = useLocalSearchParams<{ photoUri?: string }>();

    const uploadPhotoToStorage = async (uri: string) => {
        const base64String = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        // Now, base64String is ready to send to Google Cloud Storage
        console.log('Base64 String: ', base64String);
        // You can now upload this base64 string to your Google Cloud Storage or send it to Vertex AI
      };
      
    if (!photoUri) {
      return <View><Text>No image found</Text></View>;
    }
  
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri as string }} style={styles.image} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: '80%', resizeMode: 'contain' },
  });
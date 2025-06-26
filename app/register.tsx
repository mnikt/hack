import {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import {useRouter} from 'expo-router';
import {setUser} from "@/logic/user";

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleCreateUser = () => {
        fetch('http://10.9.0.174:8000/gamification/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name})
        }).then(response => response.json()).then(data => {
            setUser(data.name, data.id).then(() => router.push("/"));
        })
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/growie_logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Witaj w GlobalworthApp+</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz swoje imię"
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
                <Text style={styles.buttonText}>Dołącz</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
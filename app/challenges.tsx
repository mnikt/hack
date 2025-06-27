import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import {getUser} from "@/logic/user";

interface Challenge {
    id: string;
    name: string;
    description: string;
    image: string;
    start_date: string;
    end_date: string;
    type: string;
    period: string;
    points: number;
}

export default function ChallengesPage() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        const user = await getUser();
        if (!user?.id) {
            setError('User not authenticated');
            setLoading(false);
            return;
        }
        await fetch(`http://20.86.144.2:8000/gamification/challenges/api`, {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': user.id.toString()
            }}
        ).then(response => response.json()).then(data => {
            setChallenges(data);
        }).catch(error => setError(error.message)).finally(() => setLoading(false));
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Wyzwania</Text>
            <FlatList
                data={challenges}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => router.push(`/challenge?id=${item.id}`)}>
                        <View style={styles.challengeItem}>
                            <Image
                                source={{uri: item.image}}
                                style={styles.challengeImage}
                            />
                            <Text style={styles.challengeTitle}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    challengeItem: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    challengeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    challengeDescription: {
        marginTop: 8,
        color: '#666',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    challengeImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
});
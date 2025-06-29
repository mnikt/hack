import React, {useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import useFetch from "@/logic/useFetch";

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
    user_challenge: {
        completed: boolean;
        joined: boolean;
    }
}

export default function ChallengesPage() {
    const [challenges, loading, error, fetch] = useFetch<Challenge[]>({ initLoading: true });
    const router = useRouter();

    useEffect(() => {
        fetch("gamification/challenges/api");
    }, []);

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
                            <View style={styles.statusContainer}>
                                {item.user_challenge.joined && (
                                    <Text style={styles.statusText}>Dołączono</Text>
                                )}
                                {item.user_challenge.completed && (
                                    <Text style={[styles.statusText, styles.completedText]}>Ukończono</Text>
                                )}
                            </View>
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
    statusContainer: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 8,
    },
    statusText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    completedText: {
        color: '#2196F3',
    },
});
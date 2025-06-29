import {StyleSheet, TouchableOpacity, View, Text, ActivityIndicator} from "react-native";
import {useRouter} from "expo-router";
import React, {useCallback} from "react";
import {useFocusEffect} from "expo-router";
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

export default function ActiveChallenges() {
    const router = useRouter();
    const [challenges, loading, error, fetch] = useFetch<Challenge[]>({ initLoading: true });

    useFocusEffect(
        useCallback(() => {
            fetch('gamification/challenges/api');
        }, [])
    );

    if (loading) {
        return (
            <TouchableOpacity style={styles.tile} onPress={() => router.push('/challenges')}>
                <ActivityIndicator size="small" color="#ffffff"/>
            </TouchableOpacity>
        );
    }

    if (error) {
        return (
            <TouchableOpacity style={styles.tile} onPress={() => router.push('/challenges')}>
                <Text style={styles.errorText}>Error loading challenges</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.tile} onPress={() => router.push('/challenges')}>
            <Text style={styles.title}>Aktywne wyzwania: {challenges?.length}</Text>
            {challenges?.map((challenge) => (
                <View key={challenge.id} style={styles.challengeItem}>
                    <TouchableOpacity onPress={() => router.push(`/challenge?id=${challenge.id}`)}>
                        <Text style={styles.challengeName}>{challenge.name}</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, {width: '2%'}]}/>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    tile: {
        backgroundColor: "#4CAF50",
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    challengeItem: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        marginBottom: 8,
    },
    challengeName: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    progress: {
        color: '#ffffff',
        fontSize: 12,
    },
    progressBar: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 2,
    },
    errorText: {
        color: '#ffffff',
        fontSize: 14,
    }
});
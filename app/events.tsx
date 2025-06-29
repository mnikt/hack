import React, {useCallback} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useFocusEffect, useRouter} from 'expo-router';
import useFetch from "@/logic/useFetch";


interface Event {
    id: string;
    name: string;
    description: string;
    image: string;
    date: string;
    limit: number;
    user_joined: boolean;
    joined_number: number;
}

export default function EventsScreen() {
    const [events, loading, error, fetch] = useFetch<Event[]>({ initLoading: true });
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            fetch('/gamification/events/api');
        }, [])
    );

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
            <Text style={styles.title}>Wydarzenia</Text>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => router.push(`/event?id=${item.id}`)}>
                        <View style={styles.eventItem}>
                            <Image
                                source={{uri: item.image}}
                                style={styles.eventImage}
                            />
                            <Text style={styles.eventTitle}>{item.name}</Text>
                            <View style={styles.eventInfo}>
                                <Text style={styles.eventInfoText}>
                                    Uczestnicy: {item.joined_number}/{item.limit}
                                </Text>
                                <Text style={[styles.eventStatus, item.user_joined && styles.eventJoined]}>
                                    {item.user_joined ? 'Dołączono' : 'Nie dołączono'}
                                </Text>
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
    eventItem: {
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
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    eventImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    eventInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    eventInfoText: {
        fontSize: 14,
        color: '#666',
    },
    eventStatus: {
        fontSize: 14,
        color: '#666',
    },
    eventJoined: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});


import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {getUser} from "@/logic/user";

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

export default function EventPage() {
    const {id} = useLocalSearchParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        const user = await getUser();
        if (!user?.id) {
            setError('User not authenticated');
            setLoading(false);
            return;
        }
        await fetch(`http://20.86.144.2:8000/gamification/events/api/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': user.id.toString()
                }
            }
        ).then(response => response.json()).then(data => {
            setEvent(data);
        }).catch(error => setError(error.message)).finally(() => setLoading(false));
    };

    const handleJoinEvent = async () => {
        const user = await getUser();
        if (!user?.id || !event) return;

        try {
            const response = await fetch(`http://20.86.144.2:8000/gamification/events/api/${event.id}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': user.id.toString()
                }
            });
            if (response.ok) {
                setEvent({...event, user_joined: true, joined_number: event.joined_number + 1});
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    if (error || !event) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error || 'Event not found'}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{uri: event.image}}
                style={styles.eventImage}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{event.name}</Text>
                <Text style={styles.details}>{event.date}</Text>
                <Text style={styles.description}>{event.description}</Text>
                <Text style={styles.participants}>
                    Uczestnicy: {event.joined_number}/{event.limit}
                </Text>
                <TouchableOpacity
                    style={[
                        styles.joinButton,
                        event.user_joined && styles.joinedButton,
                        event.joined_number >= event.limit && styles.fullButton
                    ]}
                    onPress={handleJoinEvent}
                    disabled={event.user_joined || event.joined_number >= event.limit}
                >
                    <Text style={styles.joinButtonText}>
                        {event.user_joined ? 'Dołączono' : event.joined_number >= event.limit ? 'Brak wolnych miejsc' : 'Dołącz do wydarzenia'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    details: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 24,
    },
    participants: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        padding: 16,
    },
    eventImage: {
        width: '100%',
        height: 250,
    },
    joinButton: {
        backgroundColor: '#2196F3',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    joinedButton: {
        backgroundColor: '#4CAF50',
    },
    fullButton: {
        backgroundColor: '#9E9E9E',
    },
    joinButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
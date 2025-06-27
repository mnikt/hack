import React, {useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Modal} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {FontAwesome} from '@expo/vector-icons';
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
    user_challenge: {
        joined: boolean;
        completed: boolean;
        date: string;
    }
}

export default function ChallengePage() {
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const {id} = useLocalSearchParams();

    useEffect(() => {
        fetchChallenge();
    }, [id]);

    const fetchChallenge = async () => {
        const user = await getUser();
        if (!user?.id) {
            setError('User not authenticated');
            setLoading(false);
            return;
        }

        await fetch(`http://20.86.144.2:8000/gamification/challenges/api/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': user.id.toString()
            }}
        ).then(response => response.json()).then(data => {
            setChallenge(data);
        }).catch(error => setError(error.message)).finally(() => setLoading(false));
    };

    const joinChallenge = async (join: boolean) => {
        const user = await getUser();
        if (!user?.id) {
            setError('User not authenticated');
            setLoading(false);
            return;
        }

        if (join && challenge) {
            fetch(`http://20.86.144.2:8000/gamification/challenges/api/${challenge.id}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': user.id.toString()
                }
            }).then(response => {
                if (response.ok) setChallenge({...challenge, user_challenge: { joined: true, completed: false, date: '' }});
            }).catch(error => setError(error.message)).finally(() => setLoading(false));
        }
        setModalVisible(false);
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

    if (!challenge) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Challenge not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{uri: challenge.image}}
                style={styles.challengeImage}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{challenge.name}</Text>
                <Text style={styles.description}>{challenge.description}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>Typ: {challenge.type}</Text>
                    <Text style={styles.detailsText}>Powtarzanie: {challenge.period}</Text>
                    <Text style={styles.detailsText}>Punkty: {challenge.points}</Text>
                    <Text style={styles.detailsText}>Początek: {challenge.start_date}</Text>
                    <Text style={styles.detailsText}>Koniec: {challenge.end_date}</Text>
                </View>
                
                {challenge.user_challenge.joined ?
                    <View
                        style={[styles.joinButton, challenge.user_challenge.completed ? styles.completedButton : styles.joinedButton]}>
                        <FontAwesome name="check-circle" size={20} color="#fff" style={styles.joinedIcon}/>
                        <Text style={styles.joinButtonText}>
                            {challenge.user_challenge.completed ? 'Wyzwanie wykonane' : 'Dołączono do wyzwania'}
                        </Text>
                    </View>
                    :
                <TouchableOpacity style={styles.joinButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.joinButtonText}>Dołącz do wyzwania</Text>
                </TouchableOpacity>
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Terms and Conditions</Text>
                            <ScrollView style={styles.modalScroll}>
                                <Text style={styles.modalText}>
                                    By joining this challenge, you agree to the following terms and conditions:
                                    {'\n\n'}
                                    1. Participation Rules
                                    {'\n'}
                                    2. Point System
                                    {'\n'}
                                    3. Challenge Duration
                                    {'\n'}
                                    4. Completion Requirements
                                </Text>
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.acceptButton}
                                onPress={() => joinChallenge(true)}
                            >
                                <Text style={styles.acceptButtonText}>Accept & Join</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => joinChallenge(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    joinedButton: {
        backgroundColor: '#34C759',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedButton: {
        backgroundColor: '#5856D6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joinedIcon: {
        marginRight: 8,
    },
    content: {
        padding: 16,
    },
    challengeImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
        lineHeight: 24,
    },
    detailsContainer: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
    },
    detailsText: {
        fontSize: 16,
        marginBottom: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    joinButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        marginTop: 24,
        alignItems: 'center',
    },
    joinButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
    },
    modalScroll: {
        marginBottom: 20,
    },
    acceptButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    acceptButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

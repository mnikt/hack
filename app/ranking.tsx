import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {getUser} from "@/logic/user";

interface RankingUser {
    id: string;
    name: string;
    points: number;
}

export default function RankingView() {
    const [users, setUsers] = useState<RankingUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string>('');

    useEffect(() => {
        fetchRanking();
    }, []);

    const fetchRanking = () => {
        getUser().then(user => {
            if (!user?.id) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }
            setCurrentUserId(user.id.toString());

            fetch('http://10.9.0.174:8000/gamification/ranking/api', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': user.id.toString()
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                })
                .catch(error => {
                    setError('Failed to fetch ranking');
                })
                .finally(() => {
                    setLoading(false);
                });
        });
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
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ranking</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                    <View style={[styles.rankingItem, item.id === currentUserId && styles.currentUserItem]}>
                    <Text style={styles.position}>{index + 1}</Text>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.points}>{item.points} pts</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    rankingItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    position: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 40,
    },
    name: {
        fontSize: 16,
        flex: 1,
    },
    points: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    currentUserItem: {
        backgroundColor: '#e6f3ff',
    },
});
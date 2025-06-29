import React, {useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import useFetch from "@/logic/useFetch";

interface PointHistory {
    points: number;
    name: string;
    date: string;
}

interface PointsSummary {
    total: number;
    history: PointHistory[];
}

export default function PointsScreen() {
    const [points, loading, error, fetch] = useFetch<PointsSummary>({ initLoading: true });

    useEffect(() => {
        fetch('gamification/points/api');
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
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.totalPointsContainer}>
                <Text style={styles.totalPointsLabel}>Twoje Punkty</Text>
                <Text style={styles.totalPointsValue}>{points?.total}</Text>
            </View>
            <Text style={styles.historyTitle}>Historia punktów</Text>
            <FlatList
                data={points?.history}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => (
                    <View style={styles.historyItem}>
                        <View style={styles.historyItemHeader}>
                            <Text style={styles.points}>+{item.points}</Text>
                            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
                        </View>
                        <Text style={styles.description}>{item.name}</Text>
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
        backgroundColor: '#f5f5f5',
    },
    totalPointsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    totalPointsLabel: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8,
    },
    totalPointsValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    historyItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    historyItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    points: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    date: {
        color: '#666',
    },
    description: {
        color: '#333',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
    },
});
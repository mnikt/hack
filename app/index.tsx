import React, {useState, useEffect, useCallback} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

import {useFocusEffect, useRouter} from 'expo-router';
import {User, getUser} from "@/logic/user";
import QuizView, { Quiz } from "@/app/quiz";
import ActiveChallenges from "@/components/ActiveChallenges";
import GrowieCanvas from "@/components/GrowieCanvas";

export default function HomeScreen() {
    const router = useRouter();
    const [user, setUser] = useState<User>();
    const [points, setPoints] = useState(0);
    const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);
    const [currentStateTime, setCurrentStateTime] = useState<number | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            if (user === null) router.push("/register");
            else setUser(user);
        };
        fetchUser();
    }, []);

    const refresh = () => {
        setCurrentStateTime(Date.now());
    }

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!user?.id) return;
            try {
                const response = await fetch(`http://20.86.144.2:8000/gamification/quizzes/api`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': user.id.toString()
                    }
                });
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, [user, currentStateTime]);


    useFocusEffect(
        useCallback(() => {
            if (!user) return;
            fetchPoints();
        }, [user, currentStateTime])
    );

    const fetchPoints = () => {
        if (user?.id) {
            fetch(`http://20.86.144.2:8000/gamification/points/api`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': user.id.toString()
                }
            })
            .then(response => response.json())
            .then(data => setPoints(data.total))
            .catch(error => console.error('Error fetching points:', error));
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Górny pasek: Menu, Logo, Punkty */}
            <View style={styles.topBar}>
                {/* Lewa kolumna - hamburger */}
                <View style={styles.leftColumn}>
                    <Text>Trzeba poprawić ten górny element :)</Text>
                </View>

                {/* Środkowa kolumna - wycentrowane logo */}
                <View style={styles.centerColumn}>
                    <Image
                        source={require('../assets/images/growie_logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Prawa kolumna - punkty */}
                <View style={styles.rightColumn}>
                    <Text style={styles.points}>
                        <TouchableOpacity
                          style={styles.customButton}
                          onPress={() => router.push('/points')}
                        >
                        <Text style={styles.customButtonText}>
                              <Text style={styles.customButtonText2}>{points}</Text> punktów
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>

            <GrowieCanvas />

            {/* Sekcja powitalna */}
            <View style={styles.headerSection}>
                <View style={{flex: 1}}>
                    <Text style={styles.mainTitle}>Cześć {user?.name}!</Text>
                    <Text style={styles.subtitle}>Nie ma Cię w biurze</Text>
                    <Text style={styles.smallInfo}>Twój Growie ma drzemkę...</Text>
                </View>
                {/* Ikona kotka */}
                <Image
                    source={require('../assets/images/KOT.png')}
                    style={styles.catImage}
                    resizeMode="contain"
                />
            </View>

            {quizzes && quizzes.map(q => <QuizView quiz={q} key={q.id} refresh={refresh}/>)}

            <View style={styles.tileRow}>
                <TouchableOpacity style={styles.tile} onPress={() => router.push('/ar')}>
                    <Image
                        source={require('../assets/images/kotek.png')}
                        style={styles.tileIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.tileLabel}>Twój Eko-Buddy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tile} onPress={() => router.push('/events')}>
                    <Image
                        source={require('../assets/images/kalendarz.png')}
                        style={styles.tileIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.tileLabel}>Wydarzenia</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tileRow}>
                <TouchableOpacity style={styles.tile} onPress={() => router.push('/challenges')}>
                    <Image
                        source={require('../assets/images/wyzwanie.png')}
                        style={styles.tileIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.tileLabel}>Wyzwania</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tile} onPress={() => router.push('/ranking')}>
                    <Image
                        source={require('../assets/images/ranking.png')}
                        style={styles.tileIcon}
                        resizeMode="contain"
                    />
                    <><Text style={styles.tileLabel}>Ranking</Text></>
                </TouchableOpacity>
            </View>

            <View style={styles.tileRow}>
                <TouchableOpacity style={styles.tile} onPress={() => router.push('/trash')}>
                    <Image
                        source={require('../assets/images/segregacja.png')}
                        style={styles.tileIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.tileLabel}>SmartBin Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tile} onPress={() => router.push('/qrScanner')}>
                    <Image
                        source={require('../assets/images/qr.png')}
                        style={styles.tileIcon}
                        resizeMode="contain"
                    />
                    <><Text style={styles.tileLabel}>Skaner QR</Text></>
                </TouchableOpacity>
            </View>

            <ActiveChallenges />
        </ScrollView>
    );
}

const GREEN = '#4CAF50';
const WHITE = '#FFFFFF';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    contentContainer: {
        padding: 16,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    leftColumn: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16,
    },
    centerColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
   rightColumn: {
     flex: 1,
       alignItems: 'flex-end',
       justifyContent: 'center',
       paddingRight: 30,
   },
    hamburger: {
        fontSize: 24,
        paddingHorizontal: 8,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GREEN,
    },
    points: {
        fontSize: 16,
        color: '#000',
    },
    logoImage: {
        width: 150,
        height: 100,
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 20,
        color: '#333',
        marginTop: 5,
    },
    smallInfo: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    catImage: {
        width: 180,
        height: 100,
        marginLeft: 10,
    },
    challengeBox: {
        backgroundColor: GREEN,
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
    },
    challengeTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: WHITE,
        marginBottom: 3,
    },
    quizQuestion: {
        fontSize: 16,
        color: WHITE,
        marginBottom: 5,
    },
    answerButton: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 22,
        marginVertical:3,
        alignSelf: 'flex-start',  // Kluczowe ustawienie
    },
    answerText: {
        color: '#000',
        fontSize: 14,
        fontWeight: "bold",
    },
    tileRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    tile: {
        backgroundColor: GREEN,
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
    },
    tileIcon: {
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    tileLabel: {
        color: WHITE,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buildingChallenge: {
        backgroundColor: GREEN,
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
    },
    buildingChallengeText: {
        color: WHITE,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    progressBar: {
        width: '100%',
        height: 10,
        backgroundColor: '#bbb',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 5,
    },
    progress: {
        height: '100%',
        backgroundColor: WHITE,
    },
    progressCount: {
        color: WHITE,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    debugTitle: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    customButton: {
        backgroundColor: '#fff',    // białe tło
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
        alignItems: 'stretch',
      },
      customButtonText: {
        color: '#000',              // czarny tekst
        fontSize: 16,
      },
      customButtonText2: {
        color: GREEN,
        fontSize: 22,
        fontWeight: "bold"
      },
});

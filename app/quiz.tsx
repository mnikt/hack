import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {getUser} from "@/logic/user";

export interface Quiz {
    id: string;
    question: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    correct_answer: string;
    points: number;
    answered: boolean;
    correct: boolean;
}

export default function QuizView(props: {quiz: Quiz, refresh: () => void}) {
    const handleAnswer = async (answer: string) => {
        const user = await getUser();
        if (!user?.id) return;

        fetch(`http://10.9.0.174:8000/gamification/quizzes/api/${props.quiz.id}/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': user.id.toString()
            },
            body: JSON.stringify({
                answer: answer
            })
        }).then(response => response.json()).then(data => {
            props.refresh();
        }).catch(error => console.error('Error fetching quiz:', error));
    }

    return (
        <View style={styles.challengeBox}>
            <Text style={styles.challengeTitle}><>Codzienny Growie Quiz</></Text>
            <Text style={styles.quizQuestion}>
                { props.quiz.question }
            </Text>
            { props.quiz.answered ?
                <>
                    <Text style={styles.quizQuestion}>
                      Poprawna odpowiedź:
                    </Text>
                    <Text style={styles.correctAnswerText}>
                        {props.quiz.correct_answer == 'a' && <>A. {props.quiz.answer_a}</>}
                        {props.quiz.correct_answer == 'b' && <>B. {props.quiz.answer_b}</>}
                        {props.quiz.correct_answer == 'c' && <>C. {props.quiz.answer_c}</>}
                    </Text>

                    { props.quiz.correct &&
                        <Text style={styles.pointsText}>
                            Zdobyte punkty: {props.quiz.points}
                        </Text>
                    }
                </> :
                <>
                    <TouchableOpacity style={styles.answerButton} onPress={() => handleAnswer("a")}>
                        <Text style={styles.answerText}>A. {props.quiz.answer_a}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.answerButton} onPress={() => handleAnswer("b")}>
                        <Text style={styles.answerText}>B. {props.quiz.answer_b}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.answerButton} onPress={() => handleAnswer("c")}>
                        <Text style={styles.answerText}>C. {props.quiz.answer_c}</Text>
                    </TouchableOpacity>
                </>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    quizQuestion: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 5,
    },
    pointsText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 10,
    },
    answerButton: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 22,
        marginVertical:3,
        alignSelf: 'flex-start',
    },
    answerText: {
        color: '#000',
        fontSize: 14,
        fontWeight: "bold",
    },
    correctAnswerText: {
        color: '#000',
        fontSize: 16,
        fontWeight: "bold",
    },
    challengeBox: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
    },
    challengeTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: 3,
    },
});
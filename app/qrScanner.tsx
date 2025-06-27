import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BarcodeScanningResult, CameraView, useCameraPermissions} from 'expo-camera';
import {useRouter} from 'expo-router';
import {getUser} from "@/logic/user";

export default function QRScanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [message, setMessage] = useState<string>('');
    const [showTooltip, setShowTooltip] = useState(false);
    const router = useRouter();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionTitle}>📸 Potrzebne uprawnienia</Text>
                <Text style={styles.message}>Aby uzyskać dostęp do skanera QR udziel dostępu do aparatu.</Text>
                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermission}
                >
                    <Text style={styles.permissionButtonText}>Udziel dostęp</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleScanClaimChallenge = async (challengeId: string) => {
        try {
            const user = await getUser();
            if (!user?.id) {
                setMessage("Nie jesteś zalogowany");
                return;
            }

            const response = await fetch(`http://20.86.144.2:8000/gamification/challenges/api/${challengeId}/claim`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': user.id.toString()
                }
            });

            if (response.ok) {
                router.push(`/challenge?id=${challengeId}`);
            } else {
                setMessage("Wystąpił błąd");
            }
        } catch (error) {
            setMessage("Wystąpił błąd podczas odbierania nagrody");
            console.error(error);
        }
        setTimeout(() => setShowTooltip(false), 2000);
    }

    const handleBarcodeScanned = (result: BarcodeScanningResult) => {
        if (showTooltip) return;
        const segments = result.data.split(' ');
        
        if(segments[0] !== "Growie") {
            setMessage("Nieznany kod QR");
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000);
        } else {
            setMessage("Przetwarzanie");
            setShowTooltip(true);
            
            if(segments[1] === "challenge" && segments[3] === "claim") {
                handleScanClaimChallenge(segments[2]);
            }
        }
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={'back'} barcodeScannerSettings={{
                barcodeTypes: ["qr"],
            }} onBarcodeScanned={handleBarcodeScanned}>
                {showTooltip && (
                    <View style={styles.overlay}>
                        <Text style={styles.text}>{message}</Text>
                    </View>
                )}
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 24,
        fontSize: 16,
        color: '#666',
    },
    permissionButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 8,
        elevation: 3,
    },
    permissionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
});
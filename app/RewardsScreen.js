// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     ScrollView,
//     TouchableOpacity,
// } from 'react-native';
//
// // Przykład ekranu "Nagrody"
// export default function RewardsScreen() {
//     return (
//         <ScrollView style={styles.container}>
//             {/* Górny pasek: Logo i punkty */}
//             <View style={styles.topBar}>
//                 {/* Lewa ikona hamburgera */}
//                 <View style={styles.leftColumn}>
//                     <TouchableOpacity onPress={() => { /* tu możesz otwierać menu */ }}>
//                         <Text style={styles.hamburger}>≡</Text>
//                     </TouchableOpacity>
//                 </View>
//
//                 {/* Logo Growie w centrum */}
//                 <View style={styles.centerColumn}>
//                     <Image
//                         source={require('../assets/images/growie_logo.png')}
//                         style={styles.logoImage}
//                         resizeMode="contain"
//                     />
//                 </View>
//
//                 {/* Punkty po prawej */}
//                 <View style={styles.rightColumn}>
//                     <Text style={styles.pointsText}>
//                         Twoje punkty:{' '}
//                         <Text style={{ fontWeight: 'bold', color: '#4CAF50' }}>27</Text>
//                     </Text>
//                 </View>
//             </View>
//
//             {/* Treść poniżej topBar */}
//             <View style={styles.content}>
//                 {/* Tytuł i opis */}
//                 <Text style={styles.mainPointsText}>
//                     Twoje punkty:{' '}
//                     <Text style={{ color: '#4CAF50' }}>27</Text>
//                 </Text>
//                 <Text style={styles.subTitle}>Sprawdź na co możesz je wymienić!</Text>
//
//                 {/* Sekcja 1: Dodatki do Twojego Growie */}
//                 <View style={styles.section}>
//                     <View style={styles.sectionHeader}>
//                         <Text style={styles.sectionHeaderText}>Dodatki do Twojego Growie</Text>
//                     </View>
//
//                     {/* Wiersz kafelków */}
//                     <View style={styles.row}>
//                         {/* 1. Kafelek */}
//                         <View style={styles.card}>
//                             {/* Górna, zielona część z obrazkiem (opcjonalnie) */}
//                             <Image
//                                 source={require('../assets/images/sunglasses_hearts.png')}
//                                 style={styles.cardImage}
//                                 resizeMode="contain"
//                             />
//                             {/* Czerwony pasek na dole */}
//                             <View style={styles.cardFooter}>
//                                 <Text style={styles.cardFooterText}>5 pkt</Text>
//                             </View>
//                         </View>
//
//                         {/* 2. Kafelek */}
//                         <View style={styles.card}>
//                             <Image
//                                 source={require('../assets/images/deal_with_it_glasses.png')}
//                                 style={styles.cardImage}
//                                 resizeMode="contain"
//                             />
//                             <View style={styles.cardFooter}>
//                                 <Text style={styles.cardFooterText}>5 pkt</Text>
//                             </View>
//                         </View>
//
//                         {/* 3. Kafelek */}
//                         <View style={styles.card}>
//                             <Image
//                                 source={require('../assets/images/scarf.png')}
//                                 style={styles.cardImage}
//                                 resizeMode="contain"
//                             />
//                             <View style={styles.cardFooter}>
//                                 <Text style={styles.cardFooterText}>5 pkt</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//
//                 {/* Sekcja 2: Zniżki */}
//                 <View style={styles.section}>
//                     <View style={styles.sectionHeader}>
//                         <Text style={styles.sectionHeaderText}>Zniżki</Text>
//                     </View>
//
//                     <View style={styles.row}>
//                         <View style={styles.card}>
//                             <View style={styles.cardContent}>
//                                 <Text style={styles.discountText}>15% zniżki{'\n'}na katering{'\n'}wewnętrzny</Text>
//                             </View>
//                             <View style={styles.cardFooter}>
//                                 <Text style={styles.cardFooterText}>20 pkt</Text>
//                             </View>
//                         </View>
//
//                         <View style={styles.card}>
//                             <View style={styles.cardContent}>
//                                 <Text style={styles.discountText}>15 zł zniżki{'\n'}na BookBeat</Text>
//                             </View>
//                             <View style={styles.cardFooter}>
//                                 <Text style={styles.cardFooterText}>30 pkt</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//
//                 {/* Sekcja 3: Nagrody */}
//                 <View style={styles.section}>
//                     <View style={styles.sectionHeader}>
//                         <Text style={styles.sectionHeaderText}>Nagrody</Text>
//                     </View>
//
//                     <View style={styles.row}>
//                         <View style={styles.card}>
//                             <View style={styles.cardContent}>
//                                 <Text style={styles.rewardText}>Zestaw{'\n'}eko-gadżetów</Text>
//                             </View>
//                             <View style={styles.cardFooter}>
//                                 <Text style={styles.cardFooterText}>200 pkt</Text>
//                             </View>
//                         </View>
//
//                         <View style={styles.card}>
//                             <View style={styles.cardContent}>
//                                 <Text style={styles.rewardText}>Darmowe{'\n'}warsztaty{'\n'}zero waste</Text>
//                             </View>
//                             <View style={styles.cardFooter}>
//                                 <Text style={styles.cardFooterText}>300 pkt</Text>
//                             </View>
//                         </View>
//
//                         <View style={styles.card}>
//                             <View style={styles.cardContent}>
//                                 <Text style={styles.rewardText}>Spływ{'\n'}kajakowy z{'\n'}innymi{'\n'}Growies</Text>
//                             </View>
//                             <View style={styles.cardFooter}>
//                                 <Text style={styles.cardFooterText}>450 pkt</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//
//             </View>
//         </ScrollView>
//     );
// }
//
// /* Kolory dla wygody */
// const GREEN = '#4CAF50';
// const RED = '#D93333'; // lub inny odcień czerwieni
// const WHITE = '#FFFFFF';
// const BLACK = '#000000';
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: WHITE,
//     },
//     /* Górny pasek */
//     topBar: {
//         flexDirection: 'row',
//         height: 60,
//         alignItems: 'center',
//     },
//     leftColumn: {
//         flex: 1,
//         paddingLeft: 16,
//         justifyContent: 'center',
//     },
//     centerColumn: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     rightColumn: {
//         flex: 1,
//         paddingRight: 16,
//         alignItems: 'flex-end',
//         justifyContent: 'center',
//     },
//     hamburger: {
//         fontSize: 24,
//         color: BLACK,
//     },
//     logoImage: {
//         width: 100,
//         height: 40,
//     },
//     pointsText: {
//         fontSize: 16,
//         color: BLACK,
//     },
//
//     /* Główna zawartość */
//     content: {
//         paddingHorizontal: 16,
//         paddingBottom: 16,
//     },
//     mainPointsText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginTop: 16,
//         color: BLACK,
//     },
//     subTitle: {
//         fontSize: 16,
//         color: '#333',
//         marginBottom: 16,
//     },
//
//     /* Sekcje nagród */
//     section: {
//         marginBottom: 24,
//     },
//     sectionHeader: {
//         backgroundColor: GREEN,
//         borderRadius: 10,
//         padding: 8,
//         marginBottom: 10,
//     },
//     sectionHeaderText: {
//         color: WHITE,
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     row: {
//         flexDirection: 'row',
//         // Jeśli w rzędzie jest mniej/więcej elementów, można użyć "flexWrap: 'wrap'"
//         justifyContent: 'space-between',
//     },
//
//     /* Kafelki */
//     card: {
//         width: 100,
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         marginBottom: 10,
//         backgroundColor: GREEN,
//         marginHorizontal: 4, // odstępy między kartami
//         marginVertical: 4,
//     },
//     cardImage: {
//         width: '100%',
//         height: 70,
//         marginTop: 5,
//     },
//     cardContent: {
//         minHeight: 70,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 5,
//     },
//     discountText: {
//         color: WHITE,
//         fontSize: 14,
//         textAlign: 'center',
//         fontWeight: 'bold',
//     },
//     rewardText: {
//         color: WHITE,
//         fontSize: 14,
//         textAlign: 'center',
//         fontWeight: 'bold',
//     },
//
//     /* Czerwony pasek na dole kafelka */
//     cardFooter: {
//         backgroundColor: RED,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         paddingVertical: 6,
//         alignItems: 'center',
//     },
//     cardFooterText: {
//         color: WHITE,
//         fontWeight: 'bold',
//     },
// });

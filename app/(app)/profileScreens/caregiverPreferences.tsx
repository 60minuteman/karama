// import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
// import React, { useState } from 'react'
// import { ThemedView } from '@/components/ThemedView';
// import ProfileHeader from '@/components/Profile/ProfileHeader';
// import { ThemedText } from '@/components/ThemedText';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import InfoPill from '@/app/components/ui/InfoPill';

// const CaregiverPreferences = () => {
//     const [payType, setPayType] = useState('Hourly');
//     const [payRange, setPayRange] = useState([20, 30]);

//     return (
//         <SafeAreaView>
//             <ThemedView>
//                 <ProfileHeader heading='Preference' />
//                 <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
//                     <View style={styles.container}>
//                         <View style={styles.section}>
//                             <View style={styles.subSection}>
//                                 <ThemedText style={styles.heading}>Pay schedule</ThemedText>
//                                 <View style={styles.payTypeContainer}>
//                                     <TouchableOpacity
//                                         style={[styles.payTypeButton, payType === 'Hourly' && styles.selectedPayType]}
//                                         onPress={() => setPayType('Hourly')}
//                                     >
//                                         <Image
//                                             source={require('@/assets/icons/hourly.png')}
//                                             style={styles.payTypeIcon}
//                                         />
//                                         <ThemedText style={[styles.payTypeText, payType === 'Hourly' && styles.selectedPayTypeText]}>Hourly</ThemedText>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         style={[styles.payTypeButton, payType === 'Salary' && styles.selectedPayType]}
//                                         onPress={() => setPayType('Salary')}
//                                     >
//                                         <Image
//                                             source={require('@/assets/icons/salary.png')}
//                                             style={styles.payTypeIcon}
//                                         />
//                                         <ThemedText style={[styles.payTypeText, payType === 'Salary' && styles.selectedPayTypeText]}>Salary Base</ThemedText>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                             <View style={styles.subSection}>
//                                 <ThemedText style={styles.heading}>Pay rate</ThemedText>
//                                 <View style={styles.pillContainer}>
//                                     <InfoPill icon={'⌛'} label={'$20 - $35 '} />
//                                 </View>
//                                 <View style={styles.sliderContainer}>
//                                     <View style={styles.sliderLabels}>
//                                         <ThemedText>$15</ThemedText>
//                                         <ThemedText>$20</ThemedText>
//                                         <ThemedText>$25</ThemedText>
//                                         <ThemedText>$30</ThemedText>
//                                         <ThemedText>$35</ThemedText>
//                                         <ThemedText>$40</ThemedText>
//                                         <ThemedText>$45+</ThemedText>
//                                     </View>
//                                     <MultiSlider
//                                         values={[payRange[0], payRange[1]]}
//                                         min={15}
//                                         max={45}
//                                         step={1}
//                                         sliderLength={318}
//                                         selectedStyle={{
//                                             backgroundColor: '#EB4430',
//                                         }}
//                                         unselectedStyle={{
//                                             backgroundColor: '#E8E8E8',
//                                         }}
//                                         containerStyle={{
//                                             height: 40,
//                                         }}
//                                         trackStyle={{
//                                             height: 4,
//                                         }}
//                                         markerStyle={{
//                                             backgroundColor: '#EB4430',
//                                             height: 20,
//                                             width: 20,
//                                         }}
//                                         onValuesChange={setPayRange}
//                                         enabledTwo={true}
//                                     />
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                 </ScrollView>
//             </ThemedView>
//         </SafeAreaView>
//     )
// }
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//     },
//     container: {
//         marginHorizontal: 16,
//         marginTop: 31,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         borderBottomWidth: 1,
//         borderBottomColor: '#E8E8E8',
//     },
//     backIcon: {
//         width: 24,
//         height: 24,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontFamily: 'Poppins_600SemiBold',
//     },
//     doneButton: {
//         fontSize: 16,
//         color: '#EB4430',
//         fontFamily: 'Poppins_600SemiBold',
//     },
//     heading: {
//         fontFamily: 'Poppins',
//         fontWeight: 400,
//         fontSize: 16,
//         lineHeight: 20,
//         color: "#261D2A4D",
//     },
//     subSection: {
//         gap: 24,
//         marginBottom: 25,
//     },
//     section: {
//         backgroundColor: '#261D2A0D',
//         paddingTop: 20,
//         paddingHorizontal: 20,
//         marginTop: 6,
//         borderRadius: 10,
//         overflow: 'hidden',
//         flex: 1,
//     },
//     pillContainer: {
//         flexDirection: 'row',
//         gap: 8,
//         flexWrap: 'wrap',
//     },
//     sectionTitle: {
//         fontSize: 16,
//         fontFamily: 'Poppins_600SemiBold',
//         marginBottom: 12,
//     },
//     sliderContainer: {
//         borderRadius: 8,
//     },
//     slider: {
//         width: '100%',
//         height: 40,
//     },
//     sliderLabels: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 8,
//         width : '100%'
//     },
//     genderOption: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: 12,
//     },
//     genderText: {
//         fontSize: 16,
//         color: '#666666',
//         fontFamily: 'Poppins_400Regular',
//     },
//     selectedGenderText: {
//         color: '#EB4430',
//     },
//     checkIcon: {
//         width: 20,
//         height: 20,
//     },
//     languageSection: {
//         marginBottom: 24,
//     },
//     languageRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: '#F6F6F6',
//         padding: 16,
//         borderRadius: 8,
//     },
//     languageText: {
//         fontSize: 16,
//         color: '#666666',
//         fontFamily: 'Poppins_400Regular',
//     },
//     chevronIcon: {
//         width: 20,
//         height: 20,
//     },
//     subscriptionHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     subscriptionTextContainer: {
//         flex: 1,
//         marginLeft: 16,
//     },
//     subscriptionText: {
//         fontSize: 14,
//         color: '#666666',
//         fontFamily: 'Poppins_400Regular',
//     },
//     upgradeButton: {
//         backgroundColor: '#EB4430',
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 20,
//     },
//     upgradeText: {
//         color: '#FFFFFF',
//         fontSize: 14,
//         fontFamily: 'Poppins_600SemiBold',
//     },
//     payTypeContainer: {
//         flexDirection: 'row',
//         gap: 12,
//         marginBottom: 16,
//     },
//     payTypeButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 12,
//         borderRadius: 28,
//         backgroundColor: 'rgba(38, 29, 42, 0.05)',
//         alignSelf: 'flex-start',
//     },
//     selectedPayType: {
//         backgroundColor: '#EB4430',
//     },
//     payTypeIcon: {
//         width: 20,
//         height: 20,
//         marginRight: 8,
//     },
//     payTypeText: {
//         fontSize: 14,
//         color: '#666666',
//         fontFamily: 'Poppins_400Regular',
//     },
//     selectedPayTypeText: {
//         color: '#FFFFFF',
//     },
//     lockedSection: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: '#F6F6F6',
//         padding: 16,
//         borderRadius: 8,
//         marginBottom: 12,
//     },
//     lockedText: {
//         fontSize: 14,
//         color: '#666666',
//         fontFamily: 'Poppins_400Regular',
//     },
//     lockIcon: {
//         width: 20,
//         height: 20,
//     },
// });
// export default CaregiverPreferences
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { Image } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface FilterOption {
  label: string;
  value: string;
}

export default function Filter() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  const [ageRange, setAgeRange] = useState([20, 25]);
  const [distance, setDistance] = useState(1.5);
  const [selectedGender, setSelectedGender] = useState('Everyone');
  const [payType, setPayType] = useState('Hourly');
  const [payRange, setPayRange] = useState([20, 30]);

  const handleBack = () => {
    router.push('/(tabs)/discover');
  };  

  if (!fontsLoaded) {
    return null;
  }

  const genderOptions: FilterOption[] = [
    { label: 'Man', value: 'man' },
    { label: 'Woman', value: 'woman' },
    { label: 'Cisgender Female', value: 'cisgender_female' },
    { label: 'Non Binary', value: 'non_binary' },
    { label: 'Gender Neutral', value: 'gender_neutral' },
    { label: 'Gender Queer', value: 'gender_queer' },
    { label: 'Transgender', value: 'transgender' },
    { label: 'Cisgender Male', value: 'cisgender_male' },
    { label: 'Gender Fluid', value: 'gender_fluid' },
    { label: 'Everyone', value: 'everyone' },
  ];

  const lockedSections = [
    { title: 'Religion', label: 'Open to all' },
    { title: 'Educational Level', label: 'Open to all' },
    { title: 'Years of Experience', label: 'Open to all' },
    { title: 'Interest', label: 'Open to all' },
    { title: 'Personality', label: 'Open to all' },
    { title: 'Disability Experience', label: 'Open to all' },
    { title: 'Certification & Requirements', label: 'Open to all' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image 
            source={require('@/assets/icons/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Filter</ThemedText>
        <TouchableOpacity onPress={handleBack}>
          <ThemedText style={styles.doneButton}>Done</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sliderContainer}>
            <ThemedText style={[styles.sectionTitle, { marginLeft: 0 }]}>Age</ThemedText>
            <MultiSlider
              values={[ageRange[0], ageRange[1]]}
              min={15}
              max={45}
              step={1}
              sliderLength={318}
              selectedStyle={{
                backgroundColor: '#EB4430',
              }}
              unselectedStyle={{
                backgroundColor: '#E8E8E8',
              }}
              containerStyle={{
                height: 40,
              }}
              trackStyle={{
                height: 4,
              }}
              markerStyle={{
                backgroundColor: '#EB4430',
                height: 20,
                width: 20,
              }}
              onValuesChange={setAgeRange}
              enabledTwo={true}
            />
            <View style={styles.sliderLabels}>
              <ThemedText>15</ThemedText>
              <ThemedText>20</ThemedText>
              <ThemedText>25</ThemedText>
              <ThemedText>30</ThemedText>
              <ThemedText>35</ThemedText>
              <ThemedText>40</ThemedText>
              <ThemedText>45+</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>I'd like to hire</ThemedText>
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.genderOption}
              onPress={() => setSelectedGender(option.value)}
            >
              <ThemedText style={[
                styles.genderText,
                selectedGender === option.value && styles.selectedGenderText
              ]}>
                {option.label}
              </ThemedText>
              {selectedGender === option.value && (
                <Image 
                  source={require('@/assets/icons/check.png')}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.languageSection}>
          <ThemedText style={styles.sectionTitle}>Languages we speak</ThemedText>
          <View style={styles.languageRow}>
            <ThemedText style={styles.languageText}>English (United Kingdom)</ThemedText>
            <Image 
              source={require('@/assets/icons/chevron-right.png')}
              style={styles.chevronIcon}
            />
          </View>
        </TouchableOpacity>

        <ThemedText style={styles.sectionTitle}>Subscriber Preference</ThemedText>
        <View style={styles.section}>
          <View style={styles.subscriptionHeader}>
            <TouchableOpacity style={styles.upgradeButton}>
              <ThemedText style={styles.upgradeText}>Upgrade</ThemedText>
            </TouchableOpacity>
            <View style={styles.subscriptionTextContainer}>
              <ThemedText style={styles.subscriptionText}>
                Fine tune your preference
              </ThemedText>
              <ThemedText style={styles.subscriptionText}>
                with a subscription
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Pay</ThemedText>
          <View style={styles.payTypeContainer}>
            <TouchableOpacity 
              style={[styles.payTypeButton, payType === 'Hourly' && styles.selectedPayType]}
              onPress={() => setPayType('Hourly')}
            >
              <Image 
                source={require('@/assets/icons/hourly.png')}
                style={styles.payTypeIcon}
              />
              <ThemedText style={[styles.payTypeText, payType === 'Hourly' && styles.selectedPayTypeText]}>Hourly</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.payTypeButton, payType === 'Salary' && styles.selectedPayType]}
              onPress={() => setPayType('Salary')}
            >
              <Image 
                source={require('@/assets/icons/salary.png')}
                style={styles.payTypeIcon}
              />
              <ThemedText style={[styles.payTypeText, payType === 'Salary' && styles.selectedPayTypeText]}>Salary Base</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.sliderContainer}>
            <MultiSlider
              values={[payRange[0], payRange[1]]}
              min={15}
              max={45}
              step={1}
              sliderLength={318}
              selectedStyle={{
                backgroundColor: '#EB4430',
              }}
              unselectedStyle={{
                backgroundColor: '#E8E8E8',
              }}
              containerStyle={{
                height: 40,
              }}
              trackStyle={{
                height: 4,
              }}
              markerStyle={{
                backgroundColor: '#EB4430',
                height: 20,
                width: 20,
              }}
              onValuesChange={setPayRange}
              enabledTwo={true}
            />
            <View style={styles.sliderLabels}>
              <ThemedText>$15</ThemedText>
              <ThemedText>$20</ThemedText>
              <ThemedText>$25</ThemedText>
              <ThemedText>$30</ThemedText>
              <ThemedText>$35</ThemedText>
              <ThemedText>$40</ThemedText>
              <ThemedText>$45+</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Distance (Miles)</ThemedText>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={3.5}
              value={distance}
              minimumTrackTintColor="#EB4430"
              maximumTrackTintColor="#E8E8E8"
              onValueChange={setDistance}
            />
            <View style={styles.sliderLabels}>
              <ThemedText>0.5</ThemedText>
              <ThemedText>1</ThemedText>
              <ThemedText>1.5</ThemedText>
              <ThemedText>2</ThemedText>
              <ThemedText>2.5</ThemedText>
              <ThemedText>3</ThemedText>
              <ThemedText>3.5</ThemedText>
            </View>
          </View>
        </View>

        {lockedSections.map((section, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.lockedSection}
          >
            <View>
              <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
              <ThemedText style={styles.lockedText}>{section.label}</ThemedText>
            </View>
            <Image 
              source={require('@/assets/icons/lock.png')}
              style={styles.lockIcon}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  doneButton: {
    fontSize: 16,
    color: '#EB4430',
    fontFamily: 'Poppins_600SemiBold',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'rgba(38, 29, 42, 0.05)',
    padding: 16,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 12,
  },
  sliderContainer: {
    padding: 16,
    borderRadius: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  genderOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  genderText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  selectedGenderText: {
    color: '#EB4430',
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  languageSection: {
    marginBottom: 24,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 16,
    borderRadius: 8,
  },
  languageText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  chevronIcon: {
    width: 20,
    height: 20,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  subscriptionText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  upgradeButton: {
    backgroundColor: '#EB4430',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  payTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  payTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 28,
    backgroundColor: 'rgba(38, 29, 42, 0.05)',
    alignSelf: 'flex-start',
  },
  selectedPayType: {
    backgroundColor: '#EB4430',
  },
  payTypeIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  payTypeText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  selectedPayTypeText: {
    color: '#FFFFFF',
  },
  lockedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  lockedText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  lockIcon: {
    width: 20,
    height: 20,
  },
});
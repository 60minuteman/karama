import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { LinearGradient } from 'expo-linear-gradient';

const positionTypes = [
  { id: 'night_nurse', label: 'Night Nurse', icon: '👩‍⚕️' },
  { id: 'doula', label: 'Doula/MFW', icon: '👶' },
  { id: 'babysitter', label: 'Babysitter', icon: '🎈' },
  { id: 'nanny', label: 'Nanny', icon: '👶' },
  { id: 'manny', label: 'Manny', icon: '👨' },
  { id: 'au_pair', label: 'Au Pair', icon: '✈️' },
  { id: 'caregiver', label: 'Caregiver/Housekeeper', icon: '🏠' },
  { id: 'personal_assistant', label: 'Caregiver/Personal Assistant', icon: '📋' },
  { id: 'household_manager', label: 'Caregiver/Household Manager', icon: '🏡' },
];

const childAgeGroups = [
  { id: 'newborn', label: 'Newborn', icon: '👶' },
  { id: 'toddler', label: 'Toddler', icon: '🚶' },
  { id: 'teenager', label: 'Teenager', icon: '🧑' },
  { id: 'infant', label: 'Infant', icon: '👶' },
  { id: 'expecting', label: 'Expecting', icon: '🤰' },
  { id: 'pre_schooler', label: 'Pre Schooler', icon: '🎨' },
  { id: 'school_age', label: 'School Age', icon: '📚' },
];

const employmentTypes = [
  { id: 'full_time', label: 'Full Time', icon: '⏰' },
  { id: 'part_time', label: 'Part Time', icon: '🕐' },
  { id: 'occasional', label: 'Occasional', icon: '📅' },
  { id: 'night_out', label: 'Night Out', icon: '🌙' },
  { id: 'after_school', label: 'After School/Pickup', icon: '🚗' },
];

const PastPosition: React.FC = () => {
  const router = useRouter();
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [selectedPositionNumber, setSelectedPositionNumber] = useState<'first'|'second'>('first');

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/caregiver/prompt');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          Tell us about your{'\n'}past positions
        </ThemedText>

        <View style={styles.positionPills}>
          <Pill
            label="First Position"
            selected={selectedPositionNumber === 'first'}
            onPress={() => setSelectedPositionNumber('first')}
          />
          <Pill
            label="Second Position"
            selected={selectedPositionNumber === 'second'}
            onPress={() => setSelectedPositionNumber('second')}
          />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Name of Family or Business</ThemedText>
            <View style={styles.inputContainer}>
              <View style={styles.inputCursor} />
              <TextInput
                style={styles.input}
                placeholder="Type here"
                placeholderTextColor="#999"
                value={familyName}
                onChangeText={setFamilyName}
                autoFocus
              />
            </View>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.dateInput}>
              <ThemedText style={styles.dateLabel}>Start Date</ThemedText>
              <View style={[styles.inputBorder, startDate.length > 0 && styles.inputBorderActive]}>
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#999"
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
            </View>
            <View style={styles.dateInput}>
              <ThemedText style={styles.dateLabel}>End Date</ThemedText>
              <View style={[styles.inputBorder, endDate.length > 0 && styles.inputBorderActive]}>
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#999"
                  value={endDate}
                  onChangeText={setEndDate}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>What was your position</ThemedText>
            <View style={styles.pillsContainer}>
              {positionTypes.map((position) => (
                <Pill
                  key={position.id}
                  label={position.label}
                  icon={position.icon}
                  selected={selectedPosition === position.id}
                  onPress={() => setSelectedPosition(position.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>What age were the children</ThemedText>
            <View style={styles.pillsContainer}>
              {childAgeGroups.map((age) => (
                <Pill
                  key={age.id}
                  label={age.label}
                  icon={age.icon}
                  selected={selectedAgeGroup === age.id}
                  onPress={() => setSelectedAgeGroup(age.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>What type of position was it</ThemedText>
            <View style={styles.pillsContainer}>
              {employmentTypes.map((type) => (
                <Pill
                  key={type.id}
                  label={type.label}
                  icon={type.icon}
                  selected={selectedEmploymentType === type.id}
                  onPress={() => setSelectedEmploymentType(type.id)}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button
              label="Skip"
              onPress={() => router.back()}
              variant="skip"
            />
            <Button
              label="Next"
              onPress={handleNext}
              variant="compact"
              disabled={!selectedPosition}
            />
          </View>
        </LinearGradient>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spacerTop: {
    height: 120,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 24,
    marginTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 16,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  positionPills: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  inputCursor: {
    width: 2,
    height: 24,
    backgroundColor: Colors.light.orange,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 24,
    color: Colors.light.text,
    padding: 0,
  },
  inputBorder: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputBorderActive: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
});

export default PastPosition;
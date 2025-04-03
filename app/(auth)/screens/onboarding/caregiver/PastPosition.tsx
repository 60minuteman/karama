import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Bogart_600SemiBold } from '@expo-google-fonts/bogart';
import { useUserStore } from '@/services/state/user';
import DateTimePicker from '@react-native-community/datetimepicker';

const positionTypes = [
  { id: 'night_nurse' as const, label: 'Night Nurse', icon: '👩‍⚕️' },
  { id: 'doula' as const, label: 'Doula/MFW', icon: '👶' },
  { id: 'babysitter' as const, label: 'Babysitter', icon: '🎈' },
  { id: 'nanny' as const, label: 'Nanny', icon: '👶' },
  { id: 'manny' as const, label: 'Manny', icon: '👨' },
  { id: 'au_pair' as const, label: 'Au Pair', icon: '✈️' },
  { id: 'caregiver' as const, label: 'Caregiver/Housekeeper', icon: '🏠' },
  { id: 'personal_assistant' as const, label: 'Caregiver/Personal Assistant', icon: '📋' },
  { id: 'household_manager' as const, label: 'Caregiver/Household Manager', icon: '🏡' },
];

const childAgeGroups = [
  { id: 'newborn' as const, label: 'Newborn', icon: '👶' },
  { id: 'toddler' as const, label: 'Toddler', icon: '🚶' },
  { id: 'teenager' as const, label: 'Teenager', icon: '🧑' },
  { id: 'infant' as const, label: 'Infant', icon: '👶' },
  { id: 'expecting' as const, label: 'Expecting', icon: '🤰' },
  { id: 'pre_schooler' as const, label: 'Pre Schooler', icon: '🎨' },
  { id: 'school_age' as const, label: 'School Age', icon: '📚' },
];

const employmentTypes = [
  { id: 'full_time' as const, label: 'Full Time', icon: '⏰' },
  { id: 'part_time' as const, label: 'Part Time', icon: '🕐' },
  { id: 'occasional' as const, label: 'Occasional', icon: '📅' },
  { id: 'night_out' as const, label: 'Night Out', icon: '🌙' },
  { id: 'after_school' as const, label: 'After School/Pickup', icon: '🚗' },
];

const PastPosition: React.FC = () => {
  const router = useRouter();
  const { caregiverFirstPosition, setCaregiverFirstPosition, caregiverSecondPosition,
    setCaregiverSecondPosition, setOnboardingScreen } = useUserStore();
  const [selectedPositionNumber, setSelectedPositionNumber] = useState<'first' | 'second'>('first');
  const [activeDatePicker, setActiveDatePicker] = useState<'start' | 'end' | null>(null);
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/prompt')
    router.push('/(auth)/screens/onboarding/caregiver/prompt');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit', 
      year: 'numeric'
    });
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setActiveDatePicker(null);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      if (selectedPositionNumber === 'first') {
        setCaregiverFirstPosition({
          ...caregiverFirstPosition,
          startDate: formattedDate,
        });
      } else {
        setCaregiverSecondPosition({
          ...caregiverSecondPosition,
          startDate: formattedDate,
        });
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setActiveDatePicker(null);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      if (selectedPositionNumber === 'first') {
        setCaregiverFirstPosition({
          ...caregiverFirstPosition,
          endDate: formattedDate,
        });
      } else {
        setCaregiverSecondPosition({
          ...caregiverSecondPosition,
          endDate: formattedDate,
        });
      }
    }
  };

  useEffect(() => {
    console.log(caregiverFirstPosition)
    console.log(caregiverSecondPosition)
  }, [caregiverFirstPosition, caregiverSecondPosition])

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" style={{ fontFamily: 'Bogart-Bold' }} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <View style={styles.content}>
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.2} />

          <ThemedText style={styles.title}>
            Tell us about your{'\n'}past positions
          </ThemedText>

          <View style={styles.positionPills}>
            <Pill
              label="First Position"
              selected={caregiverFirstPosition?.positionNumber === 'first' && selectedPositionNumber === 'first'}
              onPress={() => {
                setSelectedPositionNumber('first')
                setCaregiverFirstPosition({
                  ...caregiverFirstPosition,
                  positionNumber: 'first',
                })
              }
              }
            />
            <Pill
              label="Second Position"
              selected={caregiverSecondPosition?.positionNumber === 'second' && selectedPositionNumber === 'second'}
              onPress={() => {
                setSelectedPositionNumber('second')
                setCaregiverSecondPosition({
                  ...caregiverSecondPosition,
                  positionNumber: 'second',
                })
              }
              }
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
                  value={selectedPositionNumber === 'first' ? caregiverFirstPosition?.familyName : caregiverSecondPosition?.familyName}
                  onChangeText={(value) => {
                    selectedPositionNumber === 'first' ?
                      setCaregiverFirstPosition({
                        ...caregiverFirstPosition,
                        familyName: value,
                      })
                      :
                      setCaregiverSecondPosition({
                        ...caregiverSecondPosition,
                        familyName: value,
                      })
                  }}
                  autoFocus
                />
              </View>
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.dateInput}>
                <ThemedText style={styles.dateLabel}>Start Date</ThemedText>
                <TouchableOpacity 
                  onPress={() => {
                    setActiveDatePicker('start')
                  }}
                  style={[styles.inputBorder, (caregiverFirstPosition?.startDate?.length > 0 || caregiverSecondPosition?.startDate?.length > 0) && styles.inputBorderActive]}
                >
                  <ThemedText style={styles.dateText}>
                    {selectedPositionNumber === 'first' ? 
                      caregiverFirstPosition?.startDate || 'MM/DD/YYYY' : 
                      caregiverSecondPosition?.startDate || 'MM/DD/YYYY'
                    }
                  </ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.dateInput}>
                <ThemedText style={styles.dateLabel}>End Date</ThemedText>
                <TouchableOpacity 
                  onPress={() => {
                    setActiveDatePicker('end')
                  }}
                  style={[styles.inputBorder, (caregiverFirstPosition?.endDate?.length > 0 || caregiverSecondPosition?.endDate?.length > 0) && styles.inputBorderActive]}
                >
                  <ThemedText style={styles.dateText}>
                    {selectedPositionNumber === 'first' ? 
                      caregiverFirstPosition?.endDate || 'MM/DD/YYYY' : 
                      caregiverSecondPosition?.endDate || 'MM/DD/YYYY'
                    }
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {activeDatePicker === 'start' && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="spinner"
                onChange={handleStartDateChange}
              />
            )}

            {activeDatePicker === 'end' && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="spinner"
                onChange={handleEndDateChange}
              />
            )}

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>What was your position</ThemedText>
              <View style={styles.pillsContainer}>
                {positionTypes.map((position) => (
                  <Pill
                    key={position.id}
                    label={position.label}
                    icon={position.icon}
                    selected={selectedPositionNumber === 'first' ? caregiverFirstPosition?.position === position.id : caregiverSecondPosition?.position === position.id}
                    onPress={
                      () => {
                        selectedPositionNumber === 'first' ?
                          setCaregiverFirstPosition({
                            ...caregiverFirstPosition,
                            position: position.id,
                          }) :
                          setCaregiverSecondPosition({
                            ...caregiverSecondPosition,
                            position: position.id,
                          })
                      }
                    }
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
                    selected={selectedPositionNumber === 'first' ? caregiverFirstPosition?.ageGroup === age.id : caregiverSecondPosition?.ageGroup === age.id}
                    onPress={
                      () => {
                        selectedPositionNumber === 'first' ?
                          setCaregiverFirstPosition({
                            ...caregiverFirstPosition,
                            ageGroup: age.id,
                          }) :
                          setCaregiverSecondPosition({
                            ...caregiverSecondPosition,
                            ageGroup: age.id,
                          })
                      }
                    }
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
                    selected={selectedPositionNumber === 'first' ? caregiverFirstPosition?.employmentType === type.id :caregiverSecondPosition?.employmentType === type.id}
                    onPress={
                      () => {
                        selectedPositionNumber === 'first' ?
                          setCaregiverFirstPosition({
                            ...caregiverFirstPosition,
                            employmentType: type.id,
                          }) :
                          setCaregiverSecondPosition({
                            ...caregiverSecondPosition,
                            employmentType: type.id,
                          })
                      }
                    }
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
                disabled={!caregiverFirstPosition || !caregiverSecondPosition}
              />
            </View>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardAvoidView: {
    flex: 1,
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
    fontFamily: 'Bogart-Bold',
    fontWeight: '600',
    color: '#002140',
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
  dateText: {
    fontSize: 16,
    color: Colors.light.text,
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
    backgroundColor: Colors.light.primary,
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
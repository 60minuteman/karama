import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const positionTypes = [
  { id: 'night_nurse' as const, label: '🌙 Night Nurse' },
  { id: 'doula' as const, label: '👩🏽‍💼 Governess' },
  { id: 'babysitter' as const, label: '🧁 Babysitter' },
  { id: 'nanny' as const, label: '👩🏾‍🍼 Nanny' },
  { id: 'manny' as const, label: '🙎🏼‍♂️ Manny' },
  { id: 'au_pair' as const, label: '🧃 Au Pair' },
  { id: 'caregiver' as const, label: '🧽 Caregiver/Housekeeper' },
  {
    id: 'personal_assistant' as const,
    label: '🗓️ Caregiver/Personal Assistant',
  },
  { id: 'household_manager' as const, label: '🧢 Caregiver/Household Manager' },
];

const childAgeGroups = [
  { id: 'newborn' as const, label: '👶 Newborn' },
  { id: 'toddler' as const, label: '🧸 Toddler' },
  { id: 'teenager' as const, label: '🌈 Teenager' },
  { id: 'infant' as const, label: '🍼 Infant' },
  { id: 'expecting' as const, label: '🐣 Expecting' },
  { id: 'pre_schooler' as const, label: '🖍️ Pre Schooler' },
  { id: 'school_age' as const, label: '🛴 School Age' },
];

const employmentTypes = [
  { id: 'full_time' as const, label: '🕐 Full Time' },
  { id: 'part_time' as const, label: '⏳ Part Time' },
  { id: 'occasional' as const, label: '🗓️ Occasional' },
  { id: 'night_out' as const, label: '🍹 Night Out' },
  { id: 'after_school' as const, label: '🎒 After School/Pickup' },
];

const childcareResponsibilities = [
  { id: 'bathing', label: '🛁 Bathing' },
  { id: 'laundry', label: '🧺 Laundry' },
  { id: 'packingLunch', label: '🍕 Packing Lunch' },
  { id: 'driving', label: '🚗 Driving' },
  { id: 'cooking', label: '🥓 Cooking' },
  { id: 'playDates', label: '🛝 Play Dates' },
  { id: 'commuting', label: '🚆 Commuting' },
  { id: 'scheduling', label: '📅 Scheduling/ Planning' },
  { id: 'sleepScheduling', label: '⭐️ Sleep Scheduling' },
  { id: 'tutoring', label: '🍎 Tutoring' },
  { id: 'homeworkHelp', label: '📖 Homework Help' },
  { id: 'roomOrg', label: '🚂 Room organization' },
  { id: 'foodPrep', label: '🥒 Food prep' },
  { id: 'diaperChange', label: '🧷 Diaper Change' },
  { id: 'pottyTraining', label: '🚽 Potty training' },
  { id: 'organization', label: '📦 Organization' },
  { id: 'lightHouseKeeping', label: '🧹 Light house keeping' },
  { id: 'roomOrganization', label: '🧸 Room Organization' },
  { id: 'groceryShopping', label: '🥐 Grocery Shopping' },
  { id: 'childcareErrands', label: '🛍️ Childcare Errands' },
  { id: 'feeding', label: '🧑‍🍼 Feeding' },
  { id: 'pottyTraining2', label: '🚽 Potty Training' },
  { id: 'other', label: '🧒🏽 Other' },
];

const householdResponsibilities = [
  { id: 'cooking2', label: '🍳 Cooking' },
  { id: 'laundry2', label: '👔 Laundry' },
  { id: 'mealPrep', label: '🍲 Meal Prep' },
  { id: 'ironing', label: '🧺 Ironing' },
  { id: 'errands', label: '🛒 Errands' },
  { id: 'petCare', label: '🐾 Pet Care' },
  { id: 'eventPlanning', label: '🎊 Event Planning' },
  { id: 'trashRecycling', label: '🗑️ Trash & Recycling' },
  { id: 'lightHousekeeping2', label: '🧹 Light Housekeeping' },
  { id: 'deepHousekeeping', label: '💦 Deep Housekeeping' },
  { id: 'managingProperties', label: '🗂️ Managing Properties' },
  { id: 'householdBudgeting', label: '📊 Household Budgeting' },
  { id: 'hiringStaff', label: '🗒️ Hiring & Supervising Staff' },
  { id: 'propertyManagement', label: '🏘️ Property Management' },
  { id: 'dishwasher', label: '🍽️ Loading/Unloading Dishwasher' },
  { id: 'other2', label: '🏙️ Other' },
];

const positionTabs = [
  { id: 'first' as const, label: 'First Position' },
  { id: 'second' as const, label: 'Second Position' },
  { id: 'third' as const, label: 'Third Position' },
];

const PastPosition: React.FC = () => {
  const router = useRouter();
  const {
    caregiverFirstPosition,
    setCaregiverFirstPosition,
    caregiverSecondPosition,
    setCaregiverSecondPosition,
    setCaregiverThirdPosition,
    caregiverThirdPosition,
    setOnboardingScreen,
  } = useUserStore();
  const [selectedPositionNumber, setSelectedPositionNumber] = useState<
    'first' | 'second' | 'third'
  >('first');
  const [activeDatePicker, setActiveDatePicker] = useState<
    'start' | 'end' | null
  >(null);
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/prompt');
    router.push('/(auth)/screens/onboarding/caregiver/prompt');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
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
      } else if (selectedPositionNumber === 'second') {
        setCaregiverSecondPosition({
          ...caregiverSecondPosition,
          startDate: formattedDate,
        });
      } else {
        setCaregiverThirdPosition({
          ...caregiverThirdPosition,
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
      } else if (selectedPositionNumber === 'second') {
        setCaregiverSecondPosition({
          ...caregiverSecondPosition,
          endDate: formattedDate,
        });
      } else {
        setCaregiverThirdPosition({
          ...caregiverThirdPosition,
          endDate: formattedDate,
        });
      }
    }
  };

  useEffect(() => {
    console.log(caregiverFirstPosition);
    console.log(caregiverSecondPosition);
    console.log(caregiverThirdPosition);
  }, [caregiverFirstPosition, caregiverSecondPosition]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Header variant='back' />

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

            <View style={styles.pillsContainer}>
              {positionTabs.map((tab) => (
                <Pill
                  key={tab.id}
                  label={tab.label}
                  selected={selectedPositionNumber === tab.id}
                  onPress={() => {
                    setSelectedPositionNumber(tab.id);
                    if (tab.id === 'first') {
                      setCaregiverFirstPosition({
                        ...caregiverFirstPosition,
                        positionNumber: 'first',
                      });
                    } else if (tab.id === 'second') {
                      setCaregiverSecondPosition({
                        ...caregiverSecondPosition,
                        positionNumber: 'second',
                      });
                    } else {
                      setCaregiverThirdPosition({
                        ...caregiverThirdPosition,
                        positionNumber: 'Third',
                      });
                    }
                  }}
                />
              ))}
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps='handled'
            >
              <View style={[styles.section, { marginTop: -20 }]}>
                <ThemedText style={styles.sectionTitle}>
                  Name of Family or Business
                </ThemedText>
                <View style={styles.inputContainer}>
                  <View style={styles.inputCursor} />
                  <TextInput
                    style={styles.input}
                    placeholder='Type here'
                    placeholderTextColor='#999'
                    value={
                      selectedPositionNumber === 'first'
                        ? caregiverFirstPosition?.familyName
                        : selectedPositionNumber === 'second'
                        ? caregiverSecondPosition?.familyName
                        : caregiverThirdPosition?.familyName
                    }
                    onChangeText={(value) => {
                      selectedPositionNumber === 'first'
                        ? setCaregiverFirstPosition({
                            ...caregiverFirstPosition,
                            familyName: value,
                          })
                        : selectedPositionNumber === 'third'
                        ? setCaregiverThirdPosition({
                            ...caregiverThirdPosition,
                            familyName: value,
                          })
                        : setCaregiverSecondPosition({
                            ...caregiverSecondPosition,
                            familyName: value,
                          });
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
                      setActiveDatePicker('start');
                    }}
                    style={[
                      styles.inputBorder,
                      (caregiverFirstPosition?.startDate?.length > 0 ||
                        caregiverSecondPosition?.startDate?.length > 0) &&
                        styles.inputBorderActive,
                    ]}
                  >
                    <ThemedText style={styles.dateText}>
                      {selectedPositionNumber === 'first'
                        ? caregiverFirstPosition?.startDate || 'MM/DD/YYYY'
                        : selectedPositionNumber === 'third'
                        ? caregiverThirdPosition?.startDate || 'MM/DD/YYYY'
                        : caregiverSecondPosition?.startDate || 'MM/DD/YYYY'}
                    </ThemedText>
                  </TouchableOpacity>
                </View>
                <View style={styles.dateInput}>
                  <ThemedText style={styles.dateLabel}>End Date</ThemedText>
                  <TouchableOpacity
                    onPress={() => {
                      setActiveDatePicker('end');
                    }}
                    style={[
                      styles.inputBorder,
                      (caregiverFirstPosition?.endDate?.length > 0 ||
                        caregiverSecondPosition?.endDate?.length > 0) &&
                        styles.inputBorderActive,
                    ]}
                  >
                    <ThemedText style={styles.dateText}>
                      {selectedPositionNumber === 'first'
                        ? caregiverFirstPosition?.endDate || 'MM/DD/YYYY'
                        : selectedPositionNumber === 'third'
                        ? caregiverThirdPosition?.endDate || 'MM/DD/YYYY'
                        : caregiverSecondPosition?.endDate || 'MM/DD/YYYY'}
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              {activeDatePicker === 'start' && (
                <DateTimePicker
                  value={new Date()}
                  mode='date'
                  display='spinner'
                  onChange={handleStartDateChange}
                />
              )}

              {activeDatePicker === 'end' && (
                <DateTimePicker
                  value={new Date()}
                  mode='date'
                  display='spinner'
                  onChange={handleEndDateChange}
                />
              )}

              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>
                  What was your position
                </ThemedText>
                <View style={styles.pillsContainer}>
                  {positionTypes.map((position) => (
                    <Pill
                      key={position.id}
                      label={position.label}
                      selected={
                        selectedPositionNumber === 'first'
                          ? caregiverFirstPosition?.position === position.id
                          : selectedPositionNumber === 'third'
                          ? caregiverThirdPosition?.position === position.id
                          : caregiverSecondPosition?.position === position.id
                      }
                      onPress={() => {
                        selectedPositionNumber === 'first'
                          ? setCaregiverFirstPosition({
                              ...caregiverFirstPosition,
                              position: position.id,
                            })
                          : selectedPositionNumber === 'third'
                          ? setCaregiverThirdPosition({
                              ...caregiverThirdPosition,
                              position: position.id,
                            })
                          : setCaregiverSecondPosition({
                              ...caregiverSecondPosition,
                              position: position.id,
                            });
                      }}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>
                  What age were the children
                </ThemedText>
                <View style={styles.pillsContainer}>
                  {childAgeGroups.map((age) => (
                    <Pill
                      key={age.id}
                      label={age.label}
                      selected={
                        selectedPositionNumber === 'first'
                          ? caregiverFirstPosition?.ageGroup === age.id
                          : selectedPositionNumber === 'third'
                          ? caregiverThirdPosition?.ageGroup === age.id
                          : caregiverSecondPosition?.ageGroup === age.id
                      }
                      onPress={() => {
                        selectedPositionNumber === 'first'
                          ? setCaregiverFirstPosition({
                              ...caregiverFirstPosition,
                              ageGroup: age.id,
                            })
                          : selectedPositionNumber === 'third'
                          ? setCaregiverThirdPosition({
                              ...caregiverThirdPosition,
                              ageGroup: age.id,
                            })
                          : setCaregiverSecondPosition({
                              ...caregiverSecondPosition,
                              ageGroup: age.id,
                            });
                      }}
                    />
                  ))}
                </View>
              </View>

              <View style={[styles.section]}>
                <ThemedText style={styles.sectionTitle}>
                  What type of position was it
                </ThemedText>
                <View style={styles.pillsContainer}>
                  {employmentTypes.map((type) => (
                    <Pill
                      key={type.id}
                      label={type.label}
                      selected={
                        selectedPositionNumber === 'first'
                          ? caregiverFirstPosition?.employmentType === type.id
                          : selectedPositionNumber === 'third'
                          ? caregiverThirdPosition?.employmentType === type.id
                          : caregiverSecondPosition?.employmentType === type.id
                      }
                      onPress={() => {
                        selectedPositionNumber === 'first'
                          ? setCaregiverFirstPosition({
                              ...caregiverFirstPosition,
                              employmentType: type.id,
                            })
                          : selectedPositionNumber === 'third'
                          ? setCaregiverThirdPosition({
                              ...caregiverThirdPosition,
                              employmentType: type.id,
                            })
                          : setCaregiverSecondPosition({
                              ...caregiverSecondPosition,
                              employmentType: type.id,
                            });
                      }}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>
                  What were your childcare responsibilities{' '}
                </ThemedText>
                <View style={styles.pillsContainer}>
                  {childcareResponsibilities.map((responsibility) => (
                    <Pill
                      key={responsibility.id}
                      label={responsibility.label}
                      selected={
                        selectedPositionNumber === 'first'
                          ? caregiverFirstPosition?.childCare === responsibility.id
                          : selectedPositionNumber === 'third'
                          ? caregiverThirdPosition?.childCare === responsibility.id
                          : caregiverSecondPosition?.childCare === responsibility.id
                      }
                      onPress={() => {
                        selectedPositionNumber === 'first'
                          ? setCaregiverFirstPosition({
                              ...caregiverFirstPosition,
                              childCare: responsibility.id,
                            })
                          : selectedPositionNumber === 'third'
                          ? setCaregiverThirdPosition({
                              ...caregiverThirdPosition,
                              childCare: responsibility.id,
                            })
                          : setCaregiverSecondPosition({
                              ...caregiverSecondPosition,
                              childCare: responsibility.id,
                            });
                      }}
                    />
                  ))}
                </View>
              </View>

              <View style={[styles.section, { marginBottom: 120 }]}>
                <ThemedText style={styles.sectionTitle}>
                  What were your household responsibilities{' '}
                </ThemedText>
                <View style={styles.pillsContainer}>
                  {householdResponsibilities.map((responsibility) => (
                    <Pill
                      key={responsibility.id}
                      label={responsibility.label}
                       selected={
                        selectedPositionNumber === 'first'
                          ? caregiverFirstPosition?.household === responsibility.id
                          : selectedPositionNumber === 'third'
                          ? caregiverThirdPosition?.household === responsibility.id
                          : caregiverSecondPosition?.household === responsibility.id
                      }
                      onPress={() => {
                        selectedPositionNumber === 'first'
                          ? setCaregiverFirstPosition({
                              ...caregiverFirstPosition,
                              household: responsibility.id,
                            })
                          : selectedPositionNumber === 'third'
                          ? setCaregiverThirdPosition({
                              ...caregiverThirdPosition,
                              household: responsibility.id,
                            })
                          : setCaregiverSecondPosition({
                              ...caregiverSecondPosition,
                              household: responsibility.id,
                            });
                      }}
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
                  label='Skip'
                  onPress={() => router.back()}
                  variant='skip'
                />
                <Button
                  label='Next'
                  onPress={handleNext}
                  variant='compact'
                  disabled={
                    !caregiverFirstPosition ||
                    !caregiverSecondPosition ||
                    !caregiverThirdPosition
                  }
                />
              </View>
            </LinearGradient>
          </View>
        </KeyboardAvoidingView>
      </ThemedView>
    </TouchableWithoutFeedback>
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
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
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
    marginBottom: 20,
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

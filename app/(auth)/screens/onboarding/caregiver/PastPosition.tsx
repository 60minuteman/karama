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
  Pressable,
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
  // { id: 'other', label: '🧒🏽 Other' },
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
  // { id: 'other2', label: '🏙️ Other' },
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
  console.log('caregiverFirstPosition', caregiverFirstPosition);
  const [selectedPositionNumber, setSelectedPositionNumber] = useState<
    'first' | 'second' | 'third'
  >('first');
  const [activeDatePicker, setActiveDatePicker] = useState<
    'start' | 'end' | null
  >(null);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date>(new Date());
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });

  const handleNext = () => {
    // setOnboardingScreen('/(auth)/screens/onboarding/caregiver/prompt');
    router.push('/(auth)/screens/onboarding/caregiver/prompt');
  };

  // Validation function to check if a position has all necessary fields
  const isPositionValid = (position: any) => {
    // Handle the type mismatch where childCare and household are defined as strings but used as arrays
    const childCareArray = Array.isArray(position?.childCare)
      ? position.childCare
      : typeof position?.childCare === 'string' && position.childCare !== ''
      ? [position.childCare]
      : [];

    const householdArray = Array.isArray(position?.household)
      ? position.household
      : typeof position?.household === 'string' && position.household !== ''
      ? [position.household]
      : [];

    return (
      position?.familyName?.trim() !== '' &&
      position?.position?.trim() !== '' &&
      position?.employmentType?.trim() !== '' &&
      position?.startDate?.trim() !== '' &&
      position?.endDate?.trim() !== '' &&
      Array.isArray(position?.ageGroups) &&
      position.ageGroups.length > 0 &&
      childCareArray.length > 0
      // householdArray.length > 0
    );
  };

  // Check if all positions are valid
  const isAllPositionsValid = () => {
    return (
      isPositionValid(caregiverFirstPosition) ||
      isPositionValid(caregiverSecondPosition) ||
      isPositionValid(caregiverThirdPosition)
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempSelectedDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempSelectedDate(selectedDate);
    }
  };

  const handleResponsibilitySelection = (
    responsibilityLabel: string,
    type: 'childcare' | 'household'
  ) => {
    const currentPosition =
      selectedPositionNumber === 'first'
        ? caregiverFirstPosition
        : selectedPositionNumber === 'second'
        ? caregiverSecondPosition
        : caregiverThirdPosition;

    const currentResponsibilities: string[] =
      type === 'childcare'
        ? Array.isArray(currentPosition?.childCare)
          ? currentPosition.childCare
          : []
        : Array.isArray(currentPosition?.household)
        ? currentPosition.household
        : [];

    let updatedResponsibilities: string[];

    if (currentResponsibilities.includes(responsibilityLabel)) {
      // Remove if already selected
      updatedResponsibilities = currentResponsibilities.filter(
        (label: string) => label !== responsibilityLabel
      );
    } else {
      // Add if not selected and under limit
      if (currentResponsibilities.length < 10) {
        updatedResponsibilities = [
          ...currentResponsibilities,
          responsibilityLabel,
        ];
      } else {
        // Show alert or handle max selection reached
        return;
      }
    }

    if (selectedPositionNumber === 'first') {
      setCaregiverFirstPosition({
        ...caregiverFirstPosition,
        [type === 'childcare' ? 'childCare' : 'household']:
          updatedResponsibilities,
      });
    } else if (selectedPositionNumber === 'second') {
      setCaregiverSecondPosition({
        ...caregiverSecondPosition,
        [type === 'childcare' ? 'childCare' : 'household']:
          updatedResponsibilities,
      });
    } else {
      setCaregiverThirdPosition({
        ...caregiverThirdPosition,
        [type === 'childcare' ? 'childCare' : 'household']:
          updatedResponsibilities,
      });
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
              <TouchableOpacity activeOpacity={1}>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                  style={[styles.section, { marginTop: 20 }]}
                >
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
                </TouchableOpacity>

                <View style={styles.dateContainer}>
                  <View style={styles.dateInput}>
                    <ThemedText style={styles.dateLabel}>Start Date</ThemedText>
                    <TouchableOpacity
                      onPress={() => {
                        // Set initial date based on current selection or default to today
                        const currentDate =
                          selectedPositionNumber === 'first'
                            ? caregiverFirstPosition?.startDate
                            : selectedPositionNumber === 'third'
                            ? caregiverThirdPosition?.startDate
                            : caregiverSecondPosition?.startDate;

                        if (currentDate && currentDate !== 'MM/DD/YYYY') {
                          const [month, day, year] = currentDate.split('/');
                          const date = new Date(
                            parseInt(year),
                            parseInt(month) - 1,
                            parseInt(day)
                          );
                          setTempSelectedDate(date);
                        } else {
                          setTempSelectedDate(new Date());
                        }
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
                        // Set initial date based on current selection or default to today
                        const currentDate =
                          selectedPositionNumber === 'first'
                            ? caregiverFirstPosition?.endDate
                            : selectedPositionNumber === 'third'
                            ? caregiverThirdPosition?.endDate
                            : caregiverSecondPosition?.endDate;

                        if (currentDate && currentDate !== 'MM/DD/YYYY') {
                          const [month, day, year] = currentDate.split('/');
                          const date = new Date(
                            parseInt(year),
                            parseInt(month) - 1,
                            parseInt(day)
                          );
                          setTempSelectedDate(date);
                        } else {
                          setTempSelectedDate(new Date());
                        }
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
                            ? caregiverFirstPosition?.position ===
                              position.label
                            : selectedPositionNumber === 'third'
                            ? caregiverThirdPosition?.position ===
                              position.label
                            : caregiverSecondPosition?.position ===
                              position.label
                        }
                        onPress={() => {
                          selectedPositionNumber === 'first'
                            ? setCaregiverFirstPosition({
                                ...caregiverFirstPosition,
                                position: position.label,
                              })
                            : selectedPositionNumber === 'third'
                            ? setCaregiverThirdPosition({
                                ...caregiverThirdPosition,
                                position: position.label,
                              })
                            : setCaregiverSecondPosition({
                                ...caregiverSecondPosition,
                                position: position.label,
                              });
                        }}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <ThemedText style={styles.sectionTitle}>
                    What age were the children{' '}
                    {/* <ThemedText style={styles.selectionCount}>
                    (
                    {selectedPositionNumber === 'first'
                      ? caregiverFirstPosition?.ageGroups?.length || 0
                      : selectedPositionNumber === 'second'
                      ? caregiverSecondPosition?.ageGroups?.length || 0
                      : caregiverThirdPosition?.ageGroups?.length || 0}
                    /10)
                  </ThemedText> */}
                  </ThemedText>
                  <View style={styles.pillsContainer}>
                    {childAgeGroups.map((age) => (
                      <Pill
                        key={age.id}
                        label={age.label}
                        selected={
                          selectedPositionNumber === 'first'
                            ? caregiverFirstPosition?.ageGroups?.includes(
                                age.label
                              )
                            : selectedPositionNumber === 'second'
                            ? caregiverSecondPosition?.ageGroups?.includes(
                                age.label
                              )
                            : caregiverThirdPosition?.ageGroups?.includes(
                                age.label
                              )
                        }
                        onPress={() => {
                          const currentPosition =
                            selectedPositionNumber === 'first'
                              ? caregiverFirstPosition
                              : selectedPositionNumber === 'second'
                              ? caregiverSecondPosition
                              : caregiverThirdPosition;

                          const currentAgeGroups: string[] = Array.isArray(
                            currentPosition?.ageGroups
                          )
                            ? currentPosition.ageGroups
                            : [];

                          let updatedAgeGroups: string[];

                          if (currentAgeGroups.includes(age.label)) {
                            // Remove if already selected
                            updatedAgeGroups = currentAgeGroups.filter(
                              (label: string) => label !== age.label
                            );
                          } else {
                            // Add if not selected and under limit
                            if (currentAgeGroups.length < 10) {
                              updatedAgeGroups = [
                                ...currentAgeGroups,
                                age.label,
                              ];
                            } else {
                              // Show alert or handle max selection reached
                              return;
                            }
                          }

                          if (selectedPositionNumber === 'first') {
                            setCaregiverFirstPosition({
                              ...caregiverFirstPosition,
                              ageGroups: updatedAgeGroups,
                            });
                          } else if (selectedPositionNumber === 'second') {
                            setCaregiverSecondPosition({
                              ...caregiverSecondPosition,
                              ageGroups: updatedAgeGroups,
                            });
                          } else {
                            setCaregiverThirdPosition({
                              ...caregiverThirdPosition,
                              ageGroups: updatedAgeGroups,
                            });
                          }
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
                            ? caregiverFirstPosition?.employmentType ===
                              type.label
                            : selectedPositionNumber === 'third'
                            ? caregiverThirdPosition?.employmentType ===
                              type.label
                            : caregiverSecondPosition?.employmentType ===
                              type.label
                        }
                        onPress={() => {
                          selectedPositionNumber === 'first'
                            ? setCaregiverFirstPosition({
                                ...caregiverFirstPosition,
                                employmentType: type.label,
                              })
                            : selectedPositionNumber === 'third'
                            ? setCaregiverThirdPosition({
                                ...caregiverThirdPosition,
                                employmentType: type.label,
                              })
                            : setCaregiverSecondPosition({
                                ...caregiverSecondPosition,
                                employmentType: type.label,
                              });
                        }}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <ThemedText style={styles.sectionTitle}>
                    What were your childcare responsibilities{' '}
                    <ThemedText style={styles.selectionCount}>
                      (
                      {selectedPositionNumber === 'first'
                        ? caregiverFirstPosition?.childCare?.length || 0
                        : selectedPositionNumber === 'second'
                        ? caregiverSecondPosition?.childCare?.length || 0
                        : caregiverThirdPosition?.childCare?.length || 0}
                      /10)
                    </ThemedText>
                  </ThemedText>
                  <View style={styles.pillsContainer}>
                    {childcareResponsibilities.map((responsibility) => (
                      <Pill
                        key={responsibility.id}
                        label={responsibility.label}
                        selected={
                          selectedPositionNumber === 'first'
                            ? caregiverFirstPosition?.childCare?.includes(
                                responsibility.label
                              )
                            : selectedPositionNumber === 'second'
                            ? caregiverSecondPosition?.childCare?.includes(
                                responsibility.label
                              )
                            : caregiverThirdPosition?.childCare?.includes(
                                responsibility.label
                              )
                        }
                        onPress={() =>
                          handleResponsibilitySelection(
                            responsibility.label,
                            'childcare'
                          )
                        }
                      />
                    ))}
                  </View>
                </View>

                <View style={[styles.section, { marginBottom: 120 }]}>
                  <ThemedText style={styles.sectionTitle}>
                    What were your household responsibilities{' '}
                    <ThemedText style={styles.selectionCount}>
                      (
                      {selectedPositionNumber === 'first'
                        ? caregiverFirstPosition?.household?.length || 0
                        : selectedPositionNumber === 'second'
                        ? caregiverSecondPosition?.household?.length || 0
                        : caregiverThirdPosition?.household?.length || 0}
                      /10)
                    </ThemedText>
                  </ThemedText>
                  <View style={styles.pillsContainer}>
                    {householdResponsibilities.map((responsibility) => (
                      <Pill
                        key={responsibility.id}
                        label={responsibility.label}
                        selected={
                          selectedPositionNumber === 'first'
                            ? caregiverFirstPosition?.household?.includes(
                                responsibility.label
                              )
                            : selectedPositionNumber === 'second'
                            ? caregiverSecondPosition?.household?.includes(
                                responsibility.label
                              )
                            : caregiverThirdPosition?.household?.includes(
                                responsibility.label
                              )
                        }
                        onPress={() =>
                          handleResponsibilitySelection(
                            responsibility.label,
                            'household'
                          )
                        }
                      />
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>

            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
              style={styles.buttonGradient}
            >
              <View style={styles.buttonContainer}>
                {/* <Button
                  label='Skip'
                  onPress={() => router.back()}
                  variant='skip'
                /> */}
                <Button
                  // label='Next'
                  onPress={handleNext}
                  variant='compact'
                  disabled={!isAllPositionsValid()}
                />
              </View>
            </LinearGradient>
          </View>
        </KeyboardAvoidingView>

        {/* Date Picker Modal - Outside of ScrollView for proper positioning */}
        {activeDatePicker && (
          <>
            <Pressable
              style={styles.overlay}
              onPress={() => {
                setActiveDatePicker(null);
              }}
            />
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerHeader}>
                <View style={styles.dragHandle} />
                <ThemedText style={styles.datePickerTitle}>
                  Select {activeDatePicker === 'start' ? 'Start' : 'End'} Date
                </ThemedText>
              </View>
              <View style={styles.datePickerContent}>
                <DateTimePicker
                  value={tempSelectedDate}
                  mode='date'
                  display='spinner'
                  onChange={
                    activeDatePicker === 'start'
                      ? handleStartDateChange
                      : handleEndDateChange
                  }
                  style={styles.dateTimePicker}
                />
              </View>
              <View style={styles.datePickerButtons}>
                <Pressable
                  style={[styles.datePickerButton, styles.cancelButton]}
                  onPress={() => {
                    setActiveDatePicker(null);
                  }}
                >
                  <ThemedText style={styles.cancelButtonText}>
                    Cancel
                  </ThemedText>
                </Pressable>

                <Pressable
                  style={[styles.datePickerButton, styles.confirmButton]}
                  onPress={() => {
                    const formattedDate = formatDate(tempSelectedDate);
                    if (activeDatePicker === 'start') {
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
                    } else if (activeDatePicker === 'end') {
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
                    setActiveDatePicker(null);
                  }}
                >
                  <ThemedText style={styles.confirmButtonText}>
                    Confirm
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          </>
        )}
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
    justifyContent: 'flex-end',
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
  selectionCount: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  datePickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    height: 300,
  },
  datePickerHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 12,
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002140',
    textAlign: 'center',
    // fontFamily: 'Bogart-Semibold',
  },
  datePickerContent: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  dateTimePicker: {
    width: '100%',
    height: 80,
  },
  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 16,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 1001,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  datePickerButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    minWidth: 120,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: Colors.light.primary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    fontFamily: 'Bogart-Semibold',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Bogart-Semibold',
  },
});

export default PastPosition;

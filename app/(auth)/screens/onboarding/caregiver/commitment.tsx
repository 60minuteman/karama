import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { CaregiverCommitment, useUserStore } from '@/services/state/user';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SHORT_TERM = 'Short Term' as const;
const LONG_TERM = 'Long Term' as const;

export default function CommitmentScreen() {
  const router = useRouter();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const {
    caregiverCommitmentType,
    setCaregiverCommitmentType,
    caregiverCommitmentStartDate,
    setCaregiverCommitmentStartDate,
    caregiverCommitmentEndDate,
    setCaregiverCommitmentEndDate,
    isDealBreaker,
    setIsDealBreaker,
    setOnboardingScreen,
  } = useUserStore();

  // Initialize default dates if they don't exist
  useEffect(() => {
    if (!caregiverCommitmentStartDate) {
      setCaregiverCommitmentStartDate(new Date());
    }
    if (!caregiverCommitmentEndDate) {
      const defaultEndDate = new Date();
      defaultEndDate.setMonth(defaultEndDate.getMonth() + 1); // Set default end date to 1 month from now
      setCaregiverCommitmentEndDate(defaultEndDate);
    }
  }, []);

  const commitmentOptions = [
    { label: SHORT_TERM, displayLabel: '⌛ Short Term' },
    { label: LONG_TERM, displayLabel: '📋 Long Term' },
  ];

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/servicedays');
    router.push('/(auth)/screens/onboarding/caregiver/servicedays');
  };

  const formatDate = (date: Date | undefined | null) => {
    if (!date) return 'MM/DD/YYYY';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return 'MM/DD/YYYY';

    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate && event.type !== 'dismissed') {
      setCaregiverCommitmentStartDate(selectedDate);

      // If end date is before start date, update end date
      if (
        caregiverCommitmentEndDate &&
        selectedDate > caregiverCommitmentEndDate
      ) {
        setCaregiverCommitmentEndDate(selectedDate);
      }
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate && event.type !== 'dismissed') {
      setCaregiverCommitmentEndDate(selectedDate);
    }
  };

  const renderDatePicker = (isStartDate: boolean) => {
    const showPicker = isStartDate ? showStartDatePicker : showEndDatePicker;
    const currentDate = isStartDate
      ? caregiverCommitmentStartDate || new Date()
      : caregiverCommitmentEndDate || new Date();
    const onDateChange = isStartDate ? onStartDateChange : onEndDateChange;
    const minimumDate = isStartDate ? new Date() : caregiverCommitmentStartDate;

    if (!showPicker) return null;

    return (
      <DateTimePicker
        value={new Date(currentDate)}
        mode='date'
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={onDateChange}
        minimumDate={minimumDate ? new Date(minimumDate) : new Date()}
      />
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.7} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <ThemedText style={styles.title}>
              What do you expect{'\n'}in terms of{'\n'}commitment?
            </ThemedText>

            <ThemedText style={styles.subtitle}>
              Choose just one option
            </ThemedText>

            <View style={styles.optionsContainer}>
              {commitmentOptions.map((option) => (
                <Pill
                  key={option.label}
                  label={option.displayLabel}
                  selected={caregiverCommitmentType === option.label}
                  onPress={() => setCaregiverCommitmentType(option.label)}
                />
              ))}
            </View>

            <View style={styles.dealbreaker}>
              <ThemedText style={styles.dealbreakerText}>
                Dealbreaker
              </ThemedText>
              <Switch
                value={isDealBreaker || false}
                onValueChange={(value) => setIsDealBreaker(value)}
                trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                thumbColor='#FFFFFF'
              />
            </View>

            {caregiverCommitmentType === SHORT_TERM ? (
              <View style={styles.dateContainer}>
                <View style={styles.dateColumn}>
                  <ThemedText style={styles.dateLabel}>Start Date</ThemedText>
                  <TouchableOpacity
                    style={styles.dateInputContainer}
                    onPress={() => setShowStartDatePicker(true)}
                  >
                    <Text style={styles.dateInputText}>
                      {formatDate(caregiverCommitmentStartDate)}
                    </Text>
                    <Ionicons
                      name='calendar-outline'
                      size={20}
                      color='#666666'
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.dateColumn}>
                  <ThemedText style={styles.dateLabel}>End Date</ThemedText>
                  <TouchableOpacity
                    style={styles.dateInputContainer}
                    onPress={() => setShowEndDatePicker(true)}
                  >
                    <Text style={styles.dateInputText}>
                      {formatDate(caregiverCommitmentEndDate)}
                    </Text>
                    <Ionicons
                      name='calendar-outline'
                      size={20}
                      color='#666666'
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.dateColumn}>
                <ThemedText style={styles.dateLabel}>Start Date</ThemedText>
                <TouchableOpacity
                  style={styles.dateInputContainer}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <Text style={styles.dateInputText}>
                    {formatDate(caregiverCommitmentStartDate)}
                  </Text>
                  <Ionicons name='calendar-outline' size={20} color='#666666' />
                </TouchableOpacity>
              </View>
            )}

            {renderDatePicker(true)}
            {renderDatePicker(false)}
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <Button
            // label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={!caregiverCommitmentType}
          />
        </LinearGradient>
      </View>
    </ThemedView>
  );
}

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
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    color: '#002140',
    // marginTop: 20,
    // marginBottom: 40,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
    // justifyContent: 'space-between'
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 24,
  },
  dateColumn: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  dateInputContainer: {
    height: 38,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  dateInputText: {
    fontSize: 16,
    color: '#666666',
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  dealbreaker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  dealbreakerText: {
    fontSize: 16,
    color: '#666666',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 24,
    marginTop: 24,
  },
});

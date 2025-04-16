import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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

type Commitment = 'Long Term' | 'Short Term';

export default function CommitmentScreen() {
  const { family_commitment, setFamilyCommitment, setOnboardingScreen } =
    useUserStore();
  const router = useRouter();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Initialize default dates if they don't exist
  useEffect(() => {
    if (!family_commitment.start_date) {
      setFamilyCommitment({ start_date: new Date() });
    }
    if (!family_commitment.end_date) {
      const defaultEndDate = new Date();
      defaultEndDate.setMonth(defaultEndDate.getMonth() + 1); // Set default end date to 1 month from now
      setFamilyCommitment({ end_date: defaultEndDate });
    }
  }, []);

  const commitmentOptions: Array<{ label: Commitment; icon: string }> = [
    { label: 'Long Term', icon: '📋' },
    { label: 'Short Term', icon: '⌛' },
  ];

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/servicedays');
    router.push('/(auth)/screens/onboarding/family/servicedays');
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'MM/DD/YYYY';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return 'MM/DD/YYYY';

    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const handleStartDateCancel = () => {
    setShowStartDatePicker(false);
  };

  const handleEndDateCancel = () => {
    setShowEndDatePicker(false);
  };

  const handleStartDateConfirm = () => {
    setShowStartDatePicker(false);
  };

  const handleEndDateConfirm = () => {
    setShowEndDatePicker(false);
  };

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate && event.type !== 'dismissed') {
      setFamilyCommitment({ start_date: selectedDate });

      // If end date is before start date, update end date
      if (
        family_commitment.end_date &&
        selectedDate > family_commitment.end_date
      ) {
        setFamilyCommitment({ end_date: selectedDate });
      }
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate && event.type !== 'dismissed') {
      setFamilyCommitment({ end_date: selectedDate });
    }
  };

  const renderDatePicker = (isStartDate: boolean) => {
    const showPicker = isStartDate ? showStartDatePicker : showEndDatePicker;
    const currentDate = isStartDate
      ? family_commitment.start_date || new Date()
      : family_commitment.end_date || new Date();
    const onDateChange = isStartDate ? onStartDateChange : onEndDateChange;
    const minimumDate = isStartDate ? new Date() : family_commitment.start_date;

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

            <View style={styles.optionsContainer}>
              {commitmentOptions.map((option) => (
                <Pill
                  key={option.label}
                  label={option.label}
                  icon={option.icon}
                  selected={
                    family_commitment.selected_commitment === option.label
                  }
                  onPress={() =>
                    setFamilyCommitment({ selected_commitment: option.label })
                  }
                  style={styles.commitmentPill}
                />
              ))}
            </View>

            <View style={styles.dealbreaker}>
              <ThemedText style={styles.dealbreakerText}>
                Dealbreaker
              </ThemedText>
              <Switch
                value={family_commitment.is_dealbreaker}
                onValueChange={(value) =>
                  setFamilyCommitment({ is_dealbreaker: value })
                }
                trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                thumbColor='#FFFFFF'
              />
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>Start Date</Text>
                <Pressable
                  style={styles.dateInput}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <Text style={styles.dateInputText}>
                    {formatDate(family_commitment.start_date)}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.dateColumn}>
                <Text style={styles.dateLabel}>End Date</Text>
                <Pressable
                  style={styles.dateInput}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <Text style={styles.dateInputText}>
                    {formatDate(family_commitment.end_date)}
                  </Text>
                </Pressable>
              </View>
            </View>

            {renderDatePicker(true)}
            {renderDatePicker(false)}
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <Button
            label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={!family_commitment.selected_commitment}
            style={styles.nextButton}
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
    marginTop: 20,
    marginBottom: 40,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  commitmentPill: {
    flex: 1,
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
  dateInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  dateInputText: {
    fontSize: 16,
    color: '#666666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalButton: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: '600',
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
  nextButton: {
    backgroundColor: '#E85B40',
    borderRadius: 25,
    paddingVertical: 16,
    width: '100%',
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
});

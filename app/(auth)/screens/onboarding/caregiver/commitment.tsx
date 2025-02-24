import { StyleSheet, View, ScrollView, Pressable, Platform, Modal, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Pill } from '@/components/ui/Pill';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Commitment = 'Long Term' | 'Short Term';

export default function CommitmentScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Commitment | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const commitmentOptions: Array<{ label: Commitment; icon: string }> = [
    { label: 'Long Term', icon: '📋' },
    { label: 'Short Term', icon: '⌛' },
  ];

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/caregiver/servicedays');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    
    if (Platform.OS === 'android') {
      setShowStartDatePicker(false);
    }

    if (event.type === 'set') {
      setStartDate(currentDate);
      // Ensure end date is not before start date
      if (endDate < currentDate) {
        setEndDate(currentDate);
      }
    } else if (event.type === 'dismissed') {
      setShowStartDatePicker(false);
    }
  };

  const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    
    if (Platform.OS === 'android') {
      setShowEndDatePicker(false);
    }

    if (event.type === 'set') {
      setEndDate(currentDate);
    } else if (event.type === 'dismissed') {
      setShowEndDatePicker(false);
    }
  };

  const handleStartDateConfirm = () => {
    if (Platform.OS === 'ios') {
      setShowStartDatePicker(false);
    }
  };

  const handleEndDateConfirm = () => {
    if (Platform.OS === 'ios') {
      setShowEndDatePicker(false);
    }
  };

  const handleStartDateCancel = () => {
    setShowStartDatePicker(false);
  };

  const handleEndDateCancel = () => {
    setShowEndDatePicker(false);
  };

  const renderDatePicker = (isStartDate: boolean) => {
    const showPicker = isStartDate ? showStartDatePicker : showEndDatePicker;
    const currentDate = isStartDate ? startDate : endDate;
    const handleCancel = isStartDate ? handleStartDateCancel : handleEndDateCancel;
    const handleConfirm = isStartDate ? handleStartDateConfirm : handleEndDateConfirm;
    const onDateChange = isStartDate ? onStartDateChange : onEndDateChange;
    const minimumDate = isStartDate ? new Date() : startDate;

    if (Platform.OS === 'ios') {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPicker}
          onRequestClose={handleCancel}
        >
          <TouchableOpacity 
            style={styles.modalContainer} 
            activeOpacity={1} 
            onPress={handleCancel}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.modalButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={styles.modalButton}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                testID="dateTimePicker"
                value={currentDate}
                mode="date"
                display="spinner"
                onChange={onDateChange}
                minimumDate={minimumDate}
                textColor="#000000"
              />
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }

    if (showPicker) {
      return (
        <DateTimePicker
          testID="dateTimePicker"
          value={currentDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={minimumDate}
        />
      );
    }

    return null;
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
      
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
                  selected={selected === option.label}
                  onPress={() => setSelected(option.label)}
                  style={[
                    styles.pill,
                    selected === option.label && { backgroundColor: Colors.light.primary }
                  ]}
                  textStyle={[
                    selected === option.label && { color: '#FFFFFF' }
                  ]}
                />
              ))}
            </View>

            {selected === 'Long Term' && (
              <View style={styles.centerContainer}>
                <ThemedText style={styles.startDateLabel}>Start Date</ThemedText>
                <Pressable 
                  style={[styles.dateButton, styles.shortDateButton]}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <ThemedText style={styles.dateButtonText}>
                    {formatDate(startDate)}
                  </ThemedText>
                </Pressable>

                {renderDatePicker(true)}
              </View>
            )}

            {selected === 'Short Term' && (
              <View style={styles.dateRow}>
                <View style={styles.dateColumn}>
                  <ThemedText style={styles.startDateLabel}>Start Date</ThemedText>
                  <Pressable 
                    style={styles.dateButton}
                    onPress={() => setShowStartDatePicker(true)}
                  >
                    <ThemedText style={styles.dateButtonText}>
                      {formatDate(startDate)}
                    </ThemedText>
                  </Pressable>
                </View>

                <View style={styles.dateColumn}>
                  <ThemedText style={styles.startDateLabel}>End Date</ThemedText>
                  <Pressable 
                    style={styles.dateButton}
                    onPress={() => setShowEndDatePicker(true)}
                  >
                    <ThemedText style={styles.dateButtonText}>
                      {formatDate(endDate)}
                    </ThemedText>
                  </Pressable>
                </View>

                {renderDatePicker(true)}
                {renderDatePicker(false)}
              </View>
            )}
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button
              label="Next"
              onPress={handleNext}
              variant="compact"
              disabled={!selected || (selected === 'Long Term' && !startDate) || (selected === 'Short Term' && (!startDate || !endDate))}
            />
          </View>
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
    fontFamily: 'Bogart',
    fontWeight: '600',
    marginBottom: 40,
    color: '#002140',
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  pill: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
  },
  startDateLabel: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 12,
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  shortDateButton: {
    width: '60%',
  },
  centerContainer: {
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#666666',
    fontSize: 16,
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
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateColumn: {
    flex: 1,
  },
});
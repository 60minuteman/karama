import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import {
  CaregiverDayOfWeek,
  CaregiverDaySchedule,
  useUserStore,
} from '@/services/state/user';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function ServiceDaysScreen() {
  const router = useRouter();
  const { caregiverSchedule, setCaregiverSchedule, setOnboardingScreen } =
    useUserStore();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState<CaregiverDayOfWeek | null>(
    null
  );
  const [isSettingBeginTime, setIsSettingBeginTime] = useState(true);
  const [activeField, setActiveField] = useState<{
    day: CaregiverDayOfWeek;
    field: 'begin' | 'end';
  } | null>(null);
  const [tempSelectedTime, setTempSelectedTime] = useState<Date>(new Date());

  useEffect(() => {
    console.log(
      'caregiver schedule',
      caregiverSchedule?.map((day) => ({
        day: day.day,
        begin: day.timeSlot?.begin,
        end: day.timeSlot?.end,
      }))
    );
  }, []);

  const handleTimePress = (day: CaregiverDayOfWeek, isBegin: boolean) => {
    setSelectedDay(day);
    setIsSettingBeginTime(isBegin);
    setShowTimePicker(true);
    setActiveField({ day, field: isBegin ? 'begin' : 'end' });
    // Set initial time based on current selection or default
    const currentDay = caregiverSchedule?.find((d) => d.day === day);
    if (currentDay?.timeSlot) {
      const timeString = isBegin
        ? currentDay.timeSlot.begin
        : currentDay.timeSlot.end;
      const [hours, minutes] = timeString.split(':').map(Number);
      const initialTime = new Date();
      initialTime.setHours(hours, minutes, 0, 0);
      setTempSelectedTime(initialTime);
    } else {
      setTempSelectedTime(new Date());
    }
  };

  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isAnyDaySelected = caregiverSchedule?.some((day) => day.isActive);

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.8} />
        {showTimePicker && (
          <>
            <Pressable
              style={styles.overlay}
              onPress={() => {
                setShowTimePicker(false);
                setActiveField(null);
              }}
            />
            <View style={styles.timePickerContainer}>
              <View style={styles.timePickerContent}>
                <DateTimePicker
                  value={tempSelectedTime}
                  mode='time'
                  is24Hour={true}
                  display='spinner'
                  onChange={(event, selectedTime) => {
                    if (selectedTime) {
                      setTempSelectedTime(selectedTime);
                    }
                  }}
                  style={styles.dateTimePicker}
                />
              </View>
              <View style={styles.timePickerButtons}>
                <Pressable
                  style={[styles.timePickerButton, styles.cancelButton]}
                  onPress={() => {
                    setShowTimePicker(false);
                    setActiveField(null);
                  }}
                >
                  <ThemedText style={styles.cancelButtonText}>
                    Cancel
                  </ThemedText>
                </Pressable>

                <Pressable
                  style={[styles.timePickerButton, styles.confirmButton]}
                  onPress={() => {
                    // Confirm the time selection
                    const formattedTime = tempSelectedTime.toLocaleTimeString(
                      'en-US',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      }
                    );

                    if (selectedDay) {
                      const updatedSchedule = caregiverSchedule?.map((day) => {
                        const currentTimeSlot = day.timeSlot || {
                          begin: '00:00',
                          end: '00:00',
                        };

                        if (day.day === selectedDay) {
                          return {
                            ...day,
                            isActive: true,
                            timeSlot: {
                              begin: isSettingBeginTime
                                ? formattedTime
                                : currentTimeSlot.begin,
                              end: isSettingBeginTime
                                ? currentTimeSlot.end
                                : formattedTime,
                            },
                          };
                        }
                        return {
                          ...day,
                          timeSlot: {
                            begin: currentTimeSlot.begin,
                            end: currentTimeSlot.end,
                          },
                        };
                      });
                      setCaregiverSchedule(updatedSchedule);
                    }

                    setShowTimePicker(false);
                    setActiveField(null);
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
        <View style={styles.titleContainer}>
          <ThemedText style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}>
            Choose your{'\n'}availability
          </ThemedText>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scheduleContainer}>
            <View style={styles.headerRow}>
              <View style={styles.dayColumn} />
              <ThemedText style={styles.headerText}>Begin</ThemedText>
              <ThemedText style={styles.headerText}>End</ThemedText>
            </View>

            {caregiverSchedule?.map((day) => (
              <View key={day.day} style={styles.dayRow}>
                <View style={styles.dayColumn}>
                  <Pressable
                    style={[
                      styles.dayPill,
                      day.isActive && styles.activeDayPill,
                      !day.isActive && styles.inactiveDayPill,
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.dayText,
                        day.isActive && styles.activeDayText,
                        !day.isActive && styles.inactiveDayText,
                      ]}
                    >
                      {day.day}
                    </ThemedText>
                  </Pressable>
                </View>
                <Pressable
                  style={[
                    styles.timePill,
                    activeField?.day === day.day &&
                      activeField?.field === 'begin' &&
                      styles.activeTimePill,
                    day.isActive && styles.filledTimePill,
                    !day.isActive && styles.inactiveTimePill,
                  ]}
                  onPress={() => handleTimePress(day.day, true)}
                >
                  <ThemedText
                    style={[
                      styles.timeText,
                      day.isActive && styles.filledTimeText,
                      !day.isActive && styles.inactiveTimeText,
                    ]}
                  >
                    {formatTimeDisplay(day.timeSlot.begin)}
                  </ThemedText>
                </Pressable>
                <Pressable
                  style={[
                    styles.timePill,
                    activeField?.day === day.day &&
                      activeField?.field === 'end' &&
                      styles.activeTimePill,
                    day.isActive && styles.filledTimePill,
                    !day.isActive && styles.inactiveTimePill,
                  ]}
                  onPress={() => handleTimePress(day.day, false)}
                >
                  <ThemedText
                    style={[
                      styles.timeText,
                      day.isActive && styles.filledTimeText,
                      !day.isActive && styles.inactiveTimeText,
                    ]}
                  >
                    {formatTimeDisplay(day.timeSlot.end)}
                  </ThemedText>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonContainer}
        >
          <Button
            // label='Next'
            onPress={() => {
              setOnboardingScreen(
                '/(auth)/screens/onboarding/caregiver/responsibilities'
              );
              router.push(
                '/(auth)/screens/onboarding/caregiver/responsibilities'
              );
            }}
            variant='compact'
            disabled={!isAnyDaySelected}
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
  titleContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart',
    fontWeight: '600',
    color: Colors.light.text,
  },
  scheduleContainer: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  dayColumn: {
    width: 80,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  dayPill: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  activeDayPill: {
    backgroundColor: Colors.light.primary,
  },
  inactiveDayPill: {
    backgroundColor: '#EEEEEE',
  },
  dayText: {
    fontSize: 14,
    color: '#002140',
    fontWeight: '500',
  },
  activeDayText: {
    color: '#FFFFFF',
  },
  inactiveDayText: {
    color: '#999999',
  },
  timePill: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  activeTimePill: {
    borderWidth: 2,
    borderColor: '#FF9500',
  },
  filledTimePill: {
    backgroundColor: Colors.light.primary,
  },
  inactiveTimePill: {
    backgroundColor: '#EEEEEE',
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
  },
  filledTimeText: {
    color: '#FFFFFF',
  },
  inactiveTimeText: {
    color: '#999999',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    alignSelf: 'flex-end',
  },
  timePickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
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
  },
  timePickerContent: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimePicker: {
    width: '100%',
    height: 80,
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
  timePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 0,
    gap: 16,
  },
  timePickerButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
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

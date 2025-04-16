import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

interface TimeSlot {
  begin: string;
  end: string;
}

interface DaySchedule {
  day: DayOfWeek;
  timeSlot: TimeSlot;
  isActive: boolean;
}

export default function ServiceDaysScreen() {
  const router = useRouter();
  const { family_schedule, setFamilySchedule, setOnboardingScreen } =
    useUserStore();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [isSettingBeginTime, setIsSettingBeginTime] = useState(true);
  const [activeField, setActiveField] = useState<{
    day: DayOfWeek;
    field: 'begin' | 'end';
  } | null>(null);

  const handleTimeSelect = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime && selectedDay) {
      const formattedTime = selectedTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const updatedSchedule = family_schedule.map((day) => {
        const currentTimeSlot = day.timeSlot || {
          begin: '00:00',
          end: '00:00',
        };

        if (day.day === selectedDay) {
          return {
            ...day,
            isActive: true,
            timeSlot: {
              begin: isSettingBeginTime ? formattedTime : currentTimeSlot.begin,
              end: isSettingBeginTime ? currentTimeSlot.end : formattedTime,
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
      setFamilySchedule(updatedSchedule);
    }
    setActiveField(null);
  };

  const handleTimePress = (day: DayOfWeek, isBegin: boolean) => {
    setSelectedDay(day);
    setIsSettingBeginTime(isBegin);
    setShowTimePicker(true);
    setActiveField({ day, field: isBegin ? 'begin' : 'end' });
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/responsibilities');
    router.push('/(auth)/screens/onboarding/family/responsibilities');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.8} />

        {showTimePicker && (
          <>
            <View style={styles.overlay} />
            <View style={styles.timePickerContainer}>
              <DateTimePicker
                value={new Date()}
                mode='time'
                is24Hour={true}
                display='spinner'
                onChange={handleTimeSelect}
              />
            </View>
          </>
        )}

        <View style={styles.titleContainer}>
          <ThemedText style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
            What days and{'\n'}hours would you{'\n'}need a caregiver?
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

            {family_schedule.map((day) => (
              <View key={day.day} style={styles.dayRow}>
                <View style={styles.dayColumn}>
                  <Pressable
                    style={[
                      styles.dayPill,
                      day.isActive && styles.activeDayPill,
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.dayText,
                        day.isActive && styles.activeDayText,
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
                  ]}
                  onPress={() => handleTimePress(day.day, true)}
                >
                  <ThemedText style={styles.timeText}>
                    {day.timeSlot?.begin || '00:00'}
                  </ThemedText>
                </Pressable>
                <Pressable
                  style={[
                    styles.timePill,
                    activeField?.day === day.day &&
                      activeField?.field === 'end' &&
                      styles.activeTimePill,
                  ]}
                  onPress={() => handleTimePress(day.day, false)}
                >
                  <ThemedText style={styles.timeText}>
                    {day.timeSlot?.end || '00:00'}
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
          <Button label='Next' onPress={handleNext} variant='compact' />
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
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#002140',
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
  dayText: {
    fontSize: 14,
    color: '#002140',
    fontWeight: '500',
  },
  activeDayText: {
    color: '#FFFFFF',
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
  timeText: {
    fontSize: 14,
    color: '#666666',
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  timePickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

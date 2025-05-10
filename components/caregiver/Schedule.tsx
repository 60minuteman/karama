import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface ScheduleDay {
  day: string;
  hours: string;
}

interface ScheduleProps {
  title?: string;
  totalHours?: string;
  schedule?: ScheduleDay[];
}

export const Schedule: React.FC<ScheduleProps> = ({
  title = 'Schedule',
  totalHours = '40 Hours',
  schedule = [
    { day: 'Mon', hours: '7am - 7pm' },
    { day: 'Tue', hours: '7am - 2pm' },
    { day: 'Wed', hours: '4pm - 8pm' },
    { day: 'Thur', hours: '7am - 5pm' },
    { day: 'Fri', hours: '7am - 7pm' },
  ],
}) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.totalHours}>{totalHours}</ThemedText>
      
      <View style={styles.scheduleContainer}>
        {schedule.map((item, index) => (
          <Pill2
            key={index}
            label={`${item.day} : ${item.hours}`}
            style={styles.schedulePill}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#666666',
    marginBottom: 8,
  },
  totalHours: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#EB4430',
    marginBottom: 16,
  },
  scheduleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  schedulePill: {
    backgroundColor: '#F4F4F4',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
}); 
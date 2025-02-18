import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';

interface PastPositionProps {
  positionName: string;
}

export const PastPosition = ({
  positionName
}: PastPositionProps) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf')
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock data - in real app would come from API/database
  const positionData = {
    title: "First position",
    familyName: positionName,
    dates: {
      start: "11/02/2021", 
      end: "11/02/2023"
    },
    position: "Caregiver/Household Manager",
    ages: [
      { icon: '👨‍🎓', label: 'School Age' },
      { icon: '🧸', label: 'Toddler' },
      { icon: '📝', label: 'Pre Schooler' },
    ],
    workOptions: [
      { icon: '⏰', label: 'Full Time' },
      { icon: '📅', label: 'Long Term' }, 
      { icon: '💤', label: 'Live In' },
    ],
    childcareResponsibilities: [
      { icon: '🛁', label: 'Bathing' },
      { icon: '🍕', label: 'Packing Lunch' },
      { icon: '👩‍🏫', label: 'Tutoring' },
      { icon: '📊', label: 'Play Dates' },
      { icon: '🚂', label: 'Commuting' },
      { icon: '🍼', label: 'Bottle Feeding' },
      { icon: '📝', label: 'Diaper Change' },
      { icon: '📖', label: 'Homework Help' },
    ],
    householdResponsibilities: [
      { icon: '🔍', label: 'Cooking' },
      { icon: '🐾', label: 'Pet Care' },
      { icon: '🥗', label: 'Meal Prep' },
      { icon: '📊', label: 'Household Budgeting' },
      { icon: '🏠', label: 'Vendor/ Services Management' },
      { icon: '🧹', label: 'Deep Housekeeping' },
      { icon: '👕', label: 'Laundry' },
    ]
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{positionData.title}</ThemedText>
      <ThemedText style={styles.familyName}>{positionData.familyName}</ThemedText>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Start & End Date</ThemedText>
        <View style={styles.datesContainer}>
          <Pill2 label={positionData.dates.start} style={styles.pill} />
          <ThemedText style={styles.dateSeparator}>-</ThemedText>
          <Pill2 label={positionData.dates.end} style={styles.pill} />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Position</ThemedText>
        <Pill2 icon="👤" label={positionData.position} style={styles.pill} />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Ages</ThemedText>
        <View style={styles.pillsContainer}>
          {positionData.ages.map((age, index) => (
            <Pill2 key={index} icon={age.icon} label={age.label} style={styles.pill} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Work Options</ThemedText>
        <View style={styles.pillsContainer}>
          {positionData.workOptions.map((option, index) => (
            <Pill2 key={index} icon={option.icon} label={option.label} style={styles.pill} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Childcare Responsibilities</ThemedText>
        <View style={styles.pillsContainer}>
          {positionData.childcareResponsibilities.map((responsibility, index) => (
            <Pill2 key={index} icon={responsibility.icon} label={responsibility.label} style={styles.pill} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Household Responsibilities</ThemedText>
        <View style={styles.pillsContainer}>
          {positionData.householdResponsibilities.map((responsibility, index) => (
            <Pill2 key={index} icon={responsibility.icon} label={responsibility.label} style={styles.pill} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#261D2A',
    marginBottom: 8,
  },
  familyName: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold',
    color: '#261D2A',
    marginBottom: 32,
    lineHeight: 38,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#261D2A',
    opacity: 0.6,
    marginBottom: 12,
  },
  datesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateSeparator: {
    fontSize: 20,
    color: '#261D2A',
    opacity: 0.4,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#F4F3F4',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
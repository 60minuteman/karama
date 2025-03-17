import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from '@expo-google-fonts/poppins';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PastPositionProps {
  positionName: any;
}

export const PastPosition = ({ positionName }: PastPositionProps) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock data - in real app would come from API/database
  const positionData = {
    title: 'First position',
    familyName: positionName?.family_or_business_name,
    dates: {
      start: positionName?.start_date,
      end: positionName?.end_date,
    },
    position: positionName?.position_type,
    ages: positionName?.children_age_group,
    workOptions: [],
    childcareResponsibilities: positionName?.childcare_responsibilities,
    householdResponsibilities: positionName?.household_responsibilities,
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{positionData.title}</ThemedText>
      <ThemedText style={styles.familyName}>
        {positionData.familyName}
      </ThemedText>

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
        <Pill2 icon='👤' label={positionData.position} style={styles.pill} />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Ages</ThemedText>
        <View style={styles.pillsContainer}>
          {positionData.ages.map((age: any, index: any) => (
            <Pill2
              key={index}
              icon={age.icon}
              label={age}
              style={styles.pill}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Work Options</ThemedText>
        <View style={styles.pillsContainer}>
          {positionData.workOptions.map((option, index) => (
            <Pill2
              key={index}
              // icon={option.icon}
              label={option}
              style={styles.pill}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Childcare Responsibilities
        </ThemedText>
        <View style={styles.pillsContainer}>
          {positionData.childcareResponsibilities.map(
            (responsibility: any, index: any) => (
              <Pill2
                key={index}
                // icon={responsibility.icon}
                label={responsibility}
                style={styles.pill}
              />
            )
          )}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Household Responsibilities
        </ThemedText>
        <View style={styles.pillsContainer}>
          {positionData.householdResponsibilities.map(
            (responsibility: any, index: any) => (
              <Pill2
                key={index}
                // icon={responsibility.icon}
                label={responsibility}
                style={styles.pill}
              />
            )
          )}
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

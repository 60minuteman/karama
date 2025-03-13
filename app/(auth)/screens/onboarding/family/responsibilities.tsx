import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface Responsibility {
  id: string;
  label: string;
  icon: string;
}

const childcareResponsibilities: Responsibility[] = [
  { id: 'bathing', label: 'Bathing', icon: '🛁' },
  { id: 'laundry', label: 'Laundry', icon: '🧺' },
  { id: 'packingLunch', label: 'Packing Lunch', icon: '🥪' },
  { id: 'driving', label: 'Driving', icon: '🚗' },
  { id: 'cooking', label: 'Cooking', icon: '🍳' },
  { id: 'playDates', label: 'Play Dates', icon: '🎮' },
  { id: 'commuting', label: 'Commuting', icon: '🚌' },
  { id: 'scheduling', label: 'Scheduling/ Planning', icon: '📅' },
  { id: 'sleepScheduling', label: 'Sleep Scheduling', icon: '💤' },
  { id: 'tutoring', label: 'Tutoring', icon: '📚' },
  { id: 'homeworkHelp', label: 'Homework Help', icon: '📝' },
  { id: 'roomOrg', label: 'Room organization', icon: '🏠' },
  { id: 'foodPrep', label: 'Food prep', icon: '🥗' },
  { id: 'diaperChange', label: 'Diaper Change', icon: '👶' },
  { id: 'pottyTraining', label: 'Potty training', icon: '🚽' },
  { id: 'organization', label: 'Organization', icon: '📋' },
  { id: 'lightHouseKeeping', label: 'Light house keeping', icon: '🧹' },
  { id: 'roomOrganization', label: 'Room Organization', icon: '🏠' },
  { id: 'groceryShopping', label: 'Grocery Shopping', icon: '🛒' },
  { id: 'childcareErrands', label: 'Childcare Errands', icon: '🏃' },
  { id: 'feeding', label: 'Feeding', icon: '🍼' },
  { id: 'pottyTraining2', label: 'Potty Training', icon: '🚽' },
  { id: 'other', label: 'Other', icon: '➕' },
];

const householdResponsibilities: Responsibility[] = [
  { id: 'cooking2', label: 'Cooking', icon: '👩‍🍳' },
  { id: 'laundry2', label: 'Laundry', icon: '👕' },
  { id: 'mealPrep', label: 'Meal Prep', icon: '🥘' },
  { id: 'ironing', label: 'Ironing', icon: '👔' },
  { id: 'errands', label: 'Errands', icon: '🏃' },
  { id: 'petCare', label: 'Pet Care', icon: '🐾' },
  { id: 'eventPlanning', label: 'Event Planning', icon: '🎉' },
  { id: 'trashRecycling', label: 'Trash & Recycling', icon: '🗑️' },
  { id: 'lightHousekeeping2', label: 'Light Housekeeping', icon: '🧹' },
  { id: 'deepHousekeeping', label: 'Deep Housekeeping', icon: '🧽' },
  { id: 'managingProperties', label: 'Managing Properties', icon: '🏘️' },
  { id: 'householdBudgeting', label: 'Household Budgeting', icon: '💰' },
  { id: 'hiringStaff', label: 'Hiring & Supervising Staff', icon: '👥' },
  { id: 'propertyManagement', label: 'Property Management', icon: '🏢' },
  { id: 'dishwasher', label: 'Loading/Unloading Dishwasher', icon: '🍽️' },
  { id: 'other2', label: 'Other', icon: '➕' },
];

export default function ResponsibilitiesScreen() {
  const router = useRouter();
  const {
    family_responsibilities,
    setFamilyResponsibilities,
    setOnboardingScreen,
  } = useUserStore();

  const toggleResponsibility = (id: string) => {
    setFamilyResponsibilities(
      family_responsibilities.includes(id)
        ? family_responsibilities.filter((item) => item !== id)
        : [...family_responsibilities, id]
    );
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/payment');
    router.push('/(auth)/screens/onboarding/family/payment');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.9} />

        <ThemedText style={styles.title}>
          What responsibilities{'\n'}do you require your{'\n'}caregiver to
          fulfill?
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText style={styles.subtitle}>
            Please note that assigning more responsibilities to your caregiver
            will likely result in a higher rate charged for their services.
          </ThemedText>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Childcare Responsibilities
            </ThemedText>
            <View style={styles.pillsContainer}>
              {childcareResponsibilities.map((item) => (
                <Pill
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  selected={family_responsibilities.includes(item.id)}
                  onPress={() => toggleResponsibility(item.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Household Responsibilities
            </ThemedText>
            <View style={styles.pillsContainer}>
              {householdResponsibilities.map((item) => (
                <Pill
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  selected={family_responsibilities.includes(item.id)}
                  onPress={() => toggleResponsibility(item.id)}
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
              label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={family_responsibilities.length === 0}
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
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 16,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 32,
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
  },
});

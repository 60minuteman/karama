import { StyleSheet, View, ScrollView } from 'react-native';
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
import { useUserStore } from '@/services/state/user';

interface Responsibility {
  id: string;
  label: string;
  icon: string;
}

const childcareResponsibilities: Responsibility[] = [
  { id: 'bathing' as const, label: 'Bathing', icon: '🛁' },
  { id: 'laundry' as const, label: 'Laundry', icon: '🧺' },
  { id: 'packingLunch' as const, label: 'Packing Lunch', icon: '🥪' },
  { id: 'driving' as const, label: 'Driving', icon: '🚗' },
  { id: 'cooking' as const, label: 'Cooking', icon: '🍳' },
  { id: 'playDates' as const, label: 'Play Dates', icon: '🎮' },
  { id: 'commuting' as const, label: 'Commuting', icon: '🚌' },
  { id: 'scheduling' as const, label: 'Scheduling/ Planning', icon: '📅' },
  { id: 'sleepScheduling' as const, label: 'Sleep Scheduling', icon: '💤' },
  { id: 'tutoring' as const, label: 'Tutoring', icon: '📚' },
  { id: 'homeworkHelp' as const, label: 'Homework Help', icon: '📝' },
  { id: 'roomOrg' as const, label: 'Room organization', icon: '🏠' },
  { id: 'foodPrep' as const, label: 'Food prep', icon: '🥗' },
  { id: 'diaperChange' as const, label: 'Diaper Change', icon: '👶' },
  { id: 'pottyTraining' as const, label: 'Potty training', icon: '🚽' },
  { id: 'organization' as const, label: 'Organization', icon: '📋' },
  { id: 'lightHouseKeeping' as const, label: 'Light house keeping', icon: '🧹' },
  { id: 'roomOrganization' as const, label: 'Room Organization', icon: '🏠' },
  { id: 'groceryShopping' as const, label: 'Grocery Shopping', icon: '🛒' },
  { id: 'childcareErrands' as const, label: 'Childcare Errands', icon: '🏃' },
  { id: 'feeding' as const, label: 'Feeding', icon: '🍼' },
  { id: 'pottyTraining2' as const, label: 'Potty Training', icon: '🚽' },
  { id: 'other' as const, label: 'Other', icon: '➕' },
];

const householdResponsibilities: Responsibility[] = [
  { id: 'cooking2' as const, label: 'Cooking', icon: '👩‍🍳' },
  { id: 'laundry2' as const, label: 'Laundry', icon: '👕' },
  { id: 'mealPrep' as const, label: 'Meal Prep', icon: '🥘' },
  { id: 'errands' as const, label: 'Errands', icon: '🏃' },
  { id: 'petCare' as const, label: 'Pet Care', icon: '🐾' },
  { id: 'eventPlanning' as const, label: 'Event Planning', icon: '🎉' },
  { id: 'trashRecycling' as const, label: 'Trash & Recycling', icon: '🗑️' },
  { id: 'lightHousekeeping2' as const, label: 'Light Housekeeping', icon: '🧹' },
  { id: 'deepHousekeeping' as const, label: 'Deep Housekeeping', icon: '🧽' },
  { id: 'managingProperties' as const, label: 'Managing Properties', icon: '🏘️' },
  { id: 'householdBudgeting' as const, label: 'Household Budgeting', icon: '💰' },
  { id: 'hiringStaff' as const, label: 'Hiring & Supervising Staff', icon: '👥' },
  { id: 'propertyManagement' as const, label: 'Property Management', icon: '🏢' },
  { id: 'dishwasher' as const, label: 'Loading/Unloading Dishwasher', icon: '🍽️' },
  { id: 'other2' as const, label: 'Other', icon: '➕' },
];

export default function ResponsibilitiesScreen() {
  const router = useRouter();
  // const [selectedResponsibilities, setSelectedResponsibilities] = useState<string[]>([]);
  const {
    caregiverChildcareResponsibilities,
    setCaregiverChildcareResponsibilities,
    caregiverHouseholdResponsibilities,
    setCaregiverHouseholdResponsibilities,
    setOnboardingScreen
  } = useUserStore()
  const toggleChildcareResponsibility = (id: string) => {
    const prev = caregiverChildcareResponsibilities ?? [];
    const selectedResponsibilities = prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id];
    setCaregiverChildcareResponsibilities(selectedResponsibilities);
  };
  const toggleHouseholdResponsibility = (id: string) => {
    const prev = caregiverHouseholdResponsibilities ?? [];
    const selectedResponsibilities = prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id];
    setCaregiverHouseholdResponsibilities(selectedResponsibilities);
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.9} />

        <ThemedText style={styles.title}>
          What responsibilities{'\n'}are you willing{'\n'}to perform?
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText style={styles.subtitle}>
            Please note that taking on more responsibilities may increase your rate.
          </ThemedText>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Childcare Responsibilities</ThemedText>
            <View style={styles.pillsContainer}>
              {childcareResponsibilities.map((item) => (
                <Pill
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  selected={caregiverChildcareResponsibilities?.includes(item.id)}
                  onPress={() => toggleChildcareResponsibility(item.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Household Responsibilities</ThemedText>
            <View style={styles.pillsContainer}>
              {householdResponsibilities.map((item) => (
                <Pill
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  selected={caregiverHouseholdResponsibilities?.includes(item.id)}
                  onPress={() => toggleHouseholdResponsibility(item.id)}
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
              label="Next"
              onPress={() => {
                setOnboardingScreen('/(auth)/screens/onboarding/caregiver/payment')
                router.push('/(auth)/screens/onboarding/caregiver/payment')
              }}
              variant="compact"
              disabled={caregiverChildcareResponsibilities?.length === 0 || caregiverHouseholdResponsibilities?.length === 0}
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
    fontFamily: 'Bogart',
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
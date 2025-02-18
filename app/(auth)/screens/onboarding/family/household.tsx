import { useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';

type Category = 'Diet' | 'Rules' | 'Religion';
type Selection = { [key: string]: boolean };

export default function HouseholdScreen() {
  const router = useRouter();
  const [selections, setSelections] = useState<Selection>({});
  const [showDiet, setShowDiet] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showReligion, setShowReligion] = useState(false);

  const categories = {
    Diet: [
      { label: 'Vegan', icon: '🥬' },
      { label: 'Vegetarian', icon: '🥗' },
      { label: 'Halal', icon: '🍖' },
      { label: 'Meat Eater', icon: '🍗' },
      { label: 'Kosher', icon: '🥩' },
      { label: 'Pescatarian', icon: '🐟' },
      { label: 'Sugar Free', icon: '🍬' },
      { label: 'None', icon: '⛔' },
      { label: 'Other', icon: '🥑' },
    ],
    Rules: [
      { label: 'No Screens', icon: '📱' },
      { label: 'No Vapping', icon: '💨' },
      { label: 'Be Kind', icon: '😊' },
      { label: 'No Hitting', icon: '👊' },
      { label: 'No Nuts', icon: '🥜' },
      { label: 'No Swearing', icon: '🤬' },
      { label: 'No Long Nails', icon: '💅' },
      { label: 'No Bullying', icon: '🐂' },
      { label: 'No Perfume', icon: '🌸' },
      { label: 'No Smoking', icon: '😤' },
      { label: 'No Throwing Balls', icon: '🔴' },
      { label: 'No Jumping On Furniture', icon: '🛋️' },
      { label: 'Other', icon: '🎯' },
    ],
    Religion: [
      { label: 'Islam', icon: '🕌' },
      { label: 'Taoism', icon: '☯️' },
      { label: 'Buddhism', icon: '🕉️' },
      { label: 'Judaism', icon: '✡️' },
      { label: 'Hinduism', icon: '🕉️' },
      { label: 'Christianity', icon: '✝️' },
      { label: 'Athesisim', icon: '🧬' },
      { label: 'Other', icon: '🙏' },
    ],
  };

  const toggleSelection = (category: string, label: string) => {
    setSelections(prev => ({
      ...prev,
      [`${category}-${label}`]: !prev[`${category}-${label}`],
    }));
  };

  const handleNext = () => {
    if (selections['Diet-Other']) {
      router.push('/(auth)/screens/onboarding/family/otherDiet');
    } else {
      router.push('/(auth)/screens/onboarding/family/philosophy');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />
        
        <ThemedText style={styles.title}>
          Tell us about your{'\n'}household.
        </ThemedText>

        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={[Colors.light.background, `${Colors.light.background}00`]}
            style={styles.topGradient}
          />
          
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {(Object.keys(categories) as Category[]).map((category) => (
              <View key={category} style={styles.categoryContainer}>
                <ThemedText style={styles.categoryTitle}>{category}</ThemedText>
                <View style={styles.pillsContainer}>
                  {categories[category].map((item) => (
                    <Pill
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                      selected={selections[`${category}-${item.label}`]}
                      onPress={() => toggleSelection(category, item.label)}
                    />
                  ))}
                </View>
                <View style={styles.toggleContainer}>
                  <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
                  <Switch
                    value={
                      category === 'Diet' ? showDiet :
                      category === 'Rules' ? showRules :
                      showReligion
                    }
                    onValueChange={(value) => {
                      if (category === 'Diet') setShowDiet(value);
                      if (category === 'Rules') setShowRules(value);
                      if (category === 'Religion') setShowReligion(value);
                    }}
                    trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            ))}
            
            <View style={styles.spacerBottom} />
          </ScrollView>

          <LinearGradient
            colors={[`${Colors.light.background}00`, Colors.light.background]}
            style={styles.buttonGradient}
          >
            <View style={styles.buttonContainer}>
              <Button
                label="Skip"
                onPress={handleNext}
                variant="compact"
              />
              <Button
                label="Next"
                onPress={handleNext}
                variant="compact"
                disabled={Object.keys(selections).length === 0}
              />
            </View>
          </LinearGradient>
        </View>
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
  spacerBottom: {
    height: 100,
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  categoryContainer: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  toggleText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#666',
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
    justifyContent: 'space-between',
  },
});
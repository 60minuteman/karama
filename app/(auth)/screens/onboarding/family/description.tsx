import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import { StyleSheet, Switch, View } from 'react-native';

type FamilyType =
  | '🧍🏻‍♀️ Mom'
  | '🧍🏽 Dad'
  | '👩🏻‍🤝‍👨🏾 Mom & Dad'
  | '👩🏻‍🤝‍👩🏽 Moms'
  | '👨🏽‍🤝‍👨🏾 Dads'
  | '🦹 Guardian'
  | '💝 Other';

export default function FamilyDescriptionScreen() {
  const router = useRouter();
  const { setFamilyDescription, family_description, setOnboardingScreen } =
    useUserStore();

  const familyTypes: { type: FamilyType }[] = [
    { type: '🧍🏻‍♀️ Mom' },
    { type: '👩🏻‍🤝‍👨🏾 Mom & Dad' },
    { type: '🧍🏽 Dad' },
    { type: '👩🏻‍🤝‍👩🏽 Moms' },
    { type: '👨🏽‍🤝‍👨🏾 Dads' },
    { type: '🦹 Guardian' },
    { type: '💝 Other' },
  ];

  const handleNext = () => {
    if (family_description?.type) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/number');
      router.push('/(auth)/screens/onboarding/family/number');
    } 
  };

  const handleAdd = (item: any) => {
    if (item === '💝 Other') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherFamilyDescriptionScreen');
      router.push('/(auth)/screens/onboarding/family/otherFamilyDescriptionScreen');
      return
    }
    setFamilyDescription({ type: item });
  }

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.5} />

        <ThemedText style={styles.title}>
          Which best{'\n'}describes your{'\n'}family?
        </ThemedText>

        <View style={styles.pillsContainer}>
          {familyTypes.map((item) => (
            <Pill
              key={item.type}
              icon={item.type.split(' ')[0]}
              label={item.type.split(' ').slice(1).join(' ')}
              selected={family_description?.type === item.type}
              onPress={() => handleAdd(item.type)}
            />
          ))}
        </View>

        <View style={styles.toggleContainer}>
          <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
          <Switch
            value={family_description?.showOnProfile}
            onValueChange={() =>
              setFamilyDescription({
                showOnProfile: !family_description?.showOnProfile,
              })
            }
            trackColor={{ false: '#E5E5E5', true: Colors.light.primary }}
            thumbColor='#FFFFFF'
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={!family_description?.type}
          />
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
  spacer: {
    height: 120,
  },
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  pillsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '500',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
});

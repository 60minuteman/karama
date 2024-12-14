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

type Philosophy = 
  | 'Montessori' | 'Waldorf/ Steiner' | 'Harkness' | 'Sudbury'
  | 'Reggio Emillia' | 'Gentle Parenting' | 'Permissive Parenting'
  | 'Authoritative Parenting' | 'Baby Led-Weaning' 
  | 'Authoritarian Parenting' | 'Other' | 'None';

export default function PhilosophyScreen() {
  const router = useRouter();
  const [selectedPhilos, setSelectedPhilos] = useState<Philosophy[]>([]);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const philosophies: { type: Philosophy; icon: string }[] = [
    { type: 'Montessori', icon: '🌈' },
    { type: 'Waldorf/ Steiner', icon: '🌈' },
    { type: 'Harkness', icon: '🌈' },
    { type: 'Sudbury', icon: '🌈' },
    { type: 'Reggio Emillia', icon: '🌈' },
    { type: 'Gentle Parenting', icon: '🌈' },
    { type: 'Permissive Parenting', icon: '🌈' },
    { type: 'Authoritative Parenting', icon: '🌈' },
    { type: 'Baby Led-Weaning', icon: '🌈' },
    { type: 'Authoritarian Parenting', icon: '🌈' },
    { type: 'Other', icon: '🌈' },
    { type: 'None', icon: '⛔' },
  ];

  const togglePhilosophy = (philo: Philosophy) => {
    if (philo === 'None') {
      setSelectedPhilos(['None']);
    } else {
      setSelectedPhilos(prev => {
        if (prev.includes('None')) {
          return [philo];
        }
        return prev.includes(philo)
          ? prev.filter(p => p !== philo)
          : [...prev, philo];
      });
    }
  };

  const handleNext = () => {
    if (selectedPhilos.includes('Other')) {
      router.push('/(auth)/screens/onboarding/family/otherPhilo');
    } else {
      router.push('/(auth)/screens/onboarding/family/next-screen');
    }
  };

  const handleOther = () => {
    router.push('/(auth)/screens/onboarding/family/otherPhilo');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />
        
        <ThemedText style={styles.title}>
          Do you practice any{'\n'}educational or{'\n'}parenting{'\n'}philosophies?
        </ThemedText>

        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
            style={styles.topGradient}
          />
          
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.pillsContainer}>
              {philosophies.map(({ type, icon }) => (
                <Pill
                  key={type}
                  label={type}
                  icon={icon}
                  selected={selectedPhilos.includes(type)}
                  onPress={() => type === 'Other' ? handleOther() : togglePhilosophy(type)}
                />
              ))}
            </View>

            <View style={styles.toggleContainer}>
              <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
              <Switch
                value={showOnProfile}
                onValueChange={setShowOnProfile}
                trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={styles.spacerBottom} />
          </ScrollView>

          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
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
                disabled={selectedPhilos.length === 0}
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
    fontFamily: 'Poppins-Medium',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  toggleText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.light.text,
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
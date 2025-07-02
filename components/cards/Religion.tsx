import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ReligionProps {
  religion?: string;
  personality?: string[];
  disabilities?: string[];
  data?: any;
  role?: any;
}

export const Religion = ({
  religion = 'Buddhism',
  personality = ['Caring', 'Patient', 'Creative'],
  disabilities = ['Dyslexia', 'ADHD'],
  data,
  role,
}: ReligionProps) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
  });

  // console.log('data=======', data?.caregiver_profile?.pictures[2]?.path);

  const religionIcons: { [key: string]: string } = {
    Buddhism: '☸️',
    Christianity: '✝️',
    Islam: '☪️',
    Judaism: '✡️',
    Hinduism: '🕉️',
    Sikhism: '🪔',
    Other: '🙏',
    None: '❌',
  };

  const personalityIcons: { [key: string]: string } = {
    Caring: '💝',
    Patient: '🧘‍♀️',
    Creative: '🎨',
    Energetic: '⚡',
    Organized: '📋',
    Fun: '🎮',
    Calm: '🌊',
    Reliable: '🤝',
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          {role === 'CAREGIVER' ? 'My' : 'Our'} Religion
        </ThemedText>
        <View style={styles.pillContainer}>
          <Pill2
            // icon={religionIcons[religion] || religionIcons['Other']}
            label={
              data?.household_info?.religion.replace(/["{}]/g, '') ||
              data?.characteristics?.religion.replace(/["{}]/g, '')
            }
            style={styles.pill}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          {role === 'CAREGIVER' ? 'My' : ''} Personality
        </ThemedText>
        {role === 'CAREGIVER' ? (
          <View style={styles.pillContainer}>
            {data?.characteristics?.personalities?.map((item) => (
              <Pill2
                // icon={personalityIcons[trait] || '✨'}
                label={item}
                style={styles.pill}
              />
            ))}
          </View>
        ) : (
          <View style={styles.pillContainer}>
            {data?.caregiver_preference?.personalities?.map((trait, index) => (
              <Pill2
                key={index}
                // icon={personalityIcons[trait] || '✨'}
                label={trait}
                style={styles.pill}
              />
            ))}
          </View>
        )}
      </View>

      {role === 'CAREGIVER' && (
        <View style={styles.section}>
          {data?.experience_with_disabilities?.disabilities?.length > 0 && (
            <>
              <ThemedText style={styles.sectionTitle}>
                Disability Experience
              </ThemedText>
              <View style={styles.pillContainer}>
                {data?.experience_with_disabilities?.disabilities?.map(
                  (disability: any, index: any) => (
                    <Pill2 key={index} label={disability} style={styles.pill} />
                  )
                )}
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: 'rgba(38, 29, 42, 0.4)',
    marginBottom: 12,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});

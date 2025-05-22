import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface WorkProps {
  animals?: Array<{
    icon: string;
    label: string;
  }>;
  data: any
}

export const Work = ({
  animals = [
    { icon: '🐱', label: 'Cat' },
    { icon: '🐸', label: 'Frog' },
    { icon: '🐮', label: 'Cow' },
  ],
  data
}: WorkProps) => {
  let [fontsLoaded] = useFonts({
    'Bogart-Regular': require('../../assets/fonts/bogart/Bogart-Regular-trial.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  // console.log(data.disabilities, 'data.disabilities');
  const animalsData = data?.experience_with_pets?.pets || [];
  
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>I can work with</ThemedText>
        <View style={styles.pillsContainer}>
          {animalsData?.map((animal: any, index: any) => (
            <View key={index} style={styles.pillWrapper}>
              <Pill2
                //  icon={animal.icon}
                label={animal}
                style={styles.pill}
              />
            </View>
          ))}

          {data?.experience_with_pets?.other && (
            <View  style={styles.pillWrapper}>
              <Pill2
                //  icon={animal.icon}
                label={data?.experience_with_pets?.other}
                style={styles.pill}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  section: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    fontWeight: '400',
    color: 'rgba(38, 29, 42, 0.4)',
    marginBottom: 8,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4, // Compensate for pillWrapper margin
  },
  pillWrapper: {
    width: '33.33%', // 3 columns
    padding: 4,
  },
  pill: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});

import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from './Image';

export const CertificationCaregiver = ({ data, role }: any) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const childcareResp =
    data?.responsibilities?.childcare_responsibilities || [];
  const householdResp =
    data?.responsibilities?.household_responsibilities || [];

  console.log('data?.household_info?.rules', data?.household_info?.rules);

  return (
    <View style={styles.container}>
      {data?.pictures?.[4]?.path && (
        <View style={styles.imageContainer}>
          <Image
            data={data?.pictures?.[4]?.path}
            style={styles.imagePlaceholder}
            resizeMode='cover'
            resizeMethod='scale'
          />
        </View>
      )}
      {role === 'CAREGIVER' && (
        <View style={styles.section}>
          {/* <View style={styles.spacer} /> */}
          {data?.abilities_and_certifications?.certifications?.length > 0 && (
            <>
              <ThemedText style={styles.sectionTitle}>
                My Certifications/Requirements
              </ThemedText>
              <View style={styles.pillsContainer}>
                {data?.abilities_and_certifications?.certifications?.map(
                  (item: any, index: number) => (
                    <Pill2 key={index} label={item} style={styles.pill} />
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
  imageContainer: {
    marginHorizontal: -26,
    marginTop: -26,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: 358,
    backgroundColor: '#E8F3F3', // Pastel blue-green color
  },
  section: {
    marginBottom: 14,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: 'rgba(38, 29, 42, 0.4)',
    marginBottom: 12,
  },
  pillsContainer: {
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
  spacer: {
    marginBottom: 14,
    marginTop: 24,
  },
});

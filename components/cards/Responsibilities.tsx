import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from './Image';

interface ResponsibilitiesProps {
  childcareResponsibilities?: Array<{
    icon: string;
    label: string;
  }>;
  householdResponsibilities?: Array<{
    icon: string;
    label: string;
  }>;
  data: any;
  role?: any;
}

export const Responsibilities = ({
  childcareResponsibilities = [
    { icon: '🛁', label: 'Bathing' },
    { icon: '🍎', label: 'Tutoring' },
    { icon: '📊', label: 'Play Dates' },
    { icon: '🚂', label: 'Commuting' },
    { icon: '🍕', label: 'Packing Lunch' },
    { icon: '🍼', label: 'Bottle Feeding' },
    { icon: '📝', label: 'Diaper Change' },
    { icon: '📖', label: 'Homework Help' },
  ],
  householdResponsibilities = [
    { icon: '🔍', label: 'Cooking' },
    { icon: '🐾', label: 'Pet Care' },
    { icon: '🥗', label: 'Meal Prep' },
    { icon: '👕', label: 'Laundry' },
    { icon: '🧹', label: 'Deep Housekeeping' },
    { icon: '📊', label: 'Household Budgeting' },
    { icon: '🏠', label: 'Vendor/ Services Management' },
  ],
  data,
  role,
}: ResponsibilitiesProps) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          data={data?.pictures?.[2]?.path}
          style={styles.imagePlaceholder}
          resizeMode='cover'
          resizeMethod='scale'
        />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          {role === 'FAMILY' ? 'Household Rules' : 'Childcare Responsibilities'}
        </ThemedText>
        {role === 'CAREGIVER' ? (
          <View style={styles.pillsContainer}>
            {data?.responsibilities?.childcare_responsibilities?.map(
              (item: any, index: number) => (
                <Pill2
                  key={index}
                  // icon={item.icon || '👶'}
                  label={item}
                  style={styles.pill}
                />
              )
            )}
          </View>
        ) : (
          <View style={styles.pillsContainer}>
            {data?.household_info?.rules?.map((item: any, index: number) => (
              <Pill2
                key={index}
                // icon={item.icon || '👶'}
                label={item}
                style={styles.pill}
              />
            ))}
            {data?.responsibilities?.household_responsibilities && (
              <Pill2
                // icon={item.icon || '👶'}
                label={data?.responsibilities?.household_responsibilities}
                style={styles.pill}
              />
            )}
          </View>
        )}
      </View>
      {role === 'CAREGIVER' && (
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Household Responsibilities
          </ThemedText>
          <View style={styles.pillsContainer}>
            {data?.responsibilities?.household_responsibilities && (
              <>
                {data?.responsibilities?.household_responsibilities.map(
                  (item: any, index: number) => (
                    <Pill2
                      key={index}
                      // icon={item.icon || '👶'}
                      label={item}
                      style={styles.pill}
                    />
                  )
                )}
              </>
            )}
          </View>
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
});

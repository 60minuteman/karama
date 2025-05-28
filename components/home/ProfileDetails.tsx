import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProfileDetailsProps {
  role: string;
  experience: string[];
  lookingFor: string[];
  hourlyRate: string;
  data?: any
}

export const ProfileDetails = ({
  role,
  experience,
  lookingFor,
  hourlyRate,
  data
}: ProfileDetailsProps) => {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  console.log(data, 'profile');
  


  return (
    <View style={styles.container}>
      {role === 'CAREGIVER' && (
        <Section title='I am'>
        <Pill2 label={data?.caregiver_type} icon='👩' style={styles.pill} />
      </Section>
      )}
      {role === 'FAMILY' && (
        <Section title='We have'>
          <View style={{display: 'flex', gap: 2, flexDirection: 'row', flexWrap: 'wrap'}}>
            {data?.children?.map((item: any) => (
            <Pill2 label={item.age_group} icon='👩' style={styles.pill} />
          ))}
          </View>
      </Section>
      )}
      {role === 'FAMILY' && (
        <Section title='We have a'>
          <View style={{display: 'flex', gap: 2, flexDirection: 'row', flexWrap: 'wrap'}}>
            {data?.pets?.map((item: any) => (
            <Pill2 label={item}  style={styles.pill} />
          ))}
          </View>
      </Section>
      )}
      {role === 'FAMILY' && (
        <Section title='We speak'>
          <View style={{display: 'flex', gap: 2, flexDirection: 'row', flexWrap: 'wrap'}}>
            {data?.languages?.map((item: any) => (
            <Pill2 label={item}  style={styles.pill} />
          ))}
          </View>
      </Section>
      )}

      {role === 'CAREGIVER' && (
        <>
        <Section title='I have experience with'>
        <View style={styles.pillsContainer}>
          {data?.ages_best_with?.map((exp, index) => {
            const icons = {
              'School Age': '🛴',
              Toddler: '🧸',
              'Pre Schooler': '✏️',
            };
            return (
              <Pill2
                key={index}
                label={exp}
                // icon={icons[exp as keyof typeof icons]}
                style={styles.pill}
              />
            );
          })}
        </View>
      </Section>

      <Section title="I'm Looking For">
        <View style={styles.pillsContainer}>
          {data?.availability?.map((item, index) => {
            const icons = {
              'Full Time': '⏰',
              'Long Term': '📋',
              'Live In': '💤',
            };
            return (
              <Pill2
                key={index}
                label={item}
                // icon={icons[item as keyof typeof icons]}
                style={styles.pill}
              />
            );
          })}
        </View>
      </Section>

      <Section title='My Hourly Rate'>
        <Pill2 label={`${data?.payment_info?.hourly_max}- ${data?.payment_info?.hourly_min}`} icon='⌛' style={styles.pill} />
      </Section>
        </>
      )}
    </View>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#ECEBEC',
    borderRadius: 10,
    alignSelf: 'flex-start',
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
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
});

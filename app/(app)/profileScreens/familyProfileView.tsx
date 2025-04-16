import InfoPill from '@/app/components/ui/InfoPill';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Pill } from '@/components/ui/Pill';
import {
  benefits,
  childcareResponsibilities,
  children,
  disability,
  householdResponsibilities,
  interests,
  languages,
  personality,
  pets,
  religion,
  requirements,
  rules,
  schedule,
  workOptions,
} from '@/constants/profile';
import { useCurrentUser, useProfile } from '@/services/api/api';
import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FamilyProfileView = () => {
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser();

  const { data: familyProfile, isLoading: familyProfileLoading }: any =
    useProfile(currentUser?.data?.role);

  const handleEdit = () => {
    Alert.alert(
      'Feature Not Available',
      'This feature is not available yet. We will notify you when it becomes available.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView>
        <ProfileHeader
          heading='Profile'
          edit
          onEdit={handleEdit}
          onBack={() => router.back()}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {familyProfileLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View style={styles.container}>
              <View style={{ borderRadius: 18, overflow: 'hidden' }}>
                <ImageBackground
                  style={styles.imageStyle}
                  source={{
                    uri:
                      familyProfile?.family_profile?.pictures?.[0]?.path ||
                      require('@/assets/images/dummy.jpeg'),
                  }}
                >
                  <View style={styles.topCOntainer}>
                    <View style={styles.parentButton}>
                      <ThemedText style={styles.text1}>
                        👫🏻{' '}
                        {familyProfile?.family_profile?.description
                          ?.description || 'No description'}
                      </ThemedText>
                    </View>
                  </View>
                  <View>
                    <ThemedText style={styles.parentHeading}>
                      {familyProfile?.family_profile?.name || 'No name'}
                    </ThemedText>
                    <ThemedText style={styles.parentText}>
                      {familyProfile?.zipcode || 'No zipcode'}
                    </ThemedText>
                    <ThemedText style={styles.parentText}>
                      $
                      {familyProfile?.family_profile?.extra_info?.payment_info
                        ?.hourly_min || '0'}
                      - $
                      {familyProfile?.family_profile?.extra_info?.payment_info
                        ?.hourly_max || '0'}
                      /Hour
                    </ThemedText>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.section}>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>We have</ThemedText>
                  <View style={styles.pillContainer}>
                    {(familyProfile?.family_profile?.children || []).map(
                      (child) => (
                        <InfoPill
                          key={child.id}
                          count={child.count}
                          label={child.age_group}
                        />
                      )
                    )}
                  </View>
                </View>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>We have a</ThemedText>
                  <View style={styles.pillContainer}>
                    {(familyProfile?.family_profile?.pets || []).map(
                      (pet: string) => (
                        <InfoPill key={pet} label={pet} />
                      )
                    )}
                  </View>
                </View>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>We speak</ThemedText>
                  <View style={styles.pillContainer}>
                    {(familyProfile?.family_profile?.languages || []).map(
                      (language: string) => (
                        <InfoPill key={language} label={language} icon={'💬'} />
                      )
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.section}>
                <View
                  style={{
                    position: 'absolute',
                    minWidth: '100%',
                    left: 0,
                    right: 0,
                  }}
                >
                  <Image
                    style={styles.sectionImage}
                    resizeMode='cover'
                    source={require('@/assets/images/d2.png')}
                  />
                </View>
                <View style={[styles.subSection, { marginTop: 325 }]}>
                  <ThemedText style={styles.pillHeading}>
                    Children's Interests
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.children_interests
                        ?.creative_interests || []
                    ).map((interest: string) => (
                      <InfoPill key={interest} label={interest} icon='🎨' />
                    ))}
                    {familyProfile?.family_profile?.children_interests
                      ?.other_creative_interests !== 'N/A' && (
                      <InfoPill
                        label={
                          familyProfile?.family_profile?.children_interests
                            ?.other_creative_interests
                        }
                        icon='🎨'
                      />
                    )}

                    {(
                      familyProfile?.family_profile?.children_interests
                        ?.instrument_interests || []
                    ).map((interest: string) => (
                      <InfoPill key={interest} label={interest} icon='🎵' />
                    ))}
                    {familyProfile?.family_profile?.children_interests
                      ?.other_instrument_interests !== 'N/A' && (
                      <InfoPill
                        label={
                          familyProfile?.family_profile?.children_interests
                            ?.other_instrument_interests
                        }
                        icon='🎵'
                      />
                    )}

                    {(
                      familyProfile?.family_profile?.children_interests
                        ?.sport_interests || []
                    ).map((interest: string) => (
                      <InfoPill key={interest} label={interest} icon='⚽' />
                    ))}
                    {familyProfile?.family_profile?.children_interests
                      ?.other_sport_interests !== 'N/A' && (
                      <InfoPill
                        label={
                          familyProfile?.family_profile?.children_interests
                            ?.other_sport_interests
                        }
                        icon='⚽'
                      />
                    )}

                    {(
                      familyProfile?.family_profile?.children_interests
                        ?.stem_interests || []
                    ).map((interest: string) => (
                      <InfoPill key={interest} label={interest} icon='🔬' />
                    ))}
                    {familyProfile?.family_profile?.children_interests
                      ?.other_stem_interests !== 'N/A' && (
                      <InfoPill
                        label={
                          familyProfile?.family_profile?.children_interests
                            ?.other_stem_interests
                        }
                        icon='🔬'
                      />
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    Our religion
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    <InfoPill
                      label={
                        familyProfile?.family_profile?.household_info
                          ?.religion || 'Not specified'
                      }
                    />
                  </View>
                </View>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    Personality
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.caregiver_preference
                        ?.personalities || []
                    ).map((personality) => (
                      <InfoPill key={personality} label={personality} />
                    ))}
                  </View>
                </View>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    Disability experience
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.behavioural_differences ||
                      []
                    ).map((disability: string) => (
                      <InfoPill key={disability} label={disability} />
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.section}>
                <View
                  style={{
                    position: 'absolute',
                    minWidth: '100%',
                    left: 0,
                    right: 0,
                  }}
                >
                  <Image
                    style={styles.sectionImage}
                    resizeMode='cover'
                    source={require('@/assets/images/d3.png')}
                  />
                </View>
                <View style={[styles.subSection, { marginTop: 325 }]}>
                  <ThemedText style={styles.pillHeading}>
                    Household Rules
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.household_info?.rules || []
                    ).map((rule: string) => (
                      <InfoPill key={rule} label={rule} />
                    ))}
                  </View>
                </View>
              </View>
              <View style={[styles.section, { height: 650 }]}>
                <View
                  style={{
                    position: 'absolute',
                    minWidth: '100%',
                    left: 0,
                    right: 0,
                    top: 0,
                  }}
                >
                  <Image
                    style={styles.sectionImage}
                    resizeMode='cover'
                    source={require('@/assets/images/d3.png')}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    minWidth: '100%',
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <Image
                    style={styles.sectionImage}
                    resizeMode='cover'
                    source={require('@/assets/images/d4.png')}
                  />
                </View>
              </View>
              <View style={[styles.section, { height: 325 }]}>
                <View
                  style={{
                    position: 'absolute',
                    minWidth: '100%',
                    left: 0,
                    right: 0,
                    top: 0,
                  }}
                >
                  <Image
                    style={styles.sectionImage}
                    resizeMode='cover'
                    source={require('@/assets/images/d5.png')}
                  />
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    We are looking for ..
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.caregiver_preference
                        ?.caregiver_type || []
                    ).map((type: string) => (
                      <InfoPill key={type} label={type} icon={'🧢'} />
                    ))}
                  </View>
                </View>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>Start Date</ThemedText>
                  <View style={styles.pillContainer}>
                    <InfoPill
                      label={
                        familyProfile?.family_profile?.job_commitment
                          ?.start_date || 'Not specified'
                      }
                    />
                  </View>
                </View>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    Hourly Pay Rate
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    <InfoPill
                      icon={'⌛'}
                      label={`${
                        familyProfile?.family_profile?.extra_info?.payment_info
                          ?.hourly_min || '0'
                      }-${
                        familyProfile?.family_profile?.extra_info?.payment_info
                          ?.hourly_max || '0'
                      }`}
                    />
                  </View>
                </View>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    Education Level
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    <InfoPill
                      icon={'🎓'}
                      label={
                        familyProfile?.family_profile?.caregiver_preference
                          ?.education_level || 'Not specified'
                      }
                    />
                  </View>
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.subSection}>
                  <View>
                    <ThemedText style={styles.pillHeading}>Schedule</ThemedText>
                  </View>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.caregiver_preference
                        ?.service_days || []
                    ).map((schedule) => (
                      <InfoPill
                        key={schedule.id}
                        label={`${schedule.day}: ${schedule.begin}-${schedule.end}`}
                      />
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    Work Options
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {familyProfile?.family_profile?.caregiver_preference
                      ?.availability && (
                      <InfoPill
                        icon={'🎓'}
                        label={
                          familyProfile?.family_profile?.caregiver_preference
                            ?.availability
                        }
                      />
                    )}
                    {familyProfile?.family_profile?.caregiver_preference
                      ?.arrangement_type && (
                      <InfoPill
                        icon={'🎓'}
                        label={
                          familyProfile?.family_profile?.caregiver_preference
                            ?.arrangement_type
                        }
                      />
                    )}
                  </View>
                </View>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    Requirements
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.caregiver_preference
                        ?.requirements?.requirements || []
                    ).map((requirement) => (
                      <InfoPill key={requirement} label={requirement} />
                    ))}
                    {familyProfile?.family_profile?.caregiver_preference
                      ?.requirements?.other_requirement && (
                      <InfoPill
                        label={
                          familyProfile?.family_profile?.caregiver_preference
                            ?.requirements?.other_requirement
                        }
                      />
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    Childcare Responsibilities
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.caregiver_preference
                        ?.responsibilities?.childcare_responsibilities || []
                    ).map((option: string) => (
                      <InfoPill key={option} label={option} />
                    ))}
                    {familyProfile?.family_profile?.caregiver_preference
                      ?.responsibilities?.other_childcare_responsibilities && (
                      <InfoPill
                        label={
                          familyProfile?.family_profile?.caregiver_preference
                            ?.responsibilities?.other_childcare_responsibilities
                        }
                      />
                    )}
                  </View>
                </View>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>
                    Household Responsibilities{' '}
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.caregiver_preference
                        ?.responsibilities?.household_responsibilities || []
                    ).map((option: string) => (
                      <InfoPill key={option} label={option} />
                    ))}
                    {familyProfile?.family_profile?.caregiver_preference
                      ?.responsibilities?.other_household_responsibilities && (
                      <InfoPill
                        label={
                          familyProfile?.family_profile?.caregiver_preference
                            ?.responsibilities?.other_household_responsibilities
                        }
                      />
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.subSection}>
                  <ThemedText style={styles.pillHeading}>Benefits</ThemedText>
                  <View style={styles.pillContainer}>
                    {(
                      familyProfile?.family_profile?.extra_info?.benefits
                        ?.benefits || []
                    ).map((benefit) => (
                      <InfoPill key={benefit} label={benefit} />
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.section}>
                {(familyProfile?.family_profile?.extra_info?.prompts || []).map(
                  (prompt) => (
                    <View key={prompt.id} style={styles.subSection}>
                      <ThemedText style={styles.pillHeading}>
                        {prompt.title}
                      </ThemedText>
                      <ThemedText style={styles.sectionText}>
                        {prompt.answer}
                      </ThemedText>
                    </View>
                  )
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 31,
  },
  imageStyle: {
    height: 'auto',
    minWidth: '100%',
    paddingVertical: 25,
    paddingHorizontal: 16,
    gap: 460,
    borderRadius: 18,
  },
  topCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parentButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    backgroundColor: '#A9A19596',
    borderRadius: 28,
  },
  text1: {
    color: 'white',
    fontFamily: 'Poppins',
  },
  ratingText: {
    color: '#052222',
    fontSize: 16,
    fontWeight: 500,
  },
  parentHeading: {
    fontFamily: 'Poppins',
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 500,
    lineHeight: 36,
  },
  parentText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    color: 'white',
  },
  section: {
    backgroundColor: '#261D2A0D',
    paddingTop: 25,
    paddingHorizontal: 25,
    marginTop: 6,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  subSection: {
    gap: 24,
    marginBottom: 25,
  },
  pillHeading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A',
    opacity: 0.4,
  },
  pillSubHeading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 20,
    color: '#EB4430',
    marginTop: 8,
  },
  pillContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  sectionText: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 25,
    color: '#261D2A',
  },
  sectionText2: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A',
  },
  sectionImage: {
    width: '100%',
    height: 325,
    left: 0,
    right: 0,
  },
});
export default FamilyProfileView;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDiscoverStore } from './discover';
import { useOtherStore } from './other';
import { useUserStore } from './user';

export const clearAllData = async () => {
  try {
    // Clear AsyncStorage
    await AsyncStorage.clear();

    // Clear Zustand stores
    useUserStore.getState().clearUser();
    useDiscoverStore.setState({
      currentProfile: 0,
      likedProfiles: [],
      rejectedProfiles: [],
      isLoading: false,
      error: null,
    });
    useOtherStore.getState().set({
      otherHouseholdResponsibilities: '',
      otherChildResponsibilities: '',
      otherCertifications: '',
      otherPrefernces: '',
      otherDiet: '',
      otherRule: '',
      otherFamilyDescription: '',
      otherReligion: '',
      otherGender: '',
      otherPhilosophy: '',
      otherRequirement: '',
      otherLanguage: '',
      otherPet: '',
      otherCreativeActivity: '',
      otherSport: '',
      otherStem: '',
      otherInstument: '',
      otherConditons: '',
      otherHear: '',
      familyEducation: '',
      prompts: [
        {
          category: '',
          title: '',
          answer: '',
        },
      ],
      likeProfile: [],
    });

    console.log('All data cleared successfully');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

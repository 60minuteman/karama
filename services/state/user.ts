import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FamilyType =
  | 'Mom'
  | 'Dad'
  | 'Mom & Dad'
  | 'Moms'
  | 'Dads'
  | 'Guardian'
  | 'Other';

type Condition =
  | 'Dyslexia'
  | 'ADHD'
  | 'Autistic Spectrum'
  | 'Tourette Syndrome'
  | 'Down Syndrome'
  | 'Schizophrenia'
  | 'Misophonia'
  | 'Hearing Impaired'
  | 'Vision Impaired'
  | 'Bipolar'
  | 'Other';

type Source =
  | 'TikTok'
  | 'Instagram'
  | 'Facebook'
  | 'YouTube'
  | 'Family & Friends'
  | 'Press'
  | 'Events'
  | 'App Store'
  | 'Other';

type Language =
  | 'Spanish'
  | 'French'
  | 'English'
  | 'German'
  | 'Hausa'
  | 'Italian'
  | 'Russian'
  | 'Arabic'
  | 'Chinese'
  | 'Korean'
  | 'Japanese'
  | 'Yoruba'
  | 'Afrikaans'
  | 'Hindi'
  | 'Dutch'
  | 'Estonian'
  | 'Croatian'
  | 'Swedish'
  | 'Portugese'
  | 'Other';

export type PetType =
  | 'None'
  | 'Cat'
  | 'Small Dog'
  | 'Pig'
  | 'Large Dog'
  | 'Cow'
  | 'Butterfly'
  | 'Turtle'
  | 'Snake'
  | 'Parrot'
  | 'Rabbit'
  | 'Sheep'
  | 'Duck'
  | 'Horse'
  | 'Frog'
  | 'Gecko'
  | 'Whale'
  | 'Chicken'
  | 'Hamster'
  | 'Dinosaur'
  | 'Baby Elephant'
  | 'Unicorn'
  | 'Other';

interface AgeGroup {
  icon: string;
  label: string;
  count: number;
}

const defaultAgeGroups: AgeGroup[] = [
  { icon: '🐣', label: 'Expecting', count: 0 },
  { icon: '👶', label: 'Newborn', count: 0 },
  { icon: '🍼', label: 'Infant', count: 0 },
  { icon: '🧸', label: 'Toddler', count: 0 },
  { icon: '✏️', label: 'Pre Schooler', count: 0 },
  { icon: '🛴', label: 'School Age', count: 0 },
  { icon: '👑', label: 'Teenager', count: 0 },
];

interface FamilyDescription {
  type: FamilyType | null;
  description: string | null;
  showOnProfile: boolean;
}

interface FamilyBehaviour {
  has_condition: 'Yes' | 'No' | null;
  conditions: Condition[];
}

interface UserProfile {
  created_at: string;
  updated_at: string;
  _v: number;
  user_id: string;
  phone_number: string;
  email: string | null;
  role: 'NEW_USER' | 'USER' | 'ADMIN'; // Add other roles if needed
  name: string | null;
  plan: 'FREE' | 'PREMIUM'; // Add other plans if needed
  subscribed_to_promotions: boolean;
  activity_status: 'ACTIVE' | 'INACTIVE';
  last_login: string;
}

type Category = 'Diet' | 'Rules' | 'Religion';
type Selection = { [key: string]: boolean };

interface Interest {
  label: string;
  icon: string;
  category: Category;
}

interface HouseholdSelection {
  Diet: boolean[];
  Rules: boolean[];
  Religion: boolean[];
}

interface HouseholdVisibility {
  Diet: boolean;
  Rules: boolean;
  Religion: boolean;
}

type Philosophy =
  | 'Montessori'
  | 'Waldorf/ Steiner'
  | 'Harkness'
  | 'Sudbury'
  | 'Reggio Emillia'
  | 'Gentle Parenting'
  | 'Permissive Parenting'
  | 'Authoritative Parenting'
  | 'Baby Led-Weaning'
  | 'Authoritarian Parenting'
  | 'Other'
  | 'None';

interface UserState {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  hydrated: boolean;
  subscribed_to_promotions: boolean;
  selectedType: 'family' | 'caregiver' | null;
  familyName: string | null;
  family_description: FamilyDescription | null;
  family_age_groups: AgeGroup[];
  family_behaviour: FamilyBehaviour;
  onboarding_screen: string | null;
  family_selected_source: Source | null;
  family_zipcode: string;
  family_keyboard_height: number;
  family_languages: Language[];
  family_pets: PetType[];
  family_interests: string[];
  family_household_selections: HouseholdSelection;
  family_household_visibility: HouseholdVisibility;
  family_selections: Selection;
  family_show_diet: boolean;
  family_show_rules: boolean;
  family_show_religion: boolean;
  family_philosophies: Philosophy[];
  family_show_philosophy: boolean;
  // Actions
  setUser: (user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
  updateUser: (userData: Partial<UserProfile>) => void;
  setPromotionSubscription: (subscribed: boolean) => void;
  setSelectedType: (type: 'family' | 'caregiver' | null) => void;
  setFamilyName: (name: string | null) => void;
  setFamilyDescription: (description: Partial<FamilyDescription>) => void;
  setFamilyAgeGroups: (groups: AgeGroup[]) => void;
  setFamilyBehaviour: (behaviour: Partial<FamilyBehaviour>) => void;
  setOnboardingScreen: (screen: string | null) => void;
  setFamilySelectedSource: (source: Source | null) => void;
  setFamilyZipcode: (zipcode: string) => void;
  setFamilyKeyboardHeight: (height: number) => void;
  setFamilyLanguages: (languages: Language[]) => void;
  setFamilyPets: (pets: PetType[]) => void;
  setFamilyInterests: (interests: string[]) => void;
  setFamilyHouseholdSelections: (
    selections: Partial<HouseholdSelection>
  ) => void;
  setFamilyHouseholdVisibility: (
    visibility: Partial<HouseholdVisibility>
  ) => void;
  setFamilySelections: (selections: Selection) => void;
  setFamilyShowDiet: (show: boolean) => void;
  setFamilyShowRules: (show: boolean) => void;
  setFamilyShowReligion: (show: boolean) => void;
  setFamilyPhilosophies: (philosophies: Philosophy[]) => void;
  setFamilyShowPhilosophy: (show: boolean) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setHydrated: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      hydrated: false,
      subscribed_to_promotions: false,
      selectedType: null,
      familyName: null,
      family_description: null,
      family_age_groups: defaultAgeGroups,
      family_behaviour: {
        has_condition: null,
        conditions: [],
      },
      onboarding_screen: null,
      family_selected_source: null,
      family_zipcode: '',
      family_keyboard_height: 0,
      family_languages: [],
      family_pets: [],
      family_interests: [],
      family_household_selections: {
        Diet: [],
        Rules: [],
        Religion: [],
      },
      family_household_visibility: {
        Diet: false,
        Rules: false,
        Religion: false,
      },
      family_selections: {},
      family_show_diet: false,
      family_show_rules: false,
      family_show_religion: false,
      family_philosophies: [],
      family_show_philosophy: false,

      setUser: (user) => set({ user, error: null }),

      setToken: async (token) => {
        set({ token });
        if (token) {
          await AsyncStorage.setItem('token', token);
        } else {
          await AsyncStorage.removeItem('token');
        }
      },

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      setPromotionSubscription: (subscribed) =>
        set({ subscribed_to_promotions: subscribed }),

      setSelectedType: (type) => set({ selectedType: type }),

      setFamilyName: (name) => set({ familyName: name }),

      setFamilyDescription: (description) =>
        set((state) => ({
          family_description: state.family_description
            ? { ...state.family_description, ...description }
            : {
                type: null,
                description: null,
                showOnProfile: false,
                ...description,
              },
        })),

      setFamilyAgeGroups: (groups) => set({ family_age_groups: groups }),

      setFamilyBehaviour: (behaviour) =>
        set((state) => ({
          family_behaviour: { ...state.family_behaviour, ...behaviour },
        })),

      setOnboardingScreen: (screen) => set({ onboarding_screen: screen }),

      setFamilySelectedSource: (source) =>
        set({ family_selected_source: source }),

      setFamilyZipcode: (zipcode) => set({ family_zipcode: zipcode }),

      setFamilyKeyboardHeight: (height) =>
        set({ family_keyboard_height: height }),

      setFamilyLanguages: (languages) => set({ family_languages: languages }),

      setFamilyPets: (pets) => set({ family_pets: pets }),

      setFamilyInterests: (interests) => set({ family_interests: interests }),

      setFamilyHouseholdSelections: (selections) =>
        set((state) => ({
          family_household_selections: {
            ...state.family_household_selections,
            ...selections,
          },
        })),

      setFamilyHouseholdVisibility: (visibility) =>
        set((state) => ({
          family_household_visibility: {
            ...state.family_household_visibility,
            ...visibility,
          },
        })),

      setFamilySelections: (selections) =>
        set({ family_selections: selections }),

      setFamilyShowDiet: (show) => set({ family_show_diet: show }),

      setFamilyShowRules: (show) => set({ family_show_rules: show }),

      setFamilyShowReligion: (show) => set({ family_show_religion: show }),

      setFamilyPhilosophies: (philosophies) =>
        set({ family_philosophies: philosophies }),

      setFamilyShowPhilosophy: (show) => set({ family_show_philosophy: show }),

      clearUser: async () => {
        await AsyncStorage.removeItem('token');
        set({
          user: null,
          token: null,
          error: null,
          subscribed_to_promotions: false,
          selectedType: null,
          familyName: null,
          family_description: null,
          family_age_groups: defaultAgeGroups,
          family_behaviour: {
            has_condition: null,
            conditions: [],
          },
          onboarding_screen: null,
          family_selected_source: null,
          family_zipcode: '',
          family_keyboard_height: 0,
          family_languages: [],
          family_pets: [],
          family_interests: [],
          family_household_selections: {
            Diet: [],
            Rules: [],
            Religion: [],
          },
          family_household_visibility: {
            Diet: false,
            Rules: false,
            Religion: false,
          },
          family_selections: {},
          family_show_diet: false,
          family_show_rules: false,
          family_show_religion: false,
          family_philosophies: [],
          family_show_philosophy: false,
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

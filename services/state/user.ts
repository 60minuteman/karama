import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Requirement =
  | 'Can Travel'
  | 'Able To Drive'
  | 'First Aid'
  | 'Can Swim'
  | 'COVID Vaccination'
  | 'CPR'
  | 'Other';

type Arrangement = 'Live In' | 'Live Out' | 'Hybrid';

type Certification =
  | 'Sign Language'
  | 'Administering Medication'
  | 'Special Needs'
  | 'Condition Specific'
  | 'Feeding & Swallowing'
  | 'Registered Behaviour Technician'
  | 'Other';

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

type Availability =
  | 'Full Time'
  | 'Part Time'
  | 'Occasionally'
  | 'Night Out'
  | 'After school Pickup';

type Commitment = 'Long Term' | 'Short Term';

// Add these types after the existing type definitions
type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

interface TimeSlot {
  begin: string;
  end: string;
}

interface DaySchedule {
  day: DayOfWeek;
  timeSlot: TimeSlot;
  isActive: boolean;
}

interface Responsibility {
  id: string;
  label: string;
  icon: string;
}

type PaymentType = 'Hourly' | 'Salary Base';

// Add these new types
interface FamilyAllergies {
  food: string[];
  environmental: string[];
  other: string[];
}

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
  family_interests: {
    creative_interests: string[];
    instrument_interests: string[];
    sport_interests: string[];
    stem_interests: string[];
  };
  family_household_selections: HouseholdSelection;
  family_household_visibility: HouseholdVisibility;
  family_selections: Selection;
  family_show_diet: boolean;
  family_show_rules: boolean;
  family_show_religion: boolean;
  family_philosophies: Philosophy[];
  family_show_philosophy: boolean;
  family_gender_preference: {
    has_preference: 'yes' | 'no' | null;
    selected_gender: string | null;
    is_dealbreaker: boolean;
  };
  caregiver_type: {
    selected_type: string | null;
    is_dealbreaker: boolean;
  };
  caregiver_traits: {
    selected_traits: string[];
    is_dealbreaker: boolean;
  };
  caregiver_age: {
    has_preference: 'yes' | 'no' | null;
    selected_age_range: string | null;
    is_dealbreaker: boolean;
  };
  caregiver_experience: {
    selected_experience: string | null;
    is_dealbreaker: boolean;
  };
  caregiver_language_required: 'Yes, required' | 'Not required' | null;
  caregiver_requirements: {
    selected_requirements: Requirement[];
    selected_certifications: Certification[];
    requirements_dealbreaker: boolean;
    certifications_dealbreaker: boolean;
  };
  family_availability: {
    selected_availability: Availability | null;
    is_dealbreaker: boolean;
  };
  family_arrangement: {
    selected_arrangement: Arrangement | null;
    is_dealbreaker: boolean;
  };
  family_commitment: {
    selected_commitment: Commitment | null;
    start_date: Date;
    end_date: Date;
  };
  family_schedule: DaySchedule[];
  family_responsibilities: string[];
  family_payment: {
    selected_type: PaymentType | null;
    hourly_rate: number;
    salary_amount: string;
    has_interacted: boolean;
  };
  family_payment_method: {
    selected_method: string;
    show_on_profile: boolean;
  };
  family_benefits: {
    selected_benefits: string[];
    show_on_profile: boolean;
  };
  family_prompt: string;
  family_prompt_answer: string;
  family_more_info: string;
  family_has_allergies: boolean | null;
  family_allergies: FamilyAllergies;
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
  setFamilyInterests: (interests: {
    creative_interests: string[];
    instrument_interests: string[];
    sport_interests: string[];
    stem_interests: string[];
  }) => void;
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
  setFamilyGenderPreference: (
    preference: Partial<UserState['family_gender_preference']>
  ) => void;
  setCaregiverType: (type: Partial<UserState['caregiver_type']>) => void;
  setCaregiverTraits: (traits: Partial<UserState['caregiver_traits']>) => void;
  setCaregiverAge: (age: Partial<UserState['caregiver_age']>) => void;
  setCaregiverExperience: (
    experience: Partial<UserState['caregiver_experience']>
  ) => void;
  setCaregiverLanguageRequired: (
    required: 'Yes, required' | 'Not required' | null
  ) => void;
  setCaregiverRequirements: (
    requirements: Partial<UserState['caregiver_requirements']>
  ) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setHydrated: () => void;
  setFamilyAvailability: (
    availability: Partial<UserState['family_availability']>
  ) => void;
  setFamilyArrangement: (
    arrangement: Partial<UserState['family_arrangement']>
  ) => void;
  setFamilyCommitment: (
    commitment: Partial<UserState['family_commitment']>
  ) => void;
  setFamilySchedule: (schedule: DaySchedule[]) => void;
  setFamilyResponsibilities: (responsibilities: string[]) => void;
  setFamilyPayment: (payment: Partial<UserState['family_payment']>) => void;
  setFamilyPaymentMethod: (
    method: Partial<UserState['family_payment_method']>
  ) => void;
  setFamilyBenefits: (benefits: Partial<UserState['family_benefits']>) => void;
  setFamilyPrompt: (prompt: string) => void;
  setFamilyPromptAnswer: (answer: string) => void;
  setFamilyMoreInfo: (info: string) => void;
  setFamilyHasAllergies: (hasAllergies: boolean | null) => void;
  setFamilyAllergies: (allergies: Partial<FamilyAllergies>) => void;
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
      family_interests: {
        creative_interests: [],
        instrument_interests: [],
        sport_interests: [],
        stem_interests: [],
      },
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
      family_gender_preference: {
        has_preference: null,
        selected_gender: null,
        is_dealbreaker: false,
      },
      caregiver_type: {
        selected_type: null,
        is_dealbreaker: false,
      },
      caregiver_traits: {
        selected_traits: [],
        is_dealbreaker: false,
      },
      caregiver_age: {
        has_preference: null,
        selected_age_range: null,
        is_dealbreaker: false,
      },
      caregiver_experience: {
        selected_experience: null,
        is_dealbreaker: false,
      },
      caregiver_language_required: null,
      caregiver_requirements: {
        selected_requirements: [],
        selected_certifications: [],
        requirements_dealbreaker: false,
        certifications_dealbreaker: false,
      },
      family_availability: {
        selected_availability: null,
        is_dealbreaker: false,
      },
      family_arrangement: {
        selected_arrangement: null,
        is_dealbreaker: false,
      },
      family_commitment: {
        selected_commitment: null,
        start_date: new Date(),
        end_date: new Date(),
      },
      family_schedule: [
        {
          day: 'Mon',
          timeSlot: { begin: '00:00', end: '00:00' },
          isActive: false,
        },
        {
          day: 'Tue',
          timeSlot: { begin: '00:00', end: '00:00' },
          isActive: false,
        },
        {
          day: 'Wed',
          timeSlot: { begin: '00:00', end: '00:00' },
          isActive: false,
        },
        {
          day: 'Thu',
          timeSlot: { begin: '00:00', end: '00:00' },
          isActive: false,
        },
        {
          day: 'Fri',
          timeSlot: { begin: '00:00', end: '00:00' },
          isActive: false,
        },
        {
          day: 'Sat',
          timeSlot: { begin: '00:00', end: '00:00' },
          isActive: false,
        },
        {
          day: 'Sun',
          timeSlot: { begin: '00:00', end: '00:00' },
          isActive: false,
        },
      ],
      family_responsibilities: [],
      family_payment: {
        selected_type: null,
        hourly_rate: 15,
        salary_amount: '50,000',
        has_interacted: false,
      },
      family_payment_method: {
        selected_method: '',
        show_on_profile: false,
      },
      family_benefits: {
        selected_benefits: [],
        show_on_profile: false,
      },
      family_prompt: '',
      family_prompt_answer: '',
      family_more_info: '',
      family_has_allergies: null,
      family_allergies: {
        food: [],
        environmental: [],
        other: [],
      },

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

      setFamilyGenderPreference: (preference) =>
        set((state) => ({
          family_gender_preference: {
            ...state.family_gender_preference,
            ...preference,
          },
        })),

      setCaregiverType: (type) =>
        set((state) => ({
          caregiver_type: {
            ...state.caregiver_type,
            ...type,
          },
        })),

      setCaregiverTraits: (traits) =>
        set((state) => ({
          caregiver_traits: {
            ...state.caregiver_traits,
            ...traits,
          },
        })),

      setCaregiverAge: (age) =>
        set((state) => ({
          caregiver_age: {
            ...state.caregiver_age,
            ...age,
          },
        })),

      setCaregiverExperience: (experience) =>
        set((state) => ({
          caregiver_experience: {
            ...state.caregiver_experience,
            ...experience,
          },
        })),

      setCaregiverLanguageRequired: (required) =>
        set({ caregiver_language_required: required }),

      setCaregiverRequirements: (requirements) =>
        set((state) => ({
          caregiver_requirements: {
            ...state.caregiver_requirements,
            ...requirements,
          },
        })),

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
          family_interests: {
            creative_interests: [],
            instrument_interests: [],
            sport_interests: [],
            stem_interests: [],
          },
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
          family_gender_preference: {
            has_preference: null,
            selected_gender: null,
            is_dealbreaker: false,
          },
          caregiver_type: {
            selected_type: null,
            is_dealbreaker: false,
          },
          caregiver_traits: {
            selected_traits: [],
            is_dealbreaker: false,
          },
          caregiver_age: {
            has_preference: null,
            selected_age_range: null,
            is_dealbreaker: false,
          },
          caregiver_experience: {
            selected_experience: null,
            is_dealbreaker: false,
          },
          caregiver_language_required: null,
          caregiver_requirements: {
            selected_requirements: [],
            selected_certifications: [],
            requirements_dealbreaker: false,
            certifications_dealbreaker: false,
          },
          family_availability: {
            selected_availability: null,
            is_dealbreaker: false,
          },
          family_arrangement: {
            selected_arrangement: null,
            is_dealbreaker: false,
          },
          family_commitment: {
            selected_commitment: null,
            start_date: new Date(),
            end_date: new Date(),
          },
          family_schedule: [
            {
              day: 'Mon',
              timeSlot: { begin: '00:00', end: '00:00' },
              isActive: false,
            },
            {
              day: 'Tue',
              timeSlot: { begin: '00:00', end: '00:00' },
              isActive: false,
            },
            {
              day: 'Wed',
              timeSlot: { begin: '00:00', end: '00:00' },
              isActive: false,
            },
            {
              day: 'Thu',
              timeSlot: { begin: '00:00', end: '00:00' },
              isActive: false,
            },
            {
              day: 'Fri',
              timeSlot: { begin: '00:00', end: '00:00' },
              isActive: false,
            },
            {
              day: 'Sat',
              timeSlot: { begin: '00:00', end: '00:00' },
              isActive: false,
            },
            {
              day: 'Sun',
              timeSlot: { begin: '00:00', end: '00:00' },
              isActive: false,
            },
          ],
          family_responsibilities: [],
          family_payment: {
            selected_type: null,
            hourly_rate: 15,
            salary_amount: '50,000',
            has_interacted: false,
          },
          family_payment_method: {
            selected_method: '',
            show_on_profile: false,
          },
          family_benefits: {
            selected_benefits: [],
            show_on_profile: false,
          },
          family_prompt: '',
          family_prompt_answer: '',
          family_more_info: '',
          family_has_allergies: null,
          family_allergies: {
            food: [],
            environmental: [],
            other: [],
          },
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      setHydrated: () => set({ hydrated: true }),

      setFamilyAvailability: (availability) =>
        set((state) => ({
          family_availability: {
            ...state.family_availability,
            ...availability,
          },
        })),

      setFamilyArrangement: (arrangement) =>
        set((state) => ({
          family_arrangement: {
            ...state.family_arrangement,
            ...arrangement,
          },
        })),

      setFamilyCommitment: (commitment) =>
        set((state) => ({
          family_commitment: {
            ...state.family_commitment,
            ...commitment,
          },
        })),

      setFamilySchedule: (schedule) => set({ family_schedule: schedule }),

      setFamilyResponsibilities: (responsibilities) =>
        set({ family_responsibilities: responsibilities }),

      setFamilyPayment: (payment) =>
        set((state) => ({
          family_payment: {
            ...state.family_payment,
            ...payment,
          },
        })),

      setFamilyPaymentMethod: (method) =>
        set((state) => ({
          family_payment_method: {
            ...state.family_payment_method,
            ...method,
          },
        })),

      setFamilyBenefits: (benefits) =>
        set((state) => ({
          family_benefits: {
            ...state.family_benefits,
            ...benefits,
          },
        })),

      setFamilyPrompt: (prompt) => set({ family_prompt: prompt }),

      setFamilyPromptAnswer: (answer) => set({ family_prompt_answer: answer }),

      setFamilyMoreInfo: (info) => set({ family_more_info: info }),

      setFamilyHasAllergies: (hasAllergies) =>
        set({ family_has_allergies: hasAllergies }),

      setFamilyAllergies: (allergies) =>
        set((state) => ({
          family_allergies: {
            ...state.family_allergies,
            ...allergies,
          },
        })),
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

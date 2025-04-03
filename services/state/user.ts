import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import customAxios from '../services/customAxios';

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

export type Language =
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
  | 'Portuguese'
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

type CaregiverGender =
  | 'Cisgender Female'
  | 'Non Binary'
  | 'Gender Neutral'
  | 'Gender Queer'
  | 'Transgender'
  | 'Male'
  | 'Female'
  | 'Prefer not to say'
  | 'Cisgender Male'
  | 'Gender Fluid'
  | 'Other';

type CaregiverType =
  | 'Night Nurse'
  | 'Governess'
  | 'Babysitter'
  | 'Nanny'
  | 'Manny'
  | 'Au Pair'
  | 'Caregiver/Housekeeper'
  | 'Caregiver/Personal Assistant'
  | 'Caregiver/Household Manager';

type CaregiverExperience =
  | '1-11 months'
  | '1-5 years'
  | '6-10 years'
  | '11-20 years'
  | '21-30 years'
  | '31 years+';

type CaregiverEducation =
  | 'High School'
  | 'In College'
  | 'Undergraduate Degree'
  | 'In Grad School'
  | 'Graduate Degree'
  | 'No Preference';

export type CaregiverAbilities =
  | 'Can Travel'
  | 'Able To Drive'
  | 'First Aid'
  | 'Can Swim'
  | 'COVID Vaccination'
  | 'CPR'
  | 'Other';

export type CaregiverCertification =
  | 'Sign Language'
  | 'Administering Medication'
  | 'Special Needs'
  | 'Condition Specific'
  | 'Feeding & Swallowing'
  | 'Registered Behaviour Technician'
  | 'Other';

export type CaregiverConditionExperience =
  | 'Dyslexia'
  | 'ADHD'
  | 'Autistic Spectrum'
  | 'Tourette Syndrome'
  | 'Down Syndrome'
  | 'Schizophrenia'
  | 'Misophonia'
  | 'Hearing Impaired'
  | 'Vision Impaired'
  | 'Bipolar';

export type CaregiverPhilosophies =
  | 'Harkness'
  | 'Montessori'
  | 'Waldorf/ Steiner'
  | 'Sudbury'
  | 'Reggio Emillia'
  | 'Gentle Parenting'
  | 'Permissive Parenting';

export type CaregiverPositions =
  | 'Full Time'
  | 'Part Time'
  | 'Occasionally'
  | 'Night Out'
  | 'After school Pickup';

export type CaregiverPreferredArrangement = 'Live In' | 'Live Out' | 'Hybrid';
export type CaregiverCommitment = 'Long Term' | 'Short Term';

export type CaregiverDayOfWeek =
  | 'Mon'
  | 'Tue'
  | 'Wed'
  | 'Thu'
  | 'Fri'
  | 'Sat'
  | 'Sun';

interface CaregiverTimeSlot {
  begin: string;
  end: string;
}

export interface CaregiverDaySchedule {
  day: CaregiverDayOfWeek;
  timeSlot: CaregiverTimeSlot;
  isActive: boolean;
}

export interface CaregiverPositionHistory {
  position: string;
  positionNumber: 'first' | 'second' | null;
  ageGroup: string;
  familyName: string;
  employmentType: string;
  startDate: string;
  endDate: string;
}

interface AgeGroup {
  icon?: string;
  age_group: string;
  count: number;
}

const defaultAgeGroups: AgeGroup[] = [
  { icon: '🐣', age_group: 'Expecting', count: 0 },
  { icon: '👶', age_group: 'Newborn', count: 0 },
  { icon: '🍼', age_group: 'Infant', count: 0 },
  { icon: '🧸', age_group: 'Toddler', count: 0 },
  { icon: '✏️', age_group: 'Pre Schooler', count: 0 },
  { icon: '🛴', age_group: 'School Age', count: 0 },
  { icon: '👑', age_group: 'Teenager', count: 0 },
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
  phone_number: string | null;
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
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  subscribed_to_promotions: boolean;
  selectedType: 'family' | 'caregiver' | null;
  //USER IS FAMILY
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
  family_prompt_category: string | null;
  family_images: string[];
  //USER IS CAREGIVER
  caregiverName: string | null;
  caregiverDob: string | null;
  caregiverGender: CaregiverGender | null;
  caregiverPronouns: string | null;
  caregiverReferral: string | null;
  caregiverShowPronouns: boolean;
  caregiverLocation: string | null;
  caregiverPositionType: CaregiverType | null;
  caregiverExperienceDuration: CaregiverExperience | null;
  caregiverEducation: CaregiverEducation | null;
  caregiverShowEducation: boolean;
  caregiverAbilities: CaregiverAbilities[] | null;
  caregiverCertifications: CaregiverCertification[] | null;
  caregiverLanguages: Language[] | null;
  caregiverAgeExperience: string[] | undefined;
  caregiverChildrenCount: number;
  hasNeuroDivergentExperience: 'yes' | 'no' | null;
  caregiverConditionExperience: CaregiverConditionExperience[] | null;
  hasPetExperience: 'yes' | 'no' | null;
  caregiverPetExperience: PetType[] | null;
  caregiverCreativeInterests: string[] | null;
  caregiverInstrumentInterests: string[] | null;
  caregiverSportInterest: string[] | null;
  caregiverStemInterests: string[] | null;
  caregiverPersonality: string[] | null;
  showCaregiverPersonality: boolean;
  caregiverRules: string[] | null;
  caregiverDiet: string[] | null;
  showCaregiverDiet: boolean;
  caregiverReligion: string[] | null;
  showCaregiverReligion: boolean;
  hasPhilosophyExperience: 'yes' | 'no' | null;
  caregiverPhilosophyExperience: CaregiverPhilosophies[] | null;
  caregiverLanguageMatch: boolean | null;
  caregiverPreferredPositions: CaregiverPositions[] | null;
  caregiverPreferredArrangement: CaregiverPreferredArrangement | null;
  isDealBreaker: boolean | null;
  caregiverCommitmentType: CaregiverCommitment | null;
  caregiverCommitmentStartDate: Date | null;
  caregiverCommitmentEndDate: Date | null;
  caregiverSchedule: CaregiverDaySchedule[] | undefined;
  caregiverChildcareResponsibilities: string[] | null;
  caregiverHouseholdResponsibilities: string[] | null;
  caregiverHourlyRate: number | null;
  caregiverSalaryAmount: string | null;
  caregiverPaymentType: 'Hourly' | 'Salary Base' | null;
  caregiverPaymentMethod: string;
  showCaregiverPaymentMethod: boolean | undefined;
  caregiverRequiredBenefits: string[] | null;
  showCaregiverRequiredBenefit: boolean | undefined;
  caregiverFirstPosition: CaregiverPositionHistory;
  caregiverSecondPosition: CaregiverPositionHistory;
  caregiverPromptCategory: string | undefined;
  caregiverFirstPrompt: string | undefined;
  caregiverFirstPromptAnswer: string | undefined;
  caregiverMoreInfo: string | undefined;
  caregiverImages: string[];
  steps: string;
  // Actions
  setUser: (user: UserProfile) => void;
  setToken: (token: string) => Promise<void>;
  updateUser: (userData: Partial<UserProfile>) => void;
  setPromotionSubscription: (subscribed: boolean) => void;
  setSelectedType: (type: 'family' | 'caregiver' | null) => void;
  //USER IS FAMILY
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
  //USER IS CAREGIVER
  setCaregiverName: (name: string | null) => void;
  setCaregiverDob: (dob: string | null) => void;
  setCaregiverGender: (gender: CaregiverGender | null) => void;
  setCaregiverPronouns: (pronouns: string | null) => void;
  setCaregiverShowPronouns: (show: boolean) => void;
  setCaregiverReferral: (referral: string | null) => void;
  setCaregiverLocation: (location: string | null) => void;
  setCaregiverPositionType: (type: CaregiverType | null) => void;
  setCaregiverExperienceDuration: (type: CaregiverExperience | null) => void;
  setCaregiverEducation: (type: CaregiverEducation | null) => void;
  setCaregiverShowEducation: (type: boolean) => void;
  setCaregiverAbilities: (type: CaregiverAbilities[] | null) => void;
  setCaregiverCertification: (type: CaregiverCertification[] | null) => void;
  setCaregiverLanguages: (type: Language[] | null) => void;
  setCaregiverAgeExperience: (type: string[] | undefined) => void;
  setCaregiverChildrenCount: (type: number) => void;
  setHasNeuroDivergentExperience: (type: 'yes' | 'no' | null) => void;
  setCaregiverConditionExperience: (
    type: CaregiverConditionExperience[] | null
  ) => void;
  setHasPetExperience: (type: 'yes' | 'no' | null) => void;
  setCaregiverPetExperience: (type: PetType[] | null) => void;
  setCaregiverCreativeInterests: (type: string[] | null) => void;
  setCaregiverInstrumentsInterests: (type: string[] | null) => void;
  setCaregiverSportsInterests: (type: string[] | null) => void;
  setCaregiverStemInterests: (type: string[] | null) => void;
  setCaregiverPersonality: (type: string[] | null) => void;
  setShowCaregiverPersonality: (type: boolean) => void;
  setCaregiverRules: (type: string[] | null) => void;
  setCaregiverDiet: (type: string[] | null) => void;
  setShowCaregiverDiet: (type: boolean) => void;
  setCaregiverReligion: (type: string[] | null) => void;
  setShowCaregiverReligion: (type: boolean) => void;
  setHasPhilosophyExperience: (type: 'yes' | 'no' | null) => void;
  setCaregiverPhilosophyExperience: (
    type: CaregiverPhilosophies[] | null
  ) => void;
  setCaregiverLanguageMatch: (type: boolean | null) => void;
  setCaregiverPreferredPositions: (type: CaregiverPositions[] | null) => void;
  setCaregiverPreferredArrangement: (
    type: CaregiverPreferredArrangement | null
  ) => void;
  setIsDealBreaker: (type: boolean | null) => void;
  setCaregiverCommitmentType: (type: CaregiverCommitment | null) => void;
  setCaregiverCommitmentStartDate: (type: Date | null) => void;
  setCaregiverCommitmentEndDate: (type: Date | null) => void;
  setCaregiverSchedule: (type: CaregiverDaySchedule[] | undefined) => void;
  setCaregiverChildcareResponsibilities: (type: string[] | null) => void;
  setCaregiverHouseholdResponsibilities: (type: string[] | null) => void;

  setCaregiverPaymentType: (type: 'Hourly' | 'Salary Base' | null) => void;
  setCaregiverHourlyRate: (type: number | null) => void;
  setCaregiverSalaryAmount: (type: string | null) => void;
  setCaregiverPaymentMethod: (type: string) => void;
  setShowCaregiverPaymentMethod: (type: boolean | undefined) => void;
  setCaregiverRequiredBenefits: (type: string[] | null) => void;
  setShowCaregiverRequiredBenefits: (type: boolean | undefined) => void;
  setCaregiverFirstPosition: (type: CaregiverPositionHistory) => void;
  setCaregiverSecondPosition: (type: CaregiverPositionHistory) => void;
  setCaregiverPromptCategory: (type: string | undefined) => void;
  setCaregiverFirstPrompt: (type: string | undefined) => void;
  setCaregiverFirstPromptAnswer: (type: string | undefined) => void;
  setCaregiverMoreInfo: (type: string | undefined) => void;
  setCaregiverImages: (images: string[]) => void;

  setSteps: (steps: string) => void;

  //
  clearUser: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setHydrated: (value: boolean) => void;
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
  setFamilyPromptCategory: (category: string | null) => void;
  setFamilyImages: (images: string[]) => void;
  logout: () => Promise<void>;
  resetOnboarding: () => void;
}

// Create store without persist middleware
export const useUserStore = create<UserState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  hydrated: false,
  subscribed_to_promotions: false,
  selectedType: null,
  // USER IS FAMILY
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
  family_prompt_category: 'get_to_know',
  family_images: [],
  // USER IS CAREGIVER
  caregiverName: null,
  caregiverDob: null,
  caregiverGender: null,
  caregiverPronouns: null,
  caregiverShowPronouns: false,
  caregiverReferral: null,
  caregiverLocation: null,
  caregiverPositionType: null,
  caregiverExperienceDuration: null,
  caregiverEducation: null,
  caregiverShowEducation: false,
  caregiverAbilities: [],
  caregiverCertifications: [],
  caregiverLanguages: [],
  caregiverAgeExperience: [],
  caregiverChildrenCount: 0,
  hasNeuroDivergentExperience: null,
  caregiverConditionExperience: [],
  hasPetExperience: null,
  caregiverPetExperience: [],
  caregiverCreativeInterests: [],
  caregiverInstrumentInterests: [],
  caregiverSportInterest: [],
  caregiverStemInterests: [],
  caregiverPersonality: [],
  showCaregiverPersonality: false,
  caregiverRules: [],
  caregiverDiet: [],
  showCaregiverDiet: false,
  caregiverReligion: [],
  showCaregiverReligion: false,
  hasPhilosophyExperience: null,
  caregiverPhilosophyExperience: [],
  caregiverLanguageMatch: null,
  caregiverPreferredPositions: [],
  caregiverPreferredArrangement: null,
  isDealBreaker: null,
  caregiverCommitmentType: null,
  caregiverCommitmentStartDate: new Date(),
  caregiverCommitmentEndDate: new Date(),
  caregiverSchedule: [
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
  caregiverChildcareResponsibilities: [],
  caregiverHouseholdResponsibilities: [],
  caregiverHourlyRate: 15,
  caregiverSalaryAmount: '50,000',
  caregiverPaymentType: null,
  caregiverPaymentMethod: '',
  showCaregiverPaymentMethod: false,
  caregiverRequiredBenefits: [],
  showCaregiverRequiredBenefit: false,
  caregiverFirstPosition: {
    positionNumber: null,
    position: '',
    ageGroup: '',
    familyName: '',
    employmentType: '',
    startDate: '',
    endDate: '',
  },
  caregiverSecondPosition: {
    positionNumber: null,
    position: '',
    ageGroup: '',
    familyName: '',
    employmentType: '',
    startDate: '',
    endDate: '',
  },
  caregiverPromptCategory: '',
  caregiverFirstPrompt: '',
  caregiverFirstPromptAnswer: '',
  caregiverMoreInfo: '',
  caregiverImages: [],
  steps: '',

  //
  setUser: (user: UserProfile) => set({ user, isAuthenticated: true }),

  setToken: async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      set({ token, isAuthenticated: true });
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  updateUser: (userData) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    })),

  setPromotionSubscription: (subscribed) =>
    set({ subscribed_to_promotions: subscribed }),

  setSelectedType: (type) => set({ selectedType: type }),
  //USER IS FAMILY
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
  //USER IS CAREGIVER
  setCaregiverName: (name) => set({ caregiverName: name }),
  setCaregiverDob: (dob) => set({ caregiverDob: dob }),
  setCaregiverGender: (gender) => set({ caregiverGender: gender }),
  setCaregiverShowPronouns: (show) => set({ caregiverShowPronouns: show }),
  setCaregiverPronouns: (pronouns) => set({ caregiverPronouns: pronouns }),
  setCaregiverReferral: (referral) => set({ caregiverReferral: referral }),
  setCaregiverLocation: (referral) => set({ caregiverLocation: referral }),
  setCaregiverPositionType: (type) => set({ caregiverPositionType: type }),
  setCaregiverExperienceDuration: (experience) =>
    set({ caregiverExperienceDuration: experience }),
  setCaregiverEducation: (education) =>
    set({ caregiverEducation: education }),
  setCaregiverShowEducation: (show) => set({ caregiverShowEducation: show }),
  setCaregiverAbilities: (abilities) =>
    set({ caregiverAbilities: abilities }),
  setCaregiverCertification: (certification) =>
    set({ caregiverCertifications: certification }),
  setCaregiverLanguages: (language) =>
    set({ caregiverLanguages: language }),
  setCaregiverAgeExperience: (ageExperience) =>
    set({ caregiverAgeExperience: ageExperience }),
  setCaregiverChildrenCount: (children) =>
    set({ caregiverChildrenCount: children }),
  setHasNeuroDivergentExperience: (neurodivergentExperience) =>
    set({ hasNeuroDivergentExperience: neurodivergentExperience }),
  setCaregiverConditionExperience: (conditions) =>
    set({ caregiverConditionExperience: conditions }),
  setHasPetExperience: (petExperience) =>
    set({ hasPetExperience: petExperience }),
  setCaregiverPetExperience: (pets) =>
    set({ caregiverPetExperience: pets }),
  setCaregiverCreativeInterests: (creative) =>
    set({ caregiverCreativeInterests: creative }),
  setCaregiverInstrumentsInterests: (instruments) =>
    set({ caregiverInstrumentInterests: instruments }),
  setCaregiverSportsInterests: (sports) =>
    set({ caregiverSportInterest: sports }),
  setCaregiverStemInterests: (stem) =>
    set({ caregiverStemInterests: stem }),
  setCaregiverPersonality: (personality) =>
    set({ caregiverPersonality: personality }),
  setShowCaregiverPersonality: (show) =>
    set({ showCaregiverPersonality: show }),
  setCaregiverRules: (rules) => set({ caregiverRules: rules }),
  setCaregiverDiet: (diet) => set({ caregiverDiet: diet }),
  setShowCaregiverDiet: (show) => set({ showCaregiverDiet: show }),
  setCaregiverReligion: (religion) => set({ caregiverReligion: religion }),
  setShowCaregiverReligion: (show) => set({ showCaregiverReligion: show }),
  setHasPhilosophyExperience: (philosophyExperience) =>
    set({ hasPhilosophyExperience: philosophyExperience }),
  setCaregiverPhilosophyExperience: (philosophies) =>
    set({ caregiverPhilosophyExperience: philosophies }),
  setCaregiverLanguageMatch: (match) =>
    set({ caregiverLanguageMatch: match }),
  setCaregiverPreferredPositions: (positions) =>
    set({ caregiverPreferredPositions: positions }),
  setCaregiverPreferredArrangement: (arrangement) =>
    set({ caregiverPreferredArrangement: arrangement }),
  setIsDealBreaker: (dealbreaker) => set({ isDealBreaker: dealbreaker }),
  setCaregiverCommitmentType: (commitment) =>
    set({ caregiverCommitmentType: commitment }),
  setCaregiverCommitmentEndDate: (end) =>
    set({ caregiverCommitmentEndDate: end }),
  setCaregiverCommitmentStartDate: (start) =>
    set({ caregiverCommitmentStartDate: start }),
  setCaregiverSchedule: (schedule) => set({ caregiverSchedule: schedule }),
  setCaregiverChildcareResponsibilities: (responsibilities) =>
    set({ caregiverChildcareResponsibilities: responsibilities }),
  setCaregiverHouseholdResponsibilities: (responsibilities) =>
    set({ caregiverHouseholdResponsibilities: responsibilities }),
  setCaregiverHourlyRate: (rate) => set({ caregiverHourlyRate: rate }),
  setCaregiverPaymentType: (payment) =>
    set({ caregiverPaymentType: payment }),
  setCaregiverSalaryAmount: (amount) =>
    set({ caregiverSalaryAmount: amount }),
  setCaregiverPaymentMethod: (method) =>
    set({ caregiverPaymentMethod: method }),
  setShowCaregiverPaymentMethod: (show) =>
    set({ showCaregiverPaymentMethod: show }),
  setCaregiverRequiredBenefits: (benfits) =>
    set({ caregiverRequiredBenefits: benfits }),
  setShowCaregiverRequiredBenefits: (show) =>
    set({ showCaregiverRequiredBenefit: show }),
  setCaregiverFirstPosition: (first) =>
    set({ caregiverFirstPosition: first }),
  setCaregiverSecondPosition: (second) =>
    set({ caregiverSecondPosition: second }),
  setCaregiverPromptCategory: (category) =>
    set({ caregiverPromptCategory: category }),
  setCaregiverFirstPrompt: (prompt) =>
    set({ caregiverFirstPrompt: prompt }),
  setCaregiverFirstPromptAnswer: (answer) =>
    set({ caregiverFirstPromptAnswer: answer }),
  setCaregiverMoreInfo: (prompt) => set({ caregiverMoreInfo: prompt }),
  setCaregiverImages: (images) => set({ caregiverImages: images }),

  //
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
    try {
      // Clear token from storage
      await AsyncStorage.removeItem('userToken');
      
      // Reset state
      set({ 
        token: null, 
        isAuthenticated: false,
        user: null
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },

  resetOnboarding: () => set({ 
    onboarding_screen: null, 
    steps: null,
    selectedType: null 
  }),

  setHydrated: (value: boolean) => set({ hydrated: value }),
}));

// Initialize hydration immediately
const initializeHydration = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      useUserStore.setState({ 
        token,
        isAuthenticated: true,
      });
    }
  } catch (error) {
    console.error('Hydration error:', error);
  } finally {
    // Always set hydrated to true when done
    useUserStore.setState({ hydrated: true });
  }
};

initializeHydration();

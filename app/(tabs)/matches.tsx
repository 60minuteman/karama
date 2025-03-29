import { ThemedText } from '@/components/ThemedText';
import { HomeNav } from '@/components/home/HomeNav';
import { ConversationItem } from '@/components/matches/ConversationItem';
import { EmptyMatches } from '@/components/matches/EmptyMatches';
import { MatchCircle } from '@/components/matches/MatchCircle';
import { SearchBar } from '@/components/matches/SearchBar';
import MatchesSkeleton from '@/components/matches/matchesSkeleton';
import {
  getUserById,
  getUserChatRooms,
  getUserDataById,
  getUserIdByEmail,
  useAuthFirebase,
} from '@/services/chat';
import { auth } from '@/services/firebase';
import { useUserStore } from '@/services/state/user';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Matches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([
    {
      created_at: '2025-03-27T11:24:23.903Z',
      updated_at: '2025-03-27T11:25:15.279Z',
      _v: 2,
      id: 'MATCH-01JQBNH7EHCDR1J6ZD4ZJVJN9R',
      family_has_liked: true,
      caregiver_has_liked: true,
      score: '5.0',
      match_status: 'COMPLETED',
      match_made_at: '2025-03-27T11:25:15.270Z',
      finalReminder_sent: false,
      conversation_started: false,
      caregiver_profile: {
        created_at: '2025-03-25T14:25:48.973Z',
        updated_at: '2025-03-27T11:24:23.818Z',
        _v: 6,
        id: 'CAREGIVER_PROFILE-01JQ6V3ZDDR0W0D09W01ZF09GB',
        name: 'Jane Doe',
        date_of_birth: '1990-10-05',
        gender: 'Transgender',
        pronouns: 'She/Her',
        aquisition_source: 'Family & Friends',
        zipcode: '12345',
        caregiver_type: 'Nanny',
        years_of_experience: '1-5 years',
        education_level: 'Undergraduate Degree',
        show_edu_level_on_profile: true,
        ages_best_with: ['Pre Schooler', 'Teenager'],
        children_capacity: 3,
        childcare_philosophies: ['Montessori', 'Reggio Emilia'],
        other_philosohies: null,
        availability: ['After school Pickup', 'Full Time'],
        arrangement_type: 'Live Out',
        required_benfits: ['Mileage Reimbursement', 'Yearly Bonus'],
        other_required_benefits: 'something else',
        rejected_families: [],
        liked_families: ['FAMILY_PROFILE-01JQBN1PZZMKEXFEMHSXH12SBX'],
        random_order: 0.8539412561101727,
        user: {
          created_at: '2025-03-25T14:25:48.964Z',
          updated_at: '2025-03-27T11:23:14.365Z',
          _v: 7,
          user_id: 'USER-01JQ6V3ZD2Y8Z48AC2QJ2ZJ85E',
          phone_number: '+2349138639900',
          email: null,
          role: 'CAREGIVER',
          name: 'Jane Doe',
          plan: 'FREE',
          subscribed_to_promotions: true,
          activity_status: 'ACTIVE',
          last_login: '2025-03-27T11:23:14.175Z',
          settings: null,
        },
        abilities_and_certifications: {
          id: 'CAREGIVER_ABILITIES-01JQ6V3ZEM94JMA5MMQFM75YZA',
          abilities: ['First Aid', 'CPR', 'Other'],
          other_ability: 'Child Yoga',
          certifications: ['Special Needs', 'Condition Specific', 'Other'],
          other_certification: 'Infant Care Specialist',
        },
        language: {
          id: 'CAREGIVER_LANGUAGE-01JQ6V3ZDTX82NXJ12MRY14V29',
          languages: ['English'],
          other: 'French',
          requires_same_language_family: false,
        },
        experience_with_disabilities: {
          id: 'CAREGIVER_DISABILITIES_EXPERIENCE-01JQ6V3ZEPYAGHEBPANGB90YNE',
          disabilities: ['Schizophrenia', 'Misophonia'],
          other: 'Sensory Processing Disorder',
        },
        experience_with_pets: {
          id: 'CAREGIVER_PETS_EXPERIENCE-01JQ6V3ZESK5JHFG0MG0ZW0FDW',
          pets: ['Turtle', 'Cat'],
          other: 'Birds',
        },
        hobbies: {
          creative_interests: ['Painting', 'Singing'],
          other_creative_interest: null,
          instrument_interests: ['Piano', 'Guitar'],
          other_instrument_interest: null,
          sport_interests: ['Soccer', 'Basketball'],
          other_sport_interest: null,
          stem_interests: ['Coding', 'Robotics'],
          other_stem_interest: null,
          id: 'CAREGIVER_HOBBIES-01JQ6V3ZEV9DY416KNX2J58WF4',
        },
        characteristics: {
          diets: ['Vegan', 'Vegetarian'],
          other_diets: null,
          show_diet_on_profile: true,
          rules: ['No Screens', 'Be Kind'],
          other_rules: null,
          show_rules_on_profile: true,
          religion: 'Christianity',
          other_religion: null,
          show_religion_on_profile: true,
          id: 'CAREGIVER_CHARACTERISTIC-01JQ6V3ZEX1QHBZW3P8EGK7TE0',
          personalities: ['Patient', 'Disciplined'],
          religion_is_dealbreaker: true,
        },
        job_commitment: {
          commitment: 'Long Term',
          start_date: '05/01/2000',
          end_date: null,
          id: 'CAREGIVER_JOB_COMMITMENT-01JQ6V3ZDWBB6M965FE2YCM0Y2',
        },
        service_days: [
          {
            day: 'Wednesday',
            begin: '07:00:00',
            end: '16:00:00',
            id: 'CAREGIVER_SERVICE_DAY-01JQ6V3ZDYS326YJ1WQFAMP8SC',
          },
          {
            day: 'Monday',
            begin: '08:00:00',
            end: '16:00:00',
            id: 'CAREGIVER_SERVICE_DAY-01JQ6V3ZDXPGAESAA5SSZGZSJA',
          },
        ],
        responsibilities: {
          childcare_responsibilities: [
            'Bathing',
            'Feeding',
            'Homework Help',
            'Other',
          ],
          other_childcare_responsibilities: 'Assist with bedtime routines',
          household_responsibilities: [
            'Cooking',
            'Light Housekeeping',
            'Other',
          ],
          other_household_responsibilities: 'Help with grocery shopping',
          id: 'CAREGIVER_RESPONSIBILITY-01JQ6V3ZEZBMK4B4XSJ33ZSGD3',
        },
        payment_info: {
          type: 'Hourly',
          hourly_min: 20,
          hourly_max: 30,
          salary: null,
          method: 'Employee',
          show_method_on_profile: true,
          id: 'CAREGIVER_PAYMENT_INFO-01JQ6V3ZE68Z346H1HZZBD29WH',
        },
        past_positions: [
          {
            id: 'CAREGIVER_PAST_POSITION-01JQ6V3ZE91DEGC67CP9G2YGXG',
            family_or_business_name: 'Smith Family',
            start_date: '05/10/2000',
            end_date: '05/10/2000',
            position_type: 'Caregiver/Housekeeper',
            children_age_group: ['Pre Schooler'],
            availability: 'After school Pickup',
            childcare_responsibilities: ['Packing Lunch', 'Play Dates'],
            household_responsibilities: ['Property Management', 'Meal Prep'],
          },
        ],
        prompts: [
          {
            category: 'Get to know Us',
            title: 'We consider our household a',
            answer: 'lovely place',
            id: 'CAREGIVER_PROMPT-01JQ6V3ZEGYJ0W5Q1V17AR91KD',
          },
        ],
        pictures: [
          {
            created_at: '2025-03-25T14:25:49.039Z',
            updated_at: '2025-03-25T14:25:49.057Z',
            _v: 2,
            id: 'IMAGE-01JQ6V3ZFET3YPZ7K729FEBYTF',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'PROFILE_PICTURE',
          },
          {
            created_at: '2025-03-25T14:25:49.042Z',
            updated_at: '2025-03-25T14:25:49.057Z',
            _v: 2,
            id: 'IMAGE-01JQ6V3ZFGKY68KJ3JEEDNDM3E',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-25T14:25:49.044Z',
            updated_at: '2025-03-25T14:25:49.057Z',
            _v: 2,
            id: 'IMAGE-01JQ6V3ZFJ8VFXX0T7CD798C9E',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-25T14:25:49.049Z',
            updated_at: '2025-03-25T14:25:49.057Z',
            _v: 2,
            id: 'IMAGE-01JQ6V3ZFQKQC7SDG8H1TE5A7D',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
        ],
      },
      family_profile: {
        created_at: '2025-03-27T11:15:55.519Z',
        updated_at: '2025-03-27T11:16:22.233Z',
        _v: 3,
        id: 'FAMILY_PROFILE-01JQBN1PZZMKEXFEMHSXH12SBX',
        name: 'Smith Family',
        behavioural_differences: [
          'Dyslexia',
          'ADHD',
          'Schizophrenia',
          'Misophonia',
        ],
        other_behavioural_differences: 'N/A',
        zipcode: '12345',
        aquisition_source: 'Press',
        languages: ['English', 'Spanilsh'],
        other_languages: null,
        pets: ['Cat', 'Small Dog', 'Parrot', 'Turtle'],
        other_pets: 'N/A',
        random_order: 0.6937065690070501,
        user: {
          created_at: '2025-03-27T11:15:42.041Z',
          updated_at: '2025-03-27T11:28:09.363Z',
          _v: 11,
          user_id: 'USER-01JQBN19SSFDPRV6MG547CKDVA',
          phone_number: '+12568465483',
          email: null,
          role: 'FAMILY',
          name: 'Smith Family',
          plan: 'FREE',
          subscribed_to_promotions: true,
          activity_status: 'ACTIVE',
          last_login: '2025-03-27T11:28:09.180Z',
          settings: null,
        },
        description: {
          id: 'FAMILY_DESCRIPTION-01JQBN1Q10NVETTS2XGN0KXH9V',
          description: 'Mom & Dad',
          other: 'N/A',
          show_on_profile: true,
        },
        children: [
          {
            id: 'CHILD-01JQBN1Q21ENE7KNRB1S86C1QD',
            age_group: 'Pre Schooler',
            count: 1,
          },
          {
            id: 'CHILD-01JQBN1Q214X6T43RPCJ5QT6G8',
            age_group: 'Teenager',
            count: 1,
          },
        ],
        allergies: {
          id: 'FAMILY_ALLERGIES-01JQBN1Q30M9RNWS1VRZQTXZTT',
          food_allergies: ['Other'],
          other_food_allergies: 'Sesame',
          environmental_allergies: ['Animal Dander', 'Other'],
          other_environtal_allergies: null,
          other_allergies: ['Perfume', 'Other'],
          other_other_allergies: "Medications'",
        },
        children_interests: {
          creative_interests: ['Painting', 'Singing'],
          other_creative_interest: null,
          instrument_interests: ['Piano', 'Guitar'],
          other_instrument_interest: null,
          sport_interests: ['Soccer', 'Basketball'],
          other_sport_interest: null,
          stem_interests: ['Coding', 'Robotics'],
          other_stem_interest: null,
          id: 'CHILDREN_INTERESTS-01JQBN1Q18QZ6CA8RQGRMWCH0P',
        },
        household_info: {
          diets: ['Vegan', 'Vegetarian'],
          other_diets: 'N/A',
          show_diet_on_profile: true,
          rules: ['No Screens', 'Be Kind'],
          other_rules: 'N/A',
          show_rules_on_profile: true,
          religion: 'Christianity',
          other_religion: 'N/A',
          show_religion_on_profile: true,
          id: 'HOUSEHOLD_INFO-01JQBN1Q1HB21HW002QDSNR1QJ',
        },
        philosophies: {
          id: 'FAMILY_PHILOSOPHIES-01JQBN1Q1RRNP4MNNJD2SCR7HV',
          philosophies: ['Montessori', 'Gentle Parenting', 'Reggio Emilia'],
          other: 'N/A',
          show_on_profile: true,
        },
        extra_info: {
          id: 'FAMILY_EXTRA_INFO-01JQBN242VSQAJK5WA30W5GGZA',
          more_information: 'guyyyyy',
        },
        pictures: [
          {
            created_at: '2025-03-27T11:16:21.277Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2G4Q9CS72YG1HYBYQFTP',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'PROFILE_PICTURE',
          },
          {
            created_at: '2025-03-27T11:16:21.642Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2GG6HQX9Q7PEJ4FWJ22X',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-27T11:16:21.656Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2GGG501CCZVSDTPSQZC4',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-27T11:16:21.713Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2GH9TB7MFRZ1FZYC7218',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-27T11:16:22.117Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2GYRGC8K2GH5HMTZYYGY',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
        ],
        caregiver_preference: {
          id: 'FAMILY_CAREGIVER_PREFERENCE-01JQBN1WQX95Z2AQM7FFYCBXFT',
          caregiver_types: ['Nanny', 'Babysitter'],
          caregiver_type_is_dealbreaker: true,
          personalities: ['Bubbly', 'Patient'],
          personality_is_dealbreaker: false,
          experience: '1-5 years',
          experience_is_dealbreaker: false,
          must_speak_same_language: true,
          education_level: 'Undergraduate Degree',
          show_education_level_on_profile: true,
          availability: 'Full Time',
          availability_is_dealbreaker: true,
          arrangement_type: 'Live Out',
          arrangement_type_is_dealbreaker: false,
          rejected_caregivers: [],
          liked_caregivers: [
            'CAREGIVER_PROFILE-01JQ6V3ZDDR0W0D09W01ZF09GB',
            'CAREGIVER_PROFILE-01JQ6V3ZJX4Q6CEN4A7ERMQ4GM',
          ],
        },
      },
    },
    {
      created_at: '2025-03-27T11:27:13.586Z',
      updated_at: '2025-03-27T11:28:54.750Z',
      _v: 2,
      id: 'MATCH-01JQBNPD5CQM6GQNYMR9SP5KXF',
      family_has_liked: true,
      caregiver_has_liked: true,
      score: '5.0',
      match_status: 'COMPLETED',
      match_made_at: '2025-03-27T11:28:54.742Z',
      finalReminder_sent: false,
      conversation_started: false,
      caregiver_profile: {
        created_at: '2025-03-25T14:25:49.148Z',
        updated_at: '2025-03-27T11:27:13.548Z',
        _v: 6,
        id: 'CAREGIVER_PROFILE-01JQ6V3ZJX4Q6CEN4A7ERMQ4GM',
        name: 'Jane Doe',
        date_of_birth: '1990-10-05',
        gender: 'Transgender',
        pronouns: 'She/Her',
        aquisition_source: 'Family & Friends',
        zipcode: '12345',
        caregiver_type: 'Nanny',
        years_of_experience: '1-5 years',
        education_level: 'Undergraduate Degree',
        show_edu_level_on_profile: true,
        ages_best_with: ['Pre Schooler', 'Teenager'],
        children_capacity: 3,
        childcare_philosophies: ['Montessori', 'Reggio Emilia'],
        other_philosohies: null,
        availability: ['After school Pickup', 'Full Time'],
        arrangement_type: 'Live Out',
        required_benfits: ['Mileage Reimbursement', 'Yearly Bonus'],
        other_required_benefits: 'something else',
        rejected_families: [],
        liked_families: ['FAMILY_PROFILE-01JQBN1PZZMKEXFEMHSXH12SBX'],
        random_order: 0.83136564100237,
        user: {
          created_at: '2025-03-25T14:25:49.144Z',
          updated_at: '2025-03-27T11:26:58.451Z',
          _v: 8,
          user_id: 'USER-01JQ6V3ZJQ7VBE30MYEBJ49T4W',
          phone_number: '+2349138639906',
          email: null,
          role: 'CAREGIVER',
          name: 'Jane Doe',
          plan: 'FREE',
          subscribed_to_promotions: true,
          activity_status: 'ACTIVE',
          last_login: '2025-03-27T11:26:58.272Z',
          settings: null,
        },
        abilities_and_certifications: {
          id: 'CAREGIVER_ABILITIES-01JQ6V3ZM4AYDHFWM1HFCW77E8',
          abilities: ['First Aid', 'CPR', 'Other'],
          other_ability: 'Child Yoga',
          certifications: ['Special Needs', 'Condition Specific', 'Other'],
          other_certification: 'Infant Care Specialist',
        },
        language: {
          id: 'CAREGIVER_LANGUAGE-01JQ6V3ZK64H0D2WNHA1X3E0G2',
          languages: ['English'],
          other: 'French',
          requires_same_language_family: false,
        },
        experience_with_disabilities: {
          id: 'CAREGIVER_DISABILITIES_EXPERIENCE-01JQ6V3ZM6YKRQCAARZNFNQMFZ',
          disabilities: ['Schizophrenia', 'Misophonia'],
          other: 'Sensory Processing Disorder',
        },
        experience_with_pets: {
          id: 'CAREGIVER_PETS_EXPERIENCE-01JQ6V3ZM7GAH13XXEXNKAA20W',
          pets: ['Turtle', 'Cat'],
          other: 'Birds',
        },
        hobbies: {
          creative_interests: ['Painting', 'Singing'],
          other_creative_interest: null,
          instrument_interests: ['Piano', 'Guitar'],
          other_instrument_interest: null,
          sport_interests: ['Soccer', 'Basketball'],
          other_sport_interest: null,
          stem_interests: ['Coding', 'Robotics'],
          other_stem_interest: null,
          id: 'CAREGIVER_HOBBIES-01JQ6V3ZM9MMYQWSNKSPBV5KXW',
        },
        characteristics: {
          diets: ['Vegan', 'Vegetarian'],
          other_diets: null,
          show_diet_on_profile: true,
          rules: ['No Screens', 'Be Kind'],
          other_rules: null,
          show_rules_on_profile: true,
          religion: 'Christianity',
          other_religion: null,
          show_religion_on_profile: true,
          id: 'CAREGIVER_CHARACTERISTIC-01JQ6V3ZMAZYGW0V2CHX404X8N',
          personalities: ['Patient', 'Disciplined'],
          religion_is_dealbreaker: true,
        },
        job_commitment: {
          commitment: 'Long Term',
          start_date: '05/01/2000',
          end_date: null,
          id: 'CAREGIVER_JOB_COMMITMENT-01JQ6V3ZK8677H71KFAVG3SW49',
        },
        service_days: [
          {
            day: 'Wednesday',
            begin: '07:00:00',
            end: '16:00:00',
            id: 'CAREGIVER_SERVICE_DAY-01JQ6V3ZK9JYND8CNKZCE2JBG4',
          },
          {
            day: 'Monday',
            begin: '08:00:00',
            end: '16:00:00',
            id: 'CAREGIVER_SERVICE_DAY-01JQ6V3ZK9B9WKT87JGZ69AF9J',
          },
        ],
        responsibilities: {
          childcare_responsibilities: [
            'Bathing',
            'Feeding',
            'Homework Help',
            'Other',
          ],
          other_childcare_responsibilities: 'Assist with bedtime routines',
          household_responsibilities: [
            'Cooking',
            'Light Housekeeping',
            'Other',
          ],
          other_household_responsibilities: 'Help with grocery shopping',
          id: 'CAREGIVER_RESPONSIBILITY-01JQ6V3ZMDYSA2F2GB4BS5YSHE',
        },
        payment_info: {
          type: 'Hourly',
          hourly_min: 20,
          hourly_max: 30,
          salary: null,
          method: 'Employee',
          show_method_on_profile: true,
          id: 'CAREGIVER_PAYMENT_INFO-01JQ6V3ZKJK5WJ0968FMGQ317H',
        },
        past_positions: [
          {
            id: 'CAREGIVER_PAST_POSITION-01JQ6V3ZKM3HXAP1KW0YFD8WWG',
            family_or_business_name: 'Smith Family',
            start_date: '05/10/2000',
            end_date: '05/10/2000',
            position_type: 'Caregiver/Housekeeper',
            children_age_group: ['Pre Schooler'],
            availability: 'After school Pickup',
            childcare_responsibilities: ['Packing Lunch', 'Play Dates'],
            household_responsibilities: ['Property Management', 'Meal Prep'],
          },
        ],
        prompts: [
          {
            category: 'Get to know Us',
            title: 'We consider our household a',
            answer: 'lovely place',
            id: 'CAREGIVER_PROMPT-01JQ6V3ZKTMV547M3QK0HV0N89',
          },
        ],
        pictures: [
          {
            created_at: '2025-03-25T14:25:49.211Z',
            updated_at: '2025-03-25T14:25:49.232Z',
            _v: 2,
            id: 'IMAGE-01JQ6V3ZMT9J34N20MRG9C0V5N',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'PROFILE_PICTURE',
          },
          {
            created_at: '2025-03-25T14:25:49.216Z',
            updated_at: '2025-03-25T14:25:49.232Z',
            _v: 2,
            id: 'IMAGE-01JQ6V3ZMYZB7852MDYVP90CXJ',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-25T14:25:49.220Z',
            updated_at: '2025-03-25T14:25:49.232Z',
            _v: 2,
            id: 'IMAGE-01JQ6V3ZN2Z14W9QE9E8Y14SRM',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-25T14:25:49.223Z',
            updated_at: '2025-03-25T14:25:49.232Z',
            _v: 2,
            id: 'IMAGE-01JQ6V3ZN5JM60STSYPP43VG6K',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
        ],
      },
      family_profile: {
        created_at: '2025-03-27T11:15:55.519Z',
        updated_at: '2025-03-27T11:16:22.233Z',
        _v: 3,
        id: 'FAMILY_PROFILE-01JQBN1PZZMKEXFEMHSXH12SBX',
        name: 'Smith Family',
        behavioural_differences: [
          'Dyslexia',
          'ADHD',
          'Schizophrenia',
          'Misophonia',
        ],
        other_behavioural_differences: 'N/A',
        zipcode: '12345',
        aquisition_source: 'Press',
        languages: ['English', 'Spanilsh'],
        other_languages: null,
        pets: ['Cat', 'Small Dog', 'Parrot', 'Turtle'],
        other_pets: 'N/A',
        random_order: 0.6937065690070501,
        user: {
          created_at: '2025-03-27T11:15:42.041Z',
          updated_at: '2025-03-27T11:28:09.363Z',
          _v: 11,
          user_id: 'USER-01JQBN19SSFDPRV6MG547CKDVA',
          phone_number: '+12568465483',
          email: null,
          role: 'FAMILY',
          name: 'Smith Family',
          plan: 'FREE',
          subscribed_to_promotions: true,
          activity_status: 'ACTIVE',
          last_login: '2025-03-27T11:28:09.180Z',
          settings: null,
        },
        description: {
          id: 'FAMILY_DESCRIPTION-01JQBN1Q10NVETTS2XGN0KXH9V',
          description: 'Mom & Dad',
          other: 'N/A',
          show_on_profile: true,
        },
        children: [
          {
            id: 'CHILD-01JQBN1Q21ENE7KNRB1S86C1QD',
            age_group: 'Pre Schooler',
            count: 1,
          },
          {
            id: 'CHILD-01JQBN1Q214X6T43RPCJ5QT6G8',
            age_group: 'Teenager',
            count: 1,
          },
        ],
        allergies: {
          id: 'FAMILY_ALLERGIES-01JQBN1Q30M9RNWS1VRZQTXZTT',
          food_allergies: ['Other'],
          other_food_allergies: 'Sesame',
          environmental_allergies: ['Animal Dander', 'Other'],
          other_environtal_allergies: null,
          other_allergies: ['Perfume', 'Other'],
          other_other_allergies: "Medications'",
        },
        children_interests: {
          creative_interests: ['Painting', 'Singing'],
          other_creative_interest: null,
          instrument_interests: ['Piano', 'Guitar'],
          other_instrument_interest: null,
          sport_interests: ['Soccer', 'Basketball'],
          other_sport_interest: null,
          stem_interests: ['Coding', 'Robotics'],
          other_stem_interest: null,
          id: 'CHILDREN_INTERESTS-01JQBN1Q18QZ6CA8RQGRMWCH0P',
        },
        household_info: {
          diets: ['Vegan', 'Vegetarian'],
          other_diets: 'N/A',
          show_diet_on_profile: true,
          rules: ['No Screens', 'Be Kind'],
          other_rules: 'N/A',
          show_rules_on_profile: true,
          religion: 'Christianity',
          other_religion: 'N/A',
          show_religion_on_profile: true,
          id: 'HOUSEHOLD_INFO-01JQBN1Q1HB21HW002QDSNR1QJ',
        },
        philosophies: {
          id: 'FAMILY_PHILOSOPHIES-01JQBN1Q1RRNP4MNNJD2SCR7HV',
          philosophies: ['Montessori', 'Gentle Parenting', 'Reggio Emilia'],
          other: 'N/A',
          show_on_profile: true,
        },
        extra_info: {
          id: 'FAMILY_EXTRA_INFO-01JQBN242VSQAJK5WA30W5GGZA',
          more_information: 'guyyyyy',
        },
        pictures: [
          {
            created_at: '2025-03-27T11:16:21.277Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2G4Q9CS72YG1HYBYQFTP',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'PROFILE_PICTURE',
          },
          {
            created_at: '2025-03-27T11:16:21.642Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2GG6HQX9Q7PEJ4FWJ22X',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-27T11:16:21.656Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2GGG501CCZVSDTPSQZC4',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-27T11:16:21.713Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2GH9TB7MFRZ1FZYC7218',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
          {
            created_at: '2025-03-27T11:16:22.117Z',
            updated_at: '2025-03-27T11:16:22.233Z',
            _v: 2,
            id: 'IMAGE-01JQBN2GYRGC8K2GH5HMTZYYGY',
            path: 'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg',
            key: 'dummy-key',
            blur_hash: 'eUI#fID%M{x]WW~pM_Rjxvxv%MM{M_WCogD*ogNFfRt8RQt7xuodkC',
            type: 'OTHER',
          },
        ],
        caregiver_preference: {
          id: 'FAMILY_CAREGIVER_PREFERENCE-01JQBN1WQX95Z2AQM7FFYCBXFT',
          caregiver_types: ['Nanny', 'Babysitter'],
          caregiver_type_is_dealbreaker: true,
          personalities: ['Bubbly', 'Patient'],
          personality_is_dealbreaker: false,
          experience: '1-5 years',
          experience_is_dealbreaker: false,
          must_speak_same_language: true,
          education_level: 'Undergraduate Degree',
          show_education_level_on_profile: true,
          availability: 'Full Time',
          availability_is_dealbreaker: true,
          arrangement_type: 'Live Out',
          arrangement_type_is_dealbreaker: false,
          rejected_caregivers: [],
          liked_caregivers: [
            'CAREGIVER_PROFILE-01JQ6V3ZDDR0W0D09W01ZF09GB',
            'CAREGIVER_PROFILE-01JQ6V3ZJX4Q6CEN4A7ERMQ4GM',
          ],
        },
      },
    },
  ]); // Changed to empty array by default
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser, loading: authLoading } = useAuthFirebase();
  const firebaseUser = useUserStore((state) => state.firebaseCurrentUser);
  console.log('auth.currentUser firebaseUser', firebaseUser?.email);

  useEffect(() => {
    if (!firebaseUser) {
      return;
    }
    const getChatRooms = async () => {
      try {
        const currentUserValue = firebaseUser;
        if (!currentUserValue?.email) {
          throw new Error('No user email found');
        }
        const userId = await getUserIdByEmail(currentUserValue?.email);
        console.log('userId', userId);
        if (!userId) {
          throw new Error('No user ID found');
        }
        const chatRooms = await getUserChatRooms(userId);
        setChatRooms(chatRooms);
        setCurrentUserId(userId);
        setLoading(false);
      } catch (error) {
        console.error('Error getting chat rooms:', error);
        setLoading(false);
      }
    };
    getChatRooms();
  }, [authLoading, currentUser]);

  // Array of pastel colors to use as placeholders
  const pastelColors = [
    'https://via.placeholder.com/150/FFB3BA/FFFFFF?text=', // Pastel pink
    'https://via.placeholder.com/150/BAFFC9/FFFFFF?text=', // Pastel green
    'https://via.placeholder.com/150/BAE1FF/FFFFFF?text=', // Pastel blue
    'https://via.placeholder.com/150/FFFFBA/FFFFFF?text=', // Pastel yellow
    'https://via.placeholder.com/150/FFB3FF/FFFFFF?text=', // Pastel purple
    'https://via.placeholder.com/150/FFD9BA/FFFFFF?text=', // Pastel orange
    'https://via.placeholder.com/150/E5CCFF/FFFFFF?text=', // Pastel lavender
  ];

  const hasMatches = matches.length > 0;

  if (loading || authLoading) {
    return <MatchesSkeleton />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.title}>Matches</ThemedText>

        {chatRooms.length > 0 || matches.length > 0 ? (
          <>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSearch={() => {}}
            />

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Matches</ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.matchesScroll}
              >
                {matches.map((match) => (
                  <MatchCircle
                    key={match.id}
                    imageUrl={match?.caregiver_profile?.pictures[0]?.path}
                    match={match}
                    onPress={() => {}}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <View style={styles.conversationsHeader}>
                <ThemedText style={styles.sectionTitle}>
                  Conversations
                </ThemedText>
                <ThemedText style={styles.filterText}>All</ThemedText>
              </View>

              <ScrollView>
                {chatRooms.map((match) => {
                  const otherUserId = match.members.find(
                    (member: any) => member !== currentUserId
                  );
                  console.log('match', match);
                  const lastUpdatedTime = match?.lastUpdated?.seconds
                    ? new Date(
                        match.lastUpdated.seconds * 1000
                      ).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })
                    : '';
                  // const otherUser = await getUserById(otherUserId);
                  return (
                    <ConversationItem
                      key={match.id}
                      imageUrl={
                        'https://karama.nyc3.cdn.digitaloceanspaces.com/profile/01JPQQXKV25GFHAJR4T6CC3K5X.jpg'
                      }
                      name={match?.name}
                      lastMessage={match?.lastMessage}
                      time={lastUpdatedTime}
                      otherUser={otherUserId}
                      onPress={() =>
                        router.push(`/messages/${match.id}?name=${otherUserId}`)
                      }
                    />
                  );
                })}
              </ScrollView>
            </View>
          </>
        ) : (
          <EmptyMatches />
        )}
      </SafeAreaView>
      {/* <HomeNav /> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold',
    lineHeight: 38,
    color: '#002140',
    marginTop: 16,
    marginLeft: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    marginLeft: 16,
    marginBottom: 12,
  },
  matchesScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  conversationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
});

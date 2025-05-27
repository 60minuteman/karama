import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useOtherStore = create<any>()(
  persist(
    (set) => ({
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
      addLikeProfile: (item: any) =>
        set(() => ({
          likeProfile: [item],
        })),
      addPrompts: (item: { category: string; title: string; answer: string }) =>
        set((state: any) => ({
          prompts: [...state.prompts, item],
        })),
      setFamilyEducation: (item: string) =>
        set(() => ({
          familyEducation: item,
        })),
      addOtherHear: (item: string) =>
        set(() => ({
          otherHear: item,
        })),
      addOtherConditons: (item: string) =>
        set(() => ({
          otherConditons: item,
        })),
      addOtherSport: (item: string) =>
        set(() => ({
          otherSport: item,
        })),
      addOtherCreativeActivity: (item: string) =>
        set(() => ({
          otherCreativeActivity: item,
        })),
      addOtherInstrument: (item: string) =>
        set(() => ({
          otherInstument: item,
        })),
      addOtherStem: (item: string) =>
        set(() => ({
          otherStem: item,
        })),
      addOtherPet: (item: string) =>
        set(() => ({
          otherPet: item,
        })),
      addOtherLanguage: (item: string) =>
        set(() => ({
          otherLanguage: item,
        })),

      addOtherRequirement: (item: string) =>
        set(() => ({
          otherRequirement: item,
        })),
      addOtherPhilosophy: (item: string) =>
        set(() => ({
          otherPhilosophy: item,
        })),
      addOtherDiet: (item: string) =>
        set(() => ({
          otherDiet: item,
        })),
      addOtherGender: (item: string) =>
        set(() => ({
          otherGender: item,
        })),
      addOtherRule: (item: string) =>
        set(() => ({
          otherRule: item,
        })),
      addOtherReligion: (item: string) =>
        set(() => ({
          otherReligion: item,
        })),
      addOtherFamilyDescription: (item: string) =>
        set(() => ({
          otherFamilyDescription: item,
        })),
      addOtherHouseholdResponsibilities: (item: string) =>
        set(() => ({
          otherHouseholdResponsibilities: item,
        })),
      addOtherChildResponsibilities: (item: string) =>
        set(() => ({
          otherChildResponsibilities: item,
        })),
      addOtherCertifications: (item: string) =>
        set(() => ({
          otherCertifications: item,
        })),
      addOtherPrefernces: (item: string) =>
        set(() => ({
          otherPrefernces: item,
        })),
    }),
    {
      name: 'other-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
    }
  )
);

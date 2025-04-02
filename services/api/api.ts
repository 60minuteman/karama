import { useAuth } from '@/app/store/auth';
import useAuthQuery from '@/hooks/useAuthQuery';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useUserStore } from '../state/user';
import customAxios from './envConfig';

export const fetchSignUpVerify = async (email: any, userType: any) => {
  const { data } = await customAxios.get('/auth/signup-verify', {
    data: {
      field: email,
      user_type: userType,
    },
  });
  console.log('ror', data);
  return data;
};

// export const useUserApi = (email, userType) => {
//   return useQuery({
//     queryKey: ['user', email, userType],
//     queryFn: () => fetchUser(email, userType),
//     enabled: !!email,
//   });
// };

export const fetchMatchingCaregivers = async (cursor = '', role: any) => {
  const endpoint =
    role == 'FAMILY'
      ? '/family-discovery/get-matching-caregivers'
      : '/caregiver-discovery/get-matching-families';

  const { data } = await customAxios.get(endpoint, {
    params: {
      page_size: 10,
      cursor: cursor || '',
    },
  });
  return data;
};

export const useMatchingCaregivers = (cursor: string, endpoint: string, options?: any) => {
  return useQuery({
    queryKey: ['matchingCaregivers', cursor],
    queryFn: async () => {
      const response = await customAxios.get(endpoint, {
        params: { 
          cursor,
          page_size: 10 // Request 10 profiles at a time
        },
        headers: {
          ...options?.headers
        }
      });
      return response.data;
    },
    ...options,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};

export const fetchMatchingCaregiversInfinity = async ({
  pageSize,
  cursor,
  role,
}: {
  pageSize: number;
  cursor: string;
  role: string;
}) => {
  console.log('pageSize***', pageSize, cursor);

  const endpoint =
    role === 'family'
      ? '/family-discovery/get-matching-caregivers'
      : '/caregiver-discovery/get-matching-families';

  const { data } = await customAxios.get(endpoint, {
    params: {
      pageSize,
      cursor: cursor || '',
    },
  });
  console.log('data***', data);
  return data;
};

export const useMatchingCaregiversInfinity = () => {
  const { token } = useUserStore();
  return useInfiniteQuery({
    queryKey: ['matching-caregivers-infinity'],
    queryFn: ({ pageParam }: any) =>
      fetchMatchingCaregiversInfinity({
        pageSize: 10,
        cursor: pageParam as string,
        role: 'family',
      }),
    initialPageParam: '',
    getNextPageParam: (lastPage: any) => {
      if (!lastPage?.data) return undefined;
      return lastPage.data.next_cursor || undefined;
    },
    enabled: !!token,
  });
};

// Add new function to handle optimistic updates
export const useMatchingCaregiversWithOptimisticUpdates = () => {
  const { token } = useUserStore();
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: ['matching-caregivers-infinity'],
    queryFn: ({ pageParam }: any) =>
      fetchMatchingCaregiversInfinity({
        pageSize: 10,
        cursor: pageParam as string,
        role: 'family',
      }),
    initialPageParam: '',
    getNextPageParam: (lastPage: any) => {
      if (!lastPage?.data) return undefined;
      return lastPage.data.next_cursor || undefined;
    },
    enabled: !!token,
  });
};

export const fetchCurrentUser = async () => {
  const { data } = await customAxios.get('/users');
  return data;
};

export const useCurrentUser = () => {
  const { token } = useUserStore();
  return useAuthQuery({
    queryKey: ['current-user'],
    queryFn: fetchCurrentUser,
    retry: 3,
    enabled: !!token,
  });
};

export const fetchCompletedMatches = async (role: string) => {
  const endpoint =
    role.toLowerCase() === 'FAMILY'
      ? '/family-matches/completed-matches'
      : '/caregiver-matches/completed-matches';

  const { data } = await customAxios.get(endpoint);
  return data;
};

export const useCompletedMatches = (role: string) => {
  const { token } = useUserStore();

  return useAuthQuery({
    queryKey: ['completed-matches', role],
    queryFn: () => fetchCompletedMatches(role),
    retry: 3,
    enabled: !!token && !!role,
  });
};

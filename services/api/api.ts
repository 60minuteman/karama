import { useAuth } from '@/app/store/auth';
import useAuthQuery from '@/hooks/useAuthQuery';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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

export const fetchMatchingCaregivers = async () => {
  const { data } = await customAxios.get(
    '/family-discovery/get-matching-caregivers'
  );
  return data;
};

export const useMatchingCaregivers = () => {
  const { token } = useUserStore();
  return useAuthQuery({
    queryKey: ['matching-caregivers'],
    queryFn: fetchMatchingCaregivers,
    retry: 3,
    enabled: !!token,
  });
};

export const fetchMatchingCaregiversInfinity = async (pageParam: any) => {
  const { data } = await customAxios.get(
    '/family-discovery/get-matching-caregivers',
    {
      params: {
        pageSize: 1,
        cursor: pageParam,
      },
    }
  );
  return data;
};

export const useMatchingCaregiversInfinity = () => {
  const { token } = useUserStore();
  return useInfiniteQuery({
    queryKey: ['matching-caregivers-infinity'],
    queryFn: ({ pageParam }: any) =>
      fetchMatchingCaregiversInfinity({
        pageSize: 1,
        cursor: pageParam as string,
      }),
    initialPageParam: '',
    getNextPageParam: (lastPage: any) => {
      console.log('lastPage response:', lastPage); // Full response
      console.log('lastPage.data:', lastPage?.data); // Check data property
      console.log('next_cursor:', lastPage?.data?.next_cursor); // Check next_cursor

      if (!lastPage?.data) return undefined;
      return lastPage.data.next_cursor || undefined;
    },
    enabled: !!token,
  });
};

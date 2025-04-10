import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { Redirect, router, useRouter } from 'expo-router';
import { useAuth } from '../app/store/auth';
import UserService from '../services/api/UserService';

const useAuthMutation = (...options: any) => {
  const mutation = useMutation(...options);
  const router = useRouter();
  // const { setUser, token, clear } = useAuth();
  const { token } = useUserStore();

  if (token) {
    if (
      mutation?.error?.response?.status === 401 ||
      mutation?.error?.response?.status === 403 ||
      mutation?.error?.response?.data?.message === 'invalid credentials'
    ) {
      // Insert custom access-token refresh logic here. For now, we are
      // just refreshing the page here, so as to redirect them to the
      // login page since their token is now expired.
      console.log('useAuthQuery', mutation?.error?.response?.data?.message);

      // (async () => {
      //   try {
      //     await clear();
      //     return;
      //   } catch (error) {
      //     // console.log('useAuthQuery', error);
      //     await clear();
      //     return;
      //   }
      // })();
    }
    return mutation;
  }

  return mutation;
};

export default useAuthMutation;

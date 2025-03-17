import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// axios.defaults.baseURL = 'https://api.usemelon.co/api/v1';
// const customAxios = axios.create();
// https://api.staging.usemelon.co/api/v1

const customAxios = axios.create({
  baseURL: 'https://starfish-app-7pbch.ondigitalocean.app',
  headers: {},
});

// customAxios.interceptors.request.use(
//   async (config: any) => {
//     const tokencus = await AsyncStorage.getItem('@melonToken');
//     const { token } = useAuth();
//     console.log('working======', token?.slice(1, -1), token);
//     config.headers.Authorization = `Bearer ${tokencus?.slice(1, -1)}`;
//     return config;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   }
// );

const requestHandler = async (request: any) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVU0VSLTAxSlBEQURNNFc0NzhLMzg4MUNYUTlGM1k2IiwicGhvbmVOdW1iZXIiOiIrMjM0OTEzODYzOTUwMSIsIm5vbmNlIjoiMDFKUERBUURGRzFYRVY1V0ZFRURaME00OVEiLCJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDI1LTAzLTE1VDE2OjMyOjU4LjU0N1oiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0xNVQxNjozNDoyMC4xMzdaIiwiX3YiOjQsInVzZXJfaWQiOiJVU0VSLTAxSlBEQURNNFc0NzhLMzg4MUNYUTlGM1k2IiwicGhvbmVfbnVtYmVyIjoiKzIzNDkxMzg2Mzk1MDEiLCJlbWFpbCI6bnVsbCwicm9sZSI6IkZBTUlMWSIsIm5hbWUiOiJTbWl0aCBGYW1pbHkiLCJwbGFuIjoiU1RBTkRBUkQiLCJzdWJzY3JpYmVkX3RvX3Byb21vdGlvbnMiOnRydWUsImFjdGl2aXR5X3N0YXR1cyI6IkFDVElWRSIsImxhc3RfbG9naW4iOiIyMDI1LTAzLTE1VDE2OjMyOjU4LjU5NVoifSwiaWF0IjoxNzQyMDU2Njk5LCJleHAiOjE3NDU2NTY2OTl9.lUQ6Hg0bbEWZVkLYZseShoJdC0Q5uOBYkBGY0T9l0xQ`;
  }
  return request;
};

const errorHandler = (error: any) => {
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

export default customAxios;

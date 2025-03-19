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
  // console.log('token==========', token);
  if (token) {
    console.log('token', token);
    request.headers.Authorization = `Bearer ${token}`;
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

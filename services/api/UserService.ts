import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserService {
  static async getToken() {
    const data = await AsyncStorage.getItem('@user');
    return JSON.parse(data);
  }

  static setToken(token) {
    // localStorage.setItem('skoolpay', token);
  }

  static async removeToken() {
    await AsyncStorage.removeItem('@user');
  }

  static clearCredentials() {
    // localStorage.clear();
  }

  static async isUserLoggedIn() {
    const token = await this.getToken().data?.token;
    return !!token;
  }
}

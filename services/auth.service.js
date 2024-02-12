import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'authToken';

export const getAuthToken = async () => {
  const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return authToken !== null ? authToken : null;
};

export const isAuthenticated = async () => {
  const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return authToken !== null;
};

export const login = async (token) => {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const logout = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
};

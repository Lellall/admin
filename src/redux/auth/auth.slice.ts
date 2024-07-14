import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginResponse } from './typings';

export interface AuthState {
  user: LoginResponse;
}

const initialState: LoginResponse = {
  refresh_token: '',
  access_token: '',
  token_type: '',
  isAuthenticated: false,
  user: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    role: '',
    isEmailVerified: false,
    registrationSource: '',
    streetName: '',
    houseNumber: '',
    apartmentName: '',
    estate: '',
    poBox: '',
    address: {
      streetName: '',
      houseNumber: '',
      apartmentName: '',
      estate: '',
      poBox: '',
      region: '',
    },
  },
};
const setAuthHandler = (state: LoginResponse, { payload: auth }: { payload: LoginResponse }) => {
  state = auth;
  return state;
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: setAuthHandler,
    logout: () => {
      return initialState;
    },
  },
});

export const { setCredentials, logout } = AuthSlice.actions;

export const selectUser = (state: RootState): LoginResponse['user'] => {
  return state.auth.user;
};

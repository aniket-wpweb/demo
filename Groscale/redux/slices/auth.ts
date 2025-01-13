import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../constants/interfaces';

const initialState: AuthState = {
  authToken: '',
  refreshToken: '',
  isCarrierAdmin: false,
  userEmail: '',
};

export const { reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload;
    },
    logOut(state) {
      state.authToken = '';
      state.refreshToken = '';
      state.userEmail = '';
    },
    setIsCarrierAdmin(state, action) {
      state.isCarrierAdmin = action.payload;
    },
  },
});

export const { setAuthToken, setRefreshToken, setUserEmail, logOut, setIsCarrierAdmin } =
  actions;

export default reducer;

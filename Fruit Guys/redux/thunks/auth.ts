import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../services/api';

export const logIn = createAsyncThunk(
  'dashboard/logIn',
  async ({
    email,
    password,
    phoneNumber,
    loginCode,
  }: {
    email?: string;
    password?: string;
    phoneNumber?: string;
    loginCode?: string;
  }) => {
    const response = await api.login({
      email: email,
      password: password,
      phoneNumber,
      loginCode,
    });
    return response.data;
  }
);

export const requestOtp = createAsyncThunk(
  'dashboard/requestOtp',
  async ({ phoneNumber }: { phoneNumber: string }) => {
    return {};
    const response = await api.requestOtp(phoneNumber);
    return response.data;
  }
);

export const refresh = createAsyncThunk(
  'dashboard/refresh',
  async (refreshToken: string) => {
    // TODO: once endpoint is updated to take refreshToken from cookie, remove refreshToken from req body
    const response = await api.refresh(refreshToken);
    return response.data;
  }
);

export const verifyToken = createAsyncThunk(
  'dashboard/verifyToken',
  async (authToken: string) => {
    const response = await api.verifyToken(authToken);
    return response.data;
  }
);

export const getResetPasswordLink = createAsyncThunk(
  'dashboard/resetLink',
  async (username: string) => {
    const response = await api.sendResetLink(username);
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  'dashboard/resetPassword',
  async ({ token, password }: { token: string; password: string }) => {
    const response = await api.resetPassword({ password, token });
    return response.data;
  }
);

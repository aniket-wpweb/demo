import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../services/api';

export const pingTest = createAsyncThunk('dashboard/pingTest', async () => {
  console.log('in ping test');
  const response = await api.ping();
  return response?.data || {};
});

export const getUniqueValues = createAsyncThunk(
  'dashboard/getUniqueValues',
  async (token: string) => {
    const response = await api.getUniqueValues(token);
    return response.data.result || {};
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getPeachToken = createAsyncThunk(
  'tracking/getPeachToken',
  async () => {
    const response = await api.getPeachToken();
    return response.data.access_token;
  }
);

export const getTrackingDataLanding = createAsyncThunk(
  'tracking/getTrackingDataLanding',
  async ({ trackingNumber }: { trackingNumber: string }) => {
    const response = await api.getTrackingDataLanding(trackingNumber);
    return response.data;
  }
);

export const getTrackingDataByShipper = createAsyncThunk(
  'tracking/getTrackingDataByShipper',
  async ({
    trackingNumber,
    shipperName,
  }: {
    trackingNumber: string;
    shipperName: string;
  }) => {
    const response = await api.getTrackingDataByShipper(
      trackingNumber,
      shipperName
    );
    return response.data;
  }
);

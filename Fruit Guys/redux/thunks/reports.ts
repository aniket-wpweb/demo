import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../services/api';

export const getPerformanceReport = createAsyncThunk(
  'dashboard/getPerformanceReport',
  async ({
    dateMin,
    dateMax,
    filters,
    token,
  }: {
    dateMin: string;
    dateMax: string;
    filters: Array<{
      column: string;
      selected_values: string[];
    }>;
    token: string;
  }) => {
    const response = await api.getPerformanceReport({
      dateMin: dateMin,
      dateMax: dateMax,
      filters: filters,
      token: token,
    });
    return response.data;
  }
);

export const getPerformanceReportLineItemExport = createAsyncThunk(
  'dashboard/getPerformanceReportLineItemExport',
  async ({
    dateMin,
    dateMax,
    filters,
    token,
  }: {
    dateMin: string;
    dateMax: string;
    filters: Array<{
      column: string;
      selected_values: string[];
    }>;
    token: string;
  }) => {
    const response = await api.getPerformanceReport({
      dateMin: dateMin,
      dateMax: dateMax,
      filters: filters,
      exportLineItems: true,
      token: token,
    });
    return response.data;
  }
);

export const getVolumeReport = createAsyncThunk(
  'dashboard/getVolumeReport',
  async ({
    dateMin,
    dateMax,
    filters,
    token,
  }: {
    dateMin: string;
    dateMax: string;
    filters: Array<{
      column: string;
      selected_values: string[];
    }>;
    token: string;
  }) => {
    const response = await api.getVolumeReport({
      dateMin: dateMin,
      dateMax: dateMax,
      filters: filters,
      token: token,
    });
    return response.data;
  }
);

export const getVolumeReportLineItemExport = createAsyncThunk(
  'dashboard/getVolumeReportLineItemExport',
  async ({
    dateMin,
    dateMax,
    filters,
    token,
  }: {
    dateMin: string;
    dateMax: string;
    filters: Array<{
      column: string;
      selected_values: string[];
    }>;
    token: string;
  }) => {
    const response = await api.getVolumeReport({
      dateMin: dateMin,
      dateMax: dateMax,
      filters: filters,
      token: token,
      exportLineItems: true,
    });
    return response.data;
  }
);

export const getStatusReport = createAsyncThunk(
  'dashboard/getStatusReport',
  async ({
    dateMin,
    dateMax,
    filters,
    token,
  }: {
    dateMin: string;
    dateMax: string;
    filters: Array<{
      column: string;
      selected_values: string[];
    }>;
    token: string;
  }) => {
    const response = await api.getStatusReport({
      dateMin: dateMin,
      dateMax: dateMax,
      filters: filters,
      token: token,
    });
    return response.data;
  }
);

export const getStatusReportLineItemExport = createAsyncThunk(
  'dashboard/getStatusReportLineItemExport',
  async ({
    dateMin,
    dateMax,
    filters,
    token,
  }: {
    dateMin: string;
    dateMax: string;
    filters: Array<{
      column: string;
      selected_values: string[];
    }>;
    token: string;
  }) => {
    const response = await api.getStatusReport({
      dateMin: dateMin,
      dateMax: dateMax,
      filters: filters,
      exportLineItems: true,
      token: token,
    });
    return response.data;
  }
);

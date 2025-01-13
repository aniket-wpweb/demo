import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import {
  CalculatorConfig,
  DeliveryPartnerCostTemplate,
} from '../../constants/interfaces';

export const getBillingCalculation = createAsyncThunk(
  'dashboard/getBillingCalculation',
  async ({
    calculatorConfig,
    token,
  }: {
    calculatorConfig: CalculatorConfig;
    token: string;
  }) => {
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    };
    const startDate = calculatorConfig.startDate;
    const endDate = calculatorConfig.endDate;

    const response = await api.getBillingCalculation({
      shipperCosts: calculatorConfig.shipperCosts,
      carrierCosts: calculatorConfig.carrierCosts,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      token: token,
    });
    return response?.data || {};
  }
);

export const getDeliveryPartnerCostTemplates = createAsyncThunk(
  'dashboard/getDeliveryPartnerCostTemplates',
  async (token: string) => {
    const response = await api.getDeliveryPartnerCostTemplates({ token });
    return response.data;
  }
);

export const saveDeliveryPartnerCostTemplate = createAsyncThunk(
  'dashboard/saveDeliveryPartnerCostTemplate',
  async ({
    token,
    template,
  }: {
    token: string;
    template: DeliveryPartnerCostTemplate;
  }) => {
    const response = await api.saveDeliveryPartnerCostTemplate({
      token,
      template,
    });
    return response.data;
  }
);

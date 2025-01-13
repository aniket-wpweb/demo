import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import {
  CustomerInvoiceTemplate,
  DeliveryPartnerCostTemplate,
} from '../../constants/interfaces';

export const getCustomerInvoiceTemplates = createAsyncThunk(
  'dashboard/getCustomerInvoiceTemplates',
  async (token: string) => {
    const response = await api.getCustomerInvoiceTemplates({ token });
    return response.data;
  }
);

export const saveCustomerInvoiceTemplate = createAsyncThunk(
  'dashboard/saveCustomerInvoiceTemplate',
  async ({
    token,
    template,
  }: {
    token: string;
    template: CustomerInvoiceTemplate;
  }) => {
    const response = await api.saveCustomerInvoiceTemplate({ token, template });
    return response.data;
  }
);

export const getCustomerInvoice = createAsyncThunk(
  'dashboard/getCustomerInvoice',
  async ({
    token,
    template,
    date_range,
  }: {
    token: string;
    template: CustomerInvoiceTemplate;
    date_range: { date_min: string; date_max: string };
  }) => {
    const response = await api.getCustomerInvoice({
      token,
      template,
      date_range,
    });
    return response.data;
  }
);

export const getDeliveryPartnerInvoice = createAsyncThunk(
  'dashboard/getDeliveryPartnerInvoice',
  async ({
    token,
    template,
    date_range,
  }: {
    token: string;
    template: DeliveryPartnerCostTemplate;
    date_range: { date_min: string; date_max: string };
  }) => {
    const response = await api.getDeliveryPartnerInvoice({
      token,
      template,
      date_range,
    });
    return response.data;
  }
);

export const getCustomerInvoiceLog = createAsyncThunk(
  'dashboard/getCustomerInvoiceLog',
  async (shipperIds: Array<{ name: string; shipperId: number }>) => {
    const response = await api.getCustomerInvoiceLog(shipperIds);
    return response.data;
  }
);

export const markCustomerInvoiceSent = createAsyncThunk(
  'dashboard/markCustomerInvoiceSent',
  async (invoiceId: number) => {
    const response = await api.markCustomerInvoiceSent(invoiceId);
    return response.data;
  }
);

export const getDPPSLog = createAsyncThunk(
  'dashboard/getDPPSLog',
  async (
    deliveryPartnerIds: Array<{ name: string; deliveryPartnerId: number }>
  ) => {
    const response = await api.getDPPSLog(deliveryPartnerIds);
    return response.data;
  }
);

export const markDPPSSent = createAsyncThunk(
  'dashboard/markDPPSSent',
  async (invoiceId: number) => {
    const response = await api.markDPPSSent(invoiceId);
    return response.data;
  }
);

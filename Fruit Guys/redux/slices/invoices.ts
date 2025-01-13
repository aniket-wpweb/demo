import { createSlice, createAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { InvoicesState } from '../../constants/interfaces';
import { getUniqueValues } from '../thunks/dashboard';
import {
  getCustomerInvoice,
  getCustomerInvoiceLog,
  getCustomerInvoiceTemplates,
  getDeliveryPartnerInvoice,
  getDPPSLog,
  saveCustomerInvoiceTemplate,
} from '../thunks/invoices';
const hydrate = createAction<RootState>(HYDRATE);

const initialState: InvoicesState = {
  customerInvoiceTemplates: {},
  invoiceDateRange: {
    startDate: new Date(2023, 10, 5),
    endDate: new Date(2023, 10, 11),
  },
  invoiceGenerated: false,
  dppsGenerated: false,
  dppsDateRange: {
    startDate: new Date(2023, 10, 5),
    endDate: new Date(2023, 10, 11),
  },
  customerInvoiceData: {
    rows: [],
  },
  deliveryPartnerInvoiceData: {
    rows: [],
    addedRows: [],
  },
  pastInvoices: [],
  pastDPPSs: [],
};

export const { reducer, actions } = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoiceDates(state, action) {
      state.invoiceDateRange.startDate = action.payload.start;
      state.invoiceDateRange.endDate = action.payload.end;
    },
    setDPPSDates(state, action) {
      state.dppsDateRange.startDate = action.payload.start;
      state.dppsDateRange.endDate = action.payload.end;
    },
    setInvoiceGenerated(state, action) {
      state.invoiceGenerated = action.payload;
    },
    setDPPSGenerated(state, action) {
      state.dppsGenerated = action.payload;
    },
    markInvoiceSent(state, action) {
      //not used anymore
      const s_idx = state.pastInvoices.findIndex(
        (i) => i.shipper === action.payload.shipper
      );
      const newPastInvoices = [...state.pastInvoices];
      if (s_idx !== -1) {
        const newShipperInvoice = newPastInvoices[s_idx];
        const newShipperInvoiceInvoices = [...newShipperInvoice.invoices];
        const newInvoice = newShipperInvoice.invoices[action.payload.idx];
        newInvoice.sent = true;
        newShipperInvoiceInvoices.splice(action.payload.idx, 1, newInvoice);
        newShipperInvoice.invoices = newShipperInvoiceInvoices;
        newPastInvoices.splice(s_idx, 1, newShipperInvoice);
        state.pastInvoices = newPastInvoices;
      }
    },
    addRowToDPPSData(state, action) {
      const addedRows = [...state.deliveryPartnerInvoiceData.addedRows];
      addedRows.push(action.payload);
      state.deliveryPartnerInvoiceData.addedRows = addedRows;
    },
    editDPPSRow(state, action) {
      const addedRows = [...state.deliveryPartnerInvoiceData.addedRows];
      const row = addedRows[action.payload.idx];
      console.log('[editDPPSRow] row: ', row);
      const calculateAmount = (total_packages: number, rate: number) => {
        console.log(
          '[calculateAmount] total_packages: ',
          total_packages,
          ' rate: ',
          rate
        );
        console.log(
          '[calculateAmount] total_packages * rate: ',
          total_packages * rate
        );
        return total_packages * rate;
      };
      const newRow = {
        delivery_date:
          action.payload.editField === 'delivery_date'
            ? action.payload.newValue
            : row.delivery_date,
        shipper:
          action.payload.editField === 'shipper'
            ? action.payload.newValue
            : row.shipper,
        total_packages:
          action.payload.editField === 'total_packages'
            ? action.payload.newValue
            : row.total_packages,
        rate:
          action.payload.editField === 'rate'
            ? action.payload.newValue
            : row.rate,
        amount:
          action.payload.editField === 'total_packages'
            ? calculateAmount(action.payload.newValue, row.rate)
            : action.payload.editField === 'rate'
            ? calculateAmount(row.total_packages, action.payload.newValue)
            : row.amount,
      };
      console.log('[editDPPSRow] newRow: ', newRow);
      addedRows.splice(action.payload.idx, 1, newRow);
      console.log('[editDPPSRow] new addedRows: ', addedRows);
      state.deliveryPartnerInvoiceData.addedRows = addedRows;
    },
    deleteDPPSRow(state, action) {
      const addedRows = [...state.deliveryPartnerInvoiceData.addedRows];
      addedRows.splice(action.payload, 1);
      state.deliveryPartnerInvoiceData.addedRows = addedRows;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.invoices,
        };
      })
      .addCase(getUniqueValues.fulfilled, (state, action) => {
        state.pastInvoices = action.payload.shipper.map((s) => ({
          shipper: s,
          invoices: [],
        }));
        state.pastDPPSs = action.payload.delivery_partner.map((s) => ({
          carrier: s,
          invoices: [],
        }));
      })
      .addCase(saveCustomerInvoiceTemplate.fulfilled, (state, action) => {
        const customerInvoiceTemplates = {
          ...state.customerInvoiceTemplates,
        };
        customerInvoiceTemplates[action.meta.arg.template.shipper_name] =
          action.meta.arg.template;
        state.customerInvoiceTemplates = { ...customerInvoiceTemplates };
      })
      .addCase(getCustomerInvoiceTemplates.fulfilled, (state, action) => {
        state.customerInvoiceTemplates = action?.payload?.templates || {};
      })
      .addCase(getCustomerInvoice.fulfilled, (state, action) => {
        state.customerInvoiceData.rows = action.payload.invoice_rows;
        state.customerInvoiceData.customerInvoiceTemplate = {
          shipper_name: action.payload.template.shipper_name || '',
          structure_type: action.payload.template.structure_type || '',
          billingInformation: {
            companyName:
              action.payload.template.billing_information.company_name || '',
            addressLine1:
              action.payload.template.billing_information.address_line_1 || '',
            addressLine2:
              action.payload.template.billing_information.address_line_2 || '',
            city: action.payload.template.billing_information.city || '',
            state: action.payload.template.billing_information.state || '',
            zip_code:
              action.payload.template.billing_information.zip_code || '',
          },
          costStructure: {
            ...(action.payload.template.cost_structure || {
              rate_per_package: 0,
            }),
          },
        };
        state.invoiceGenerated = true;
      })
      .addCase(getDeliveryPartnerInvoice.pending, (state) => {
        state.deliveryPartnerInvoiceData.rows = [];
        state.deliveryPartnerInvoiceData.addedRows = [];
        state.deliveryPartnerInvoiceData.deliveryPartnerCostTemplate = {
          carrier_name: '',
          company_name: '',
          cost_structure: {},
        };
        state.dppsGenerated = false;
      })
      .addCase(getDeliveryPartnerInvoice.fulfilled, (state, action) => {
        state.deliveryPartnerInvoiceData.rows = action.payload.invoice_rows;
        state.deliveryPartnerInvoiceData.deliveryPartnerCostTemplate = {
          carrier_name: action.payload.template.carrier_name || '',
          company_name: action.payload.template.company_name || '',
          cost_structure: { ...(action.payload.template.cost_structure || {}) },
        };
        state.dppsGenerated = true;
      })
      .addCase(getCustomerInvoiceLog.fulfilled, (state, action) => {
        state.pastInvoices = action.payload.map((s) => ({
          shipper: s.shipper,
          shipperId: s.shipper_id,
          invoices: s.invoices.map((i) => ({
            sent: i.sent === 1,
            startDate: i.start_date,
            invoiceId: i.invoice_id,
          })),
        }));
      })
      .addCase(getDPPSLog.fulfilled, (state, action) => {
        state.pastDPPSs = action.payload.map((s) => ({
          carrier: s.carrier,
          deliveryPartnerId: s.carrier_id,
          invoices: s.invoices.map((i) => ({
            sent: i.sent === 1,
            startDate: i.start_date,
            invoiceId: i.invoice_id,
          })),
        }));
      });
  },
});

export const {
  setInvoiceDates,
  setDPPSDates,
  setInvoiceGenerated,
  setDPPSGenerated,
  markInvoiceSent,
  addRowToDPPSData,
  editDPPSRow,
  deleteDPPSRow,
} = actions;

export default reducer;

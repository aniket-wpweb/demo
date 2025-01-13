import { createSlice, createAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { ReportsState } from '../../constants/interfaces';
import {
  getPerformanceReport,
  getPerformanceReportLineItemExport,
  getStatusReport,
  getStatusReportLineItemExport,
  getVolumeReport,
  getVolumeReportLineItemExport,
} from '../thunks/reports';
const hydrate = createAction<RootState>(HYDRATE);

const initialState: ReportsState = {
  billingReportResults: {
    rows: [],
    shipperWiseRows: [],
    dpWiseRows: [],
    shipperList: [],
    deliveryPartnerList: [],
    inputtedFilters: {},
    startDate: '',
    endDate: '',
  },
  billingReportLoading: false,
  billingReportLoaded: false,
  performanceReportLineItemsLoaded: false,
  performanceReportLineItemsLoading: false,
  performanceReportLineItemUrl: '',
  volumeReportResults: {
    rows: [],
    inputtedFilters: {},
  },
  volumeReportLoading: false,
  volumeReportLoaded: false,
  volumeReportDateRange: {
    startDate: '',
    endDate: '',
  },
  volumeReportLineItemsLoaded: false,
  volumeReportLineItemsLoading: false,
  volumeReportLineItemUrl: '',
  statusReportResults: {
    result: [],
    rows: [],
    inputtedFilters: {},
  },
  statusReportLoading: false,
  statusReportLoaded: false,
  statusReportDateRange: {
    startDate: '',
    endDate: '',
  },
  statusReportLineItemsLoaded: false,
  statusReportLineItemsLoading: false,
  statusReportLineItemUrl: '',
};

export const { reducer, actions } = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearLineItemExportState(state, action) {
      if (action.payload === 'performanceReport') {
        state.performanceReportLineItemsLoaded = false;
        state.performanceReportLineItemsLoading = false;
        state.performanceReportLineItemUrl = '';
      }
      if (action.payload === 'volumeReport') {
        state.volumeReportLineItemsLoaded = false;
        state.volumeReportLineItemsLoading = false;
        state.volumeReportLineItemUrl = '';
      }
      if (action.payload === 'statusReport') {
        state.statusReportLineItemsLoaded = false;
        state.statusReportLineItemsLoading = false;
        state.statusReportLineItemUrl = '';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.reports,
        };
      })
      .addCase(getPerformanceReport.pending, (state) => {
        state.billingReportResults.rows = [];
        state.billingReportLoading = true;
        state.billingReportLoaded = false;
      })
      .addCase(getPerformanceReport.fulfilled, (state, action) => {
        state.billingReportResults.rows = action.payload.result;
        state.billingReportResults.shipperWiseRows =
          action.payload.shipper_wise;
        state.billingReportResults.dpWiseRows = action.payload.partner_wise;
        state.billingReportResults.shipperList = action.payload.shipper_list;
        state.billingReportResults.deliveryPartnerList =
          action.payload.partner_list;
        state.billingReportResults.inputtedFilters = action.meta.arg.filters;
        // TODO: update volume and status report start and end date to take from the arg
        state.billingReportResults.startDate = action.meta.arg.dateMin;
        state.billingReportResults.endDate = action.meta.arg.dateMin;
        state.billingReportLoading = false;
        state.billingReportLoaded = true;
      })
      .addCase(getVolumeReport.pending, (state) => {
        state.volumeReportResults.rows = [];
        state.volumeReportLoading = true;
        state.volumeReportLoaded = false;
      })
      .addCase(getVolumeReport.fulfilled, (state, action) => {
        const rows: Array<{ [key: string]: string | number }> =
          action.payload.rows;
        state.volumeReportResults.rows = rows;
        state.volumeReportLoading = false;
        state.volumeReportLoaded = true;
        state.volumeReportDateRange.startDate =
          action.payload.date_range.date_min;
        state.volumeReportDateRange.endDate =
          action.payload.date_range.date_max;
        state.volumeReportResults.inputtedFilters = action.meta.arg.filters;
      })
      .addCase(getStatusReport.pending, (state) => {
        state.statusReportResults.result = [];
        state.statusReportLoading = true;
        state.statusReportLoaded = false;
      })
      .addCase(getStatusReport.fulfilled, (state, action) => {
        state.statusReportLoading = false;
        state.statusReportLoaded = true;
        state.statusReportDateRange.startDate =
          action.payload.date_range.date_min;
        state.statusReportDateRange.endDate =
          action.payload.date_range.date_max;
        state.statusReportResults.rows = action.payload.result;
        state.statusReportResults.inputtedFilters = action.meta.arg.filters;
      })
      .addCase(getPerformanceReportLineItemExport.pending, (state) => {
        //TODO: condense all of these line item redux items? is there a need to have one set per report?
        state.performanceReportLineItemsLoading = true;
        state.performanceReportLineItemsLoaded = false;
        state.performanceReportLineItemUrl = '';
      })
      .addCase(
        getPerformanceReportLineItemExport.fulfilled,
        (state, action) => {
          state.performanceReportLineItemsLoading = false;
          state.performanceReportLineItemsLoaded = true;
          state.performanceReportLineItemUrl =
            action.payload.line_item_signed_url;
        }
      )
      .addCase(getPerformanceReportLineItemExport.rejected, (state, action) => {
        state.performanceReportLineItemsLoading = false;
        state.performanceReportLineItemsLoaded = false;
        state.performanceReportLineItemUrl = '';
      })
      .addCase(getVolumeReportLineItemExport.pending, (state) => {
        state.volumeReportLineItemsLoading = true;
        state.volumeReportLineItemsLoaded = false;
        state.volumeReportLineItemUrl = '';
      })
      .addCase(getVolumeReportLineItemExport.fulfilled, (state, action) => {
        state.volumeReportLineItemsLoading = false;
        state.volumeReportLineItemsLoaded = true;
        state.volumeReportLineItemUrl = action.payload.line_item_signed_url;
      })
      .addCase(getVolumeReportLineItemExport.rejected, (state, action) => {
        state.volumeReportLineItemsLoading = false;
        state.volumeReportLineItemsLoaded = false;
        state.volumeReportLineItemUrl = '';
      })
      .addCase(getStatusReportLineItemExport.pending, (state) => {
        state.statusReportLineItemsLoading = true;
        state.statusReportLineItemsLoaded = false;
        state.statusReportLineItemUrl = '';
      })
      .addCase(getStatusReportLineItemExport.fulfilled, (state, action) => {
        state.statusReportLineItemsLoading = false;
        state.statusReportLineItemsLoaded = true;
        state.statusReportLineItemUrl = action.payload.line_item_signed_url;
      })
      .addCase(getStatusReportLineItemExport.rejected, (state, action) => {
        state.statusReportLineItemsLoading = false;
        state.statusReportLineItemsLoaded = false;
        state.statusReportLineItemUrl = '';
      });
  },
});

export const { clearLineItemExportState } = actions;

export default reducer;

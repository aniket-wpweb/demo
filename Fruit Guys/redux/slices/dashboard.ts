import { createSlice, createAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { DashboardState } from '../../constants/interfaces';
import { initialFilterValues } from '../../constants/constants';
import { getUniqueValues, pingTest } from '../thunks/dashboard';
const hydrate = createAction<RootState>(HYDRATE);

const initialState: DashboardState = {
  ping: 'ping',
  uniqueValuesLoading: false,
  uniqueValuesLoaded: false,
  queryText: '',
  showSpinner: false,
  currentPage: 'dashboard',
  sideBarMenus: {
    deliveryPartnerOpen: false,
    customerOpen: false,
  },
  shipperList: [],
  deliveryPartnerList: [],
  deliveryPartnerIds: [],
  showSideBar: true,
  originalStartDate: new Date().toLocaleDateString('en-CA'),
  originalEndDate: new Date().toLocaleDateString('en-CA'),
  filterOptions: {
    delivery_date: {
      type: 'range',
    },
    route_name: {
      type: 'select',
      options: [],
    },
    delivery_status: {
      type: 'select',
      options: [],
    },
    distribution_location: {
      type: 'select',
      options: [],
    },
    shipper: {
      type: 'select',
      options: [],
    },
    delivery_partner: {
      type: 'select',
      options: [],
    },
    zip_code: {
      type: 'enter',
    },
  },
  filterValues: initialFilterValues,
};

export const { reducer, actions } = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setQueryText(state, action) {
      state.queryText = action.payload;
    },
    setShowSpinner(state, action) {
      state.showSpinner = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setShowSideBar(state, action) {
      state.showSideBar = action.payload;
    },
    setSidebarMenus(state, action) {
      if (action.payload.menu === 'customer') {
        state.sideBarMenus.customerOpen = !state.sideBarMenus.customerOpen;
      }
      if (action.payload.menu === 'deliveryPartner') {
        state.sideBarMenus.deliveryPartnerOpen =
          !state.sideBarMenus.deliveryPartnerOpen;
      }
    },
    clearAllFilters(state) {
      state.filterValues = {
        route_name: {
          status: 'clear',
          selected: [],
        },
        delivery_status: {
          status: 'clear',
          selected: [],
        },
        distribution_location: {
          status: 'clear',
          selected: [],
        },
        shipper: {
          status: 'clear',
          selected: [],
        },
        delivery_partner: {
          status: 'clear',
          selected: [],
        },
        delivery_date: {
          status: 'clear',
          start: state.originalStartDate,
          end: state.originalEndDate,
        },
        zip_code: {
          status: 'clear',
          value: null,
        },
      };
      // state.filteredPackageData = [...state.packageData];
      // state.deliveredCount = state.originalDeliveredCount;
      // state.packageCount = state.packageData.length;
    },
    clearFilter(state, action) {
      const currFilters = { ...state.filterValues };
      if (action.payload === 'delivery_status') {
        state.filterValues.delivery_status.status = 'clear';
        state.filterValues.delivery_status.selected = [];
      }
      if (action.payload === 'route_name') {
        state.filterValues.route_name.status = 'clear';
        state.filterValues.route_name.selected = [];
      }
      if (action.payload === 'distribution_location') {
        state.filterValues.distribution_location.status = 'clear';
        state.filterValues.distribution_location.selected = [];
      }
      if (action.payload === 'shipper') {
        state.filterValues.shipper.status = 'clear';
        state.filterValues.shipper.selected = [];
      }
      if (action.payload === 'delivery_partner') {
        state.filterValues.delivery_partner.status = 'clear';
        state.filterValues.delivery_partner.selected = [];
      }
      if (action.payload === 'delivery_date') {
        state.filterValues.delivery_date.status = 'clear';
        state.filterValues.delivery_date.start = state.originalStartDate;
        state.filterValues.delivery_date.end = state.originalEndDate;
      }
      if (action.payload === 'zip_code') {
        state.filterValues.zip_code.status = 'clear';
        state.filterValues.zip_code.value = null;
      }
    },
    setFilter(state, action) {
      if (action.payload.column === 'delivery_status') {
        state.filterValues.delivery_status.status = action.payload.options
          .length
          ? 'filtered'
          : 'clear';
        state.filterValues.delivery_status.selected = action.payload.options;
      }
      if (action.payload.column === 'route_name') {
        state.filterValues.route_name.status = action.payload.options.length
          ? 'filtered'
          : 'clear';
        state.filterValues.route_name.selected = action.payload.options;
      }
      if (action.payload.column === 'distribution_location') {
        state.filterValues.distribution_location.status = action.payload.options
          .length
          ? 'filtered'
          : 'clear';
        state.filterValues.distribution_location.selected =
          action.payload.options;
      }
      if (action.payload.column === 'shipper') {
        state.filterValues.shipper.status = action.payload.options.length
          ? 'filtered'
          : 'clear';
        state.filterValues.shipper.selected = action.payload.options;
      }
      if (action.payload.column === 'delivery_partner') {
        state.filterValues.delivery_partner.status = action.payload.options
          .length
          ? 'filtered'
          : 'clear';
        state.filterValues.delivery_partner.selected = action.payload.options;
      }
      if (action.payload.column === 'delivery_date') {
        const startDate = new Date(action.payload.start);
        const endDate = new Date(action.payload.end);
        state.filterValues.delivery_date.status =
          startDate.getTime() === new Date(state.originalStartDate).getTime() &&
          endDate.getTime() === new Date(state.originalEndDate).getTime()
            ? 'clear'
            : 'filtered';
        state.filterValues.delivery_date.start = action.payload.start;
        state.filterValues.delivery_date.end = action.payload.end;
      }
      if (action.payload.column === 'zip_code') {
        state.filterValues.zip_code.status = action.payload.options.length
          ? 'filtered'
          : 'clear';
        state.filterValues.zip_code.value = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.dashboard,
        };
      })
      .addCase(pingTest.pending, (state) => {
        state.ping = 'pending';
      })
      .addCase(pingTest.fulfilled, (state, action) => {
        state.ping = action.payload.message;
      })
      .addCase(getUniqueValues.pending, (state) => {
        state.uniqueValuesLoading = true;
        state.uniqueValuesLoaded = false;
      })
      .addCase(getUniqueValues.fulfilled, (state, action) => {
        state.shipperList = action.payload.shipper;
        state.deliveryPartnerList = action.payload.delivery_partner;
        state.filterOptions.route_name.options =
          action.payload.route_name.sort();
        state.filterOptions.delivery_status.options =
          action.payload.delivery_status;
        state.filterOptions.distribution_location.options =
          action.payload.distribution_location;
        state.filterOptions.shipper.options = action.payload.shipper;
        state.filterOptions.delivery_partner.options =
          action.payload.delivery_partner;
        state.uniqueValuesLoading = false;
        state.uniqueValuesLoaded = true;
      })
      .addCase(getUniqueValues.rejected, (state) => {
        state.uniqueValuesLoading = false;
        state.uniqueValuesLoaded = false;
      });
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.dashboard,
  //     };
  //   },
  // },
});

export const {
  setQueryText,
  setShowSpinner,
  setCurrentPage,
  setShowSideBar,
  clearAllFilters,
  clearFilter,
  setFilter,
  setSidebarMenus,
} = actions;

export default reducer;

import { createSlice, createAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { MOCK_DATA } from '../../constants/mockData';
import { PackagesState } from '../../constants/interfaces';
import { getPackageData } from '../thunks/packages';
const hydrate = createAction<RootState>(HYDRATE);

const initialState: PackagesState = {
  packagesData: [],
  packagesLoading: true,
  packageData: MOCK_DATA,
  filteredPackageData: MOCK_DATA,
  packageCount: 39,
  deliveredCount: 27,
  originalDeliveredCount: 27,
  dashboardDateRange: {
    startDate: new Date(),
    endDate: new Date(),
  },
};

export const { reducer, actions } = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setDeliveredCount(state, action) {
      state.deliveredCount = action.payload;
    },
    setFilteredData(state, action) {
      state.filteredPackageData = action.payload.filteredData;
      state.packageCount = action.payload.filteredData.length;
      state.deliveredCount = action.payload.delCount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.packages,
        };
      })
      .addCase(getPackageData.pending, (state) => {
        state.packagesLoading = true;
      })
      .addCase(getPackageData.fulfilled, (state, action) => {
        state.packagesData = action.payload.result;
        state.deliveredCount = action.payload.deliveredCount;
        state.packageCount = action.payload.packageCount;
        state.packagesLoading = false;
        state.dashboardDateRange.startDate =
          new Date(action.meta.arg.filterValues.delivery_date.start);
        state.dashboardDateRange.endDate =
          new Date(action.meta.arg.filterValues.delivery_date.end);
      });
  },
});

export const { setDeliveredCount, setFilteredData } = actions;
export default reducer;

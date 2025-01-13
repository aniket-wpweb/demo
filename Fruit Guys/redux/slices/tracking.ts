import { createSlice, createAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { TrackingState } from '../../constants/interfaces';
import {
  getPeachToken,
  getTrackingDataByShipper,
  getTrackingDataLanding,
} from '../thunks/tracking';

const hydrate = createAction<RootState>(HYDRATE);

const initialState: TrackingState = {
  trackingLoading: false,
  trackingLoaded: false,
  trackingError: null,
  trackingErrored: false,
  authErrored: false,
  deliveryDate: '',
  status: '',
  eta: [], //TODO: Figure out if there are ever multiple etas, if not, change to object
  completionTime: null,
  signatureUrl: null,
  podPhotoUrl: null,
  coordinates: null,
  totalStopsInRoute: null,
  stopNumber: null,
  currentStop: null,
  deliveryAddress: {
    company: null,
    contact: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
  },
  externalTrackingNumber: null,
  shipmentExternalId: null,
  weight: null,
  weightUnit: null,
  poNumber: null,
  shipDate: null,
  referenceNumber: null,
  trackingData: [],
};

export const { reducer, actions } = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    setTrackingLoading(state, action) {
      state.trackingLoading = action.payload;
    },
    setTrackingLoaded(state, action) {
      state.trackingLoaded = action.payload;
    },
    setTrackingData(state, action) {
      state.trackingData = action.payload;
    },
    clearTrackingFields(state) {
      state.trackingLoading = false;
      state.trackingLoaded = false;
      state.trackingError = null;
      state.trackingErrored = false;
      state.authErrored = false;
      state.deliveryDate = '';
      state.status = '';
      (state.eta = []), //TODO = Figure out if there are ever multiple etas, if not, change to object
        (state.completionTime = null);
      state.signatureUrl = null;
      state.podPhotoUrl = null;
      state.coordinates = null;
      state.totalStopsInRoute = null;
      state.stopNumber = null;
      state.currentStop = null;
      (state.deliveryAddress = {
        company: null,
        contact: null,
        address1: null,
        address2: null,
        city: null,
        state: null,
      }),
        (state.externalTrackingNumber = null);
      state.shipmentExternalId = null;
      state.weight = null;
      state.weightUnit = null;
      state.poNumber = null;
      state.shipDate = null;
      state.referenceNumber = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.tracking,
        };
      })
      .addCase(getPeachToken.rejected, (state) => {
        state.authErrored = true;
      })
      .addCase(getTrackingDataLanding.pending, (state) => {
        // state.trackingLoading = true;
        // state.trackingLoaded = false;
      })
      .addCase(getTrackingDataLanding.fulfilled, (state, action) => {
        state.shipmentExternalId = action.payload.shipmentExternalId;
        state.deliveryDate = action.payload.date;
        state.status = action.payload.status;
        state.eta =
          action.payload.eta.length > 0
            ? action.payload.eta.map((eta) => ({
                fromUnix: eta.from_unix_timestamp,
                toUnix: eta.to_unix_timestamp,
              }))
            : [];
        state.completionTime = action.payload.completion_time;
        state.signatureUrl = Array.isArray(action.payload.proof_of_delivery.signatureUrl)
          ? action.payload.proof_of_delivery.signatureUrl.length > 0
            ? action.payload.proof_of_delivery.signatureUrl[0]
            : ""
          : typeof action.payload.proof_of_delivery.signatureUrl === "object" && action.payload.proof_of_delivery.signatureUrl !== null
          ? Object.values(action.payload.proof_of_delivery.signatureUrl)[0] || ""
          : "";
        state.podPhotoUrl = action.payload.proof_of_delivery.photoUrl.length > 0 ? action.payload.proof_of_delivery.photoUrl[0] : "";
        state.coordinates = action.payload.real_time_coordinates;
        state.totalStopsInRoute = action.payload.total_stops_in_route;
        state.stopNumber = action.payload.stop_number;
        state.currentStop = action.payload.current_stop;
        state.deliveryAddress = {
          company: action.payload.shippingAddressCompany,
          contact: action.payload.shippingAddressContact,
          address1: action.payload.shippingAddressStreet1,
          address2: action.payload.shippingAddressStreet2,
          city: action.payload.shippingAddressCity,
          state: action.payload.shippingAddressState,
        };
        state.externalTrackingNumber = action.payload.trackingNumber;
        state.trackingLoading = false;
        state.trackingLoaded = true;
        state.weight = action.payload.weight;
        state.weightUnit = action.payload.weightUnit;
        state.poNumber = action.payload.extras.poNumber;
        state.shipDate = action.payload.extras.shipDate;
        state.referenceNumber = action.payload.extras.reference;
      })
      .addCase(getTrackingDataLanding.rejected, (state) => {
        state.trackingLoading = false;
        state.trackingLoaded = false;
        state.trackingErrored = true;
        state.trackingError = 'Error fetching tracking data'; //TODO: Add error message from API
      })
      .addCase(getTrackingDataByShipper.pending, (state) => {
        state.trackingLoading = true;
        state.trackingLoaded = false;
      })
      .addCase(getTrackingDataByShipper.fulfilled, (state, action) => {
        state.shipmentExternalId = action.payload.shipmentExternalId;
        state.deliveryDate = action.payload.date;
        state.status = action.payload.status;
        state.eta =
          action.payload.eta.length > 0
            ? action.payload.eta.map((eta) => ({
                fromUnix: eta.from_unix_timestamp,
                toUnix: eta.to_unix_timestamp,
              }))
            : [];
        state.completionTime = action.payload.completion_time;
        state.signatureUrl = Array.isArray(
          action.payload.proof_of_delivery.signatureUrl
        )
          ? action.payload.proof_of_delivery.signatureUrl.length > 0
            ? action.payload.proof_of_delivery.signatureUrl[0]
            : ''
          : typeof action.payload.proof_of_delivery.signatureUrl === 'object' &&
            action.payload.proof_of_delivery.signatureUrl !== null
          ? Object.values(action.payload.proof_of_delivery.signatureUrl)[0] ||
            ''
          : '';
        state.podPhotoUrl =
          action.payload.proof_of_delivery.photoUrl.length > 0
            ? action.payload.proof_of_delivery.photoUrl[0]
            : '';
        state.coordinates = action.payload.real_time_coordinates;
        state.totalStopsInRoute = action.payload.total_stops_in_route;
        state.stopNumber = action.payload.stop_number;
        state.currentStop = action.payload.current_stop;
        state.deliveryAddress = {
          company: action.payload.shippingAddressCompany,
          contact: action.payload.shippingAddressContact,
          address1: action.payload.shippingAddressStreet1,
          address2: action.payload.shippingAddressStreet2,
          city: action.payload.shippingAddressCity,
          state: action.payload.shippingAddressState,
        };
        state.externalTrackingNumber = action.payload.trackingNumber;
        state.trackingLoading = false;
        state.trackingLoaded = true;
      })
      .addCase(getTrackingDataByShipper.rejected, (state) => {
        state.trackingLoading = false;
        state.trackingLoaded = false;
        state.trackingErrored = true;
        state.trackingError = 'Error fetching tracking data'; //TODO: Add error message from API
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

export const { setTrackingLoaded, setTrackingLoading, setTrackingData, clearTrackingFields } =
  actions;

export default reducer;

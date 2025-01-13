import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import sessionStorage from 'redux-persist/lib/storage/session';
import authReducer from './slices/auth';
import dashboardReducer from './slices/dashboard';
import packagesReducer from './slices/packages';
import reportsReducer from './slices/reports';
import invoicesReducer from './slices/invoices';
import calculatorAndCostsReducer from './slices/calculatorAndCosts';
import trackingReducer from './slices/tracking';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage: sessionStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    packages: packagesReducer,
    reports: reportsReducer,
    invoices: invoicesReducer,
    calculatorAndCosts: calculatorAndCostsReducer,
    dashboard: dashboardReducer,
    tracking: trackingReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const persistor = persistStore(store);
// export const makeStore = () => configureStore({
//     reducer: {
//         research: researchReducer,
//     },
//     devTools: true,
// });

// // export type AppDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof makeStore>;
// export type AppDispatch = AppStore["dispatch"];
// // export type RootState = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
// >;

// export const wrapper = createWrapper<AppStore>(makeStore);

import { createSlice, createAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { CalculatorAndCostsState } from '../../constants/interfaces';
import { getUniqueValues } from '../thunks/dashboard';
import { getCustomerInvoiceTemplates } from '../thunks/invoices';
import {
  getBillingCalculation,
  getDeliveryPartnerCostTemplates,
  saveDeliveryPartnerCostTemplate,
} from '../thunks/calculatorAndCosts';
const hydrate = createAction<RootState>(HYDRATE);

const initialState: CalculatorAndCostsState = {
  calculatorLoading: true,
  calculatorConfig: {
    shipperCosts: [
      { name: 'Sunterra', cost: 4 },
      { name: 'Fruit Guys', cost: 3 },
    ],
    carrierCosts: [],
    startDate: new Date(2023, 8, 6),
    endDate: new Date(2023, 8, 9),
  },
  calculatorResults: {
    totalInFromShippers: 0,
    totalOutToDeliveryPartners: 0,
    shipperWise: [
      {
        name: 'Sunterra',
        totalIn: 0,
        totalOut: 0,
        packageCount: 0,
        deliveryPartners: [
          {
            name: 'Lerma Logistics',
            packageCount: 0,
            moneyIn: 0,
            moneyOut: 0,
          },
          {
            name: 'Delivery Surfers',
            packageCount: 0,
            moneyIn: 0,
            moneyOut: 0,
          },
        ],
      },
      {
        name: 'Fruit Guys',
        totalIn: 0,
        totalOut: 0,
        packageCount: 0,
        deliveryPartners: [
          {
            name: 'Lerma Logistics',
            packageCount: 0,
            moneyIn: 0,
            moneyOut: 0,
          },
          {
            name: 'Delivery Surfers',
            packageCount: 0,
            moneyIn: 0,
            moneyOut: 0,
          },
        ],
      },
    ],
    deliveryPartnerWise: [
      {
        name: 'Lerma Logistics',
        totalIn: 0,
        totalOut: 0,
        packageCount: 0,
        shippers: [
          {
            name: 'Sunterra',
            packageCount: 0,
            moneyIn: 0,
            moneyOut: 0,
          },
          {
            name: 'Fruit Guys',
            packageCount: 0,
            moneyIn: 0,
            moneyOut: 0,
          },
        ],
      },
      {
        name: 'Delivery Surfers',
        totalIn: 0,
        totalOut: 0,
        packageCount: 0,
        shippers: [
          {
            name: 'Sunterra',
            packageCount: 0,
            moneyIn: 0,
            moneyOut: 0,
          },
          {
            name: 'Fruit Guys',
            packageCount: 0,
            moneyIn: 0,
            moneyOut: 0,
          },
        ],
      },
    ],
  },
  deliveryPartnerCostTemplates: {},
  isNetwork: false,
};

export const { reducer, actions } = createSlice({
  name: 'calculatorAndCosts',
  initialState,
  reducers: {
    // calculateBilling(state) {
    //   var totalInFromShippers = 0;
    //   var totalOutToDeliveryPartners = 0;
    //   var totalPackageCount = 0;
    //   var shipperWise = state.shipperList.map((shipper : string) => (
    //       {
    //         name: shipper,
    //         totalIn: 0,
    //         totalOut: 0,
    //         packageCount: 0,
    //         deliveryPartners: state.deliveryPartnerList.map((partner : string) => (
    //           {
    //             name: partner,
    //             packageCount: 0,
    //             moneyIn: 0,
    //             moneyOut: 0,
    //           }
    //         )),
    //       }
    //     )
    //   );
    //   var deliveryPartnerWise = state.deliveryPartnerList.map((partner : string) => (
    //     {
    //       name: partner,
    //       totalIn: 0,
    //       totalOut: 0,
    //       packageCount: 0,
    //       shippers: state.shipperList.map((shipper : string) => (
    //         {
    //           name: shipper,
    //           packageCount: 0,
    //           moneyIn: 0,
    //           moneyOut: 0,
    //         }
    //       )),
    //     }
    //   ));
    //   const config = state.calculatorConfig;
    //   const packages = [...state.filteredPackageData];
    //   packages.forEach((pkg) => {
    //     totalPackageCount += 1;

    //     const shipper = pkg.shipper;
    //     const partner = pkg.delivery_partner;
    //     const shipperCost = config.shipperCosts.find((s) => s.name === shipper).cost;
    //     const partnerCost = config.carrierCosts.find((c) => c.name === partner).cost;

    //     totalInFromShippers += shipperCost;
    //     totalOutToDeliveryPartners += partnerCost;

    //     const shipperWiseIdx = shipperWise.findIndex((s) => s.name === shipper);
    //     const shipperWiseEntry = {...shipperWise[shipperWiseIdx]};
    //     shipperWiseEntry.totalIn += shipperCost;
    //     shipperWiseEntry.totalOut += partnerCost;
    //     shipperWiseEntry.packageCount += 1;

    //     const shipperWisePartnerIdx = shipperWiseEntry.deliveryPartners.findIndex((p) => p.name === partner);
    //     const shipperWisePartnerEntry = {...shipperWiseEntry.deliveryPartners[shipperWisePartnerIdx]};
    //     shipperWisePartnerEntry.packageCount += 1;
    //     shipperWisePartnerEntry.moneyIn += shipperCost;
    //     shipperWisePartnerEntry.moneyOut += partnerCost;

    //     shipperWiseEntry.deliveryPartners.splice(shipperWisePartnerIdx, 1, shipperWisePartnerEntry);

    //     shipperWise.splice(shipperWiseIdx, 1, shipperWiseEntry);

    //     //////

    //     const partnerWiseIdx = deliveryPartnerWise.findIndex((s) => s.name === partner);
    //     const partnerWiseEntry = {...deliveryPartnerWise[partnerWiseIdx]};
    //     partnerWiseEntry.totalIn += shipperCost;
    //     partnerWiseEntry.totalOut += partnerCost;
    //     partnerWiseEntry.packageCount += 1;

    //     const partnerWiseShipperIdx = partnerWiseEntry.shippers.findIndex((p) => p.name === shipper);
    //     const partnerWiseShipperEntry = {...partnerWiseEntry.shippers[partnerWiseShipperIdx]};
    //     partnerWiseShipperEntry.packageCount += 1;
    //     partnerWiseShipperEntry.moneyIn += shipperCost;
    //     partnerWiseShipperEntry.moneyOut += partnerCost;

    //     partnerWiseEntry.shippers.splice(partnerWiseShipperIdx, 1, partnerWiseShipperEntry);

    //     deliveryPartnerWise.splice(partnerWiseIdx, 1, partnerWiseEntry);
    //   });
    //   state.calculatorResults.totalInFromShippers = totalInFromShippers;
    //   state.calculatorResults.totalOutToDeliveryPartners = totalOutToDeliveryPartners;
    //   state.calculatorResults.shipperWise = shipperWise;
    //   state.calculatorResults.deliveryPartnerWise = deliveryPartnerWise;
    // },

    setCalculatorDates(state, action) {
      state.calculatorConfig.startDate = action.payload.start;
      state.calculatorConfig.endDate = action.payload.end;
    },
    setCost(state, action) {
      if (action.payload.type === 'shipper') {
        const idx = state.calculatorConfig.shipperCosts.findIndex(
          (s) => s.name === action.payload.name
        );
        const newShipperCosts = [...state.calculatorConfig.shipperCosts];
        newShipperCosts.splice(idx, 1, {
          name: action.payload.name,
          cost: action.payload.cost,
        });
        state.calculatorConfig.shipperCosts = newShipperCosts;
      }
      if (action.payload.type === 'carrier') {
        const idx = state.calculatorConfig.carrierCosts.findIndex(
          (s) => s.name === action.payload.name
        );
        const newCarrierCosts = [...state.calculatorConfig.carrierCosts];
        const newCarrierCost = newCarrierCosts[idx];
        const idxx = newCarrierCost.shipper_costs.findIndex(
          (c) => c.name === action.payload.shipper_name
        );
        if (idxx !== -1) {
          const newShipperCosts = [...newCarrierCost.shipper_costs];
          newShipperCosts.splice(idxx, 1, {
            name: action.payload.shipper_name,
            cost: action.payload.cost,
          });
          newCarrierCost.shipper_costs = newShipperCosts;
          newCarrierCosts.splice(idx, 1, newCarrierCost);
          state.calculatorConfig.carrierCosts = newCarrierCosts;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.calculatorAndCosts,
        };
      })
      .addCase(getUniqueValues.fulfilled, (state, action) => {
        const shipperCosts = action.payload.shipper.map((s) => ({
          name: s,
          cost: 0,
        }));
        const carrierCosts = action.payload.delivery_partner.map((s) => ({
          name: s,
          shipper_costs: action.payload.shipper.map((sh) => ({
            name: sh,
            cost: 0,
          })),
        }));
        state.calculatorConfig.shipperCosts = shipperCosts;
        state.calculatorConfig.carrierCosts = carrierCosts;
      })
      .addCase(getBillingCalculation.pending, (state) => {
        state.calculatorLoading = true;
      })
      .addCase(getBillingCalculation.fulfilled, (state, action) => {
        state.calculatorResults = action.payload.result;
        state.calculatorLoading = false;
      })
      .addCase(saveDeliveryPartnerCostTemplate.fulfilled, (state, action) => {
        const deliveryPartnerCostTemplates = {
          ...state.deliveryPartnerCostTemplates,
        };
        deliveryPartnerCostTemplates[action.meta.arg.template.carrier_name] =
          action.meta.arg.template;
        state.deliveryPartnerCostTemplates = {
          ...deliveryPartnerCostTemplates,
        };
      })
      .addCase(getCustomerInvoiceTemplates.fulfilled, (state, action) => {
        state.isNetwork = action?.payload?.is_network || false;
      })
      .addCase(getDeliveryPartnerCostTemplates.fulfilled, (state, action) => {
        state.isNetwork = action?.payload?.is_network || false;
        state.deliveryPartnerCostTemplates = action?.payload?.templates || {};
      });
  },
});

export const { setCalculatorDates, setCost } = actions;

export default reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../services/api';
import { Filters, Package } from '../../constants/interfaces';
import { setFilteredData } from '../slices/packages';

export const getPackageData = createAsyncThunk(
  'dashboard/getFilteredPackageData',
  async ({ filterValues, token }: { filterValues: Filters; token: string }) => {
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    };
    const startDate = filterValues.delivery_date.start;
    const endDate = filterValues.delivery_date.end;

    const filtersArr = [];

    if (filterValues.route_name.status !== 'clear') {
      filtersArr.push({
        column: 'route_name',
        selected_values: filterValues.route_name.selected,
      });
    }
    if (filterValues.delivery_status.status !== 'clear') {
      filtersArr.push({
        column: 'delivery_status',
        selected_values: filterValues.delivery_status.selected,
      });
    }
    if (filterValues.distribution_location.status !== 'clear') {
      filtersArr.push({
        column: 'distribution_location',
        selected_values: filterValues.distribution_location.selected,
      });
    }
    if (filterValues.shipper.status !== 'clear') {
      filtersArr.push({
        column: 'shipper',
        selected_values: filterValues.shipper.selected,
      });
    }
    if (filterValues.delivery_partner.status !== 'clear') {
      filtersArr.push({
        column: 'delivery_partner',
        selected_values: filterValues.delivery_partner.selected,
      });
    }

    const response = await api.getPackages({
      dateMin: startDate,
      dateMax: endDate,
      filters: filtersArr,
      token: token,
    });
    return response
      ? {
          result: response?.data.result || {},
          packageCount: response?.data.package_count || 0,
          deliveredCount: response?.data.num_delivered || 0,
          pendingCount: response?.data.num_pending || 0,
          failedCount: response?.data.num_failed || 0,
        }
      : {};
  }
);

export const applyFilters = createAsyncThunk(
  'packages/applyFilters',
  async (
    { filters, packageData }: { filters: Filters; packageData: Package[] },
    { dispatch }
  ) => {
    let delCount = 0;
    const filteredData = [...packageData].filter((pkg) => {
      if (
        filters.route_name.status !== 'clear' &&
        !filters.route_name.selected.includes(pkg.route_name)
      ) {
        return false;
      }
      if (
        filters.delivery_status.status !== 'clear' &&
        !filters.delivery_status.selected.includes(pkg.delivery_status)
      ) {
        return false;
      }
      if (
        filters.distribution_location.status !== 'clear' &&
        !filters.distribution_location.selected.includes(
          pkg.distribution_location
        )
      ) {
        return false;
      }
      if (
        filters.shipper.status !== 'clear' &&
        !filters.shipper.selected.includes(pkg.shipper)
      ) {
        return false;
      }
      if (
        filters.delivery_partner.status !== 'clear' &&
        !filters.delivery_partner.selected.includes(pkg.delivery_partner)
      ) {
        return false;
      }
      const startDate = new Date(filters.delivery_date.start);
      const endDate = new Date(filters.delivery_date.end);
      const parts = pkg.delivery_date.split('/');
      const pkgDate = new Date(
        parseInt(parts[2], 10),
        parseInt(parts[0], 10) - 1,
        parseInt(parts[1], 10)
      );
      const within =
        pkgDate.getTime() >= startDate.getTime() &&
        pkgDate.getTime() <= endDate.getTime();
      if (filters.delivery_date.status !== 'clear' && !within) {
        return false;
      }
      if (pkg.delivery_status === 'Delivered') {
        delCount += 1;
      }
      return true;
    });

    dispatch(setFilteredData({ filteredData, delCount }));
  }
);

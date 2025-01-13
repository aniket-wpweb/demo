import { Filters } from './interfaces';

export const initialFilterValues: Filters = {
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
    start: new Date().toLocaleDateString('en-CA'),
    end: new Date().toLocaleDateString('en-CA'),
  },
  zip_code: {
    status: 'clear',
    value: null,
  },
};

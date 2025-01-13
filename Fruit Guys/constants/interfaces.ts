interface BillingReportRow {
  date: string;
  day_of_week: string;
  package_received: number;
  package_possession: number;
  package_delivered: number;
  package_missing: number;
  package_failed_no_substatus: number;
  package_failed_pending_cs: number;
  package_failed_redeliver: number;
  package_failed_return_to_sender: number;
  package_failed_return_to_warehouse: number;
  package_failed_missing: number;
  package_tendered_new: number;
  package_tendered_old: number;
  package_tendered_total: number;
  package_pre_failed: number;
  packages_delivered_with_time_windows: number;
  packages_with_time_windows: number;
  packages_delivered_within_time_window: number;
  completed_delivery_percent: string;
  exception_percent: string;
  adj_delivery_svc: string;
  failures_percent: string;
  time_windows_percent: string;
}
interface basicFilterState {
  type: string;
  options: string[];
}
interface ShipperWiseRow extends BillingReportRow {
  shipper: string;
}

interface DeliveryPartnerWiseRow extends BillingReportRow {
  delivery_partner: string;
  package_loaded: number;
}

interface GenericRow {
  [key: string]: string | number;
}

interface StatusReportResult {
  carrier: string;
  rows: GenericRow[];
}

export interface CustomerInvoiceTemplate {
  shipper_name: string;
  structure_type: string;
  billingInformation: {
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip_code: string;
  };
  costStructure: any;
}

export interface DeliveryPartnerCostTemplate {
  carrier_name: string;
  company_name: string;
  cost_structure: any;
}

export interface Package {
  delivery_date: string;
  route_name: string;
  city: string;
  state: string;
  zip_code: number;
  delivery_status: string;
  distribution_location: string;
  shipper: string;
  delivery_partner: string;
}

export interface Filters {
  route_name: {
    status: string;
    selected: string[];
  };
  delivery_status: {
    status: string;
    selected: string[];
  };
  distribution_location: {
    status: string;
    selected: string[];
  };
  shipper: {
    status: string;
    selected: string[];
  };
  delivery_partner: {
    status: string;
    selected: string[];
  };
  delivery_date: {
    status: string;
    start: string;
    end: string;
  };
  zip_code: {
    status: string;
    value: number;
  };
}

export interface CalculatorConfig {
  shipperCosts: Array<{ name: string; cost: number }>;
  carrierCosts: Array<{
    name: string;
    shipper_costs: Array<{ name: string; cost: number }>;
  }>;
  startDate: Date;
  endDate: Date;
}

export type PackageKeys = keyof Package;

export interface PackagesState {
  packagesData: any[];
  packagesLoading: boolean;
  packageData: Package[];
  filteredPackageData: Package[];
  packageCount: number;
  dashboardDateRange: {
    startDate: Date;
    endDate: Date;
  };
  deliveredCount: number;
  originalDeliveredCount: number;
}

export interface ReportsState {
  billingReportResults: {
    rows: BillingReportRow[];
    shipperWiseRows: ShipperWiseRow[];
    dpWiseRows: DeliveryPartnerWiseRow[];
    shipperList: string[];
    deliveryPartnerList: string[];
    inputtedFilters: any;
    startDate: string;
    endDate: string;
  };
  billingReportLoading: boolean;
  billingReportLoaded: boolean;
  performanceReportLineItemsLoaded: boolean;
  performanceReportLineItemsLoading: boolean;
  performanceReportLineItemUrl: string;
  volumeReportResults: {
    rows: GenericRow[];
    inputtedFilters: any;
  };
  volumeReportLoading: boolean;
  volumeReportLoaded: boolean;
  volumeReportDateRange: {
    startDate: string;
    endDate: string;
  };
  volumeReportLineItemsLoaded: boolean;
  volumeReportLineItemsLoading: boolean;
  volumeReportLineItemUrl: string;
  statusReportResults: {
    result: StatusReportResult[];
    rows: GenericRow[];
    inputtedFilters: any;
  };
  statusReportLoading: boolean;
  statusReportLoaded: boolean;
  statusReportDateRange: {
    startDate: string;
    endDate: string;
  };
  statusReportLineItemsLoaded: boolean;
  statusReportLineItemsLoading: boolean;
  statusReportLineItemUrl: string;
}
export interface CalculatorAndCostsState {
  deliveryPartnerCostTemplates: {
    [key: string]: DeliveryPartnerCostTemplate;
  };
  calculatorLoading: boolean;
  calculatorConfig: CalculatorConfig;
  calculatorResults: {
    totalInFromShippers: number;
    totalOutToDeliveryPartners: number;
    shipperWise: Array<{
      name: string;
      totalIn: number;
      totalOut: number;
      packageCount: number;
      deliveryPartners: Array<{
        name: string;
        packageCount: number;
        moneyIn: number;
        moneyOut: number;
      }>;
    }>;
    deliveryPartnerWise: Array<{
      name: string;
      totalIn: number;
      totalOut: number;
      packageCount: number;
      shippers: Array<{
        name: string;
        packageCount: number;
        moneyIn: number;
        moneyOut: number;
      }>;
    }>;
  };
  isNetwork: boolean;
}
export interface InvoicesState {
  customerInvoiceTemplates: {
    [key: string]: CustomerInvoiceTemplate;
  };
  invoiceDateRange: {
    startDate: Date;
    endDate: Date;
  };
  invoiceGenerated: boolean;
  dppsGenerated: boolean;
  dppsDateRange: {
    startDate: Date;
    endDate: Date;
  };
  customerInvoiceData: {
    rows: Array<{
      delivery_date: string;
      shipper: string;
      total_packages: number;
      rate: number;
      amount: number;
    }>;
    customerInvoiceTemplate?: CustomerInvoiceTemplate;
  };
  deliveryPartnerInvoiceData: {
    rows: Array<{
      delivery_date: string;
      shipper: string;
      total_packages: number;
      rate: number;
      amount: number;
    }>;
    addedRows: Array<{
      delivery_date: string;
      shipper: string;
      total_packages: number;
      rate: number;
      amount: number;
    }>;
    deliveryPartnerCostTemplate?: DeliveryPartnerCostTemplate;
  };
  pastInvoices: Array<{
    shipper: string;
    invoices: Array<{
      sent: boolean;
      startDate: string;
      invoiceId: number;
      rows?: Array<{
        delivery_date: string;
        shipper: string;
        total_packages: number;
        rate: number;
        amount: number;
      }>;
    }>;
  }>;
  pastDPPSs: Array<{
    carrier: string;
    deliveryPartnerId?: number;
    invoices: Array<{
      sent: boolean;
      startDate: string;
      invoiceId: number;
      rows: Array<{
        delivery_date: string;
        shipper: string;
        total_packages: number;
        rate: number;
        amount: number;
      }>;
    }>;
  }>;
}

export interface DashboardState {
  ping: string;
  uniqueValuesLoading: boolean;
  uniqueValuesLoaded: boolean;
  queryText: string;
  showSpinner: boolean;
  currentPage: string;
  sideBarMenus: {
    deliveryPartnerOpen: boolean;
    customerOpen: boolean;
  };
  shipperList: string[];
  deliveryPartnerIds: Array<{ name: string; deliveryPartnerId: number }>;
  deliveryPartnerList: string[];
  showSideBar: boolean;
  originalStartDate: string;
  originalEndDate: string;
  filterOptions: {
    delivery_date: {
      type: string;
    };
    route_name: basicFilterState;
    delivery_status: basicFilterState;
    distribution_location: basicFilterState;
    shipper: basicFilterState;
    delivery_partner: basicFilterState;
    zip_code: {
      type: string;
    };
  };
  filterValues: Filters;
}

export interface TrackingState {
  trackingLoading: boolean;
  trackingLoaded: boolean;
  trackingError?: string;
  trackingErrored: boolean;
  authErrored: boolean;
  deliveryDate: string;
  status: string;
  eta: Array<{
    fromUnix?: number;
    toUnix?: number;
  }>;
  completionTime?: string;
  signatureUrl?: string;
  podPhotoUrl?: string;
  coordinates?: {
    lat: number;
    long: number;
  };
  totalStopsInRoute?: number;
  stopNumber?: string;
  currentStop?: number;
  deliveryAddress: {
    company?: string;
    contact?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
  };
  externalTrackingNumber?: string;
  shipmentExternalId?: string;
  weight: number;
  weightUnit: string;
  poNumber: string;
  shipDate: string;
  referenceNumber: string;
  trackingData: any[];
}

export interface AuthState {
  authToken: string;
  refreshToken: string;
  isCarrierAdmin: boolean;
  userEmail: string;
}

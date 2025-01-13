import axios from 'axios';
import { toast } from 'react-toastify';
import { CustomerInvoiceTemplate, DeliveryPartnerCostTemplate } from '../constants/interfaces';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URI,
});

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000',
// });

const ppTrackingEnv = 'production';

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 204) {
        return Promise.reject(error);
      }
      let message = 'Request failed!';
      message = error.response ? error.response.data?.error : error.message;
      toast(message, { type: 'error' });
      return Promise.reject(error);
    }
  }
);

const axiosAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URI,
});

axiosAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error intercepted: ", error)
    if (error.response) {
      if (error.response.status === 400 || error.response.status === 404) {
        return Promise.reject(error.response.data);
      }
      let message = 'Request failed!';
      message = error.response ? error.response.data?.error : error.message;
      toast(message, { type: 'error' });
      return Promise.reject(error);
    }
  }
);

const axiosPeachPortalInstance = axios.create({
 // baseURL: BASE_URI_PEACH,
    baseURL: process.env.NEXT_PUBLIC_BASE_URI_PEACH,
});

/*axiosPeachPortalInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error intercepted123: ", error)
    if (error.response) {
      if (error.response.status === 400) {
        return Promise.reject(error.response.data);
      }
      let message = 'Request failed!';
      message = error.response ? error.response.data?.error : error.message;
      toast(message, { type: 'error' });
      return Promise.reject(error);
    }
  }
  
); */

axiosPeachPortalInstance.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    console.log("error intercepted: ", error);
    if (error.response) {
      // Handle specific HTTP status codes
      if (error.response.status === 400) {
        // Return the message directly if present in the response data
        const errorMessage = error.response.data?.message || 'Bad Request';
        toast(errorMessage, { type: 'error' });
        return Promise.reject(error.response.data);
      }

      // General error handling
      const message = error.response.data?.message || 'Request failed!';
      toast(message, { type: 'error' });
      return Promise.reject(error.response.data || error);
    }

    console.log("error function called");
    // Handle cases where no response is received
    const fallbackMessage = error.message || 'Network Error';
    toast(fallbackMessage, { type: 'error' });
    return Promise.reject(error);
  }
);



const api = {
  ping: () => axiosInstance.get('/ping'),
  getUniqueValues: (token: string) =>
    axiosInstance.post('/carrier/get_carrier_unique_values', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }),
  getPackages: ({
    dateMin,
    dateMax,
    filters,
    token,
  } : {
    dateMin: string;
    dateMax: string;
    filters: {
      column: string;
      selected_values: string[] | number[];
    }[];
    token: string;
  }) => 
    axiosInstance.post('/carrier/get_carrier_packages', 
    {
      date_range: {
        date_min: dateMin,
        date_max: dateMax,
      },
      filters: filters,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getBillingCalculation: ({
    shipperCosts,
    carrierCosts,
    startDate,
    endDate,
    token,
  }: {
    shipperCosts: Array<{ name: string; cost: number; }>;
    carrierCosts: Array<{ name: string; shipper_costs: Array<{name: string; cost: number;}>; }>;
    startDate: string;
    endDate: string;
    token: string;
  }) =>
    axiosInstance.post('/carrier/get_billing_calculation', {
      shipper_costs: shipperCosts,
      carrier_costs: carrierCosts,
      date_range: {
        date_min: startDate,
        date_max: endDate,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getCustomerInvoiceTemplates: ({
    token,
  } : {
    token: string;
  }) =>
    axiosInstance.post('/carrier/get_customer_invoice_templates', {
    }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  saveCustomerInvoiceTemplate: ({
    token,
    template,
  } : {
    token: string;
    template: CustomerInvoiceTemplate;
  }) =>
    axiosInstance.post('/carrier/save_customer_invoice_template', {
      shipper_name: template.shipper_name,
      billing_information: {
        company_name: template.billingInformation.companyName,
        address_line_1: template.billingInformation.addressLine1,
        address_line_2: template.billingInformation.addressLine2,
        city: template.billingInformation.city,
        state: template.billingInformation.state,
        zip_code: template.billingInformation.zip_code,
      },
      structure_type: template.structure_type,
      cost_structure: template.costStructure,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getCustomerInvoice: ({
    token,
    template,
    date_range,
  } : {
    token: string;
    template: CustomerInvoiceTemplate;
    date_range: {date_min: string, date_max: string};
  }) =>
    axiosInstance.post('/carrier/get_customer_invoice', {
      date_range: date_range,
      template: {
        shipper_name: template.shipper_name,
        billing_information: {
          company_name: template.billingInformation.companyName,
          address_line_1: template.billingInformation.addressLine1,
          address_line_2: template.billingInformation.addressLine2,
          city: template.billingInformation.city,
          state: template.billingInformation.state,
          zip_code: template.billingInformation.zip_code,
        },
        structure_type: template.structure_type,
        cost_structure: template.costStructure,
    },
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getDeliveryPartnerCostTemplates: ({
    token,
  } : {
    token: string;
  }) =>
    axiosInstance.post('/carrier/get_delivery_partner_cost_templates', {
    }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  saveDeliveryPartnerCostTemplate: ({
    token,
    template,
  } : {
    token: string;
    template: DeliveryPartnerCostTemplate;
  }) =>
    axiosInstance.post('/carrier/save_delivery_partner_cost_template', template,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getDeliveryPartnerInvoice: ({
    token,
    template,
    date_range,
  } : {
    token: string;
    template: DeliveryPartnerCostTemplate;
    date_range: {date_min: string, date_max: string};
  }) =>
    axiosInstance.post('/carrier/get_delivery_partner_invoice', {
      date_range: date_range,
      template: template,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  login: ({
    email,
    password,
    phoneNumber,
    loginCode,
  }: {
    email: string;
    password: string;
    phoneNumber: string;
    loginCode: string;
  }) =>
    axiosAuthInstance.post('/auth/login', {
      username: email,
      password: password,
      phoneNumber,
      loginCode,
      deviceId: "test",
    }),
  requestOtp: (phoneNumber : string) =>
      axiosAuthInstance.get(`/auth/loginCode/${phoneNumber}`),
  refresh: (refreshToken : string) =>
    axiosAuthInstance.post('/auth/refresh', {
      // TODO: once endpoint is updated to take refreshToken from cookie, remove refreshToken from req body
      refreshToken: refreshToken,
      deviceId: "test",
    }),
  resetPassword: ({password, token} : {password: string; token: string;}) =>
      axiosAuthInstance.patch('/auth/token', {
        password,
        token,
        deviceId: "test",
    }),
  verifyToken: (authToken : string) =>
    axiosAuthInstance.get(`/auth/verify/${authToken}`),
  sendResetLink: (username : string) =>
    axiosAuthInstance.get(`/auth/forgot/${username}`),
  getCustomerInvoiceLog: ( shipperIds : Array<{name: string; shipperId: number}> ) =>
    axiosInstance.post('/carrier/get_shipper_invoice_log', shipperIds.map((i) => ({
      name: i.name,
      shipper_id: i.shipperId,
    }))),
  getDPPSLog: ( deliveryPartnerIds : Array<{name: string; deliveryPartnerId: number}> ) =>
    axiosInstance.post('/carrier/get_dpps_log', deliveryPartnerIds.map((i) => ({
      name: i.name,
      carrier_id: i.deliveryPartnerId,
    }))),
  markCustomerInvoiceSent: ( invoiceId : number ) => 
    axiosInstance.post('/carrier/mark_shipper_invoice_sent', {
      invoice_id: invoiceId,
      sent: true,
    }),
  markDPPSSent: ( invoiceId : number ) => 
    axiosInstance.post('/carrier/mark_dpps_sent', {
      invoice_id: invoiceId,
      sent: true,
    }),
  getPerformanceReport: ({
    dateMin,
    dateMax,
    filters,
    exportReport=false,
    exportLineItems=false,
    token,
  } : {
    dateMin: string;
    dateMax: string;
    filters: {
      column: string;
      selected_values: string[] | number[];
    }[];
    exportReport?: boolean;
    exportLineItems?: boolean;
    token: string;
  }) => 
    axiosInstance.post('/carrier/get_package_view', {
      date_range: {
        date_min: dateMin,
        date_max: dateMax,
      },
      filters: filters,
      env: "prod",
      export_report: exportReport,
      export_line_items: exportLineItems,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getVolumeReport: ({
    dateMin,
    dateMax,
    filters,
    token,
    exportReport=false,
    exportLineItems=false,
  } : {
    dateMin: string;
    dateMax: string;
    filters: {
      column: string;
      selected_values: string[] | number[];
    }[];
    token: string;
    exportReport?: boolean;
    exportLineItems?: boolean;
  }) => 
    axiosInstance.post('/carrier/get_volume_report', {
      date_range: {
        date_min: dateMin,
        date_max: dateMax,
      },
      filters: filters,
      env: "prod",
      export_report: exportReport,
      export_line_items: exportLineItems,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getStatusReport: ({
    dateMin,
    dateMax,
    filters,
    token,
    exportReport=false,
    exportLineItems=false,
  } : {
    dateMin: string;
    dateMax: string;
    filters: {
      column: string;
      selected_values: string[] | number[];
    }[];
    token: string
    exportReport?: boolean;
    exportLineItems?: boolean;
  }) => 
    axiosInstance.post('/carrier/get_status_report', {
      date_range: {
        date_min: dateMin,
        date_max: dateMax,
      },
      filters: filters,
      env: "prod",
      export_report: exportReport,
      export_line_items: exportLineItems,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getPeachToken: () =>
    axiosPeachPortalInstance.post('/user/login?_format=json', {
      name: process.env.NEXT_PUBLIC_BASE_URI_PEACH_USER_NAME, //TODO: Store this somewhere more secure
      pass: process.env.NEXT_PUBLIC_BASE_URI_PEACH_USER_PASS,
    }),
  getTrackingData: (trackingNumber: string, accessToken: string) =>
    axiosPeachPortalInstance.get(`/print-api/package-detailed-tracking-external-id/${trackingNumber}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }),
    getSingleTrackingData: (trackingNumber: string, accessToken: string) =>
    axiosPeachPortalInstance.get(`/print-api/package-detailed-tracking/${trackingNumber}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }),
    getPackageTrackingData: (trackingNumbers: string[], shipperName: string) => {
      // const queryParams = trackingNumbers.map((trackingId: string) => `trackingId=${encodeURIComponent(trackingId)}`).join('&');
      // return axiosPeachPortalInstance.get(`/landing/${shipperName}/packages?${queryParams}`);
      return axiosInstance.get(`/landing/${shipperName}/packages?trackingId=${trackingNumbers.join(',')}`);
    },
    getTrackingNumberByPackageId: (packageId: string, accessToken: string) =>
    axiosPeachPortalInstance.get(`/print-api/package/${packageId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }),
    getOrderTrackingData: (orderNumber: string, accessToken: string) =>
    // /print-api/shipment/651372?_format=json
    axiosPeachPortalInstance.get(`/print-api/package-detailed-order-id/${orderNumber}?_format=json`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }),

  getTrackingDataLanding: (trackingNumber: string) =>
    axiosInstance.get(`/landing/${trackingNumber}/track?env=${ppTrackingEnv}`),
  getTrackingDataByShipper: (trackingNumber: string, shipperName: string) =>
    axiosInstance.get(`/landing/${shipperName}/${trackingNumber}/track?env=${ppTrackingEnv}`),
};

export default api;
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import CustomDropdown from "./CustomDropdown";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCaretDown, faCircleNotch, faDownload} from '@fortawesome/free-solid-svg-icons';

import Layout from "../components/layout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentPage } from "../redux/slices/dashboard";
import { getUniqueValues } from "../redux/thunks/dashboard";
import {
  clearLineItemExportState,
} from "../redux/slices/reports";
import {  
  getPerformanceReport,
  getPerformanceReportLineItemExport,
} from "../redux/thunks/reports";
import{
  setAuthToken,
  setRefreshToken,
  setIsCarrierAdmin
} from "../redux/slices/auth"
import {
  refresh,
  verifyToken
} from "../redux/thunks/auth"
import { ColDef } from "ag-grid-community";
import { loginPath } from "../constants/routes";


const BillingReport = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    shipperList,
    deliveryPartnerList,
    uniqueValuesLoading,
    uniqueValuesLoaded,
  } = useAppSelector((state)=>state.dashboard);
  const {
    billingReportLoading,
    billingReportResults,
    billingReportLoaded,
    volumeReportLineItemUrl: lineItemExportUrl,
    volumeReportLineItemsLoading: lineItemExportLoading,
    volumeReportLineItemsLoaded: lineItemExportLoaded,
  } = useAppSelector((state)=>state.reports);
  const {
    authToken,
    refreshToken
  } = useAppSelector((state)=>state.auth);

  const [deliveryStartDate, setStartDate] = useState('');
  const [deliveryEndDate, setCurrentDate] = useState('');
  const [selectedShipperOptions, setShipperSelectedOptions] = useState([]);
  const [selectedPartnerOptions, setPartnerSelectedOptions] = useState([]);
  const [deliveryStartDateError, setDeliveryStartDateError] = useState('');
  const [deliveryEndDateError, setDeliveryEndDateError] = useState('');
  const [shipperOptionError, setShipperOptionError] = useState('');
  const [partnerOptionsError, setPartnerOptionsError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const gridRef = useRef(null);
  const shipperWiseGridRef = useRef(null);
  const dpWiseGridRef = useRef(null);

  const columnDefs: ColDef[] = [
    // { field: "date", headerName: "Date"},
    // { field: "day_of_week", headerName: "Day of week"},
    { field: "Pkgs Tendered New", headerName: "Pkgs Tendered New", minWidth: 180},
    { field: "Pkgs Tendered Old", headerName: "Pkgs Tendered Old", minWidth: 180},
    { field: "Pkgs Tendered Total", headerName: "Pkgs Tendered Total", minWidth: 180},
    // { field: "package_loaded", headerName: "Loaded onto Route", minWidth: 180},
    { field: "Missing at Load Scan", headerName: "Missing at Load Scan", minWidth: 180},
    { field: "Delivered", headerName: "Delivered"},
    { field: "Failed Delivery: Pending CS", headerName: "Failed Delivery: Pending CS", minWidth: 220},
    { field: "Failed Delivery: Redeliver", headerName: "Failed Delivery: Redeliver", minWidth: 200},
    { field: "Failed Delivery: Return To Sender", headerName: "Failed Delivery: Return To Sender", minWidth: 260},
    { field: "Failed Delivery: Return To Warehouse", headerName: "Failed Delivery: Return To Warehouse", minWidth: 290},
    { field: "Failed Delivery: Missing", headerName: "Failed Delivery: Missing", minWidth: 200},
    { field: "Failed Delivery: No Substatus", headerName: "Failed Delivery: No Substatus", minWidth: 230},
    { field: "Completed Delivery %", headerName: "Completed Delivery %", minWidth: 200},
    { field: "Exception %", headerName: "Exception %", minWidth: 180},
    { field: "Adj Delivery Svc %", headerName: "Adj Delivery Svc %", minWidth: 180},
    { field: "Failures %", headerName: "Failures %", minWidth: 150},
    { field: "Cancelled or Failed Print/Process/Cancel", headerName: "Cancelled or Failed Print/Process/Cancel", minWidth: 300},
    { field: "Pks w/ Time Windows", headerName: "Pks w/ Time Windows", minWidth: 300},
    { field: "Pks w/ Time Windows Delivered", headerName: "Pks w/ Time Windows Delivered", minWidth: 300},
    { field: "Pks w/ Time Windows Met", headerName: "Pks w/ Time Windows Met", minWidth: 300},
    { field: "Time Window Met %", headerName: "Time Window Met %", minWidth: 300},
    { field: "Received Today", headerName: "Received Today" },
    { field: "In possession", headerName: "In possession" },
  ];

  const shipperWiseColumnDefs: ColDef[] = [
    // { field: "date", headerName: "Date"},
    // { field: "day_of_week", headerName: "Day of week"},
    { field: "Shipper", headerName: "Shipper"},
    { field: "Pkgs Tendered New", headerName: "Pkgs Tendered New", minWidth: 180},
    { field: "Pkgs Tendered Old", headerName: "Pkgs Tendered Old", minWidth: 180},
    { field: "Pkgs Tendered Total", headerName: "Pkgs Tendered Total", minWidth: 180},
    // { field: "package_loaded", headerName: "Loaded onto Route", minWidth: 180},
    { field: "Missing at Load Scan", headerName: "Missing at Load Scan", minWidth: 180},
    { field: "Delivered", headerName: "Delivered"},
    { field: "Failed Delivery: Pending CS", headerName: "Failed Delivery: Pending CS", minWidth: 220},
    { field: "Failed Delivery: Redeliver", headerName: "Failed Delivery: Redeliver", minWidth: 200},
    { field: "Failed Delivery: Return To Sender", headerName: "Failed Delivery: Return To Sender", minWidth: 260},
    { field: "Failed Delivery: Return To Warehouse", headerName: "Failed Delivery: Return To Warehouse", minWidth: 290},
    { field: "Failed Delivery: Missing", headerName: "Failed Delivery: Missing", minWidth: 200},
    { field: "Failed Delivery: No Substatus", headerName: "Failed Delivery: No Substatus", minWidth: 230},
    { field: "Completed Delivery %", headerName: "Completed Delivery %", minWidth: 200},
    { field: "Exception %", headerName: "Exception %", minWidth: 180},
    { field: "Adj Delivery Svc %", headerName: "Adj Delivery Svc %", minWidth: 180},
    { field: "Failures %", headerName: "Failures %", minWidth: 150},
    { field: "Cancelled or Failed Print/Process/Cancel", headerName: "Cancelled or Failed Print/Process/Cancel", minWidth: 300},
    { field: "Pks w/ Time Windows", headerName: "Pks w/ Time Windows", minWidth: 300},
    { field: "Pks w/ Time Windows Delivered", headerName: "Pks w/ Time Windows Delivered", minWidth: 300},
    { field: "Pks w/ Time Windows Met", headerName: "Pks w/ Time Windows Met", minWidth: 300},
    { field: "Time Window Met %", headerName: "Time Window Met %", minWidth: 300},
    { field: "Received Today", headerName: "Received Today" },
    { field: "In possession", headerName: "In possession" },
  ];

  const dpWiseColumnDefs: ColDef[] = [
    // { field: "date", headerName: "Date"},
    // { field: "day_of_week", headerName: "Day of week"},
    { field: "Delivery Partner", headerName: "Delivery Partner", minWidth: 150},
    { field: "Pkgs Tendered New", headerName: "Pkgs Tendered New", minWidth: 180},
    { field: "Pkgs Tendered Old", headerName: "Pkgs Tendered Old", minWidth: 180},
    { field: "Pkgs Tendered Total", headerName: "Pkgs Tendered Total", minWidth: 180},
    // { field: "package_loaded", headerName: "Loaded onto Route", minWidth: 180},
    { field: "Missing at Load Scan", headerName: "Missing at Load Scan", minWidth: 180},
    { field: "Delivered", headerName: "Delivered"},
    { field: "Failed Delivery: Pending CS", headerName: "Failed Delivery: Pending CS", minWidth: 220},
    { field: "Failed Delivery: Redeliver", headerName: "Failed Delivery: Redeliver", minWidth: 200},
    { field: "Failed Delivery: Return To Sender", headerName: "Failed Delivery: Return To Sender", minWidth: 260},
    { field: "Failed Delivery: Return To Warehouse", headerName: "Failed Delivery: Return To Warehouse", minWidth: 290},
    { field: "Failed Delivery: Missing", headerName: "Failed Delivery: Missing", minWidth: 200},
    { field: "Failed Delivery: No Substatus", headerName: "Failed Delivery: No Substatus", minWidth: 230},
    { field: "Completed Delivery %", headerName: "Completed Delivery %", minWidth: 200},
    { field: "Exception %", headerName: "Exception %", minWidth: 180},
    { field: "Adj Delivery Svc %", headerName: "Adj Delivery Svc %", minWidth: 180},
    { field: "Failures %", headerName: "Failures %", minWidth: 150},
    { field: "Cancelled or Failed Print/Process/Cancel", headerName: "Cancelled or Failed Print/Process/Cancel", minWidth: 300},
    { field: "Pks w/ Time Windows", headerName: "Pks w/ Time Windows", minWidth: 300},
    { field: "Pks w/ Time Windows Delivered", headerName: "Pks w/ Time Windows Delivered", minWidth: 300},
    { field: "Pks w/ Time Windows Met", headerName: "Pks w/ Time Windows Met", minWidth: 300},
    { field: "Time Window Met %", headerName: "Time Window Met %", minWidth: 300},
    { field: "Received Today", headerName: "Received Today" },
    { field: "In possession", headerName: "In possession" },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true
  };

  const autoSizeStrategy = {
    type: 'fitCellContents'
};

  useEffect(() => {
    const today = new Date();

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const getPreviousSunday = (date) => {
      const previousSunday = new Date(date);
      previousSunday.setDate(date.getDate() - date.getDay());
      return formatDate(previousSunday);
    };

    setCurrentDate(formatDate(today));
    setStartDate(formatDate(today));
  }, []);

  useEffect(() => {
    dispatch(setCurrentPage('performanceReports'));
    verifyAuth();
  }, [dispatch]);

  useEffect(() => {
    if (!uniqueValuesLoaded && !uniqueValuesLoading && loggedIn) {
      dispatch(getUniqueValues(authToken));
    }  else {
      if (deliveryPartnerList.length == 1) {
        setPartnerSelectedOptions([deliveryPartnerList[0]]);
      }
      if (shipperList.length == 1) {
        setShipperSelectedOptions([shipperList[0]]);
      }
    }
  }, [shipperList, deliveryPartnerList, loggedIn]);

    // TODO: pull out this function to a separate file once we have its final form
  const verifyAuth = () => {
    return new Promise<void>((resolve, reject) => {
      const onFulfilled = (res) => {
        // TODO: from user info and roles in response, do stuff
        console.log("response: ", res);
        setLoggedIn(true);
        if (res.roles.length > 0) {
          const roleIdx = res.roles.findIndex((role) => role.role && role.role === "CarrierAdmin"); 
          if (roleIdx !== -1) {
            dispatch(setIsCarrierAdmin(true));
          }
        }
        resolve();
      };

      // if token verification fails, we need to refresh the token or redirect to login if refresh fails
      const onRejected = (err) => {
        console.log("[verifyAuth] verifyToken rejected with error: ", err);
        dispatch(refresh(refreshToken)).unwrap().then(
          (res) => {
            // if refresh is successful, set the new authToken and refreshToken
            dispatch(setAuthToken(res.accessToken));

            // TODO: once /auth endpoints are updated to set cookies, remove this line
            // the /auth/refresh endpoint will automatically set the refreshToken cookie,
            // so we don't need to store or pass it.
            dispatch(setRefreshToken(res.refreshToken));
            setLoggedIn(true);
            resolve();
          },
          (err) => {
            console.log("[verifyAuth] refresh rejected with error: ", err);
            // if refresh fails, redirect to login
            router.push(loginPath);
            reject(err);
          });
      };
      dispatch(verifyToken(authToken)).unwrap().then(onFulfilled, onRejected);
    });
  };

  const generateReport = () => {
    setDeliveryStartDateError('');
    setDeliveryEndDateError('');
    setShipperOptionError('');
    setPartnerOptionsError('');

    if (!deliveryStartDate) {
      setDeliveryStartDateError("Delivery Date field is required.");
    }
    // if (!deliveryEndDate) {
    //   setDeliveryEndDateError("Delivery End Date field is required.");
    // }
    if (selectedShipperOptions.length === 0) {
      setShipperOptionError("Shipper option field is required.");
    }
    if (selectedPartnerOptions.length === 0) {
      setPartnerOptionsError("Partner option field is required.");
    }

    // const startDate = new Date(deliveryStartDate);
    // const endDate = new Date(deliveryEndDate);

    // if (startDate > endDate) {
    //   setDeliveryEndDateError('Start date cannot be greater than end date.');
    //   return;
    // }

    if (!deliveryStartDate || selectedShipperOptions.length === 0 || selectedPartnerOptions.length === 0) {
      return;
    }

    verifyAuth().then(() => {
      dispatch(getPerformanceReport({
        dateMin: deliveryStartDate,
        dateMax: deliveryStartDate,
        token: authToken,
        filters: [
          {
            column: "shipper",
            selected_values: selectedShipperOptions,
          },
          {
            column: "delivery_partner",
            selected_values: selectedPartnerOptions,
          }
        ],
      }));
    }).catch((error) => {
      console.error("Authentication failed:", error);
    });
  }

  const onBtnExport = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv({fileName: `performance_report_${billingReportResults.startDate}.csv`});
    }
  }, [billingReportResults.startDate]);

  const shipperWiseExport = useCallback(() => {
    if (shipperWiseGridRef.current) {
      shipperWiseGridRef.current.api.exportDataAsCsv({fileName: `performance_by_shipper_${billingReportResults.startDate}.csv`});
    }
  }, [billingReportResults.startDate]);

  const dpWiseExport = useCallback(() => {
    if (dpWiseGridRef.current) {
      dpWiseGridRef.current.api.exportDataAsCsv({fileName: `performance_by_DP_${billingReportResults.startDate}.csv`});
    }
  }, [billingReportResults.startDate]);

  const getLineItemExport = () => {
    verifyAuth().then(() => {
      dispatch(getPerformanceReportLineItemExport({
        dateMin: billingReportResults.startDate,
        dateMax: billingReportResults.endDate,
        filters: billingReportResults.inputtedFilters,
        token: authToken,
      }));
    }).catch((error) => {
      console.error("Authentication failed:", error);
    });
  };

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  function convertDateFormat(dateString: string): string {
    // Split the input string by the dash (-) separator
    const [year, month, day] = dateString.split('-');
  
    // Return the date in MM/DD/YYYY format
    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    if (lineItemExportLoaded && !lineItemExportLoading && lineItemExportUrl != "") {
      openInNewTab(lineItemExportUrl);
      dispatch(clearLineItemExportState("performanceReport"));
      toast.success("Line Item CSV Exported Successfully");
    }
  }, [lineItemExportLoaded, lineItemExportLoading, lineItemExportUrl])

  const labelStyle = { color: "red", fontSize: "16px", fontWeight: "bold" };

  return (
    <Layout>
      <div className="justify-center p-4">
        <div className="page-title">
          <h1>Daily Performance Report Generator</h1>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex-col items-center pl-5">
          <div className="signup-container flex-col items-center">
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
              <div>
                <h5 className="mt-6">Select Shippers</h5>
                <div className="mt-2">
                  <CustomDropdown
                    options={shipperList.map((shipper, idx) => ({id: idx, value: shipper, label: shipper}))}
                    selectedOptions={selectedShipperOptions}
                    setSelectedOptions={setShipperSelectedOptions}
                    label="Click to Select Shippers"
                  />
                  <label style={labelStyle}>{shipperOptionError}</label>
                </div>
              </div>
              {uniqueValuesLoaded && !uniqueValuesLoading && deliveryPartnerList.length > 1 ?
              <div>
                <h5 className="mt-6">Select Delivery Partners</h5>
                <div className="mt-2">
                  <CustomDropdown
                    options={deliveryPartnerList.map((dp, idx) => ({id: idx, value: dp, label: dp}))}
                    selectedOptions={selectedPartnerOptions}
                    setSelectedOptions={setPartnerSelectedOptions}
                    label="Click to Select Partners"
                  />
                  <label style={labelStyle}>{partnerOptionsError}</label>
                </div>
              </div> : <div></div>}
              <div>
                <h5 className="mt-6">Delivery Date</h5>
                <div className="mt-2">
                  <input
                    type="date"
                    id="deliveryStartDate"
                    value={deliveryStartDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Delivery Start Date"
                    className="long-input"
                  />
                  <label style={labelStyle}>{deliveryStartDateError}</label>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-10 justify-between w-full content-center">
              <div className="">
                <button className=" font-bold py-2 px-4 rounded text-white bg-[#7AB16A] text-center" onClick={generateReport}>Generate</button>
                </div>
              </div>
            {billingReportLoading && (
              <div className="my-10 w-full flex flex-row justify-center">
                <FontAwesomeIcon icon={faCircleNotch} size="3x" className="fa-spin" color="grey"/>
              </div>
            )}
            {billingReportResults.rows.length > 0 && !billingReportLoading && billingReportLoaded &&(
              <div className="mt-20">
                <div className="flex flex-row justify-between items-end">
                  <h3 className="font-bold text-lg pl-1">Total Performance Metrics Across Selected Shippers and Partners - {convertDateFormat(deliveryStartDate)}</h3>
                  <div className="text-right">
                    <button className="export-button" onClick={onBtnExport}><FontAwesomeIcon icon={faDownload} className="mr-2" />Export to CSV</button>
                    <button className="export-button" onClick={getLineItemExport}>
                      {lineItemExportLoading ? <FontAwesomeIcon icon={faCircleNotch} size="lg" className="fa-spin" color="white"/> : <span><FontAwesomeIcon icon={faDownload} className="mr-2" />Export Line Item CSV</span>}
                    </button>
                  </div>
                </div>
                <div className="ag-theme-alpine mt-5" style={{ height: 90, width: "100%"}}>
                  <AgGridReact
                    ref={gridRef}
                    rowData={billingReportResults.rows}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    alwaysShowHorizontalScroll={true}
                    // domLayout='autoHeight'
                  />
                </div>
              </div>
            )}
            {billingReportResults.shipperList.length > 1 && billingReportResults.shipperWiseRows.length > 0 && !billingReportLoading && billingReportLoaded && (
              <div className="mt-20">
                <div className="flex flex-row justify-between items-end">
                  <h3 className="font-bold text-lg pl-1">Performance Breakdown By Shipper Across Selected Data - {convertDateFormat(deliveryStartDate)}</h3>
                  <div className="text-right">
                    <button className="export-button" onClick={shipperWiseExport}><FontAwesomeIcon icon={faDownload} className="mr-2" />Export to CSV</button>
                  </div>
                </div>
                <div className="ag-theme-alpine mt-5" style={{ height: 45 * (billingReportResults.shipperWiseRows.length + 1) , width: "100%"}}>
                  <AgGridReact
                    ref={shipperWiseGridRef}
                    rowData={billingReportResults.shipperWiseRows}
                    columnDefs={shipperWiseColumnDefs}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    // domLayout='autoHeight'
                  />
                </div>
              </div>
            )}
            {billingReportResults.deliveryPartnerList.length > 1 && billingReportResults.dpWiseRows.length > 0 && !billingReportLoading && billingReportLoaded && (
              <div className="mt-20">
                <div className="flex flex-row justify-between items-end">
                  <h3 className="font-bold text-lg pl-1">Performance Breakdown By Delivery Partner Across Selected Data - {convertDateFormat(deliveryStartDate)}</h3>
                  <div className="text-right">
                    <button className="export-button" onClick={dpWiseExport}><FontAwesomeIcon icon={faDownload} className="mr-2" />Export to CSV</button>
                  </div>
                </div>
                <div className="ag-theme-alpine mt-5" style={{ height: 45 * (billingReportResults.dpWiseRows.length + 1) , width: "100%"}}>
                  <AgGridReact
                    ref={dpWiseGridRef}
                    rowData={billingReportResults.dpWiseRows}
                    columnDefs={dpWiseColumnDefs}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    // domLayout='autoHeight'
                  />
                </div>
              </div>
            )}
        </div>
        </div >
      </div >
    </Layout >
  );
};

export default BillingReport;
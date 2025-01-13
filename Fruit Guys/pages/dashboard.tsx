import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


import Layout from "../components/layout";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setQueryText,
  clearAllFilters,
  clearFilter,
  setCurrentPage,
  setFilter
} from "../redux/slices/dashboard";
import {
  pingTest,
  getUniqueValues
} from "../redux/thunks/dashboard";
import {
  applyFilters,
  getPackageData
} from "../redux/thunks/packages";
import{
  setAuthToken,
  setRefreshToken,
  setIsCarrierAdmin
} from "../redux/slices/auth"
import {
  refresh,
  verifyToken
} from "../redux/thunks/auth"
import { useRouter } from "next/router";
import { PackageKeys } from "../constants/interfaces";
import { initialFilterValues } from "../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faCircleNotch, faDownload, faFilter, faMinus, faPlus, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { loginPath } from "../constants/routes";
import { ToastContainer } from "react-toastify";
import CustomDropdown from "./CustomDropdown";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    filterValues,
    filterOptions,
    uniqueValuesLoading,
    uniqueValuesLoaded,
    shipperList,
    deliveryPartnerList,
  } = useAppSelector((state) => state.dashboard);
  const {
    packagesData: allData,
    packageCount,
    deliveredCount,
    packagesLoading,
    dashboardDateRange,
  } = useAppSelector((state) => state.packages);
  const { authToken, refreshToken } = useAppSelector((state) => state.auth);
  const [rowData, setRowData] = useState<any[]>(allData);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  // type PackageKeys = keyof typeof Package;
  const gridRef = useRef<AgGridReact>();

  const highlightCellRenderer = ({ value, data }) => {
    if (!value || !searchQuery) return value; // No query, render normally
  
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = value.split(regex);
  
    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <strong key={index} style={{ font: 'semi-bold' }}>
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const columnDefs : {field: PackageKeys, headerName?: string, width?: number, nonEssentialField?: boolean}[] = [
    {field: "delivery_date", headerName: "Delivery Date", width: 140},
    {field: "route_name", headerName: "Route Name", width: 150},
    {field: "city", nonEssentialField: true},
    {field: "state", width: 150, nonEssentialField: true},
    {field: "zip_code", headerName: "Zip Code", width: 100, nonEssentialField: true},
    {field: "delivery_status", headerName: "Delivery Status", width: 150},
    {field: "distribution_location", headerName: "Distribution Location"},
    {field: "shipper", headerName: "Shipper", width: 120},
    {field: "delivery_partner", headerName: "Delivery Partner", width: 150},
  ];

  useEffect(() => {
    dispatch(setCurrentPage('dashboard'));
    dispatch(clearAllFilters());
    verifyAuth();
  }, []);

  useEffect(() => {
    if (!uniqueValuesLoaded && !uniqueValuesLoading && loggedIn) {
      dispatch(getUniqueValues(authToken)).then(() => dispatch(getPackageData({filterValues:initialFilterValues, token: authToken})));
    }
  }, [shipperList, deliveryPartnerList, loggedIn]);

  // TODO: pull out this function to a separate file once we have its final form
  const verifyAuth = () => {
    const onFulfilled = (res) => {
      // TODO: from user info and roles in response, do stuff
      setLoggedIn(true);
      if (res.roles.length > 0) {
        const roleIdx = res.roles.findIndex((role) => role.role && role.role === "CarrierAdmin"); 
        if (roleIdx !== -1) {
          dispatch(setIsCarrierAdmin(true));
        }
      }
    };

    // if token verification fails, we need to refresh the token or redirect to login if refresh fails
    const onRejected = (err) => {
      console.error("[verifyAuth] verifyToken rejected with error: ", err);
      dispatch(refresh(refreshToken)).unwrap().then(
        (res) => {
          // if refresh is successful, set the new authToken and refreshToken
          dispatch(setAuthToken(res.accessToken));

          // TODO: once /auth endpoints are updated to set cookies, remove this line
            // the /auth/refresh endpoint will automatically set the refreshToken cookie,
            // so we don't need to store or pass it.
          dispatch(setRefreshToken(res.refreshToken));
          setLoggedIn(true);
        },
        (err) => {
          console.error("[verifyAuth] refresh rejected with error: ", err);
          // if refresh fails, redirect to login
          router.push(loginPath)
        });
    };
    dispatch(verifyToken(authToken)).unwrap().then(onFulfilled, onRejected);
  }

  const updateText = (newtext) => {
    dispatch(setQueryText(newtext));
  };

  const onPing = () => {
    dispatch(pingTest());
  }


  const updateDeliveryStatus = (action : string, option : string) => {
    const currentValues = [...filterValues.delivery_status.selected];
    if (action === "add") {
      const newValues = [...currentValues, option];
      dispatch(setFilter({column: "delivery_status", options: newValues}));
    }
    if (action === "remove") {
      const newValues = currentValues.filter((val) => val !== option);
      dispatch(setFilter({column: "delivery_status", options: newValues}));
    }
  };

  const updateFilter = (column: string, options: string[]) => {
    dispatch(setFilter({column: column, options: [...options]}));
  };

  // const updateZipFilter = (column : string, action : string, option : string, currentValues : string[]) => {
  //   if (action === "add") {
  //     const newValues = [...currentValues, option];
  //     dispatch(setFilter({column: column, options: newValues}));
  //   }
  //   if (action === "remove") {
  //     dispatch(setFilter({column: column, options: newValues}));
  //   }
  // };

  const updateDateFilter = (updating: string, newDate: string) => {
    const currentStart = filterValues.delivery_date.start;
    const currentEnd = filterValues.delivery_date.end;
    if (updating === "start") {
      dispatch(setFilter({column: "delivery_date", start: newDate, end: currentEnd}));
    }
    if (updating === "end") {
      dispatch(setFilter({column: "delivery_date", start: currentStart, end: newDate}));
    }
  }

  const clearAll = () => {
    dispatch(clearAllFilters());
    dispatch(getPackageData({filterValues:initialFilterValues, token: authToken}));
  }

  const testDateFilter = () => {
    const newDate = "2023-09-07";
    updateDateFilter('start', newDate);
    dispatch(applyFilters({filters:filterValues, packageData:rowData}));

    const ninthDashWay = new Date("2023-09-09");
    const ninthOtherWay = new Date(2023, 8, 9);
    // console.log("ninthDashWay: ", ninthDashWay);
    // console.log("ninthOtherWay: ", ninthOtherWay);

    const startDate = new Date(filterValues.delivery_date.start);
    const endDate = new Date(filterValues.delivery_date.end);
    const ninth = "9/9/2023"
    const parts = ninth.split('/');
    // console.log("creating date with year: ", parseInt(parts[2], 10), " month: ", parseInt(parts[0], 10) - 1, " day: ", parseInt(parts[1], 10));
    const pkgDate = new Date(parseInt(parts[2], 10), parseInt(parts[0], 10) - 1, parseInt(parts[1], 10));
    // console.log("pkgDate is: ", pkgDate);
    // console.log("endDate is: ", endDate);
    // console.log("startDate is: ", startDate);
    // console.log("pkgDate.getTime() is: ", pkgDate.getTime());
    // console.log("endDate.getTime() is: ", endDate.getTime());
    // console.log("pkgDate.getTime() <= endDate.getTime() is: ", pkgDate.getTime() <= endDate.getTime());
    const within = pkgDate.getTime() >= startDate.getTime() && pkgDate.getTime() <= endDate.getTime();
    // console.log("within is: ", within);
  }

  const onBtnExport = useCallback(() => {
    if (gridRef?.current) {
      gridRef.current.api.exportDataAsCsv({fileName: `packages_${formatDateToYYYYMMDD(dashboardDateRange.startDate)}${(formatDateToYYYYMMDD(dashboardDateRange.endDate) === formatDateToYYYYMMDD(dashboardDateRange.startDate)) ? '' : `_to_${formatDateToYYYYMMDD(dashboardDateRange.endDate)}`}.csv`});
    }
  }, [dashboardDateRange.startDate, dashboardDateRange.endDate]);

  function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (searchQuery) {
      const thisSearchQuery = searchQuery.trim().toLowerCase();
      const searchedData: any[] = allData.filter((row: any) => {
        let containsValue = false;
        Object.keys(row).forEach((keyValue: string) => {
          const thisValue = row[keyValue];
          if (typeof thisValue === 'string' && thisValue.trim().toLowerCase().includes(thisSearchQuery)) {
            containsValue = true;
          }
        });
        return containsValue;
      });
      setRowData(searchedData);
    } else {
      setRowData(allData);
    }
  }, [searchQuery, allData]);


  const FilterComponent = ({
  }) => {
    const toggleCollapse = () => {
      setIsCollapsed((prev) => !prev);
    };
  
    return (
      <div className="signup-container">
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <>
              <div className="text-lg">
                Package Filters
                <div className="text-sm font-normal">Set filters on your package data, then hit Apply</div>
              </div>
            </>
            {/* Apply and Clear All Buttons */}
            <div className="flex justify-end gap-2 mb-4">
              <button
                className="clear-all-button"
                onClick={() => clearAll()}
                disabled={uniqueValuesLoading}
              >
                Clear All
              </button>
              <button
                className={`apply-button text-white ${
                  uniqueValuesLoading || packagesLoading
                    ? "apply-button-disabled"
                    : "apply-button-enabled"
                }`}
                onClick={() => {
                  dispatch(getPackageData({ filterValues, token: authToken })).then((res) => {
                    // setIsCollapsed(true);
                  });
                }}
                disabled={uniqueValuesLoading || packagesLoading}
              >
                Apply{" "}
                {packagesLoading && (
                  <FontAwesomeIcon
                    icon={faCircleNotch}
                    size="sm"
                    className="fa-spin"
                    color="white"
                  />
                )}
              </button>
              <button onClick={toggleCollapse} className="text-sm pr-3">
                {isCollapsed ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronUp} />
                )}
              </button>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
            <div>
              <h2 className="mt-6">Delivery Start Date</h2>
              <div className="mt-2">
                <input
                  type="date"
                  id="deliveryStartDate"
                  value={filterValues.delivery_date.start}
                  onChange={(e) => updateDateFilter("start", e.target.value)}
                  placeholder="Delivery Start Date"
                  className="long-input"
                />
              </div>
            </div>
            <div>
              <h5 className="mt-6">Delivery End Date</h5>
              <div className="mt-2">
                <input
                  type="date"
                  id="deliveryEndDate"
                  value={filterValues.delivery_date.end}
                  onChange={(e) => updateDateFilter("end", e.target.value)}
                  placeholder="Delivery End Date"
                  className="long-input"
                />
              </div>
            </div>
          </div>
        </div>
  
        {!isCollapsed && (
          <div>
            {/* Filters (horizontal scrolling) */}
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 mt-6">
              {/* Other Filters */}
              {["delivery_status", "delivery_partner", "route_name", "distribution_location", "shipper"].map(
                (filterKey) => (
                  <FilterCard
                    key={filterKey}
                    title={filterKey.replace("_", " ")}
                    isLoading={uniqueValuesLoading}
                    isLoaded={uniqueValuesLoaded}
                    options={filterOptions[filterKey]?.options}
                    filterValues={filterValues[filterKey]}
                    onFilterChange={(options: string[]) =>
                      updateFilter(filterKey, options)
                    }
                    onClear={() => dispatch(clearFilter(filterKey))}
                  />
                )
              )}
            </div>
          </div>
        )}
  
        <div
          className="text-sm mt-4"
          onClick={toggleCollapse}
        >
          {isCollapsed
            ? <span className="text-sm cursor-pointer">
                <FontAwesomeIcon icon={faSlidersH} className="text-sm"/>
                {' '}Show Filter Options
              </span>
            : <span className="text-sm cursor-pointer">
                <FontAwesomeIcon icon={faMinus} className="text-sm"/>
                {' '}Hide Filter Options
              </span>
          }
        </div>
      </div>
    );
  };
  
  const FilterCard = ({
    title,
    isLoading,
    isLoaded,
    options,
    filterValues,
    onFilterChange,
    onClear
  }) => {
    return (
      <div className="mt-2 h-full">
        <CustomDropdown
          options={options.map((option, idx) => ({id: idx, value: option, label: option}))}
          selectedOptions={filterValues.status !== "clear" ? filterValues.selected : []}
          setSelectedOptions={(options) => onFilterChange(options)}
          label={<div>Click to Select <span className="font-bold" style={{ textTransform: 'capitalize'}}>{title}</span></div>}
          doneButton={true}
        />
      </div>
    );
  };

  return (
    <Layout >
      {loggedIn && 
      <div className="text-lg space-y-4 py-4">
        <div className="pl-5">
          <div className="page-title">
            <h1>Packages Dashboard </h1>
            {/* <button onClick={() => onPing()}>Click to PING</button>
            <div>ping is: {pingValue}</div> */}
            {/* <button onClick={() => dispatch(getUniqueValues())}>Click to getUniqueValues</button>
            <button onClick={() => dispatch(getPackageData(filterValues))}>Click to getPackageData</button> */}
          </div>
          <div className="justify-center pl-5 pr-4 pb-6">
            <FilterComponent/>
          </div>
          {/* <button onClick={() => testDateFilter()}>Date filter test</button> */}
          <div className="pl-5 pb-3 text-lg flex justify-between" >
            <div className="flex gap-x-3">
              <div>Total Packages: {packagesLoading ? "-" : packageCount}</div>
              <div>Total Delivered: {packagesLoading ? "-" : deliveredCount}</div>
            </div>
            <div onClick={onBtnExport} className="mr-4 export-button bg-[#939598] text-white cursor-pointer"><FontAwesomeIcon icon={faDownload} className="mr-2" />Export</div>
            
          </div>
          {/* <FontAwesomeIcon icon={icon({name: 'user-secret'})} /> */}
          {!packagesLoading && (
            <div className="pl-5">
            <input
              type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search package data..." className="w-2/3 p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
            />
            <div
              className="ag-theme-alpine"
              style={{
                height: 'calc(100vh - 100px)', // Adjust height dynamically
                width: 'auto', // Use full width for responsiveness
                overflowX: 'auto', // Enable horizontal scrolling
              }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs.map((colDef) => ({
                  ...colDef,
                  resizable: true,
                  sortable: true,
                  hide: window.innerWidth < 768 && colDef.nonEssentialField, // Example of hiding a column
                  cellRenderer: highlightCellRenderer,
                }))}
                pagination={true}
                paginationPageSize={10}
                domLayout="autoHeight" // Automatically adjusts height
                defaultColDef={{
                  cellRendererParams: {
                    suppressHtmlEscaping: true, // Allow rendering HTML in cell values
                  },
                }}
              />
            </div>
            </div>
          )}
          {packagesLoading && (<div
            className="my-10 w-full flex flex-row justify-center">
              <FontAwesomeIcon icon={faCircleNotch} size="3x" className="fa-spin" color="grey"/>
            </div>
          )}
        </div>
      </div>}
    </Layout>
  );
};

// export const getServerSideProps = async ({ req, res}) => {
//   const loggedIn = useAppSelector(selectLoggedIn);

//   if (!loggedIn) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
export default Dashboard;
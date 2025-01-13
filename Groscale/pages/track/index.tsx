import React, { useState, useEffect,useRef } from 'react';
import { useRouter } from 'next/router';
import logo from '../../assets/GroScaleLogoHorizontal.png';
import Image from 'next/image';
import { getPeachToken } from '../../redux/thunks/tracking';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import loaderImage from 'assets/loader.gif';
import Link from "next/link";
import api from '../../services/api';
import TrackingInformation from "../../components/trackingInformation";
import {
  setTrackingData
} from '../../redux/slices/tracking';

const defaultShipperName = 'cardinal';

const TrackIndex = (shipperName?: string) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();

  const [notFoundtrackingData, setnotFoundtrackingData] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [apiIsRunning, setApiIsRunning] = useState<string>('');
  const [trackingNumberValidate, setTrackingNumberValidate] = useState<string>('');
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [duplicates, setDuplicates] = useState([]);

  const authToken = useAppSelector((state)=>state.auth.authToken);

  const { code } = router.query;

  useEffect(() => {
    if (
      typeof code === "string" && 
      code.trim() !== "" &&
      trackingData.length === 0
    ) {
    setTrackingNumber(code);
    }
  }, [code]);

  const {
    trackingData
  } = useAppSelector((state) => state.tracking);

   // Fetch accessToken on mount
   useEffect(() => {
    if (!accessToken) {
      dispatch(getPeachToken()).then((res) => {
        setAccessToken(res.payload);
      });
    }
  }, [dispatch, accessToken]);

  const handleSubmit = async () => {
  
    // e.preventDefault();
    setTrackingNumberValidate("");
    dispatch(setTrackingData([]));
    setnotFoundtrackingData([]);

    // Validate if the input is empty
    if (trackingNumber === "") {
        setTrackingNumberValidate("1");
        inputRef.current.focus();
        return;
    }
    
    setApiIsRunning('1');
    // Split the input by commas or spaces
    const trackingNumbers = trackingNumber.split(/[ ,]+/);
    // Find duplicates in the updated array
    const seen = new Set();
    const duplicateNumbers = trackingNumbers.filter((num) => {
      if (seen.has(num)) {
        return true;
      }
      seen.add(num);
      return false;
    });
    if(duplicateNumbers.length > 0){
      setDuplicates(duplicateNumbers);
      inputRef.current.focus();
      setApiIsRunning('');
      return false;
    }
    setDuplicates(duplicateNumbers);

    if( trackingNumbers.length == 1 ){
      router.push(`${shipperName && typeof shipperName === 'string'
        ? `/${shipperName}`
        : ''
      }/track/${trackingNumbers[0]}`);
      return true;
    }
    if(trackingNumbers.length > 30){
        setTrackingNumberValidate("3");
        inputRef.current.focus();
        setApiIsRunning('');
        return false;
    }
    try {
        let thisShipperName = defaultShipperName;
        if (shipperName && typeof shipperName === 'string') {
          thisShipperName = shipperName;
        }
        // Send the API request
        const res = await api.getPackageTrackingData(trackingNumbers, thisShipperName);
        setApiIsRunning('');

        // Check if response data exists and is not empty
        const trackingPackages = res?.data?.packages || [];
        const missingPackages = res?.data?.missing || [];
        setnotFoundtrackingData(missingPackages);

        // Process the data if it exists
        if (trackingPackages.length > 0) {
            const trackingDataList = trackingPackages.map((item) => ({
                tracking_number: item.externalId|| '',
                status: item.status || 'Unavailable',
                delivery_date: item.date || 'Unknown',
                order_id: item.id,
                shipment_id: item.shipmentExternalId.split('-')[1] || '',
                reasonCode: item.reasonCode,
                podData: {...item},
            }));
            // Update the tracking data in state
            dispatch(setTrackingData(trackingDataList));
            // Forcefully update the URL with tracking numbers
            router.push(`${shipperName && typeof shipperName === 'string'
              ? `/${shipperName}`
              : ''
            }/track?code=${trackingNumbers.join(",")}`);
            setTrackingNumber('');
        } else {
            console.log("No tracking data found.");
            setTrackingNumber('');
        }
    } catch (err) {
        console.error("Error fetching tracking data:", err);
        setTrackingNumber('');
        setTrackingNumberValidate("2");
        setApiIsRunning('');
    }
  };

return (
  <div className='tracking-form-cls' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', overflow: 'auto'}}>
     <div className="grid grid-cols-1 lg:grid-cols-1 border mb-12 p-4 rounded-lg bg-white shadow-md mt-100 max-w-3xl w-full">
      <div className="mb-6 p-2">
        <h5 className="text-lg mb-2 track-heading" >Track Your Packages</h5>
        <hr className="mt-4 mb-5"></hr>
      </div>
      <div className="p-2 tracking-search-form flex items-center relative">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          ref={inputRef}
          placeholder="Enter tracking number"
          className="border border-gray-300 rounded-l-md focus:outline-none focus:ring-green-700 px-4 py-3 text-lg w-full"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="track-button text-white px-6 py-3 rounded-r-md focus:outline-none"
        >
          Track
        </button>
      </div>
      <div className='p-2'>
          { apiIsRunning == "1" && (
              <Image src={loaderImage} alt="Loader Image"  width={30} />
          )}
         {trackingNumberValidate === "1" ? (
          <span className="text-red-500">Please enter tracking number.</span>
        ) : trackingNumberValidate === "2" ? (
          <span className='text-red-500'>Tracking number invalid.</span>
        ) : trackingNumberValidate === "3" ? (
          <span className='text-red-500'>Sorry, please enter a maximum of 30 tracking numbers to search.</span>
        ) : null}

        {duplicates.length > 0 ? (
          <span className="text-red-500">Sorry, duplicate tracking numbers are not allowed.</span>
        ) : null}
      </div>
      <div className="mb-3 p-2">
         Track up to 30 numbers at a time.
      </div>
      {notFoundtrackingData.length > 0 && (  
        <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-md w-1/1">
          <span className="text-red-500 font-bold">ALERT:</span> No Data found for{" "}
          {notFoundtrackingData.map((trackingNumber: string, index: number) => {
            if (index < notFoundtrackingData.length - 1) {
              return <><strong>{trackingNumber}</strong>{', '}</>;
            }
            return <strong>{trackingNumber}</strong>;
          })}
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
           {/* Tracking Data Display */}
           <TrackingInformation  data={trackingData} shipperName={shipperName}/> 
      </div>
     { /*<div className="mb-6 p-4 rounded-md ">
           Click here to track by  <Link href={`/order/`} className="mt-4 login-link">Order Number</Link>
      </div> */}
      <div style={{color: '#7AB16A'}}className="mt-6 text-sm ">
            <span>Powered By <Image  src={logo} alt="GroScale Logo" width={90}/></span> <br/>
       </div>
     </div>
  </div>
  );
};
export default TrackIndex;
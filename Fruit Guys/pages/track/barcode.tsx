import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat } from "@zxing/library";
import logo from 'assets/GroScaleLogoHorizontal.png';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from 'next/router';
import api from '../../services/api';
import TrackingInformation from "../../components/trackingInformation";
import { getPeachToken } from '../../redux/thunks/tracking';
import loaderImage from 'assets/loader.gif';
import {
    setTrackingData
  } from '../../redux/slices/tracking';

const defaultShipperName = 'cardinal';

const BarcodeScanner = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  
  const [notFoundtrackingData, setnotFoundtrackingData] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [apiIsRunning, setApiIsRunning] = useState<string>('');
  const [trackingNumberValidate, setTrackingNumberValidate] = useState<string>('');
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [duplicates, setDuplicates] = useState([]);
  const [scannedCode, setScannedCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const { trackingData } = useAppSelector((state) => state.tracking);
  const { code } = router.query;

  useEffect(() => {
    dispatch(setTrackingData([]));
  }, [])

  useEffect(() => {
    if (typeof code === "string" && code.trim() !== "" && trackingData.length === 0) {
      setTrackingNumber(code);
    }
  }, [code]);

  useEffect(() => {
    if (!accessToken) {
        dispatch(getPeachToken()).then((res) => {
        setAccessToken(res.payload);
      });
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (!isScanning) return;

    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, Object.values(BarcodeFormat));
    const codeReader = new BrowserMultiFormatReader(hints);

    const startScanner = async () => {
      try {
        await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
          if (result) {
            const scannedText = result.getText();
            setTrackingNumber((prev) => (prev ? `${prev},${scannedText}` : scannedText));
            setIsScanning(false);
            codeReader.reset();
          } else if (error) {
            console.warn(error.message);
          }
        });
      } catch (err) {
        console.error("Error initializing scanner:", err.message);
      }
    };
    startScanner();

    return () => {
      codeReader.reset();
    };
  }, [isScanning]);

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
      router.push(`/track/${trackingNumbers[0]}`);
      return true;
    }
    if(trackingNumbers.length > 30){
        setTrackingNumberValidate("3");
        inputRef.current.focus();
        setApiIsRunning('');
        return false;
    }
    try {
        // Send the API request
        const res = await api.getPackageTrackingData(trackingNumbers, defaultShipperName);
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
            router.push(`/track?code=${trackingNumbers.join(",")}`);
            setTrackingNumber('');
        } else {
            console.log("No tracking data found.");
            setTrackingNumber('');
        }
        // router.push(`/track?code=${trackingNumbers.join(",")}`);
    } catch (err) {
        console.error("Error fetching tracking data:", err);
        setTrackingNumber('');
        setTrackingNumberValidate("2");
        setApiIsRunning('');
    }
  };

  return (
    <div className='tracking-form-cls' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {isScanning ? (
        <div className='grid grid-cols-1 border p-4 rounded-lg bg-white shadow-md max-w-3xl w-full'>
          <video ref={videoRef} style={{ width: "100%", border: "1px solid #ccc", borderRadius: "4px" }} />
          <p className="mt-4">Position the barcode within the camera view to scan.</p>
          <button
            type="button"
            onClick={() => setIsScanning(false)}
            className="mt-4 px-4 py-2 border border-gray-500 rounded-md"
          >
            Back
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 border p-4 rounded-lg bg-white shadow-md max-w-2xl w-full'>
          <div className="mb-6">
            <h5 className="text-lg mb-2">Track Your Packages</h5>
            <hr className="mb-4" />
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
            <div className="p-2 tracking-search-form flex items-center relative">
            <button
              type="button"
              onClick={() => setIsScanning(true)}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-300 px-4 py-3 text-lg w-full"
            >
              Scan Barcode
            </button>
            </div>
            <div className='mb-6'>
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
          {trackingNumberValidate && <p className="mt-4 text-red-500">{trackingNumberValidate === "1" ? "Please enter a tracking number." : "Invalid tracking number."}</p>}
          <div className="mt-6">
            <TrackingInformation data={trackingData} />
          </div>
          <div className="mt-6 text-sm text-green-700">
            <span>Powered by <Image src={logo} alt="GroScale Logo" width={90} /></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;

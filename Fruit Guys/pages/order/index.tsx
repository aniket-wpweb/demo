import React, { useState, useEffect,useRef } from 'react';
import { useRouter } from 'next/router';
import logo from 'assets/GroScaleLogoHorizontal.png';
import Image from 'next/image';
import { getPeachToken } from '../../redux/thunks/tracking';
import { useAppDispatch } from "../../redux/hooks";
import Link from "next/link";
import loaderImage from 'assets/loader.gif';
import api from '../../services/api';
import TrackingInformation from "../../components/trackingInformation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const TrackIndex = () => {
  const [trackingOrderNumber, setTrackingOrderNumber] = useState('');
  const router = useRouter();
  const [trackingData, setTrackingData] = useState([]);
  const [notFoundtrackingData, setnotFoundtrackingData] = useState([]);
  const [apiIsRunning, setApiIsRunning] = useState('');
  const [packageData, setPackageData] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [trackingNumberValidate, setTrackingNumberValidate] = useState('');
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();

  if(accessToken ==""){
    dispatch(getPeachToken()).then((res) => {
      setAccessToken(res.payload);
    });
  }

  const handleSubmit = async () => {
    setTrackingNumberValidate("");
    setTrackingData([]);
    setnotFoundtrackingData([]);
    setApiIsRunning('1');
    
    // Validate if the input is empty
    if (trackingOrderNumber === "") {
        setTrackingNumberValidate("1");
        setTrackingData([]);
        setApiIsRunning('');
        inputRef.current.focus();
        return false;
    }
    try {
    const res = await api.getOrderTrackingData(trackingOrderNumber, accessToken);
    if(res !=undefined && res.data.length > 0 )
    {
      const packageData =res.data;
      const packageDataList = packageData.map((item) => ({
        tracking_number: item.externalId|| '',
        status: item.status || '-',
        delivery_date: item.date || 'Unknown',
        order_id: item.shipmentExternalId.split('-')[1] || '',
        reasonCode: item.reasonCode,
        podData: {...item},
    }));
    setTrackingData(packageDataList);
    }else{
      setApiIsRunning('');
      setTrackingNumberValidate("2");
      inputRef.current.focus();
      return false;
    }
  }
  catch (error) {
    setApiIsRunning('');
    setTrackingNumberValidate("2");
    inputRef.current.focus();
    return false;
  }
  setApiIsRunning('');
};
return (
    <div className="order-listing-search-form">
      <div className='tracking-form-cls' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <div className="grid grid-cols-1 lg:grid-cols-1 border mb-12 p-4 rounded-lg bg-white shadow-md mt-100 max-w-2xl w-full">
          <div className="mb-6 p-2">
            <h5 className="text-lg mb-2 track-heading">Track Your Order</h5>
            <hr className="mt-4 mb-5"></hr>
          </div>
          <div className="mb-6 p-2 tracking-search-form relative">
              <input
                  type="text" value={trackingOrderNumber} onChange={(e) => setTrackingOrderNumber(e.target.value)} ref={inputRef} 
                  placeholder="Enter Order number" className="w-2/3 p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                />
                <button 
                  type="submit" style={{padding: '10px 20px',fontSize: '16px',cursor: 'pointer',backgroundColor: '#7AB16A',color: 'white',border: 'none',borderRadius: '4px',boxSizing: 'border-box',}}
                  className=""
                  onClick={() => handleSubmit()}
                >
                  Order
                </button>
              <br/>
              { apiIsRunning == "1" && (
                  <Image src={loaderImage} alt="Loader Image"  width={30} />
              )}
              <br/>
            
              {trackingNumberValidate === "1" ? (
                  <span className='text-red-500'>Please enter order number.</span>
              ) : trackingNumberValidate === "2" ? (
                <span className='text-red-500'>Sorry, there was an error in the API call.</span>
              ): null}
          
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* Tracking Data Display */}
              <TrackingInformation  data={trackingData} type={'order'} /> 
          </div>
          <div className="p-4 rounded-md">
                  Click here to track by  <Link href={`/track/`} className="mt-4 login-link">Track Number</Link>
          </div>  
          <div style={{color: '#7AB16A'}}className="mt-6 text-sm ">
                <span>Powered By <Image  src={logo} alt="GroScale Logo" width={90}/></span> <br/>
          </div>
        </div>
      </div>
   </div>
 );
};

export default TrackIndex;
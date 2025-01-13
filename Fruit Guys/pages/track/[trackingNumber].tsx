"use client";

import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from 'next/image';
import logo from 'assets/GroScaleLogoHorizontal.png';
import dropOffLogo from 'assets/dropoff_logo.png';
import loaderImage from 'assets/loader.gif';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import {
  setTrackingLoaded,
  setTrackingLoading,
  clearTrackingFields,
} from '../../redux/slices/tracking';
import {
  getTrackingDataLanding
} from '../../redux/thunks/tracking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faDownload } from '@fortawesome/free-solid-svg-icons';
import { get } from 'http';
import Link from 'next/link';
import { PodPDF } from '../../components/podpdf';
import { useReactToPrint } from 'react-to-print';

export default function TrackingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    trackingLoading,
    trackingLoaded,
    trackingErrored,
    deliveryDate,
    status,
    eta,
    completionTime,
    signatureUrl,
    podPhotoUrl,
    deliveryAddress,
    externalTrackingNumber,
    shipmentExternalId,
    weight,
    weightUnit,
    shipDate,
    poNumber,
    referenceNumber,
  } = useAppSelector((state) => state.tracking);

  const [headerText, setHeaderText] = useState("We couldn't track your package");
  const [orderStatus, setOrderStatus] = useState("unknown");
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [arrivalString, setArrivalString] = useState("");
  const [showDeliveryDate, setShowDeliveryDate] = useState(true);
  const [showMap, setshowMap] = useState(false);

  const podPDFRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => podPDFRef.current,
  });

  const position = {lat: 53.54, lng: 10};
  useEffect(() => {
    resetMap()
  }, []);

  const resetMap = async () => {
    setMapCenter({lat: 0, lng: 0});
  }

  useEffect(() => {
    document.body.style.overflow = "scroll"
    if (!router.isReady) return;
    dispatch(clearTrackingFields());
    dispatch(setTrackingLoaded(false));
    dispatch(setTrackingLoading(true));
    if (typeof(router.query.trackingNumber) === 'string') {
      dispatch(getTrackingDataLanding({ trackingNumber: router.query.trackingNumber}));
    }
  }, [router.isReady]);

  useEffect(() => {
    
    setOrderStatus('unknown')
    setshowMap(false)
    if (trackingLoaded) {
      
      getOrderStatus();
      geocodeAddress(`${deliveryAddress.address1} ${deliveryAddress.address2} ${deliveryAddress.city}`);
      
    }
    
  }, [trackingLoaded, deliveryAddress]);

  const geocodeAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    const response = await geocoder.geocode({ address });

    if (response.results.length > 0) {
      const { lat, lng } = response.results[0].geometry.location;
      console.log("This lat long : ",{ lat: lat(), lng: lng() });
      
      
      setMapCenter({ lat: lat(), lng: lng() });

      setTimeout(() => {
        
        setshowMap(true)
      }, 5000);
      console.log("lat: ", lat());
      console.log("lng: ", lng());
    }
  };

  const getOrderStatus = () => {
    if (["canceled", "failed_cancel", "failed_print"].includes(status)) {
      setHeaderText("Your Package is: Canceled")
      setOrderStatus("Canceled");
      return "Canceled";
    }
    if (status === 'delivered') {
      setHeaderText("Your Package is: Delivered")
      setOrderStatus("Delivered");
      return "Delivered";
    }
    // failed delivery
    if (status === 'failed_deliver') {
      setHeaderText("Delivery Unsuccessful")
      setOrderStatus("Delivery Unsuccessful");
      return "Delivery Unsuccessful";
    }
    // Out for Delivery: scheduled on a route and Out for Delivery
    if (status === 'in_transit') {
      setHeaderText("Your Package is: Out for Delivery")
      setOrderStatus("Out for Delivery");
      return "Out for Delivery";
    }
    // on its way: scheduled onto a route, not yet in transit
    if (["pending", "printed", "processed", "in_possession", "sorted", "pre_transit"].includes(status) && externalTrackingNumber) {
      setHeaderText("Your Package is: Scheduled")
      setOrderStatus("Scheduled");
      return "Scheduled";
    }
    if (status === 'missing') {
      setHeaderText("Your Package is: Confirmed")
      setOrderStatus("Confirmed");
      setShowDeliveryDate(false);
      return "Confirmed";
    }
    // confirmed: created but not yet routed
    if (["pending", "printed", "processed", "in_possession", "sorted", "pre_transit", "failed_process"].includes(status)) {
      setHeaderText("Your Package is: Confirmed")
      setOrderStatus("Confirmed");
      return "Confirmed";
    }
    setHeaderText("We couldn't track your package")
    setOrderStatus("unknown");
    return "unknown"

  }

  const unixToDateString = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12; // The hour '0' should be '12'

    // Pad minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   console.log("[formatDate] dateString: ", dateString);
  //   console.log("[formatDate] date: ", date);
  
  //   // Check if the input string includes a time component
  //   const hasTime = dateString.includes('T');
  
  //   // Format options for the date part
  //   const dateOptions: Intl.DateTimeFormatOptions = {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   };
  
  //   // Format options for the time part, used only if there is a time in the input
  //   const timeOptions: Intl.DateTimeFormatOptions = {
  //     hour: 'numeric',
  //     minute: '2-digit',
  //     hour12: true,
  //   };
  
  //   // Format the date part
  //   const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
  //   console.log("[formatDate] formattedDate: ", formattedDate);
  
  //   // Format the time part if a time component exists
  //   const formattedTime = hasTime ? ` at ${new Intl.DateTimeFormat('en-US', timeOptions).format(date)}` : '';
  
  //   // Combine formatted date and time
  //   console.log("[formatDate] formattedDate + formattedTime: ", `${formattedDate}${formattedTime}`);
  //   return `${formattedDate}${formattedTime}`;
  // }

  const formatDate = (dateString: string) => {
    // Check if the input string includes a time component
    const hasTime = dateString.includes('T');
  
    // Parse the date as UTC if there is no time component, otherwise as-is
    const date = hasTime ? new Date(dateString) : new Date(`${dateString}T12:00:00Z`);
    
    console.log("[formatDate] dateString: ", dateString);
    console.log("[formatDate] date: ", date);

    // Format options for the date part
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    // Format options for the time part, used only if there is a time in the input
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    // Format the date part
    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
    console.log("[formatDate] formattedDate: ", formattedDate);

    // Format the time part if a time component exists
    const formattedTime = hasTime ? ` at ${new Intl.DateTimeFormat('en-US', timeOptions).format(date)}` : '';
    console.log("[formatDate] formattedTime: ", formattedTime);

    // Combine formatted date and time
    return `${formattedDate}${formattedTime}`;
};

  const getArrivalString = (deliveryDate: string, completionTime: string | null, orderStatus: string, eta: { fromUnix?: number, toUnix?: number }[]) => {
    console.log("in getArrivalString");
    if (!orderStatus) {
      return "";
    }
    const prefix = orderStatus === "Delivered" ? "Arrived: " : "Arriving:";

    if (orderStatus === "Delivered" && completionTime) {
      setArrivalString(`${prefix} ${formatDate(completionTime)}`);
      return `${prefix} ${formatDate(completionTime)}`;
    }
    if (orderStatus === "Delivered" && deliveryDate) {
      setArrivalString(`${prefix} ${formatDate(deliveryDate)}`);
      return `${prefix} ${formatDate(deliveryDate)}`;
    }
    if (["Scheduled", "Out for Delivery"].includes(orderStatus) && eta && eta.length > 0 && deliveryDate) {
      setArrivalString(`${prefix} ${formatDate(deliveryDate)} ${
        (eta[0].toUnix && eta[0].fromUnix && unixToDateString(eta[0].toUnix) !== unixToDateString(eta[0].fromUnix))
          ? `between ${unixToDateString(eta[0].fromUnix)} and ${unixToDateString(eta[0].fromUnix)}`
          :  (eta[0].toUnix && eta[0].fromUnix) ? `at ${unixToDateString(eta[0].fromUnix)}`
          :  (eta[0].fromUnix) ? `after ${unixToDateString(eta[0].fromUnix)}`
          :  (eta[0].toUnix) ? `before ${unixToDateString(eta[0].toUnix)}` : ''
      }`);
      return `${prefix} ${formatDate(deliveryDate)} ${
        (eta[0].toUnix && eta[0].fromUnix && unixToDateString(eta[0].toUnix) !== unixToDateString(eta[0].fromUnix))
          ? `between ${unixToDateString(eta[0].fromUnix)} and ${unixToDateString(eta[0].fromUnix)}`
          :  (eta[0].toUnix && eta[0].fromUnix) ? `at ${unixToDateString(eta[0].fromUnix)}`
          :  (eta[0].fromUnix) ? `after ${unixToDateString(eta[0].fromUnix)}`
          :  (eta[0].toUnix) ? `before ${unixToDateString(eta[0].toUnix)}` : ''
      }`;
    }

    if (["Scheduled", "Out for Delivery"].includes(orderStatus) && deliveryDate) {
      setArrivalString(`${prefix} ${formatDate(deliveryDate)}`);
      return `${prefix} ${formatDate(deliveryDate)}`;
    }
    return "";
  }

  const arrivalStr = useMemo(() => {
    console.log("in getArrivalString");
    if (!orderStatus) {
      return "";
    }
    const prefix = orderStatus === "Delivered" ? "Arrived: " : "Arriving:";

    if (orderStatus === "Delivered" && completionTime) {
      // setArrivalString(`${prefix} ${formatDate(completionTime)}`);
      return `${prefix} ${formatDate(completionTime)}`;
    }
    if (orderStatus === "Delivered" && deliveryDate) {
      // setArrivalString(`${prefix} ${formatDate(deliveryDate)}`);
      return `${prefix} ${formatDate(deliveryDate)}`;
    }
    if (["Scheduled", "Out for Delivery"].includes(orderStatus) && eta && eta.length > 0 && deliveryDate) {
      return `${prefix} ${formatDate(deliveryDate)} ${
        (eta[0].toUnix && eta[0].fromUnix && unixToDateString(eta[0].toUnix) !== unixToDateString(eta[0].fromUnix))
          ? `between ${unixToDateString(eta[0].fromUnix)} and ${unixToDateString(eta[0].toUnix)}`
          :  (eta[0].toUnix && eta[0].fromUnix) ? `at ${unixToDateString(eta[0].fromUnix)}`
          :  (eta[0].fromUnix) ? `after ${unixToDateString(eta[0].fromUnix)}`
          :  (eta[0].toUnix) ? `before ${unixToDateString(eta[0].toUnix)}` : ''
      }`;
    }

    if (["Scheduled", "Out for Delivery"].includes(orderStatus) && deliveryDate) {
      // setArrivalString(`${prefix} ${formatDate(deliveryDate)}`);
      return `${prefix} ${formatDate(deliveryDate)}`;
    }
    return "";
  }, [deliveryDate, completionTime, orderStatus, eta])

  function formatDeliveryDateStr(input: string): string {
    // console.log("formatDeliveryDateStr : ",input);
    if(input != null) {

      // Split the input string by '-'
      const [year, month, day] = input.split('-');
      
      // Return the formatted string as 'MM-DD-YYYY'
      return `${month}-${day}-${year}`;
    } else {
      return ``
    }
  }

  const SummaryBlock = () => (
    <div className="flex flex-col items-start">
      {orderStatus && <div><span className="font-bold">Status:</span> {orderStatus}</div>}
      {deliveryDate && showDeliveryDate && <div><span className="font-bold">Delivery Date:</span> {formatDeliveryDateStr(deliveryDate)}</div>}
      {router.query.trackingNumber && <div><span className="font-bold">Tracking ID:</span> {router.query.trackingNumber}</div>}
    </div>
  );

  const MapBlock = () => (
    <div className="flex gap-4 mb-8 justify-center pt-3" >
        {mapCenter &&
      <div style={{ height: '300px', width: '300px'}}>
        <Map
          zoom={14}
          center={mapCenter}
          mapId={"eb83d1c06dde9638"}
          disableDefaultUI={true}
          gestureHandling='none'
          zoomControl={false}
        >
          <AdvancedMarker position={mapCenter}></AdvancedMarker>
        </Map>
      </div>}
    </div>
  )

  const AddressBlock = () => (
    <div className="flex flex-col items-start hidden">
      <h2 className="font-bold text-lg">Shipping Address</h2>
      {deliveryAddress.company && <div><span className="font-bold">Company:</span> {deliveryAddress.company}</div>}
      {deliveryAddress.contact && <div><span className="font-bold">Name:</span> {deliveryAddress.contact}</div>}
      {(deliveryAddress.address1 || deliveryAddress.address2 || deliveryAddress.city) && <div><span className="font-bold">Address:</span> {deliveryAddress.address1} {deliveryAddress.address2} {deliveryAddress.city}</div>}
    </div>
  );

  const ConfirmationBlock = () => (
    <div className="pt-3">
      <h2 className="font-bold text-xl pb-2">Confirmation:</h2>
      <div className="flex gap-4 mb-8 justify-center">
        {signatureUrl && 
          <img 
            src={signatureUrl}
            alt="POD Signature"
            width={150}
          />
        }
        {podPhotoUrl && 
          <img 
            src={podPhotoUrl}
            alt="POD Photo"
            width={150}
          />
        }
      </div>
    </div>
  );

  const OrderStatusBar = ({ orderStatus }) => {
    // Define the possible statuses in order
    const statuses = ["Confirmed", "Scheduled", "Out for Delivery", "Delivered"];
  
    // Determine the current status index
    const currentIndex = statuses.indexOf(orderStatus);

    return (
      <div className="status-container flex justify-center items-center w-full">
        <div className="flex items-center relative w-full">
          {statuses.map((status, index) => (
            <React.Fragment key={status}>
              <div
                className={`flex flex-col items-center relative  ${
                  index <= currentIndex ? 'status-active' : 'status-inactive'
                }`}
              >
                <div
                  className={`status-circle ${
                    index <= currentIndex ? 'circle-filled' : 'circle-outline'
                  }`}
                ></div>
                <span className="status-label text-center">{status}</span>
              </div>
              {/* Render the line only if it's not the last status */}
              {index < statuses.length - 1 && (
                <div
                  className={`status-bar ${
                    index < currentIndex ? 'bar-filled' : 'bar-outline'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  //TODO: MAJORRRR TODO!! PUT API KEY AND MAP ID IN SECRETS
  return (
    <APIProvider apiKey={"AIzaSyDNrYpec2Wz_PZwO5xzI22ojMUkEjuefWs"}>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
      <div className="">
        <div
          className="flex items-center justify-center"
          style={{ height: 'auto' }}
        >
          <div className="tracking-container text-center mt-8">
            <h1 className="mb-10 mt-5 text-3xl font-bold">Track Your Package</h1>
            {trackingLoading && (
              <div className="my-10 w-full flex justify-center">
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  size="3x"
                  className="fa-spin"
                  color="grey"
                />
              </div>
            )}
            {(trackingLoaded || trackingErrored) && (
              <div className="tracking-results-box">
                <span className="font-bold flex flex-cols text-left"><strong>{headerText}</strong></span>
                <span className="font-bold flex flex-cols text-left"><strong>{arrivalStr}</strong></span>
                {['Confirmed', 'Scheduled', 'Out for Delivery', 'Delivered'].includes(
                  orderStatus
                ) && <OrderStatusBar orderStatus={orderStatus} />}
                <SummaryBlock />
                {mapCenter.lat !== 0 &&
                  mapCenter.lng !== 0 &&
                  orderStatus !== 'Delivered' && <MapBlock />}
                {orderStatus === 'Delivered' &&
                  (podPhotoUrl || signatureUrl) && <ConfirmationBlock />}
                {orderStatus === 'Delivered' && (
                  <div
                    onClick={handlePrint}
                    className="font-bold cursor-pointer mt-2"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    {' '}Proof of Delivery PDF
                  </div>
                )}
              </div>
            )}
            {(trackingLoaded || trackingErrored) && (
              <div style={{"float": "left", "color": "#e51f36"}}>
                <Link href="/track">
                <div
                  style={{"float": "left", "color": "#e51f36"}}
                  className={"mt-2 underline cursor-pointer"}
                >
                  Track another package
                </div>
                </Link>
                <br/>
              </div>
            )}
            <div style={{"float": "right"}} className={"mt-2"}>
              Powered By
              <Image 
                src={logo}
                alt="GroScale Logo"
                width={90}
              />
            </div>
          </div>
        </div>
        {trackingLoaded && (
          <div className="mt-4 p-4 border rounded-md bg-slate-200 overflow-y-auto overflow-x-auto hidden">
            <PodPDF
              ref={podPDFRef}
              status={orderStatus}
              deliveredTo={`${deliveryAddress.city}, ${deliveryAddress.state}`}
              signedFor={signatureUrl && signatureUrl !== '' ? 'Yes' : 'No'}
              deliveryLocation={`${deliveryAddress.city}, ${deliveryAddress.state}`}
              serviceType="DropOff Delivery"
              deliveryDate={formatDeliveryDateStr(deliveryDate)}
              specialHandling="N/A"
              trackingNumber={router.query.trackingNumber as string}
              shipDate={formatDeliveryDateStr(shipDate)}
              recipient={`${deliveryAddress.city}, ${deliveryAddress.state}`}
              weight={`${weight} ${weightUnit}`}
              orderNumber={
                shipmentExternalId ? shipmentExternalId.split('-')[1] : ''
              }
              referenceNumber={referenceNumber}
              purchaseOrder={poNumber}
              shipper="Jacksonville, FL"
              logo={dropOffLogo}
            />
          </div>
        )}
      </div>
    </APIProvider>
  )
}
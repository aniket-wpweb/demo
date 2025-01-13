"use client";

import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from 'next/image';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import logo from 'assets/GroScaleLogoHorizontal.png';


import { 
  getPeachToken,
  getTrackingDataLanding,
} from '../../redux/thunks/tracking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';


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
    externalTrackingNumber,
    deliveryAddress,
  } = useAppSelector((state) => state.tracking);
  
  const [headerText, setHeaderText] = useState("We couldn't track your package");
  const [orderStatus, setOrderStatus] = useState("unknown");
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [arrivalString, setArrivalString] = useState("");

  const position = {lat: 53.54, lng: 10};

  useEffect(() => {
    if (!router.isReady) return;

    if (typeof(router.query.orderNumber) === 'string') {
      dispatch(getTrackingDataLanding({ trackingNumber: router.query.orderNumber}));
    }
    
    dispatch(getPeachToken()).then((res) => {
      if (typeof(router.query.orderNumber) === 'string' && res.payload) {
        dispatch(getTrackingDataLanding({ trackingNumber: router.query.orderNumber}));
      }
    });
  }, [router.isReady]);

  useEffect(() => {
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
      setMapCenter({ lat: lat(), lng: lng() });
      console.log("lat: ", lat());
      console.log("lng: ", lng());
    }
  };

  const getOrderStatus = () => {
    if (["canceled", "failed_cancel", "failed_print"].includes(status)) {
      setHeaderText("Your Order is: Canceled")
      setOrderStatus("Canceled");
      return "Canceled";
    }
    if (status === 'delivered') {
      setHeaderText("Your Order is: Delivered")
      setOrderStatus("Delivered");
      return "Delivered";
    }
    // failed delivery
    if (status === 'failed_deliver') {
      setHeaderText("Delivery Failed")
      setOrderStatus("Delivery Failed");
      return "Delivery Failed";
    }
    // Out for Delivery: scheduled on a route and Out for Delivery
    if (status === 'in_transit') {
      setHeaderText("Your Order is: Out for Delivery")
      setOrderStatus("Out for Delivery");
      return "Out for Delivery";
    }
    // on its way: scheduled onto a route, not yet in transit
    if (["pending", "printed", "processed", "in_possession", "sorted", "pre_transit"].includes(status) && externalTrackingNumber) {
      setHeaderText("Your Order is: Scheduled")
      setOrderStatus("Scheduled");
      return "Scheduled";
    }
    // confirmed: created but not yet routed
    if (["pending", "printed", "processed", "in_possession", "sorted", "pre_transit", "failed_process"].includes(status)) {
      setHeaderText("Your Order is: Confirmed")
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

    // If the date has a time component, then convert it from UTC to local time
    if (hasTime) {
      const offset = date.getTimezoneOffset();
      date.setMinutes(date.getMinutes() - offset);
    }
    // Format the time part if a time component exists
    const formattedTime = hasTime ? ` at ${new Intl.DateTimeFormat('en-US', timeOptions).format(date)}` : '';

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

  const SummaryBlock = () => (
    <div className="flex flex-col items-start">
      {orderStatus && <div><span className="font-bold">Status:</span> {orderStatus}</div>}
      {deliveryDate && <div><span className="font-bold">Delivery Date:</span> {deliveryDate}</div>}
      {router.query.trackingNumber && <div><span className="font-bold">Tracking ID:</span> {router.query.trackingNumber}</div>}
    </div>
  );

  const MapBlock = () => (
    <div className="flex gap-4 mb-8 justify-center pt-3" >
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
      </div>
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
                className={`flex flex-col items-center relative ${
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <div className="tracking-container text-center mt-8">
          <h1 className="mb-10 mt-5 text-3xl font-bold">Track Your Order</h1>
          {trackingLoading && (
            <div className="my-10 w-full flex flex-row justify-center">
              <FontAwesomeIcon icon={faCircleNotch} size="3x" className="fa-spin" color="grey"/>
            </div>
          )}
          {(trackingLoaded || trackingErrored) && 
            <div className="tracking-results-box">
              <h2 className="font-bold text-lg">{headerText}</h2>
              <h2 className="font-bold text-lg pt-1">{arrivalStr}</h2>
              {["Confirmed", "Scheduled", "Out for Delivery", "Delivered"].includes(orderStatus) && <OrderStatusBar orderStatus={orderStatus} />}
              <SummaryBlock />
              {mapCenter.lat !== 0 && mapCenter.lng !== 0 && orderStatus !== "Delivered" && <MapBlock />}
              {orderStatus === "Delivered" && (podPhotoUrl || signatureUrl) && <ConfirmationBlock />}
              <AddressBlock />
            </div>
          }
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
    </APIProvider>
  )
}
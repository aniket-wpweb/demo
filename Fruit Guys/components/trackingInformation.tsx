import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { PodPDF } from "./podpdf";
import dropOffLogo from 'assets/dropoff_logo.png';
import { useReactToPrint } from "react-to-print";

const failureReasons = {
  "Pending CS: 3 - Incorrect Gate Code": "Incorrect Gate Code - Awaiting Customer Update",
  "Pending CS: 4 - Incorrect Address": "Incorrect Address - Awaiting Customer Update",
  "Returned to Sender: 5 - Signature Required": "Signature Required - Redelivery Scheduled",
  "Redeliver: 6 - No Call Box Answer": "No Call Box Answer - Redelivery Scheduled",
  "Return to Sender: 1 - Rejected": "Customer Declined - Returned to Sender",
  "Return to Sender: 2 - Damaged": "Package Damaged - Returned to Sender",
}

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

const TrackingInformation = ({ data = [], type = "", shipperName = undefined }) => {
  const podPDFRef = useRef(null); // Reference for the PodPDF component
  const [podPDFData, setPodPDFData] = useState(null); // Store the data to pass to PodPDF
  const [isPodPDFVisible, setIsPodPDFVisible] = useState(false); // Control rendering

  const handlePrint = useReactToPrint({
    content: () => podPDFRef.current,
  });

  const downloadPodPDF = (params: any) => {
    const podData = params.data.podData;
    const orderStatus = getOrderStatus(params.data.status, params.data.tracking_number);
    const deliveryAddress = {
      company: podData.shippingAddressCompany,
      contact: podData.shippingAddressContact,
      address1: podData.shippingAddressStreet1,
      address2: podData.shippingAddressStreet2,
      city: podData.shippingAddressCity,
      state: podData.shippingAddressState,
    };

    const signatureUrl = Array.isArray(podData.proof_of_delivery.signatureUrl)
      ? podData.proof_of_delivery.signatureUrl.length > 0
        ? podData.proof_of_delivery.signatureUrl[0]
        : ""
      : typeof podData.proof_of_delivery.signatureUrl === "object" && podData.proof_of_delivery.signatureUrl !== null
      ? Object.values(podData.proof_of_delivery.signatureUrl)[0] || ""
      : "";
    const deliveryDate = podData.date;
    const shipDate = podData.extras.shipDate;
    const trackingNumber = podData.externalId;
    const weight = podData.weight;
    const weightUnit = podData.weightUnit;
    const shipmentExternalId = podData.shipmentExternalId;
    const referenceNumber = podData.extras.reference;
    const poNumber = podData.extras.poNumber;

    setPodPDFData({
      status: orderStatus,
      deliveredTo: `${deliveryAddress.city}, ${deliveryAddress.state}`,
      signedFor: signatureUrl && signatureUrl !== "" ? "Yes" : "No",
      deliveryLocation: `${deliveryAddress.city}, ${deliveryAddress.state}`,
      serviceType: "DropOff Delivery",
      deliveryDate: formatDeliveryDateStr(deliveryDate),
      specialHandling: "N/A",
      trackingNumber,
      shipDate: formatDeliveryDateStr(shipDate),
      recipient: `${deliveryAddress.city}, ${deliveryAddress.state}`,
      weight: `${weight} ${weightUnit}`,
      orderNumber: shipmentExternalId ? shipmentExternalId.split("-")[1] : "",
      referenceNumber,
      purchaseOrder: poNumber,
      shipper: "Jacksonville, FL",
      logo: dropOffLogo,
    });

    setIsPodPDFVisible(true); // Make PodPDF visible (hidden by default)
    setTimeout(() => handlePrint(), 0); // Trigger print after rendering
  };

  const podPDFRender = (params) => {
    if (params.data.status !== 'delivered') {
      return (<div className="text-center">-</div>);
    }
    return (
      <div
        onClick={() => downloadPodPDF(params)}
        className="cursor-pointer text-center"
      >
        <FontAwesomeIcon icon={faDownload} />
      </div>
    );
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Tracking Number",
        field: "tracking_number",
        sortable: true,
        filter: true,
        minWidth: 160,
        cellRenderer: (params) => (
          <Link href={`${shipperName && typeof shipperName === 'string'
            ? `/${shipperName}`
            : ''
          }/track/${params.value}`} className="mt-4 font-bold">
            <span><u>{params.value}</u></span>
          </Link>
        ),
        headerClass: "header-wrap",
        tooltipValueGetter: (params) => params.value,
      },
      {
        headerName: "Order ID",
        field: "shipment_id",
        minWidth: 100,
        sortable: true,
        filter: true,
        headerClass: "header-wrap",
        tooltipValueGetter: (params) => params.value,
      },
      {
        headerName: "Status",
        field: "status",
        minWidth: 200,
        sortable: true,
        filter: true,
        headerClass: "header-wrap",
        cellRenderer: (params) => {
          const orderStatus = getOrderStatus(params.data.status, params.data.tracking_number);
          const message = (params.data.reasonCode && failureReasons[params.data.reasonCode]) || params.data.reasonCode || null;
          if (message) {
            return <span className="text-gray-600">{orderStatus}{": "}{message}</span>;
          }
          return orderStatus;
        },
        tooltipValueGetter: (params) => {
          const orderStatus = getOrderStatus(params.data.status, params.data.tracking_number);
          const message = (params.data.reasonCode && failureReasons[params.data.reasonCode]) || params.data.reasonCode || null;
          if (message) {
            return `${orderStatus}: ${message}`;
          }
          return orderStatus;
        },
      },
      {
        headerName: "Delivery Date",
        field: "delivery_date",
        minWidth: 120,
        sortable: true,
        filter: true,
        headerClass: "header-wrap",
        valueGetter: (params) => {
          if (params.data.status !== 'delivered') {
            return "-";
          }
          return params.data.delivery_date;
        },
        tooltipValueGetter: (params) => {
          if (params.data.status !== 'delivered') {
            return null;
          }
          return params.value;
        },
      },
      {
        headerName: "Proof of Delivery",
        minWidth: 110,
        sortable: false,
        filter: false,
        cellRenderer: podPDFRender,
        headerClass: "header-wrap",
        tooltipValueGetter: (params) => {
          if (params.data.status !== 'delivered') {
            return null;
          }
          return "Print Proof of Delivery PDF";
        },
      }
    ],
    []
  );

  const defaultColDef = useMemo(() => ({
    flex: 1,
    resizable: true,
    cellRendererParams: {
      suppressHtmlEscaping: true,
    },
  }), []);

  const getOrderStatus = (status, externalTrackingNumber) => {
    if (["canceled", "failed_cancel", "failed_print"].includes(status)) {
      return "Canceled";
    }
    if (status === "delivered") {
      return "Delivered";
    }
    if (status === "failed_deliver") {
      return "Delivery Unsuccessful";
    }
    if (status === "in_transit") {
      return "Out for Delivery";
    }
    if (["pending", "printed", "processed", "in_possession", "sorted", "pre_transit"].includes(status) && externalTrackingNumber) {
      return "Scheduled";
    }
    if (status === "missing") {
      return "Confirmed";
    }
    if (["pending", "printed", "processed", "in_possession", "sorted", "pre_transit", "failed_process"].includes(status)) {
      return "Confirmed";
    }
    return "Unknown";
  };

  return (
    data.length > 0 
    ? (<><div className="ag-theme-alpine" style={{ height: 520, width: "100%" }}>
      <AgGridReact
        rowData={data.filter(
          (item) => item.tracking_number !== "" && item.status !== "Unavailable"
        )}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        pagination={true}
        paginationPageSize={10}
        tooltipShowDelay={500}
      />
    </div>
    {isPodPDFVisible && podPDFData && (
        <div style={{ display: "none" }}>
          <PodPDF ref={podPDFRef} {...podPDFData} />
        </div>
      )}
    </>)
    : null
  );
};

export default TrackingInformation;

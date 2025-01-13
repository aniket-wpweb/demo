import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type Ref = HTMLDivElement;
type Props = {};

export const Invoice = React.forwardRef<Ref, Props>((props, ref) => {
  const {invoiceDateRange, customerInvoiceData : invoiceData} = useAppSelector((state)=>state.invoices)

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${month}/${day}/${year}`;
  };

  const formatDateString = (inputDateString: string): string => {
    const inputDate = new Date(inputDateString);
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const year = String(inputDate.getFullYear());

    return `${month}/${day}/${year}`;
  };

  const getTotalAmount = (rows: Array<{
    delivery_date: string;
    shipper: string;
    total_packages: number;
    rate: number;
    amount: number;
  }>) => {
    let totalAmount = 0;
    rows.forEach((row) => {
      totalAmount += row.amount;
    });
    return totalAmount;
  };

  return (
    <div ref={ref}>
      <div className="invoice-inner-container text-xl">
        <div className="flex justify-between">
          <div>
            <div className="font-bold">LAST MILE SOLUTIONS CA LLC</div>
            <div>+1 949-940-6641</div>
            <div>gina@lastmile.us</div>
          </div>
        </div>
        <div className="grid grid-cols-2 invoice-block-2">
          <div>
            <div className="font-bold">BILL TO</div>
            <div>{invoiceData.customerInvoiceTemplate?.billingInformation.companyName}</div>
            <div>{invoiceData.customerInvoiceTemplate?.billingInformation.addressLine1}</div>
            <div>{invoiceData.customerInvoiceTemplate?.billingInformation.addressLine2}</div>
            <div>
              {invoiceData.customerInvoiceTemplate?.billingInformation.city},{' '}
              {invoiceData.customerInvoiceTemplate?.billingInformation.state},{' '}
              {invoiceData.customerInvoiceTemplate?.billingInformation.zip_code} US
            </div>
          </div>
          <div>
            <div className="bg-orange-400 text-white font-bold p-3">INVOICE</div>
            <div className="bg-orange-400 text-white p-3 mt-2">
              <span className="font-bold">DATE</span> {formatDate(new Date())}{' '}
              <span className="font-bold">TERMS</span> Due on receipt
            </div>
            <div className="bg-orange-400 text-white p-3 mt-2">
              <span className="font-bold">OPERATING WEEK</span>{' '}
              {`${formatDate(invoiceDateRange.startDate)} - ${formatDate(invoiceDateRange.endDate)}`}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-8 text-base mt-2">
          <div className="col-span-1">
            <div className="bg-orange-400 text-white font-bold">DATE</div>
            {invoiceData.rows?.map((row, idx) => (
              <div key={idx} className={idx % 2 === 1 ? "bg-slate-200" : ""}>
                {row.delivery_date}
              </div>
            ))}
          </div>
          <div className="col-span-4">
            <div className="bg-orange-400 text-white font-bold">DESCRIPTION</div>
            {invoiceData.rows?.map((row, idx) => (
              <div key={idx} className={idx % 2 === 1 ? "bg-slate-200" : ""}>
                {row.total_packages} BOXES
              </div>
            ))}
          </div>
          <div>
            <div className="bg-orange-400 text-white font-bold">QTY</div>
            {invoiceData.rows?.map((row, idx) => (
              <div key={idx} className={idx % 2 === 1 ? "bg-slate-200" : ""}>
                {row.total_packages}
              </div>
            ))}
          </div>
          <div>
            <div className="bg-orange-400 text-white font-bold">RATE</div>
            {invoiceData.rows?.map((row, idx) => (
              <div key={idx} className={idx % 2 === 1 ? "bg-slate-200" : ""}>
                {row.rate.toFixed(2)}
              </div>
            ))}
          </div>
          <div>
            <div className="bg-orange-400 text-white font-bold">AMOUNT</div>
            {invoiceData.rows?.map((row, idx) => (
              <div key={idx} className={idx % 2 === 1 ? "bg-slate-200" : ""}>
                {row.amount.toFixed(2)}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 mt-2">
          <div className="text-base col-span-2">Pleasure doing business with you {":)"}</div>
          <div className="bg-orange-400 text-white font-bold text-base py-3 px-1">
            <div className="flex justify-between">
              <div>TOTAL DUE</div>
              <div>${getTotalAmount(invoiceData.rows).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

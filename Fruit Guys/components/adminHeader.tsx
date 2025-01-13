import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut } from "../redux/slices/auth";
import { loginPath } from '../constants/routes';

export const Adminheader = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="admin-login-flex-container">
     <div className="admin-login-contactus-section">
     <Link href="/" className="mt-4 login-link">
             <Image src={require("../assets/GroScaleLogoHorizontal.png")} width={300}  alt="Logo" />
      </Link>
            <div className="button-report-section"><a href="" >Reporting</a></div>
     </div>
    <div className="admin-login-banner-image-div">
        <a className="mt-4 login-link" onClick={() => dispatch(logOut())} href={loginPath}>Logout</a>
    </div>
  </div>

 
  );
}
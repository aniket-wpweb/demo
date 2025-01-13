import Link from "next/link";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faCaretUp, faSignOutAlt, faDashboard, faCog, faUsers, faChartLine, faFileAlt, faQuestionCircle, faChevronRight, faChevronLeft, faCubes, faCubesStacked, faTruckFast, faChartSimple, faTruck, faClipboardCheck, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setShowSideBar, setSidebarMenus } from "../redux/slices/dashboard";
import { logOut } from "../redux/slices/auth";
import { useRouter } from "next/router";

export const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentPage, showSideBar, sideBarMenus } = useAppSelector((state) => state.dashboard);
  const { isCarrierAdmin } = useAppSelector((state) => state.auth);

  return (
    <>
    <div className={`space-y-4 py-4 flex flex-col h-full text-white ${showSideBar ? 'md:w-72' : 'md:w-20'}`}>

      {/* Floating Arrow */}
      <div 
        className={`absolute top-11 -right-4 sidebar-arrow`}
        onClick={() => dispatch(setShowSideBar(!showSideBar))}
      >
        <FontAwesomeIcon icon={showSideBar ? faChevronLeft : faChevronRight} size='xs'/>
      </div>

      {/* Sidebar content */}
      <div className="px-3 py-2 flex flex-col flex-1">
        <div className="flex justify-between items-center gap-2">
          {/* Logo */}
          <button className="toggle-menu-cls mb-4" onClick={() => dispatch(setShowSideBar(!showSideBar))}>
          {showSideBar
            ? <Image src={require("../assets/GroScaleLogoHorizontal.png")} width={200}  alt="Logo" />
            : <Image src={require("../assets/GroScaleLogoOnly.png")} width={120}  alt="Logo" />
          }
          </button>
        </div>

        {/* Sidebar menu */}
        <div className="space-y-1 sidebar-menu flex-1">
          {/* Dashboard */}
          <Link href="/dashboard" className={`sidebar-link ${currentPage === "dashboard" ? "active" : ""}`}>
            <div className="flex items-center flex-1">
            <FontAwesomeIcon icon={faCubes} className="mr-3" />
              {showSideBar && <span>Dashboard</span>}
            </div>
          </Link>

          {/* Performance */}
          <Link href="/performanceReports" className={`sidebar-link ${currentPage === "performanceReports" ? "active" : "text-zinc-400"}`}>
            <div className="flex items-center flex-1">
              <FontAwesomeIcon icon={faChartSimple} className="mr-3" />
              {showSideBar && <span>Performance</span>}
            </div>
          </Link>

          {/* Volume */}
          <Link href="/volumeReport" className={`sidebar-link ${currentPage === "volumeReport" ? "active" : "text-zinc-400"}`}>
            <div className="flex items-center flex-1">
              <FontAwesomeIcon icon={faTruck} className="mr-3" />
              {showSideBar && <span>Volume</span>}
            </div>
          </Link>

          <Link href="/statusReport" className={`sidebar-link ${currentPage === "statusReport" ? "active" : "text-zinc-400"}`}>
            <div className="flex items-center flex-1">
              <FontAwesomeIcon icon={faClipboardList} className="mr-3" />
              {showSideBar && <span>Status</span>}
            </div>
          </Link>

          {/* Support */}
          <Link 
            href={"https://example.com/servicedesk/customer/portal/1"}
            className={`sidebar-link ${currentPage === "support" ? "active" : "text-zinc-400"}`}
            >
            <div className="flex items-center flex-1">
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-3" />
              {showSideBar && <span>Support</span>}
            </div>
          </Link>

          {/* Logout button */}
          <Link
            href={'/'}
            onClick={() => dispatch(logOut())}
            className={`sidebar-link`}
            >
            <div className="flex items-center flex-1">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
            {showSideBar && <span>Log Out</span>}
            </div>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

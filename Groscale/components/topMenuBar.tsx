import Link from "next/link";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faChartSimple, faTruck, faClipboardList, faQuestionCircle, faSignOutAlt, faAngleDown, faCog, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut } from "../redux/slices/auth";
import { useState, useEffect, useRef } from "react";

export const TopMenuBar = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.dashboard);

  // State to manage dropdown visibility
  const [isReportingDropdownOpen, setReportingDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);

  // Refs for dropdowns to detect clicks outside
  const reportingDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);

  // Reporting dropdown items with icons
  const reportingItems = [
    { label: 'Dashboard', link: 'dashboard', icon: faCubes },
    { label: 'Performance', link: 'performanceReports', icon: faChartSimple },
    { label: 'Volume', link: 'volumeReport', icon: faTruck },
    { label: 'Status', link: 'statusReport', icon: faClipboardList }
  ];

  // Settings dropdown items
  const settingsItems = [
    { label: 'User Settings', link: '', icon: faCog },
    { label: 'App Settings', link: '', icon: faCog },
    { label: 'Notifications', link: '', icon: faCog }
  ];

  const toggleReportingDropdown = () => {
    setReportingDropdownOpen(!isReportingDropdownOpen);
  };

  const toggleSettingsDropdown = () => {
    setSettingsDropdownOpen(!isSettingsDropdownOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reportingDropdownRef.current && !reportingDropdownRef.current.contains(event.target as Node)) {
        setReportingDropdownOpen(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target as Node)) {
        setSettingsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="py-4 px-6 top-menu">

      {/* Top row (Logo, Support, Log Out) */}
      <div className="flex justify-between items-center mb-4">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => console.log("Logo clicked")}>
            <Image 
              src={require("../assets/GroScaleLogoHorizontal.png")} 
              width={200}  
              alt="Logo" 
            />
          </button>
        </div>

        {/* Support and Log Out */}
        <div className="flex space-x-6">
          {/* Support */}
          <Link 
            href={"https://example.com/servicedesk/customer/portal/1"}
            className={`top-menu-link ${currentPage === "support" ? "active" : "text-zinc-400"}`}
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
              <span>Support</span>
            </div>
          </Link>

          {/* Log Out */}
          <Link
            href={'/'}
            onClick={() => dispatch(logOut())}
            className="top-menu-link"
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <span>Log Out</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom row (Tabs with dropdowns) */}
      <div className="flex space-x-6">
        {/* Reporting Dropdown */}
        <div className="relative" ref={reportingDropdownRef}>
          <button
            onClick={toggleReportingDropdown}
            className={`top-menu-link flex items-center ${reportingItems.map((item) => item.link).includes(currentPage) ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faFileLines} className="mr-2" />
            <span>Reporting</span>
            <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
          </button>
          
          {/* Reporting Dropdown Menu */}
          {isReportingDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              {reportingItems.map((item) => (
                <Link
                  key={item.label}
                  href={`/${item.link}`}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ${currentPage === item.link ? "bg-gray-300" : ""}`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Settings Dropdown */}
        <div className="relative hidden" ref={settingsDropdownRef}>
          <button
            onClick={toggleSettingsDropdown}
            className={`top-menu-link flex items-center ${settingsItems.map((item) => item.link).includes(currentPage) ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            <span>Settings</span>
            <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
          </button>
          
          {/* Settings Dropdown Menu */}
          {isSettingsDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              {settingsItems.map((item) => (
                <Link
                  key={item.label}
                  href={`/${item.link}`}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 ${currentPage === item.link ? "bg-gray-300" : ""}`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

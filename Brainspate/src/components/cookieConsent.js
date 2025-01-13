import Link from "next/link";
import { useEffect, useState } from "react";
// import "font-awesome/css/font-awesome.min.css";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isCookieAccepted = localStorage.getItem("cookieAccepted");

    if (!isCookieAccepted) {
      setShowPopup(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", true);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="cookie-popup">
      <p>
        By continuing to use this website you <br /> agree to our a &nbsp;
        <Link href="/privacy-policy#use_cookie">Cookie Policy</Link>. &nbsp;
        <button onClick={acceptCookies}>Accept</button>
      </p>
      <div className="close-icon" onClick={closePopup}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default CookieConsent;

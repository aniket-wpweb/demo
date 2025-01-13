import Head from 'next/head';
import Header from "./header";
import Footer from "./footer";
import CookieConsent from "../cookieConsent";

const Layout = ({ children, data }) => {
  return (
    <>
      <Header headerData={data} />
      <div>{children}</div>
      <Footer footerData={data.generalSettings.acfGeneralSettings} />
      <CookieConsent />
      {/* <Footer footerData = {data.footerData.generalSettings.acfGeneralSettings} /> */}
    </>
  );
};

export default Layout;

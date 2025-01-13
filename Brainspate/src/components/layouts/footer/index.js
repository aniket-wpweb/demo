import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

const Footer = (data) => {
  
  const scriptCode = data.footerData.footerSection.salesIqChartScriptCode;

  let copyright_section = data?.footerData.footerSection.bottomSection.copyrightText;
   copyright_section = copyright_section.replace(
    /\[year\]/,
   new Date().getFullYear().toString()
  );
  
  
  useEffect(() => {   
    
    // Function to remove Zoho SalesIQ CSS initially
    const removeZohoCSS = () => {
      
      // const zohoCSS = document.querySelectorAll("link[href*='zoho']");
      // zohoCSS.forEach((link) => {
      //   link.remove();
      // });

      const zohoCSS2 = document.querySelectorAll("link[href*='salesiq']");
      zohoCSS2.forEach((link) => {
        link.remove();
      });
      
      // const zohoCSS3 = document.querySelectorAll("link[href*='floatbutton']");
      // zohoCSS3.forEach((link) => {
      //   link.remove();
      // });
    };

    if (!document.getElementById('zsiqscript') || document.getElementById('zsiqscript') == null) {

      removeZohoCSS();
    }

    const loadZohoChat = () => {


      // Load the CSS file asynchronously
      const zohoCSS = document.createElement('link');
      zohoCSS.rel = 'stylesheet';
      zohoCSS.href = 'https://css.zohocdn.com/salesiq/styles/floatbutton1';
      //zohoCSS.rel= 'preload';
      document.head.appendChild(zohoCSS);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "zsiqscript";
      script.defer = true;
      script.src = "https://salesiq.zoho.in/widget";
      
      const zohoScript = document.createElement("script");
      zohoScript.type = "text/javascript";
      zohoScript.id = "zsiqchat";
    //  zohoScript.innerHTML = `var $zoho = $zoho || {}; 
    //     $zoho.salesiq = $zoho.salesiq || {
    //       widgetcode: "siq8d24a8194a0980fd5a07227350dbc326e4b4f0f42b23cf927b40f7d1d407668e", 
    //       values: {}, 
    //       ready: function() {}
    //     };`;
        zohoScript.innerHTML = scriptCode; 

      if (!document.getElementById('zsiqscript') || document.getElementById('zsiqscript') == null) {

        document.body.appendChild(zohoScript);
        document.body.appendChild(script);
      }
    };

    // console.log("document.getElementById('zsiqscript') : ",document.getElementById('zsiqscript'));
    
    // if (router.pathname === '/contact') {
    //   loadZohoChat();
    // }
    const zohoChatTimeout = setTimeout(() => {
      if (!document.getElementById('zsiqscript') || document.getElementById('zsiqscript') == null) {
        loadZohoChat();
      }
    }, 6000); // Adjust the delay time (in milliseconds) if needed


    return () => clearTimeout(zohoChatTimeout);

  }, []);


  
  return (
    <footer>
      <Container>
        <div className="footer-detail-inner">
          <div className="d-flex flex-wrap justify-content-between">
            <div className="left-sec">
              <div className="footer-logo-wrap">
                <div className="footer-logo">
                  {data?.footerData.webSettings?.siteLogo != null ? (
                    <Image
                      src={
                        data?.footerData.webSettings?.siteLogo &&
                        data?.footerData.webSettings?.siteLogo.mediaItemUrl
                      }
                      alt={
                        data?.footerData.webSettings?.siteLogo &&
                        data?.footerData.webSettings?.siteLogo.altText != ""
                          ? data?.footerData.webSettings?.siteLogo.altText
                          : "logo"
                      }
                      height={
                        data?.footerData.webSettings?.siteLogo.mediaDetails &&
                        data?.footerData.webSettings?.siteLogo.mediaDetails
                          .height
                          ? data?.footerData.webSettings?.siteLogo.mediaDetails
                              .height
                          : 60
                      }
                      width={
                        data?.footerData.webSettings?.siteLogo.mediaDetails &&
                        data?.footerData.webSettings?.siteLogo.mediaDetails
                          .width
                          ? data?.footerData.webSettings?.siteLogo.mediaDetails
                              .width
                          : 225
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="footer-contact">
                <p>{data?.footerData.footerSection.companyDescription}</p>
              </div>
              <div className="social-icon d-flex flex-wrap">
                {data?.footerData.footerSection.socialIcons.map((item) => {
                  const iconCls ="icon";
                  return (
                    <Link
                      key={item?.iconLink}
                      target="_blank"
                      href={item.iconLink} 
                      className={`icon ${item.iconClass}`}
                    >
                      {item.iconImage != null ? (
                        <Image
                          src={item.iconImage && item.iconImage.mediaItemUrl}
                          alt={
                            item.iconImage && item.iconImage.altText != ""
                              ? item.iconImage.altText
                              : "SocialIcons"
                          }
                          height={
                            item.iconImage.mediaDetails &&
                            item.iconImage.mediaDetails.height
                              ? item.iconImage.mediaDetails.height
                              : 50
                          }
                          width={
                            item.iconImage.mediaDetails &&
                            item.iconImage.mediaDetails.width
                              ? item.iconImage.mediaDetails.width
                              : 50
                          }
                        />
                      ) : (
                        ""
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="right-sec">
              <div className="sec-inner">
                <div className="our-expertise">
                  <h3>Our Expertise</h3>
                  <ul>
                    {data?.footerData.footerSection.ourExpertise.map((item) => {
                      return (
                        <li key={item.title}>
                          <Link href={item.url}>{item.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="resources">
              <div className="sec-inner">
                <h3>Countries We Serve</h3>
                <ul className="">
                  {data?.footerData.footerSection.countriesWeServe.map(
                    (item , index) => {
                      return (
                        <>
                          <li
                            key={index}
                            className="d-flex flex-wrap justify-content-start align-items-center"
                          >
                            {item.countryIcon != null ? (
                              <Image
                                className="me-2 country-icon"
                                src={
                                  item.countryIcon &&
                                  item.countryIcon.mediaItemUrl
                                }
                                alt={
                                  item.countryIcon &&
                                  item.countryIcon.altText != ""
                                    ? item.countryIcon.altText
                                    : "CountryIcons"
                                }
                                height={
                                  item.countryIcon.mediaDetails &&
                                  item.countryIcon.mediaDetails.height
                                    ? item.countryIcon.mediaDetails.height
                                    : 25
                                }
                                width={
                                  item.countryIcon.mediaDetails &&
                                  item.countryIcon.mediaDetails.width
                                    ? item.countryIcon.mediaDetails.width
                                    : 25
                                }
                              />
                            ) : (
                              ""
                            )}

                            <p className="mb-0" key={index}>{item.countryName}</p>
                          </li>
                        </>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
            <div className="footer-contact-detail">
              <div className="sec-inner">
                <h3>Contact Us</h3>
                <div className="footer-contact">
                  <ul className="">
                    <li className="number">
                     
                      <Link
                        href={
                          "tel:" +
                          data?.footerData?.footerSection.contactUs.companyPhone.replace(/\s+/g, '')
                        }
                      >
                        {data?.footerData?.footerSection.contactUs.companyPhone}
                      </Link>
                    </li>
                    <li className="email">
                      <Link
                        href={
                          "mailto:" +
                          data?.footerData?.footerSection.contactUs.companyEmail
                        }
                      >
                        {data?.footerData?.footerSection.contactUs.companyEmail}
                      </Link>
                    </li>
                    <li className="address india-flag" dangerouslySetInnerHTML={{
                      __html: data?.footerData.footerSection.contactUs.companyAddress,
                    }}>
                    </li>
                    <li className="address usa-flag" dangerouslySetInnerHTML={{
                      __html: data?.footerData.footerSection.contactUs.companyUsaAddress,
                    }}>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="copyright-sec">
        <div className="container">
          <div className="copyright-social d-flex flex-wrap justify-content-center align-items-center">
            <ul className="d-flex flex-wrap">
              <li>
                {copyright_section}
              </li>
              <li>
                {data?.footerData.footerSection.bottomSection.reservedText}
              </li>
              {data?.footerData.footerSection.bottomSection.links.map(
                (item) => {
                  return (
                   
                    <li key={item.title}>
                      <Link href={item.url}>{item.title}</Link>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import client from "@/src/apollo/client";
import { ServiceQuery } from "@/src/queries/serviceQuery";
import Layout from "@/src/components/layouts";
import { FooterQuery } from "@/src/queries/footerQuery";
import Link from "next/link";

import GetInTouchFooter from "@/src/components/getIntouchFooter";
import Image from "next/image";
import GlobalHead from "@/src/components/globalHead";
import IsMobile from "@/src/components/isMobile";
import IsDesktop from "@/src/components/isDesktop";

const Services = (data) => {  
  const servicePageData = data?.serviceData.page.service;
  return (
    <Layout data={data.footerData}>
      <GlobalHead
        seoData={data?.serviceData.page.seo.seoSection}
        googleTagData={data.footerData.generalSettings.acfGeneralSettings}
      />

      <div className="testimonial-banner ">
        <div className="aboutus-section dark-color service-banner">
          <div className="container about-us-main">
            <div className="banner-wrap ">
              {/* <div className="banner-left "> */}
              <div className="sub-title-top text-top">
                <Link href="/">Home</Link> / <span>Services</span>
                <h1
                  dangerouslySetInnerHTML={{
                    __html: servicePageData.servicePageBanner.serviceBannerTitle,
                  }}
                ></h1>
              </div>

              <div className="sub-title pb-38" dangerouslySetInnerHTML={{
                        __html: servicePageData.servicePageBanner.serviceBannerDescription,}}>
              </div>
            </div>
          </div>
        </div>

      </div>
      <section className="service-section">   
              <div className="service-list">
              {servicePageData.serviceDataRepeater.serviceData.map(
                  (item,index) => {
                    
                    
                    return (
              <div className="service-wrap">
                <div className="container">
                  <div className="service-block">
                    <div className="service-img blank">
                    </div>
                    <div className="service-content">
                      <div className="service-title">
                          <h2 dangerouslySetInnerHTML={{
                            __html: item.serviceTitle,
                            }}></h2>
                      </div>
                      </div>
                    <div className="service-img">
                    <figure className="text-align-center">
                            {item.seviceImage.mediaItemUrl != null ? (
                              <Image
                                src={
                                  item.seviceImage &&
                                  item.seviceImage.mediaItemUrl
                                }
                                alt={
                                  item.seviceImage &&
                                  item.seviceImage.altText != ""
                                    ? item.seviceImage.altText
                                    : "imag-icon"
                                }
                              
                                height={
                                  item.seviceImage.mediaDetails &&
                                  item.seviceImage.mediaDetails.height
                                    ? item.seviceImage.mediaDetails
                                        .height
                                    : 60
                                }
                                width={
                                  item.seviceImage.mediaDetails &&
                                  item.seviceImage.mediaDetails.width
                                    ? item.seviceImage.mediaDetails.width
                                    : 137
                                }
                                title={
                                  item.seviceImage &&
                                  item.seviceImage.altText != ""
                                    ? item.seviceImage.altText
                                    : "imag-icon"
                                }
                              />
                            ) : (
                              ""
                            )}
                          </figure>
                        
                    </div>
                    <div className="service-content">
                      {/* <h2 dangerouslySetInnerHTML={{
                          __html: item.serviceTitle,
                          }}></h2> */}
                      <p  
                          dangerouslySetInnerHTML={{
                          __html: item.serviceDescription,
                          }} >
                      </p>
                      <div className="fillbtn">
                        { /*<a href="{item.serviceLink.url}" className="fill">{item.serviceLink.title}</a> */ }
                        <Link className="fill"
                          href={
                            item?.serviceLink && item?.serviceLink.url != null
                              ? item?.serviceLink.url
                              : ""
                          }
                        >
                          {item?.serviceLink && item?.serviceLink.title}
                        </Link>
                      </div>
                    </div>
                    </div>
                </div>
              </div>        
               );
              }
            )} 
          </div>     
      </section>

      <section className="work-across">
            <div className="container">
              <div className="work-across-block">
                <div className="work-content">
                  <h2 dangerouslySetInnerHTML={{
                        __html: servicePageData.weWork.weWorkTitle,
                        }}></h2>
                        <IsMobile> 
                          <div className="map">
                            <figure className="text-align-center">
                                    {servicePageData.weWork.weWorkImage.mediaItemUrl != null ? (
                                      <Image
                                        src={
                                          servicePageData.weWork.weWorkImage &&
                                          servicePageData.weWork.weWorkImage.mediaItemUrl
                                        }
                                        alt={
                                          servicePageData.weWork.weWorkImage &&
                                          servicePageData.weWork.weWorkImage.altText != ""
                                            ? servicePageData.weWork.weWorkImage.altText
                                            : "imag-icon"
                                        }
                                        title={
                                          servicePageData.weWork.weWorkImage &&
                                          servicePageData.weWork.weWorkImage.altText != ""
                                            ? servicePageData.weWork.weWorkImage.altText
                                            : "imag-icon"
                                        }
                                        height={
                                          servicePageData.weWork.weWorkImage.mediaDetails &&
                                          servicePageData.weWork.weWorkImage.mediaDetails.height
                                            ? servicePageData.weWork.weWorkImage.mediaDetails
                                                .height
                                            : 60
                                        }
                                        width={
                                          servicePageData.weWork.weWorkImage.mediaDetails &&
                                          servicePageData.weWork.weWorkImage.mediaDetails.width
                                            ? servicePageData.weWork.weWorkImage.mediaDetails.width
                                            : 137
                                        }
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </figure>
                          </div>
                        </IsMobile>
                  <p dangerouslySetInnerHTML={{
                        __html: servicePageData.weWork.weWorkDescription,
                        }} ></p>
                </div>
                <IsDesktop> 
                  <div className="map">
                    <figure className="text-align-center">
                            {servicePageData.weWork.weWorkImage.mediaItemUrl != null ? (
                              <Image
                                src={
                                  servicePageData.weWork.weWorkImage &&
                                  servicePageData.weWork.weWorkImage.mediaItemUrl
                                }
                                alt={
                                  servicePageData.weWork.weWorkImage &&
                                  servicePageData.weWork.weWorkImage.altText != ""
                                    ? servicePageData.weWork.weWorkImage.altText
                                    : "imag-icon"
                                }
                                title={
                                  servicePageData.weWork.weWorkImage &&
                                  servicePageData.weWork.weWorkImage.altText != ""
                                    ? servicePageData.weWork.weWorkImage.altText
                                    : "imag-icon"
                                }
                                height={
                                  servicePageData.weWork.weWorkImage.mediaDetails &&
                                  servicePageData.weWork.weWorkImage.mediaDetails.height
                                    ? servicePageData.weWork.weWorkImage.mediaDetails
                                        .height
                                    : 60
                                }
                                width={
                                  servicePageData.weWork.weWorkImage.mediaDetails &&
                                  servicePageData.weWork.weWorkImage.mediaDetails.width
                                    ? servicePageData.weWork.weWorkImage.mediaDetails.width
                                    : 137
                                }
                              />
                            ) : (
                              ""
                            )}
                          </figure>
                  </div>
                </IsDesktop>
              </div>
            </div>      
      </section>
      <GetInTouchFooter data={servicePageData.solutionSection} />
      
    </Layout>
  );
};

export default Services;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
 
  const { data: footerData } = await client.query({
    query: FooterQuery,
  });

  const { data: serviceData } = await client.query({
    query: ServiceQuery,
  });
  
  return {
    props: {
      footerData: footerData,
      serviceData:serviceData,
    },
    revalidate: revalidateInterval,
  };
}

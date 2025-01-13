import client from "@/src/apollo/client";
import { FooterQuery } from "@/src/queries/footerQuery";
import { InfrastructureQuery } from "@/src/queries/infrastructureQuery";
import Layout from "@/src/components/layouts";
import GetInTouch from "@/src/components/getInTouch";
import GetInTouchFooter from "@/src/components/getIntouchFooter";
import { TestimonialQuery } from "@/src/queries/testimonialQuery";
import GlobalHead from "@/src/components/globalHead";
import Link from "next/link";
import Image from "next/image";
import Slider from "@/src/components/slider";
import "react-multi-carousel/lib/styles.css";

const infrastructure = (data) => {
    const seoData =data?.infrastructureData.page.seo.seoSection;
    const infrastructureData =data?.infrastructureData?.page.infrastrcture;
    const breadcrumTitle= data?.infrastructureData?.page.seo.seoSection.breadcrumTitle;
    const trustBySection =data?.footerData.generalSettings.acfGeneralSettings.trustedBySection;
    const topNotchInfrastrcture =infrastructureData.topNotchInfrastrcture;
    const ourAmbience= infrastructureData.ourAmbience;

  return (
    <div className="infrastructure-page">
      <Layout data={data.footerData}>
        {/* <!-- SEO Section --> */}
        <GlobalHead
          seoData={seoData}
          googleTagData={data.footerData.generalSettings.acfGeneralSettings}
        />
         <div className="testimonial-banner ">
          <div className="aboutus-section dark-color">
            <div className="container about-us-main">
              <div className="banner-wrap ">
                <div className="sub-title-top text-top">
                  <Link href="/">Home</Link> / <span>{breadcrumTitle}</span>
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: infrastructureData.bannerSection.bannerTitle,
                    }}
                  ></h1>
                </div>
                <div className="sub-title pb-38"  dangerouslySetInnerHTML={{
                      __html: infrastructureData.bannerSection.bannerSubtitle,
                    }}>
                </div>
              </div>
            </div>
          </div>
          <div className="container about-slider">
            <div className="logo-slider d-flex align-items-center justify-content-between">
              <div className="slider-title">
                <h2 dangerouslySetInnerHTML={{
                      __html: trustBySection.trustedByTitle,
                    }}></h2>
              </div>
              <div className="banner-sec-logos d-flex flex-wrap justify-space-between w-100">
                {trustBySection.trustedByRepeater.map(
                  (item) => {
                    return (
                      <div
                        key={
                          item.trustedByImage &&
                          item.trustedByImage.mediaItemUrl
                        }
                        className="logo-image"
                      >
                        <figure className="text-align-center">
                          {item.trustedByImage != null ? (
                            <Image
                              src={
                                item.trustedByImage &&
                                item.trustedByImage.mediaItemUrl
                              }
                              alt={
                                item.trustedByImage &&
                                item.trustedByImage.altText != ""
                                  ? item.trustedByImage.altText
                                  : "imag-icon"
                              }
                              height={
                                item.trustedByImage.mediaDetails &&
                                item.trustedByImage.mediaDetails.height
                                  ? item.trustedByImage.mediaDetails
                                      .height
                                  : 60
                              }
                              width={
                                item.trustedByImage.mediaDetails &&
                                item.trustedByImage.mediaDetails.width
                                  ? item.trustedByImage.mediaDetails.width
                                  : 137
                              }
                            />
                          ) : (
                            ""
                          )}
                        </figure>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
         </div>

        <div className="top-technology-section light-bg-color">
          <div className="container">
            <div className="main-title pb-50 text-center">
              <h2 dangerouslySetInnerHTML={{
                      __html: infrastructureData.topNotchInfrastrcture.topNotchTitle,
                    }}></h2>
              <p dangerouslySetInnerHTML={{
                      __html: infrastructureData.topNotchInfrastrcture.topNotchDescription,
                    }}></p>
            </div>
            <div className="technology-list">
            {topNotchInfrastrcture.topNotchData.map(
                  (item) => {
                    
                    return (
                          <div className={`technology-block  ${item.technologyImageBorderColor}`} >
                              <div className={`technology-icon ${item.technologyImageColor}`}  > 
                              <figure className="text-align-center">
                                  {item.topNotchTechnologyData != null ? (
                                    <Image
                                      src={
                                        item.topNotchTechnologyData &&
                                        item.topNotchTechnologyData.mediaItemUrl
                                      }
                                      alt={
                                        item.topNotchTechnologyData &&
                                        item.topNotchTechnologyData.altText != ""
                                          ? item.topNotchTechnologyData.altText
                                          : "imag-icon"
                                      }
                                      height={
                                        item.topNotchTechnologyData.mediaDetails &&
                                        item.topNotchTechnologyData.mediaDetails.height
                                          ? item.topNotchTechnologyData.mediaDetails
                                              .height
                                          : 60
                                      }
                                      width={
                                        item.topNotchTechnologyData.mediaDetails &&
                                        item.topNotchTechnologyData.mediaDetails.width
                                          ? item.topNotchTechnologyData.mediaDetails.width
                                          : 137
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                                </figure>
                                
                              </div>
                              <h4
                                dangerouslySetInnerHTML={{
                                  __html: item.topNotchDataTitle,
                                }}
                              ></h4>
                              <p  dangerouslySetInnerHTML={{
                                  __html: item.topNotchDataSubtitle,
                                }}
                              ></p>
                        </div>
                      );
                    }
                  )}
             
            </div>
          </div>
        </div>
        <div className="container award-sec-logos-section">
          <h2 dangerouslySetInnerHTML={{
                      __html: infrastructureData.bestEcommerceSection.bestEcommerceTitle,
                    }}></h2>
          <div className="award-sec-logos d-flex flex-wrap justify-space-between"></div>
           <Slider items={infrastructureData.bestEcommerceSection.bestEcommerceRepeater} />
        </div>            
        <div className="our-ambience">
          <div className="container">
            <div className="our-ambience-block">
              <div className="our-ambience-content">
                <h2 dangerouslySetInnerHTML={{
                      __html: ourAmbience.ourAmbienceTitle,
                    }}></h2>
                <p dangerouslySetInnerHTML={{
                      __html: ourAmbience.ourAmbienceShortDescription,
                    }}></p>
              </div>
              <div className="img">
                    <div className="first-img-column">
                                  {ourAmbience.ambienceFirstImage != null ? (
                                    <Image
                                      src={
                                        ourAmbience.ambienceFirstImage &&
                                        ourAmbience.ambienceFirstImage.mediaItemUrl
                                      }
                                      alt={
                                        ourAmbience.ambienceFirstImage &&
                                        ourAmbience.ambienceFirstImage.altText != ""
                                          ?ourAmbience.ambienceFirstImage.altText
                                          : "imag-icon"
                                      }
                                      height={
                                        ourAmbience.ambienceFirstImage.mediaDetails &&
                                        ourAmbience.ambienceFirstImage.mediaDetails.height
                                          ? ourAmbience.ambienceFirstImage.mediaDetails
                                              .height
                                          : 60
                                      }
                                      width={
                                        ourAmbience.ambienceFirstImage.mediaDetails &&
                                        ourAmbience.ambienceFirstImage.mediaDetails.width
                                          ? ourAmbience.ambienceFirstImage.mediaDetails.width
                                          : 137
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                              
                                {ourAmbience.ambienceSecondImage != null ? (
                                    <Image
                                      src={
                                        ourAmbience.ambienceSecondImage &&
                                        ourAmbience.ambienceSecondImage.mediaItemUrl
                                      }
                                      alt={
                                        ourAmbience.ambienceSecondImage &&
                                        ourAmbience.ambienceSecondImage.altText != ""
                                          ?ourAmbience.ambienceSecondImage.altText
                                          : "imag-icon"
                                      }
                                      height={
                                        ourAmbience.ambienceSecondImage.mediaDetails &&
                                        ourAmbience.ambienceSecondImage.mediaDetails.height
                                          ? ourAmbience.ambienceSecondImage.mediaDetails
                                              .height
                                          : 60
                                      }
                                      width={
                                        ourAmbience.ambienceSecondImage.mediaDetails &&
                                        ourAmbience.ambienceSecondImage.mediaDetails.width
                                          ? ourAmbience.ambienceSecondImage.mediaDetails.width
                                          : 137
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                              
                      
                    </div>
                      <div className="last-img-column">                 
                      
                      {ourAmbience.ambienceFirstImage != null ? (
                                    <Image
                                      src={
                                        ourAmbience.ambienceThirdImage &&
                                        ourAmbience.ambienceThirdImage.mediaItemUrl
                                      }
                                      alt={
                                        ourAmbience.ambienceThirdImage &&
                                        ourAmbience.ambienceThirdImage.altText != ""
                                          ?ourAmbience.ambienceThirdImage.altText
                                          : "imag-icon"
                                      }
                                      height={
                                        ourAmbience.ambienceThirdImage.mediaDetails &&
                                        ourAmbience.ambienceThirdImage.mediaDetails.height
                                          ? ourAmbience.ambienceThirdImage.mediaDetails
                                              .height
                                          : 60
                                      }
                                      width={
                                        ourAmbience.ambienceThirdImage.mediaDetails &&
                                        ourAmbience.ambienceThirdImage.mediaDetails.width
                                          ? ourAmbience.ambienceThirdImage.mediaDetails.width
                                          : 137
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                                {ourAmbience.ambienceFourImage != null ? (
                                    <Image
                                      src={
                                        ourAmbience.ambienceFourImage &&
                                        ourAmbience.ambienceFourImage.mediaItemUrl
                                      }
                                      alt={
                                        ourAmbience.ambienceFourImage &&
                                        ourAmbience.ambienceFourImage.altText != ""
                                          ?ourAmbience.ambienceFourImage.altText
                                          : "imag-icon"
                                      }
                                      height={
                                        ourAmbience.ambienceFourImage.mediaDetails &&
                                        ourAmbience.ambienceFourImage.mediaDetails.height
                                          ? ourAmbience.ambienceFourImage.mediaDetails
                                              .height
                                          : 60
                                      }
                                      width={
                                        ourAmbience.ambienceFourImage.mediaDetails &&
                                        ourAmbience.ambienceFourImage.mediaDetails.width
                                          ? ourAmbience.ambienceFourImage.mediaDetails.width
                                          : 137
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                        
                    </div>
              </div>
            </div>
           </div>  
        </div> 
        <GetInTouchFooter data={infrastructureData.solutionSection} />
      </Layout>
    </div>
  );
};

export default infrastructure;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const { data: footerData } = await client.query({
    query: FooterQuery,
  });
  const { data: infrastructureData } = await client.query({
    query: InfrastructureQuery,
  });
  const { data: testimaonialDetails } = await client.query({
    query: TestimonialQuery,
  });

  return {
    props: {
      footerData: footerData,
      infrastructureData: infrastructureData,
      testimaonialDetails: testimaonialDetails,
    },
    revalidate: revalidateInterval,
  };
}

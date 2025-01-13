import client from "@/src/apollo/client";
import { FooterQuery } from "@/src/queries/footerQuery";
import { CultureValuesQuery } from "@/src/queries/cultureValuesQuery";
import Layout from "@/src/components/layouts"; 
import GetInTouchFooter from "@/src/components/getIntouchFooter"; 
import { TestimonialQuery } from "@/src/queries/testimonialQuery";
import GlobalHead from "@/src/components/globalHead";
import Link from "next/link";
import Image from "next/image";
import { Card } from "react-bootstrap";

const cultureValues = (data) => {
    
    const cultureValuesData =data?.cultureValuesData?.page.cultureValuesData;
    const trustBySection =data?.footerData.generalSettings.acfGeneralSettings.trustedBySection;
    const breadcrumTitle= data.cultureValuesData.page.seo.seoSection.breadcrumTitle;
    const brainspateCulture =data?.cultureValuesData?.page.cultureValuesData.brainspateCulture;
    const cultureData =data?.cultureValuesData?.page.cultureValuesData.cultureData;
    
  return (

    <div className="culture-value-page">  
      
      <div className="magento-page">
        <Layout data={data.footerData}>
          {/* <!-- SEO Section --> */}
          <GlobalHead
            seoData={data?.cultureValuesData.page.seo.seoSection}
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
                      __html: cultureValuesData.aboutBannerSection.aboutBannerTitle,
                    }}
                  ></h1>
                </div>
                <div className="sub-title pb-38" dangerouslySetInnerHTML={{
                      __html: cultureValuesData.aboutBannerSection.aboutBannerDescription,
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
          <section className="culture-section light-bg-color">
            <div className="container">
              <div className="culture-block">
                <div className="culture-content">
                  <div className="culture-desc">
                    <h2 dangerouslySetInnerHTML={{__html: brainspateCulture.brainspateCultureTitle,}}></h2>
                    <p dangerouslySetInnerHTML={{__html: brainspateCulture.brainspateCultureDescription,}}></p>
                  </div>
                </div>
                <div className="culture-img">
                {brainspateCulture.cultureImage != null ? (
                    <Image
                        src={
                            brainspateCulture.cultureImage && brainspateCulture.cultureImage.mediaItemUrl
                        }
                        alt={
                            brainspateCulture.cultureImage && brainspateCulture.cultureImage.altText != ""
                            ? brainspateCulture.cultureImage.altText
                            : "hero-banner"
                        }
                        className="w-100"
                        height={
                            brainspateCulture.cultureImage.mediaDetails &&
                            brainspateCulture.cultureImage.mediaDetails.height
                            ? brainspateCulture.cultureImage.mediaDetails.height
                            : 536
                        }
                        width={
                            brainspateCulture.cultureImage.mediaDetails &&
                            brainspateCulture.cultureImage.mediaDetails.width
                            ? brainspateCulture.cultureImage.mediaDetails.width
                            : 431
                        }
                        priority={true}
                    />
                    ) : (
                    ""
                    )}

                </div>
              </div>
              <div className="culture-list">
              {cultureData.cultureData.map(
                (item) => {
                  return (
                    <div className="icon-block">
                       <div className="icon">
                          {item.cultureDataImage != null ? (
                            <Image
                              src={
                                item.cultureDataImage &&
                                item.cultureDataImage
                                  .mediaItemUrl
                              }
                              alt={
                                item.cultureDataImage &&
                                item.cultureDataImage.altText !=
                                  ""
                                  ? item.cultureDataImage.altText
                                  : "star-icon"
                              }
                              height={
                                item.cultureDataImage
                                  .mediaDetails &&
                                item.cultureDataImage
                                  .mediaDetails.height
                                  ? item.cultureDataImage
                                      .mediaDetails.height
                                  : 26
                              }
                              width={
                                item.cultureDataImage
                                  .mediaDetails &&
                                item.cultureDataImage
                                  .mediaDetails.width
                                  ? item.cultureDataImage
                                      .mediaDetails.width
                                  : 25
                              }
                            />
                          ) : (
                            ""
                          )}
                      </div>
                      <h4 dangerouslySetInnerHTML={{__html: item.cultureDataTitle,}}></h4>
                      <p dangerouslySetInnerHTML={{__html: item.cultureDataSubtitle,}}></p>
                    </div>
                  );
                }
              )}
             </div>
            </div> 
          </section> 
          <div className="develop-types brainSpate-values">
                <div className="container">
                    <div className="main-title pb-50">
                    <h2 className="" dangerouslySetInnerHTML={{__html: cultureValuesData.brainspateValues.brainspateValuesTitle,}}></h2>
                    <div
                        className="sub-title"
                        dangerouslySetInnerHTML={{
                        __html: cultureValuesData.brainspateValues.brainspateValuesSubtitle,
                        }}
                    >
                    </div>
                    </div>
                    <div className="dev-box-main d-flex flex-wrap">
                    {cultureValuesData.brainspateValues.valuesData.map((item) => {
                        return (
                        <div key={item.borderColor} className="div-wrap">
                            <Card className={`border-${item.borderColor}`}>
                            <Card.Body>
                                <Card.Title>
                                <h4 className={`hoverd-${item.borderColor}`}>
                                    {item.valuesDataTitle}
                                </h4>
                                </Card.Title>
                                <Card.Text dangerouslySetInnerHTML={{__html: item.valuesDataShortDescription,}}></Card.Text>
                            </Card.Body>
                            </Card>
                        </div>
                        );
                    })}
                    </div>
                </div>
            </div>
          <div className="why-choose-wpweb-section  light-bg-color">
            <div className="container">
                <div className="main-title pb-50">
                <h2 dangerouslySetInnerHTML={{__html: cultureValuesData.whyChooseAboutSection?.whyChooseTitle,}}></h2>
                <div
                    className="sub-title"
                    dangerouslySetInnerHTML={{
                    __html:
                    cultureValuesData.whyChooseAboutSection?.whyChooseDescription,
                    }}
                ></div>
                </div>
                <div className="why-choose-wpweb-box d-flex flex-wrap bg-gradient-10">
                {cultureValuesData.whyChooseAboutSection?.whyChooseRepeater.map(
                    (item) => {
                    return (
                        <div
                        key={item.classname}
                        className="why-choose-wpweb-inner"
                        >
                        <div className="inner">
                            <div className={`number ${item.classname}`}>
                            {item.addNumber}
                            </div>
                            <div
                            className="content"
                            dangerouslySetInnerHTML={{
                                __html: item.addTitle,
                            }}
                            ></div>
                        </div>
                        </div>
                    );
                    }
                )}
                </div>
            </div>
          </div>
          
          <div className="light-bg-color">
            <GetInTouchFooter data={cultureValuesData.aboutSolutionsSection} />
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default cultureValues;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const { data: footerData } = await client.query({
    query: FooterQuery,
  });
  const { data: cultureValuesData } = await client.query({
    query: CultureValuesQuery,
  });
  const { data: testimaonialDetails } = await client.query({
    query: TestimonialQuery,
  });

  return {
    props: {
      footerData: footerData,
      cultureValuesData: cultureValuesData,
      testimaonialDetails: testimaonialDetails,
    },
    revalidate: revalidateInterval,
  };
}

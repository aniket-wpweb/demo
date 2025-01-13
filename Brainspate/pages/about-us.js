import client from "@/src/apollo/client";
import { HomeQuery } from "@/src/queries/homeQuery";
import Layout from "@/src/components/layouts";
import { FooterQuery } from "@/src/queries/footerQuery";
import Review from "@/src/components/review";
import GetInTouchFooter from "@/src/components/getIntouchFooter";
import { TestimonialQuery } from "@/src/queries/testimonialQuery";
import { AboutQuery } from "../src/queries/aboutUsQuery";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import GlobalHead from "@/src/components/globalHead";
import Link from "next/link";
import IsMobile from "@/src/components/isMobile";
import IsDesktop from "@/src/components/isDesktop";
import Slider from "@/src/components/slider";


const AboutUs = (data) => {
  const testimonialPageContent = data?.testimaonialDetails.page;
  const aboutPageData = data?.aboutUsData.page.aboutPageSections;
  const trustBySection =data?.footerData.generalSettings.acfGeneralSettings.trustedBySection;
  const founderDetailSection = aboutPageData.founderDetailSection;
 

  console.log(founderDetailSection);
  //return false;

  return (
    <div className="about-page">
      <Layout data={data.footerData}>
        <GlobalHead
          seoData={data?.aboutUsData.page.seo.seoSection}
          googleTagData={data.footerData.generalSettings.acfGeneralSettings}
        />

        <div className="testimonial-banner ">
          <div className="aboutus-section dark-color">
            <div className="container about-us-main">
              <div className="banner-wrap ">
                <div className="sub-title-top text-top">
                  <Link href="/">Home</Link> / <span>About</span>
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: aboutPageData.aboutBannerSection.aboutBannerTitle,
                    }}
                  ></h1>
                </div>

                <div className="sub-title pb-38"
                dangerouslySetInnerHTML={{
                  __html: aboutPageData.aboutBannerSection.aboutBannerDescription,
                }}
                 > 
                </div>
              </div>

            </div>
          </div>

          <div className="container about-slider">
            <div className="logo-slider d-flex align-items-center justify-content-between">
              <div className="slider-title">
                <h2  dangerouslySetInnerHTML={{
                      __html: trustBySection.trustedByTitle,
                    }}>
                </h2>
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

        <div className="why-choose-wpweb-section triangle-bottom light-bg-color">
          <div className="container">
            <div className="main-title pb-50">
              <h2 dangerouslySetInnerHTML={{
                      __html: aboutPageData.whyChooseAboutSection?.whyChooseTitle,
                    }}></h2>
              <div
                className="sub-title"
                dangerouslySetInnerHTML={{
                  __html:
                    aboutPageData.whyChooseAboutSection?.whyChooseDescription,
                }}
              ></div>
            </div>
            <div className="why-choose-wpweb-box d-flex flex-wrap bg-gradient-10">
              {aboutPageData.whyChooseAboutSection?.whyChooseRepeater.map(
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


        <div className="best-e-commerce">
          <div className="container">
            <div className="half-grid d-flex flex-wrap align-items-center">
            <IsDesktop>
              <div className="half-grid-left w50">
                {aboutPageData.aboutWhatWeDo.whatWeDoImage != null ? (
                  <Image
                    src={
                      aboutPageData.aboutWhatWeDo.whatWeDoImage &&
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaItemUrl
                    }
                    alt={
                      aboutPageData.aboutWhatWeDo.whatWeDoImage &&
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.altText != ""
                        ? aboutPageData.aboutWhatWeDo.whatWeDoImage.altText
                        : "we-do-image"
                    }
                    height={
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails &&
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails
                        .height
                        ? aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails
                            .height
                        : 351
                    }
                    width={
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails &&
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails
                        .width
                        ? aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails
                            .width
                        : 534
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              </IsDesktop>
              <div className="half-grid-right w50">
                <h2
                  className=""
                >
                  {aboutPageData.aboutWhatWeDo.whatWeDoTitle}
                </h2>
                <IsMobile>
              <div className="half-grid-left w50">
                {aboutPageData.aboutWhatWeDo.whatWeDoImage != null ? (
                  <Image
                    src={
                      aboutPageData.aboutWhatWeDo.whatWeDoImage &&
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaItemUrl
                    }
                    alt={
                      aboutPageData.aboutWhatWeDo.whatWeDoImage &&
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.altText != ""
                        ? aboutPageData.aboutWhatWeDo.whatWeDoImage.altText
                        : "we-do-image"
                    }
                    height={
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails &&
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails
                        .height
                        ? aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails
                            .height
                        : 351
                    }
                    width={
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails &&
                      aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails
                        .width
                        ? aboutPageData.aboutWhatWeDo.whatWeDoImage.mediaDetails
                            .width
                        : 534
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              </IsMobile>
                <div
                  className="sub-title "
                  dangerouslySetInnerHTML={{
                    __html: aboutPageData.aboutWhatWeDo.whatWeDoDescription,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
          <div className="about-section">
            <div className="container">
               <div className="about-section-inner half-grid d-flex flex-wrap align-items-center">
                  <div className="about-section-details half-grid-left w50">
                     <div className="about-section-inner">
                        <div className="about-label">
                            <h2 dangerouslySetInnerHTML={{__html: founderDetailSection.founderName,}}></h2>
                            <h5 dangerouslySetInnerHTML={{__html: founderDetailSection.founderDesignation,}}></h5>
                        </div>
                        <div class="about-linkedin">

                        <figure className="text-align-center">
                        <Link href={ founderDetailSection.founderLinkedLink && founderDetailSection.founderLinkedLink != null
                                ? founderDetailSection.founderLinkedLink : ""} target="_blank"> 
                          {founderDetailSection.founderLinkedImage != null ? (
                            <Image
                              src={
                                founderDetailSection.founderLinkedImage &&
                                founderDetailSection.founderLinkedImage.mediaItemUrl
                              }
                              alt={
                                founderDetailSection.founderLinkedImage &&
                                founderDetailSection.founderLinkedImage.altText != ""
                                  ? founderDetailSection.founderLinkedImage.altText
                                  : "imag-icon"
                              }
                              height={
                                founderDetailSection.founderLinkedImage.mediaDetails &&
                                founderDetailSection.founderLinkedImage.mediaDetails.height
                                  ? founderDetailSection.founderLinkedImage.mediaDetails
                                      .height
                                  : 60
                              }
                              width={
                                founderDetailSection.founderLinkedImage.mediaDetails &&
                                founderDetailSection.founderLinkedImage.mediaDetails.width
                                  ? founderDetailSection.founderLinkedImage.mediaDetails.width
                                  : 137
                              }
                            />
                          ) : (
                            ""
                          )}
                          </Link>
                        </figure>
                        </div>
                     </div>
                     <div className="sub-title" dangerouslySetInnerHTML={{__html: founderDetailSection.founderDetail,}}></div>
                  </div>
                  <div className="half-grid-right w50">
                       <div className="founder-image-class">
                       <figure className="text-align-right">
                          {founderDetailSection.founderImage != null ? (
                            <Image
                              src={
                                founderDetailSection.founderImage &&
                                founderDetailSection.founderImage.mediaItemUrl
                              }
                              alt={
                                founderDetailSection.founderImage &&
                                founderDetailSection.founderImage.altText != ""
                                  ? founderDetailSection.founderImage.altText
                                  : "imag-icon"
                              }
                              height={
                                founderDetailSection.founderImage.mediaDetails &&
                                founderDetailSection.founderImage.mediaDetails.height
                                  ? founderDetailSection.founderImage.mediaDetails
                                      .height
                                  : 60
                              }
                              width={
                                founderDetailSection.founderImage.mediaDetails &&
                                founderDetailSection.founderImage.mediaDetails.width
                                  ? founderDetailSection.founderImage.mediaDetails.width
                                  : 137
                              }
                            />
                          ) : (
                            ""
                          )}
                        </figure>
                       </div>
                  </div>
               </div>
             </div>
          </div>

        <Review data={testimonialPageContent} />

        {/* <!-- Award Section --> */}

        <div className="container award-sec-logos-section">
          <h2 dangerouslySetInnerHTML={{
                    __html: aboutPageData.bestEcommerceSection.bestEcommerceTitle,
                  }}></h2>
          <div className="award-sec-logos d-flex flex-wrap justify-space-between">
            <Slider items={aboutPageData.bestEcommerceSection.bestEcommerceRepeater} />

          </div>
        </div>

        <GetInTouchFooter data={aboutPageData.aboutSolutionsSection} />
      </Layout>
    </div>
  );
};

export default AboutUs;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const {
    data: homeData,
    loading,
    networkStatus,
  } = await client.query({
    query: HomeQuery,
  });

  const { data: footerData } = await client.query({
    query: FooterQuery,
  });

  const { data: testimaonialDetails } = await client.query({
    query: TestimonialQuery,
  });

  const { data: aboutUsData } = await client.query({
    query: AboutQuery,
  });

  return {
    props: {
      homeData: homeData,
      footerData: footerData,
      testimaonialDetails: testimaonialDetails,
      aboutUsData: aboutUsData,
    },
    revalidate: revalidateInterval,
  };
}

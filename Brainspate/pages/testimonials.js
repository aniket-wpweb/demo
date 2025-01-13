import client from "@/src/apollo/client";
import { HomeQuery } from "@/src/queries/homeQuery";
import Layout from "@/src/components/layouts";
import { FooterQuery } from "@/src/queries/footerQuery";
import { TestimonialQuery } from "@/src/queries/testimonialQuery";
import GetInTouchFooter from "@/src/components/getIntouchFooter";
import Link from "next/link";
import Rating from "../src/components/rating";
import Image from "next/image";
import GlobalHead from "@/src/components/globalHead";

const testimonials = (homeData) => {
  const homePageData = homeData?.homeData.page.homePageSections;
  const testimonialData =
    homeData?.testimaonialDetails.page.testimonial.ourClientsSection
      .ourClientsContentRepeater;
  const testimonialPageContent = homeData?.testimaonialDetails.page;

  return (
    <div className="testimonials-page">
      <Layout data={homeData.footerData}>
        <GlobalHead
          seoData={testimonialPageContent.seo.seoSection}
          googleTagData={homeData.footerData.generalSettings.acfGeneralSettings}
        />

        <div className="testimonial-section e-com dark-color triangle-bottom">
          <div className="container testimaonial-main test-content">
            <div className="sub-title-top text-top">
              <Link href="/">Home</Link> / <span>Testimonial</span>
            </div>
            <h1
              dangerouslySetInnerHTML={{
                __html: testimonialPageContent.testimonial.testimonial.title,
              }}
            ></h1>
            <div
              className="sub-title pb-38"
              dangerouslySetInnerHTML={{
                __html: testimonialPageContent.content,
              }}
            ></div>
            <div className="fill">
              <Link href="/contact-us">Get In Touch</Link>
            </div>
          </div>
        </div>

        <div className="our-clients">
          <div className="container">
            <div className="our-clients-box d-flex flex-wrap">
              {testimonialData.map((item) => {
                return (
                  <div
                    key={item.ourClientsContentText}
                    className="our-clients-wrap w50 testimonial-content"
                  >
                    <div className="inner">
                      <div className="clients-wrap d-flex flex-wrap">
                        <figure>
                          {item.ourClientsImage != null ? (
                            <Image
                              src={
                                item.ourClientsImage &&
                                item.ourClientsImage.mediaItemUrl
                              }
                              style={{ height: "100%" }}
                              alt={
                                item.ourClientsImage &&
                                item.ourClientsImage.altText != ""
                                  ? item.ourClientsImage.altText
                                  : "testimonial_image"
                              }
                              width={
                                item.ourClientsImage.mediaDetails &&
                                item.ourClientsImage.mediaDetails.width
                                  ? item.ourClientsImage.mediaDetails.width
                                  : 100
                              }
                              height={
                                item.ourClientsImage.mediaDetails &&
                                item.ourClientsImage.mediaDetails.height
                                  ? item.ourClientsImage.mediaDetails.height
                                  : 100
                              }
                            />
                          ) : (
                            ""
                          )}

                          <div className="custome-popup">
                            <a
                              href="https://youtu.be/XcOWiImKnsQ"
                              data-fancybox=""
                              data-caption="This image has a simple caption"
                            >
                              <div className="popup-btn"></div>
                            </a>
                          </div>
                        </figure>
                        <div className="clients-right">
                          <div className="clients-right-inner">
                            <h3>{item.ourClientsContentTitle}</h3>
                            <div className="sub-title">
                              {item.ourClientsContentText}
                            </div>
                            <Rating rating={item.ourClientsRatings} />
                            {/* <div className="stars-div">
                            <div className="stars">
                              <span className="star on"></span>
                              <span className="star on"></span>
                              <span className="star on"></span>
                              <span className="star on"></span>
                              <span className="star half"></span>
                            </div>
                          </div> */}
                          </div>
                          <div className="custome-popup">
                            <a
                              href="https://youtu.be/XcOWiImKnsQ"
                              data-fancybox=""
                              data-caption="This image has a simple caption"
                            >
                              <div className="popup-btn"></div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        className="sub-title title-hover"
                        dangerouslySetInnerHTML={{
                          __html: item.ourClientsContentDescription,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <GetInTouchFooter
          data={testimonialPageContent.testimonial.solutionSection}
        />
      </Layout>
    </div>
  );
};

export default testimonials;

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

  return {
    props: {
      homeData: homeData,
      footerData: footerData,
      testimaonialDetails: testimaonialDetails,
    },
    revalidate: revalidateInterval,
  };
}

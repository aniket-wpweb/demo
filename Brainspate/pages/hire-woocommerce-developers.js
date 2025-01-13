import client from "@/src/apollo/client";
import Layout from "@/src/components/layouts";
import { FooterQuery } from "@/src/queries/footerQuery";
import { eCommerceQuery } from "@/src/queries/eCommerceQuery";
import { TestimonialQuery } from "@/src/queries/testimonialQuery";
import { HireWooCommerceQuery } from "@/src/queries/hireWooCommerceQuery";
import ServiceBanner from "../src/components/serviceBanner";
import OurServices from "../src/components/ourServices";
import OurSolution from "../src/components/ourSolution";
import { Image } from "react-bootstrap";
import DevelopmentProcess from "../src/components/developmentProcess";
import Review from "@/src/components/review";
import FAQ from "../src/components/FAQ";
import GetInTouchFooter from "@/src/components/getIntouchFooter";
import HireFAQ from "../src/components/hireFAQ";
import WhyServices from "@/src/components/whyServices";
import WhyHireDev from "../src/components/whyHireDev";
import HiringModel from "../src/components/hiringModel";
import GlobalHead from "@/src/components/globalHead";
import IsMobile from "@/src/components/isMobile";
import IsDesktop from "@/src/components/isDesktop";

const HireWooCommerce = (data) => {
  const commanServiceData =
    data?.hireWooCommerceData?.page.template.hirePagesCommonSections;
  const serviceData = data?.hireWooCommerceData?.page.hireWoocommercePage;
  const testimonialPageContent = data?.testimaonialDetails.page;
  const breadcrumTitle= data.hireWooCommerceData.page.seo.seoSection.breadcrumTitle;
  const trustBySection =data?.footerData.generalSettings.acfGeneralSettings.trustedBySection;

  return (
    <div className="hire-woocomerce-page">
      <Layout data={data.footerData}>
        {/* <!-- SEO-section-start --> */}
        <GlobalHead
          seoData={data?.hireWooCommerceData.page.seo.seoSection}
          googleTagData={data.footerData.generalSettings.acfGeneralSettings}
          preLoadImage={
            commanServiceData.bannerSection.bannerImage && commanServiceData.bannerSection.bannerImage.mediaItemUrl} 
        />

        {/* <!-- banner-section-start --> */}
        <ServiceBanner data={commanServiceData.bannerSection} breadcrumTitle={breadcrumTitle} trustBySection ={trustBySection}/>

        {/* <!-- our-services-section-start --> */}
        <OurServices data={commanServiceData.ourServicesSection} />

        <div className="why-woocom pt-50 pb-50">
          <WhyServices data={commanServiceData.whyChooseSection} />
        </div>

        {/* <!-- best-e-commerce-start --> */}

        <OurSolution data={commanServiceData.ourSolutionsSection} />

        <WhyHireDev data={commanServiceData.whyHireSection} />

        <div className="theme-section">
          <div className="container">
            <div className="main-title text-align-center">
              <h2>{serviceData.woocommerceThemesAndPluginsSection.addTitle}</h2>
              <IsMobile>
              <div className="theme-image">
                {serviceData.woocommerceThemesAndPluginsSection.addImage !=
                null ? (
                  <Image
                    src={
                      serviceData.woocommerceThemesAndPluginsSection.addImage &&
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaItemUrl
                    }
                    style={{ height: "100%", maxWidth: "1220px" }}
                    alt={
                      serviceData.woocommerceThemesAndPluginsSection.addImage &&
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .altText != ""
                        ? serviceData.woocommerceThemesAndPluginsSection.addImage
                            .altText
                        : "theme-image"
                    }
                    height={
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaDetails &&
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaDetails.height
                        ? serviceData.woocommerceThemesAndPluginsSection.addImage
                            .mediaDetails.height
                        : 633
                    }
                    width={
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaDetails &&
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaDetails.width
                        ? serviceData.woocommerceThemesAndPluginsSection.addImage
                            .mediaDetails.width
                        : 1220
                    }
                  />
                ) : (
                  ""
                )}
              </div>
            </IsMobile>
              <div className="sub-title ">
                {serviceData.woocommerceThemesAndPluginsSection.addDescription}
              </div>
            </div>
            <IsDesktop>
              <div className="theme-image">
                {serviceData.woocommerceThemesAndPluginsSection.addImage !=
                null ? (
                  <Image
                    src={
                      serviceData.woocommerceThemesAndPluginsSection.addImage &&
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaItemUrl
                    }
                    style={{ height: "100%", maxWidth: "1220px" }}
                    alt={
                      serviceData.woocommerceThemesAndPluginsSection.addImage &&
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .altText != ""
                        ? serviceData.woocommerceThemesAndPluginsSection.addImage
                            .altText
                        : "theme-image"
                    }
                    height={
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaDetails &&
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaDetails.height
                        ? serviceData.woocommerceThemesAndPluginsSection.addImage
                            .mediaDetails.height
                        : 633
                    }
                    width={
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaDetails &&
                      serviceData.woocommerceThemesAndPluginsSection.addImage
                        .mediaDetails.width
                        ? serviceData.woocommerceThemesAndPluginsSection.addImage
                            .mediaDetails.width
                        : 1220
                    }
                  />
                ) : (
                  ""
                )}
              </div>
            </IsDesktop>
          </div>
        </div>

        {/* <!-- eCommerce-process-start --> */}

        <div className="triangle-top-bottom light-bg-color">
          <DevelopmentProcess
            data={commanServiceData.developmentProcessSection}
          />
        </div>

        <HiringModel modelData={commanServiceData.hiringModelsSection} />

        <div className="triangle-bottom light-bg-pink-color">       
        <HireFAQ data={serviceData.hireWoocommerceQuestionsSection} classFaqName="hire-faq-section"/>
         </div>       
        {/* <HireFAQ title="Questions To Ask When Hiring WooCommerce Developers" /> */}

        {/* <!-- our-clients-section-start --> */}
        <div className="">
          <Review data={testimonialPageContent} />
        </div>
        <div className="light-bg-color">
          <FAQ data={commanServiceData.servicesFaqSection} />
        </div>
        <div className="color-light-bg-half-top">
          <GetInTouchFooter data={commanServiceData.solutionSection} />
        </div>
      </Layout>
    </div>
  );
};

export default HireWooCommerce;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const {
    data: eCommerceData,
    loading,
    networkStatus,
  } = await client.query({
    query: eCommerceQuery,
  });

  const { data: footerData } = await client.query({
    query: FooterQuery,
  });

  const { data: testimaonialDetails } = await client.query({
    query: TestimonialQuery,
  });

  const { data: hireWooCommerceData } = await client.query({
    query: HireWooCommerceQuery,
  });

  return {
    props: {
      eCommerceData: eCommerceData,
      footerData: footerData,
      testimaonialDetails: testimaonialDetails,
      hireWooCommerceData: hireWooCommerceData,
    },
    revalidate: revalidateInterval,
  };
}

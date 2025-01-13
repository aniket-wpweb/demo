import client from "@/src/apollo/client";
import { FooterQuery } from "@/src/queries/footerQuery";
import Layout from "@/src/components/layouts";
import callIcon from "../public/images/call-icon--.svg";
import Link from "next/link";
import { ThankYouQuery } from "../src/queries/thankYouQuery";
import Image from "next/image";
import GlobalHead from "@/src/components/globalHead";

const shopify = (data) => {
  const pageData = data?.thankYouData.page.thankYouPage.thankYouSection;

  return (
    <div className="thankyou-page">
      <Layout data={data?.footerData}>
        {/* <!-- SEO Section --> */}
        <GlobalHead
          seoData={data?.thankYouData.page.seo.seoSection}
          googleTagData={data.footerData.generalSettings.acfGeneralSettings}
        />

        <div className="thank-banner-section">
          <div className="container thank-you-main text-align-center">
            <div className="thank-you-imgs">
              {pageData.addFirstImage != null ? (
                <Image
                  src={
                    pageData.addFirstImage &&
                    pageData.addFirstImage.mediaItemUrl
                  }
                  alt={
                    pageData.addFirstImage &&
                    pageData.addFirstImage.altText != ""
                      ? pageData.addFirstImage.altText
                      : "Thank you"
                  }
                  height={
                    pageData.addFirstImage.mediaDetails &&
                    pageData.addFirstImage.mediaDetails.height
                      ? pageData.addFirstImage.mediaDetails.height
                      : 385
                  }
                  width={
                    pageData.addFirstImage.mediaDetails &&
                    pageData.addFirstImage.mediaDetails.width
                      ? pageData.addFirstImage.mediaDetails.width
                      : 1152
                  }
                  style={{ height: "100%", maxWidth: "1152px" }}
                  // width={1152}
                  // height={385}
                />
              ) : (
                ""
              )}
              {pageData.addSecondImage != null ? (
                <Image
                  className="thank-img"
                  src={
                    pageData.addSecondImage &&
                    pageData.addSecondImage.mediaItemUrl
                  }
                  alt={
                    pageData.addSecondImage &&
                    pageData.addSecondImage.altText != ""
                      ? pageData.addSecondImage.altText
                      : "Thank you"
                  }
                  height={
                    pageData.addSecondImage.mediaDetails &&
                    pageData.addSecondImage.mediaDetails.height
                      ? pageData.addSecondImage.mediaDetails.height
                      : 153
                  }
                  width={
                    pageData.addSecondImage.mediaDetails &&
                    pageData.addSecondImage.mediaDetails.width
                      ? pageData.addSecondImage.mediaDetails.width
                      : 1220
                  }
                  style={{ height: "100%", maxWidth: "1220px" }}
                  // width={1250}
                  // height={153}
                />
              ) : (
                ""
              )}
            </div>
            <div className="thank-text">
              <h2 dangerouslySetInnerHTML={{
                              __html: pageData.addTitle,}}></h2>
              <p dangerouslySetInnerHTML={{
                              __html: pageData.addDescription,}}></p>
            </div>
            <div className="thank-btn">
              <Link href={"tel:" + pageData.callNowButton}>
                <Image
                  src={callIcon.src}
                  alt="call-icon"
                  height={43}
                  width={43}
                />
                &nbsp; Call Now
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default shopify;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const { data: footerData } = await client.query({
    query: FooterQuery,
  });

  const { data: thankYouData } = await client.query({
    query: ThankYouQuery,
  });

  return {
    props: {
      footerData: footerData,
      thankYouData: thankYouData,
    },
    revalidate: revalidateInterval,
  };
}

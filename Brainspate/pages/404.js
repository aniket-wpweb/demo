import client from "@/src/apollo/client";
import { FooterQuery } from "@/src/queries/footerQuery";
import Layout from "@/src/components/layouts";
import Link from "next/link";
import { PageNotFoundQuery } from "../src/queries/404PageQuery";
import Image from "next/image";
import GlobalHead from "@/src/components/globalHead";

const PageNotFound = (data) => {
  const pageData = data?.pageNotFoundData.page.Page404.page404Section;

  return (
    <div className="error-page">
      <Layout data={data?.footerData}>
        <GlobalHead
          seoData={data?.pageNotFoundData.page.seo.seoSection}
          googleTagData={data.footerData.generalSettings.acfGeneralSettings}
        />

        <div className="error-page-main">
          <div className="page-image">
            <div className="container text-align-center ">
              <div className="mx-auto img-container">
                {pageData.image404 != null ? (
                  <Image
                    src={pageData.image404 && pageData.image404.mediaItemUrl}
                    alt="PageNotFound"
                    height={600}
                    width={800}
                    style={{ height: "100%", maxWidth: "800px" }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="page-image-text">{pageData.oopsText}</div>
            </div>
          </div>
          <div className="container page-text text-align-center">
            <h3
              dangerouslySetInnerHTML={{
                __html: pageData.title404,
              }}
            ></h3>
            <div className="page-btn">
              <Link
                href={
                  pageData.addButtonLink && pageData.addButtonLink.url != null
                    ? pageData.addButtonLink.url
                    : ""
                }
              >
                {pageData.addButtonLink && pageData.addButtonLink.title}
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default PageNotFound;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const { data: footerData } = await client.query({
    query: FooterQuery,
  });

  const { data: pageNotFoundData } = await client.query({
    query: PageNotFoundQuery,
  });

  return {
    props: {
      footerData: footerData,
      pageNotFoundData: pageNotFoundData,
    },
    revalidate: revalidateInterval,
  };
}

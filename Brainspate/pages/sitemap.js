import client from "@/src/apollo/client";
import { FooterQuery } from "@/src/queries/footerQuery";
import { SitemapQuery } from "@/src/queries/sitemapQuery";
import Layout from "@/src/components/layouts";
import Head from "next/head";
import Link from "next/link";
import GlobalHead from "@/src/components/globalHead";


const SiteMap = (data) => {
  const sitemapData = data?.sitemapData?.page.sitemap;
  const companyInformtion =sitemapData?.companyInformtion;
  const companyLinksData =sitemapData?.companyLinksData;
 
  return (
    <Layout data={data?.footerData}>
       <GlobalHead
        seoData={data?.sitemapData.page.seo.seoSection}
        googleTagData={data.footerData.generalSettings.acfGeneralSettings}
      />
      <div className="sitemap-banner dark-color triangle-bottom">
        <div className="container sitemap-banner-contant text-align-center">
          <h1 dangerouslySetInnerHTML={{__html: companyInformtion.pageTitle,}}></h1>
          <p dangerouslySetInnerHTML={{__html: companyInformtion.companyInformation,}}></p>
        </div>
      </div>
      <div className="sitemap-main">
        <div className="container">
             {companyLinksData.importantLinksData.map((item) => {
                return (
                    <div className="sitemap-content">
                      <h2 dangerouslySetInnerHTML={{__html: item.sectionHeading,}}></h2>
                      <div className="sitemap-list">
                        {item.sectionLinksData.map((companyData) => {
                          return (
                              <div className="sitemap-item">
                                  <Link href={companyData.sectionLink.url}>{companyData.sectionLink.title}</Link>
                              </div>
                            );
                          }
                        )}
                        </div>
                    </div>
                    );
                  }
                )}
         </div>
      </div>
    </Layout>
  );
};

export default SiteMap;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const { data: footerData } = await client.query({
    query: FooterQuery,
  });
  const { data :sitemapData} = await client.query({
      query:SitemapQuery,
  });

  return {
    props: {
      footerData: footerData,
      sitemapData :sitemapData,
    },
    revalidate: revalidateInterval,
  };
}

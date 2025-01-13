import client from "@/src/apollo/client";
import { TermServicesQuery} from "@/src/queries/termServices";
import { FooterQuery } from "@/src/queries/footerQuery";
import Layout from "@/src/components/layouts";
import GlobalHead from "@/src/components/globalHead";


const Policy = (data) => {
  return (
    <Layout data={data?.footerData}>
       <GlobalHead
        seoData={data?.termServicesData.page.seo.seoSection}
        googleTagData={data.footerData.generalSettings.acfGeneralSettings}
      />
      <div className="policy-section">
        <div className="container">
          <div className="policy-content" dangerouslySetInnerHTML={{
                        __html: data.termServicesData.page.content,}} >
        </div> 
        </div>
      </div>
    </Layout>
  );
};

export default Policy;

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const { data: footerData } = await client.query({
    query: FooterQuery,
  });
  const { data: termServicesData } = await client.query({
    query: TermServicesQuery,
  });

  return {
    props: {
      footerData: footerData,
      termServicesData:termServicesData,
    },
    revalidate: revalidateInterval,
  };
}

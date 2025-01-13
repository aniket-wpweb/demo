import client from "@/src/apollo/client";
import { HomeQuery } from "@/src/queries/homeQuery";
import { FooterQuery } from "@/src/queries/footerQuery";
import { PortfolioQuery } from "../../src/queries/portfolioQuery";
import { PortfolioMainQuery } from "../../src/queries/portfolioMainQuery";
import Layout from "@/src/components/layouts";
import GetInTouchFooter from "@/src/components/getIntouchFooter";
import Link from "next/link";
import { Card, Col, Row } from "react-bootstrap";

import { useState } from "react";
import Image from "next/image";
import GlobalHead from "@/src/components/globalHead";

const Portfolio = (homeData) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTabClass, setActiveClass] = useState(0);
  const homePageData = homeData?.homeData.page.homePageSections;
  const portfolioData = homeData?.portfolioSectionData;
  const portPostData = homeData?.postData.ourWorks.edges;

  const handleClick = (category,key) => {
    setSelectedCategory(category);
    setActiveClass(key+1);
  };

  const filteredItems = selectedCategory
    ? portPostData.filter((item) =>
        item.node.ourWorkCategories.edges.some(
          (cat) => cat.node.id === selectedCategory.id
        )
      )
    : portPostData;

  return (
    <div className="prtfolio-page">
      <Layout data={homeData.footerData}>
        {/* <!-- SEO Section --> */}
        <GlobalHead
          seoData={portfolioData.page.seo.seoSection}
          googleTagData={homeData.footerData.generalSettings.acfGeneralSettings}
        />

        <div className=" e-com portfolio-section-main dark-color triangle-bottom">
          <div className="container testimaonial-main test-content">
            <div className="sub-title-top text-top">
              <Link href="/">Home</Link> / <span>Portfolio</span>
            </div>
            <h1
              className="test-title"
              dangerouslySetInnerHTML={{
                __html: portfolioData.page.title,
              }}
            ></h1>
            <div
              className="sub-title pb-38"
              dangerouslySetInnerHTML={{
                __html: portfolioData.page.content,
              }}
            ></div>
            <div className="btn-group d-flex flex-wrap">
              <div className={`fill-btn ${activeTabClass === 0 ? 'active' : ''}`} onClick={() => handleClick(null,-1)}>
                All
              </div>
              {portfolioData.ourWorkCategories.edges.map((item,key) => {
                if (item.node.name === "Uncategorised") {
                  return null; // Skip rendering this item
                }
                return (
                  <div
                    key={item.node.id}
                    className={`fill-btn ${activeTabClass === key + 1 ? 'active' : ''}`}
                    onClick={() => handleClick(item.node,key)}
                  >
                    {item.node.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container">
          <Row className="portfolio-listing-main">
            {filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                let image_path ="/images/no-image-available.webp";
                return (
                  <Col
                    className="portfolio-listing-col"
                    key={item.id}
                    lg={6}
                    sm={12}
                  >
                    <Link href={`/portfolio/${item.node.slug}`}>
                      <Card className="prtfolio-listing-cards">
                        <Card.Body>
                          <div className="portfolio-img">
                            {item.node.featuredImage == null? (
                                   <Image
                                   src={
                                     image_path
                                   }
                                   alt={
                                    "No Image Available"
                                   }
                                   className="w-100"
                                   style={{height: "100%"}}
                                   width={
                                    600
                                   }
                                   height={
                                    440
                                   }
                                 />
                            ) : (
                              <Image
                              src={
                                item.node.featuredImage.node &&
                                item.node.featuredImage.node.mediaItemUrl
                              }
                              style={{ width: "100%", height: "100%" }}
                              alt={
                                item.node.featuredImage.node &&
                                item.node.featuredImage.node.altText != ""
                                  ? item.node.featuredImage.node.altText
                                  : "Portfolio-img"
                              }
                              width={
                                item.node.featuredImage.node.mediaDetails &&
                                item.node.featuredImage.node.mediaDetails
                                  .width
                                  ? item.node.featuredImage.node.mediaDetails
                                      .width
                                  : 600
                              }
                              height={
                                item.node.featuredImage.node.mediaDetails &&
                                item.node.featuredImage.node.mediaDetails
                                  .height
                                  ? item.node.featuredImage.node.mediaDetails
                                      .height
                                  : 440
                              }
                            />
                            )}
                          </div>
                          <div className="portfolio-card-text d-flex justify-content-between align-items-center">
                            <Card.Title className="card-text-title">
                              {item.node.title}
                            </Card.Title>
                            {item.node.ourWorkCategories.edges.map(
                              (category) => {
                                return (
                                  <div className="card-tag-list">
                                  <Card.Text
                                    key={category.node.id}
                                    className="card-tag"
                                  >
                                    {category.node.name}
                                  </Card.Text>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })
            ) : (
              <div className="no-data-found">No Data Found</div>
            )}
          </Row>
        </div>

        <GetInTouchFooter data={homePageData.solutionSection} />
      </Layout>
    </div>
  );
};

export default Portfolio;

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

  const { data: postData } = await client.query({
    query: PortfolioQuery,
  });

  const { data: portfolioSectionData } = await client.query({
    query: PortfolioMainQuery,
  });

  return {
    props: {
      homeData: homeData,
      footerData: footerData,
      postData: postData,
      portfolioSectionData: portfolioSectionData,
    },
    revalidate: revalidateInterval,
  };
}

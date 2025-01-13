import { useRouter } from "next/router";
import client from "@/src/apollo/client";
import { HomeQuery } from "@/src/queries/homeQuery";
import { FooterQuery } from "@/src/queries/footerQuery";
import { PortfolioQuery } from "@/src/queries/portfolioQuery";
import { PortfolioInnerQuery } from "@/src/queries/portfolioInnerQuery";
import Layout from "@/src/components/layouts";
import GetInTouchFooter from "@/src/components/getIntouchFooter";
import { Card, Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import GlobalHead from "@/src/components/globalHead";

const portfolioDetails = (homeData) => {
  const homePageData = homeData?.homeData.page.homePageSections;
  const postSections = homeData?.postDetails.ourWorkACF;

  const router = useRouter();

  const backBtn = async (e) => {
    e.preventDefault();
    await router.back();
    // }
  };

  return (
    <div className="portfolio-inner-page">
      <Layout data={homeData.footerData}>
        {/* <!-- SEO Section --> */}
        <GlobalHead
          seoData={homeData?.postDetails.seo.seoSection}
          googleTagData={homeData.footerData.generalSettings.acfGeneralSettings}
        />

        <div className=" portfolio-post-main e-com dark-color triangle-bottom">
          <div className="container testimaonial-main test-content">
            <div className="sub-title-top text-top">
              {/* <span>Go Back</span> */}
              <Link href={".."} onClick={(e) => backBtn(e)}>
                <span>Go Back</span>
              </Link>
            </div>
            <h1>{homeData?.postDetails.title}</h1>
            <div
              className="sub-title pb-38"
              dangerouslySetInnerHTML={{
                __html: homeData?.postDetails.content,
              }}
            ></div>
          </div>
        </div>

        <div className="portfolio-banner-section container">
          <Row>
            {postSections.recognitionSection &&
            postSections.recognitionSection.recognition != null
              ? postSections.recognitionSection.recognition.map((item) => {
                  return (
                    <Col lg={4} md={6} sm={12} key={item.addTitle}>
                      <Card className="portfolio-cards">
                        <Card.Body className="d-flex align-items-center">
                          <div className="card-image">
                            {item.addImage != null ? (
                              <Image
                                src={item.addImage && item.addImage.mediaItemUrl}
                                alt={
                                  item.addImage && item.addImage.altText != ""
                                    ? item.addImage.altText
                                    : "Card-Image"
                                }
                                height={
                                  item.addImage.mediaDetails &&
                                  item.addImage.mediaDetails.height
                                    ? item.addImage.mediaDetails.height
                                    : 80
                                }
                                width={
                                  item.addImage.mediaDetails &&
                                  item.addImage.mediaDetails.width
                                    ? item.addImage.mediaDetails.width
                                    : 80
                                }
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="card-content">
                            <Card.Title className="cardtitle">
                              {item.addTitle}
                            </Card.Title>
                            <Card.Text className="cardtext">
                              {item.addDescription}
                            </Card.Text>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              : ""}
          </Row>
        </div>
        <div className="intro-section">
          <div className="container">
            <div className="half-grid d-flex flex-wrap">
              <div className="half-grid-right w50">
                <h2 className="">{postSections.detailsSection.title}</h2>
                <div
                  className="sub-title"
                  dangerouslySetInnerHTML={{
                    __html: postSections.detailsSection.description,
                  }}
                ></div>
              </div>
              <div className="half-grid-left w50">
                {postSections.detailsSection.image != null ? (
                  <Image
                    src={
                      postSections.detailsSection.image &&
                      postSections.detailsSection.image.mediaItemUrl
                    }
                    alt={
                      postSections.detailsSection.image &&
                      postSections.detailsSection.image.altText != ""
                        ? postSections.detailsSection.image.altText
                        : "Intro-Image"
                    }
                    height={
                      postSections.detailsSection.image.mediaDetails &&
                      postSections.detailsSection.image.mediaDetails.height
                        ? postSections.detailsSection.image.mediaDetails.height
                        : 351
                    }
                    width={
                      postSections.detailsSection.image.mediaDetails &&
                      postSections.detailsSection.image.mediaDetails.width
                        ? postSections.detailsSection.image.mediaDetails.width
                        : 585
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "585px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="intro-section">
          <div className="container">
            <div className="main-title pb-50 text-align-center">
              <h2>{postSections.featuresSection.featureTitle}</h2>
              <div
                className="sub-title"
                dangerouslySetInnerHTML={{
                  __html: postSections.featuresSection.featureDescription,
                }}
              >
                {/* {postSections.featuresSection.featureDescription} */}
              </div>
            </div>
            <div className="half-grid d-flex flex-wrap">
              <div className="half-grid-left w50">
                {postSections.featuresSection.featureImage != null ? (
                  <Image
                    src={
                      postSections.featuresSection.featureImage &&
                      postSections.featuresSection.featureImage.mediaItemUrl
                    }
                    alt={
                      postSections.featuresSection.featureImage &&
                      postSections.featuresSection.featureImage.altText != ""
                        ? postSections.featuresSection.featureImage.altText
                        : "Key-Feature-Image"
                    }
                    height={
                      postSections.featuresSection.featureImage.mediaDetails &&
                      postSections.featuresSection.featureImage.mediaDetails
                        .height
                        ? postSections.featuresSection.featureImage.mediaDetails
                            .height
                        : 351
                    }
                    width={
                      postSections.featuresSection.featureImage.mediaDetails &&
                      postSections.featuresSection.featureImage.mediaDetails
                        .width
                        ? postSections.featuresSection.featureImage.mediaDetails
                            .width
                        : 585
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "585px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div
                className="half-grid-right w50"
                dangerouslySetInnerHTML={{
                  __html: postSections.featuresSection.featuresList,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="portfolio-projects">
            <div className="portfolio-projects-main d-flex flex-wrap reverse">
              <div className="portfolio-projects-left w-30">
                <div className="main-title pb-50">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: postSections.figuresSection.figureSectionTitle,
                    }}
                  ></h2>
                </div>
                {postSections.figuresSection &&
                postSections.figuresSection.figuresDetails != null
                  ? postSections.figuresSection.figuresDetails.map((item) => {
                      return (
                        <div className="project-content d-flex align-items-center">
                          <div className="figure-img">
                            {item.addImage != null ? (
                              <Image
                                src={
                                  item.addImage && item.addImage.mediaItemUrl
                                }
                                alt={
                                  item.addImage && item.addImage.altText != ""
                                    ? item.addImage.altText
                                    : "project-icons"
                                }
                                height={
                                  item.addImage.mediaDetails &&
                                  item.addImage.mediaDetails.height
                                    ? item.addImage.mediaDetails.height
                                    : 50
                                }
                                width={
                                  item.addImage.mediaDetails &&
                                  item.addImage.mediaDetails.width
                                    ? item.addImage.mediaDetails.width
                                    : 50
                                }
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="figure-text">
                            <h4>
                              <span>{item.number}</span>
                              <br />
                              {item.addDescription}
                            </h4>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>

              <div className="portfolio-projects-right w-70">
                {postSections.figuresSection.figureSectionImage != null ? (
                  <Image
                    src={
                      postSections.figuresSection.figureSectionImage &&
                      postSections.figuresSection.figureSectionImage
                        .mediaItemUrl
                    }
                    alt={
                      postSections.figuresSection.figureSectionImage &&
                      postSections.figuresSection.figureSectionImage.altText !=
                        ""
                        ? postSections.figuresSection.figureSectionImage.altText
                        : "project-Image"
                    }
                    height={
                      postSections.figuresSection.figureSectionImage
                        .mediaDetails &&
                      postSections.figuresSection.figureSectionImage
                        .mediaDetails.height
                        ? postSections.figuresSection.figureSectionImage
                            .mediaDetails.height
                        : 479
                    }
                    width={
                      postSections.figuresSection.figureSectionImage
                        .mediaDetails &&
                      postSections.figuresSection.figureSectionImage
                        .mediaDetails.width
                        ? postSections.figuresSection.figureSectionImage
                            .mediaDetails.width
                        : 770
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "770px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="portfolio-projects">
            <div className="portfolio-projects-main d-flex flex-wrap">
              <div className="portfolio-projects-right w-70">
                {postSections.technologySection.technologySectionImage !=
                null ? (
                  <Image
                    src={
                      postSections.technologySection.technologySectionImage &&
                      postSections.technologySection.technologySectionImage
                        .mediaItemUrl
                    }
                    alt={
                      postSections.technologySection.technologySectionImage &&
                      postSections.technologySection.technologySectionImage
                        .altText != ""
                        ? postSections.technologySection.technologySectionImage
                            .altText
                        : "techanology-Image"
                    }
                    height={
                      postSections.technologySection.technologySectionImage
                        .mediaDetails &&
                      postSections.technologySection.technologySectionImage
                        .mediaDetails.height
                        ? postSections.technologySection.technologySectionImage
                            .mediaDetails.height
                        : 479
                    }
                    width={
                      postSections.technologySection.technologySectionImage
                        .mediaDetails &&
                      postSections.technologySection.technologySectionImage
                        .mediaDetails.width
                        ? postSections.technologySection.technologySectionImage
                            .mediaDetails.width
                        : 770
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "770px",
                      objectFit: "contain",
                    }}
                    priority={true}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="portfolio-projects-left  w-30">
                <div className="main-title pb-50">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html:
                        postSections.technologySection.technologySectionTitle,
                    }}
                  ></h2>
                </div>

                {postSections.technologySection &&
                postSections.technologySection.technologyImages != null
                  ? postSections.technologySection.technologyImages.map(
                      (item) => {
                        return (
                          <div className="tech-img">
                            {item != null ? (
                              <Image
                                src={item && item.mediaItemUrl}
                                alt={
                                  item && item.altText != ""
                                    ? item.altText
                                    : "techanology-icons"
                                }
                                height={
                                  item.mediaDetails && item.mediaDetails.height
                                    ? item.mediaDetails.height
                                    : 64
                                }
                                width={
                                  item.mediaDetails && item.mediaDetails.width
                                    ? item.mediaDetails.width
                                    : 150
                                }
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      }
                    )
                  : ""}
              </div>
            </div>
          </div>
        </div>

        <GetInTouchFooter data={homePageData.solutionSection} />
      </Layout>
    </div>
  );
};

export default portfolioDetails;

export async function getStaticPaths() {
  const { data: postData } = await client.query({
    query: PortfolioQuery,
  });
  const paths = postData.ourWorks.edges.map((post) => ({
    params: { slug: post.node.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ context, params }) {
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

  const { data: postInnerData } = await client.query({
    query: PortfolioInnerQuery,
  });

  const { slug } = params;
  const postDetails = postInnerData.ourWorks.nodes.find((p) => p.slug === slug);

  return {
    props: {
      homeData: homeData,
      footerData: footerData,
      postDetails: postDetails,
    },
    revalidate: revalidateInterval,
  };
}

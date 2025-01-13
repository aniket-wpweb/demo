import client from "@/src/apollo/client";
import Layout from "@/src/components/layouts";
import { HomeQuery } from "@/src/queries/homeQuery";
import { FooterQuery } from "@/src/queries/footerQuery";
import { TestimonialQuery } from "@/src/queries/testimonialQuery";
import { Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import LatestWork from "../src/components/latestWork";
import GetInTouch from "@/src/components/getInTouch";
import Review from "@/src/components/review";
import GetInTouchFooter from "@/src/components/getIntouchFooter";
import Image from "next/image";
import GlobalHead from "../src/components/globalHead";
import IsMobile from "@/src/components/isMobile";
import IsDesktop from "@/src/components/isDesktop";
import DiscriptionBtn from "@/src/components/discriptionBtn";
import PostWithReadingTime from "@/src/components/postWithReadingTime";

export default function Home(homeData) {
  
  const homePageData = homeData?.homeData.page.homePageSections;
  const workData = homeData?.homeData.ourWorks.edges;  
  const testimonialPageContent = homeData?.testimaonialDetails.page;
  const trustBySection =homeData?.footerData.generalSettings.acfGeneralSettings.trustedBySection;
  const postData = homeData?.homeData.posts;

  /* Start : Our Work Logic */
  // PAGE portfolio data fetch
  let portfolioIdData = homeData?.homeData.page.portfolioData.portfolioIds; 
  // Common portfolio data fetch
  const generalSettingsData =homeData.footerData.generalSettings.acfGeneralSettings;
  const commonPortfolioIds= generalSettingsData.webSettings.commonPortfolioId;
  //const trustBySection =data?.footerData.generalSettings.acfGeneralSettings.trustedBySection;

  if( portfolioIdData =="" || portfolioIdData ==null){
      portfolioIdData = commonPortfolioIds;
  }
  // Portfolio fiter code
  const workHomeData = workData.filter((item) =>
       portfolioIdData.includes(item.node.databaseId)
  );
  
  /* END : Our Work Logic */
  return (
    <div className="home-page">
      <Layout data={homeData.footerData}>
        {/* <!-- SEO Section --> */}
        <GlobalHead
          seoData={homeData?.homeData.page.seo.seoSection}
          googleTagData={homeData.footerData.generalSettings.acfGeneralSettings}
          preLoadImage={
            homePageData.bannerSection.bannerImage && homePageData.bannerSection.bannerImage.mediaItemUrl} 
        />

        {/* <!-- Banner Section --> */}

        <div className="banner-section">
          <Container>
            <div className="banner-wrap d-flex flex-wrap align-items-center">
              <div className="banner-left w50 b-left">
                <h1>
                  <span>{homePageData.bannerSection.bannerTitle}</span>
                  <br />
                  {homePageData.bannerSection.bannerSubtitle}
                </h1> 
                <div className="banner-right w50">                
                {homePageData.bannerSection.bannerImage != null ? (
                  <Image
                    src={
                      homePageData.bannerSection.bannerImage &&
                      homePageData.bannerSection.bannerImage.mediaItemUrl
                    }
                    unoptimized = {true}
                    alt={
                      homePageData.bannerSection.bannerImage &&
                      homePageData.bannerSection.bannerImage.altText !== ""
                        ? homePageData.bannerSection.bannerImage.altText
                        : "ecommerce"
                    }
                    width={
                      homePageData.bannerSection.bannerImage.mediaDetails &&
                      homePageData.bannerSection.bannerImage.mediaDetails.width
                        ? homePageData.bannerSection.bannerImage.mediaDetails
                            .width
                        : 536
                    }
                    height={
                      homePageData.bannerSection.bannerImage.mediaDetails &&
                      homePageData.bannerSection.bannerImage.mediaDetails.height
                        ? homePageData.bannerSection.bannerImage.mediaDetails
                            .height
                        : 407
                    }
                    priority={true}                    
                  />
                ) : (
                  ""
                )}
              </div> 
                <div className="sub-title">
                  {homePageData.bannerSection.bannerDescription}
                </div>
                <div className="box-shadow banner-logos ">
                  <ul className="banner-logo-list">
                    {homePageData.bannerSection.bannerBottomImages.map(
                      (item) => {
                        return (
                          <li
                            key={
                              item.bottomImage && item.bottomImage.mediaItemUrl
                            }
                          >
                            {item.bottomImage != null ? (
                              <Image
                                src={
                                  item.bottomImage &&
                                  item.bottomImage.mediaItemUrl
                                }
                                alt={
                                  item.bottomImage &&
                                  item.bottomImage.altText !== ""
                                    ? item.bottomImage.altText
                                    : "ecommerce"
                                }
                               
                                width={
                                  item.bottomImage.mediaDetails &&
                                  item.bottomImage.mediaDetails.width
                                    ? item.bottomImage.mediaDetails.width
                                    : 171
                                }
                                height={
                                  item.bottomImage.mediaDetails &&
                                  item.bottomImage.mediaDetails.height
                                    ? item.bottomImage.mediaDetails.height
                                    : 39
                                }
                                priority={true}                               
                              />
                            ) : (
                              ""
                            )}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
                <div className="fillbtn">
                  <Link
                    className="fill"
                    href={
                      homePageData.bannerSection.bannerButton &&
                      homePageData.bannerSection.bannerButton.url != null
                        ? homePageData.bannerSection.bannerButton.url
                        : ""
                    }
                  >
                    {homePageData.bannerSection.bannerButton &&
                      homePageData.bannerSection.bannerButton.title}
                  </Link>
                </div>
              </div>                            
            </div>
          </Container>
        </div>

        {/* <!-- About Us --> */}

        <div className="about-us-section dark-color triangle-bottom">
          <div className="container">
            <div className="half-grid d-flex flex-wrap">
            <IsDesktop>
              <div className="half-grid-left w50">
                {homePageData.aboutUsSection.aboutUsImage != null ? (
                  <Image
                    src={
                      homePageData.aboutUsSection.aboutUsImage &&
                      homePageData.aboutUsSection.aboutUsImage.mediaItemUrl
                    }
                    alt={
                      homePageData.aboutUsSection.aboutUsImage &&
                      homePageData.aboutUsSection.aboutUsImage.altText != ""
                        ? homePageData.aboutUsSection.aboutUsImage.altText
                        : "ecommerce"
                    }                   
                    width={
                      homePageData.aboutUsSection.aboutUsImage.mediaDetails &&
                      homePageData.aboutUsSection.aboutUsImage.mediaDetails
                        .width
                        ? homePageData.aboutUsSection.aboutUsImage.mediaDetails
                            .width
                        : 534
                    }
                    height={
                      homePageData.aboutUsSection.aboutUsImage.mediaDetails &&
                      homePageData.aboutUsSection.aboutUsImage.mediaDetails
                        .height
                        ? homePageData.aboutUsSection.aboutUsImage.mediaDetails
                            .height
                        : 565
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              </IsDesktop>
              <div className="half-grid-right w50" style={{marginLeft:'auto'}}>
                <h2 className="white-text">
                    {homePageData.aboutUsSection?.aboutUsTitle} 
                    {homePageData.aboutUsSection?.aboutPageLinks.map((item,index) => (
                      <>
                        <Link href={item.pageLink?.url || ""}>
                        {" "}
                          {item.pageLink?.title}

                        </Link>
                        {index !== homePageData.aboutUsSection.aboutPageLinks.length - 1 && ','}
                        {index === homePageData.aboutUsSection.aboutPageLinks.length - 2 && ' and '}
                      </>
                    ))}
                </h2>
                <IsMobile>
              <div className="half-grid-left w50">
                {homePageData.aboutUsSection.aboutUsImage != null ? (
                  <Image
                    src={
                      homePageData.aboutUsSection.aboutUsImage &&
                      homePageData.aboutUsSection.aboutUsImage.mediaItemUrl
                    }
                    alt={
                      homePageData.aboutUsSection.aboutUsImage &&
                      homePageData.aboutUsSection.aboutUsImage.altText != ""
                        ? homePageData.aboutUsSection.aboutUsImage.altText
                        : "ecommerce"
                    }                   
                    width={
                      homePageData.aboutUsSection.aboutUsImage.mediaDetails &&
                      homePageData.aboutUsSection.aboutUsImage.mediaDetails
                        .width
                        ? homePageData.aboutUsSection.aboutUsImage.mediaDetails
                            .width
                        : 534
                    }
                    height={
                      homePageData.aboutUsSection.aboutUsImage.mediaDetails &&
                      homePageData.aboutUsSection.aboutUsImage.mediaDetails
                        .height
                        ? homePageData.aboutUsSection.aboutUsImage.mediaDetails
                            .height
                        : 565
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              </IsMobile>      
                <div className="sub-title colored-text">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: homePageData.aboutUsSection?.aboutUsDescription,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!--Our Services --> */}

        <div className="our-services">
          <Container>
            <div className="main-title pb-50">
              <h2  dangerouslySetInnerHTML={{
                  __html:homePageData.ourServiceSection?.ourServiceTitle,
                }}></h2>
              <div
                className="sub-title"
                dangerouslySetInnerHTML={{
                  __html: homePageData.ourServiceSection?.ourServiceDescription,
                }}
              ></div>
            </div>
            <Row className="our-services-box">
              {homePageData.ourServiceSection?.ourServiceRepeater.map(
                (item) => {
                  return (
                    <Col
                      key={item.contentTitle}
                      sm={12}
                      md={6}
                      lg={3}
                      className="our-services-wrap"
                    >
                      <Card className="inner">
                        <figure>
                          {item.contentImage != null ? (
                            <Image
                              src={
                                item.contentImage &&
                                item.contentImage.mediaItemUrl
                              }
                              alt={
                                item.contentImage &&
                                item.contentImage.altText != ""
                                  ? item.contentImage.altText
                                  : "ecommerce"
                              }
                              width={
                                item.contentImage.mediaDetails &&
                                item.contentImage.mediaDetails.width
                                  ? item.contentImage.mediaDetails.width
                                  : 51
                              }
                              height={
                                item.contentImage.mediaDetails &&
                                item.contentImage.mediaDetails.height
                                  ? item.contentImage.mediaDetails.height
                                  : 45
                              }                          
                            />
                          ) : (
                            ""
                          )}
                        </figure>
                        <Card.Body>
                          <Card.Title>
                            <h4>{item.contentTitle}</h4>
                          </Card.Title>
                          <Card.Text className="description" dangerouslySetInnerHTML={{
                              __html: item.contentDescription,
                          }}>
                          </Card.Text>
                        </Card.Body>
                        <div className="read-more">
                          <Link
                            href={
                              item.contentButtonLink &&
                              item.contentButtonLink.url != null
                                ? item.contentButtonLink.url
                                : ""
                            }
                          >
                            {item.contentButtonLink &&
                              item.contentButtonLink.title}
                          </Link>
                        </div>
                      </Card>
                    </Col>
                  );
                }
              )}
            </Row>
          </Container>
        </div>

        {/* <!-- Why Choose WPWeb Infotech --> */}

        <div className="why-choose-wpweb-section triangle-top-bottom light-bg-color">
          <Container>
            <div className="main-title pb-50">
              <h2 dangerouslySetInnerHTML={{
                  __html:
                  homePageData.whyChooseBrainspateSection?.whyChooseTitle,
                }}></h2>
              <div
                className="sub-title"
                dangerouslySetInnerHTML={{
                  __html:
                    homePageData.whyChooseBrainspateSection
                      ?.whyChooseDescription,
                }}
              >
                {/* {homePageData.whyChooseBrainspateSection?.whyChooseDescription} */}
              </div>
            </div>
            <div className="why-choose-wpweb-box d-flex flex-wrap bg-gradient-10">
              {homePageData.whyChooseBrainspateSection?.whyChooseRepeater.map(
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
          </Container>
        </div>

        {/* <!-- Our Latest Work --> */}

        <LatestWork
          data={homePageData.ourLatestWorkSection}
          workHomeData={workHomeData}
        />

        {/* <!-- Get In Touch --> */}

        <div className="get-in-touch dark-bg-half">
          <Container>
            <div className="get-in-touch-wrap">
              <GetInTouch data={homePageData.getInTouchSection} />
            </div>
          </Container>
        </div>

        {/*<!-- Trusted By -->  */}
        <div className="trusted-by-section dark-color color-triangle-bottom">
          <Container>
            <div className="title">
              <h2 className="white-text">
                {homePageData.trustedBySection?.trustedByTitle}
              </h2>
            </div>
            <div className="trusted-by-logo d-flex flex-wrap">
              {homePageData.trustedBySection?.trustedByRepeater.map((item) => {
                return (
                  <div
                    key={
                      item.trustedByImage && item.trustedByImage.mediaItemUrl
                    }
                    className="trusted-by-image"
                  >
                    <figure>
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
                              : "ecommerce"
                          }                          
                          width={
                            item.trustedByImage.mediaDetails &&
                            item.trustedByImage.mediaDetails.width
                              ? item.trustedByImage.mediaDetails.width
                              : 202
                          }
                          height={
                            item.trustedByImage.mediaDetails &&
                            item.trustedByImage.mediaDetails.height
                              ? item.trustedByImage.mediaDetails.height
                              : 87
                          }                        
                        />
                      ) : (
                        ""
                      )}
                    </figure>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>

        {/* <!-- Recent Blogs --> */}
{/*
        { <div className="recent-blogs color-triangle-top light-bg-color">
          <div className="container">
            <DiscriptionBtn
              title={homePageData.recentBlogsSection?.recentBlogsTitle}
              subTitle={
                <>{homePageData.recentBlogsSection?.recentBlogsDescription}</>
              }
              link ={homePageData.recentBlogsSection?.recentBlogsLink}
            />
            <div className="recent-blogs-box d-flex flex-wrap">
              {postData.edges.map((item) => { 
                return (
                  <div key={item.node.title} className="recent-blogs-wrap">
                    <div className="inner">
                      <figure>
                        <Link href={`/blog/${item.node.slug}`}>  
                           
                          <Image
                            src={item.node.featuredImage.node.mediaItemUrl}
                            className="w-100"
                            alt={
                              item.node.featuredImage.node &&
                              item.node.featuredImage.node.altText != ""
                                ? item.node.featuredImage.node.altText
                                : "blog-image"
                            }
                            height={
                              item.node.featuredImage.node.mediaDetails &&
                              item.node.featuredImage.node.mediaDetails.height
                                ? item.node.featuredImage.node.mediaDetails
                                    .height
                                : 389
                            }
                            width={
                              item.node.featuredImage.node.mediaDetails &&
                              item.node.featuredImage.node.mediaDetails.width
                                ? item.node.featuredImage.node.mediaDetails
                                    .width
                                : 220
                            }

                          />
                          
                      </Link> 
                      </figure>
                      <div className="recent-blogs-content">
                        <h3>                          
                          <Link href={`/blog/${item.node.slug}`}>  {item.node.title} </Link> 
                        </h3>
                        <div className="category-wrap">
                          <ul className="list-style-none">
                            {item.node.categories.nodes.map((category) => {
                              return (
                                <li>
                                 {category.name}
                                </li>
                              );
                            })}
                          </ul>
                          <div className="min-read"><PostWithReadingTime content={item.node.content} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div> 
              <div class="fillbtn mobile-show"> 
                <Link
                      className="fill"
                        href={
                          homePageData.recentBlogsSection?.recentBlogsLink?.url
                        }
                      >
                      { homePageData.recentBlogsSection?.recentBlogsLink?.title}
                      </Link>
                      </div>
            </div> 
        </div> }
*/}
        {/* <!-- See What Our Clients Say --> */}

        <Review data={testimonialPageContent} />

        <GetInTouchFooter data={homePageData.solutionSection} />
      </Layout>
    </div>
  );
}

export async function getStaticProps(context) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const {
    data: homeData,
    loading,
    networkStatus,
  } = await client.query({
    query: HomeQuery,
  });
  /*   const { data: postData } = await client.query({
     query: PortfolioQuery,
   });
*/
  const { data: footerData } = await client.query({
    query: FooterQuery,
  });

  const { data: testimaonialDetails } = await client.query({
    query: TestimonialQuery,
  });

  // const { data: webSettingsData } = await client.query({
  //   query: WebSettingQuery,
  // });

  return {
    props: {
      homeData: homeData,
      footerData: footerData,
      testimaonialDetails: testimaonialDetails,
    },
    revalidate: revalidateInterval,
  };
}

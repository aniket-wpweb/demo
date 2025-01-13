import { gql } from "@apollo/client";

export const wooCommerceQuery = gql`
  query woocommerce {
    page(id: "woocommerce", idType: URI) {
      template {
        ... on Template_Services {
          templateName
          commanServicesSection {
            bannerSection {
              bannerButton {
                title
                url
              }
              bannerSubtitle
              bannerTitle
              bannerImage {
                mediaItemUrl
                altText
                mediaDetails {
                  height
                  width
                  sizes(exclude: LARGE) {
                    file
                    fileSize
                    height
                    mimeType
                    name
                    sourceUrl
                    width
                  }
                }
              }
            }
            bestServicesSection {
              bestServicesDescription
              bestServicesTitle
              bestServicesImage {
                mediaItemUrl
                altText
                mediaDetails {
                  height
                  width
                  
                }
              }
            }
            developmentProcessSection {
              developmentProcessDescription
              developmentProcessTitle
              developmentProcessImage {
                mediaItemUrl
                altText
                mediaDetails {
                  height
                  width
                }
              }
              developmentProcessRepeater {
                addClassname
                addProcessDescription
                addProcessTitle
                addProcessIcon {
                  mediaItemUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
              }
            }
            getInTouchSection {
              getInTouchTiitle
              getInTouchDescription
              getInTouchLink {
                title
                url
              }
            }
            ourSolutionsSection {
              ourSolutionsDescription
              ourSolutionsTitle
              ourSolutionsButton {
                title
                url
              }
            }
            servicesFaqSection {
              faqTitle
              faqDescription
              faqContent {
                faqQuestion
                faqAnswer
                faqId
              }
            }
            whyChooseSection {
              whyChooseDescription
              whyChooseTitle
              whyChooseRepeater {
                addContentDescription
                addContentNumber
                addContentTitle
              }
            }
            ourServicesSection {
              ourWorkTitle
              ourWorkDescription
              ourWorkRepeater {
                bgClass
                contentDescription
                contentNumber
                contentTitle
                textClass
              }
            }
            ourLatestWorkSection {
              ourWorkTitle
              ourWorkDescription
              ourWorkLink {
                title
                url
              }
            }
            solutionSection {
              solutionTitle
              solutionDescription
              solutionImage {
                mediaItemUrl
                altText
                mediaDetails {
                  height
                  width
                }
              }
              solutionLink {
                title
                url
              }
            }
          }
        }
      }
      woocommerceSections {
        enterpriseSection {
          enterpriseDescription
          enterpriseImage {
            mediaItemUrl
            altText
            mediaDetails {
              height
              width
            }
          }
          enterpriseRepeater {
            accordionBody
            accordionSubTitle
            accordionTitle
            id
          }
          enterpriseTitle
        }
        themesAndPluginsSection {
          themesAndPluginsDescripiton
          themesAndPluginsTitle
          themesAndPluginsImage {
            mediaItemUrl
            altText
            mediaDetails {
              height
              width
            }
          }
        }
        whyWoocommerceSection {
          whyContentDescription
          whyContentTitle
          whyContentRepeater {
            addClassname
            addDescription
            addTitle
            addImage {
              mediaItemUrl
              altText
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }
      portfolioData {
        portfolioIds
      }
      seo {
        seoSection {
          title
          metaDescription
          noIndex
          breadcrumTitle
          headerScript {
            headerScript
            headerScriptType
          }
          ogCardsSection {
            ogCards {
              ogContent
              ogProperty
            }
          }
          twitterCardsSection {
            twitterCards {
              twitterContent
              twitterName
            }
          }
        }
      }
    }
   
    ourWorks {
      edges {
        node {
          title
          content
          id
          slug
          databaseId
          featuredImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                height
                width
              }
            }
          }
          ourWorkACF {
            logo {
              mediaItemUrl
              altText
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }
    }
    posts(last: 3) {
      edges {
        node {
          title
          featuredImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                height
                width
              }
            }
          }
          categories {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

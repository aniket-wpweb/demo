import { gql } from "@apollo/client";

export const AboutQuery = gql`
  query aboutPage {
    page(id: "about", idType: URI) {
      aboutPageSections {
        aboutBannerSection {
          aboutBannerDescription
          aboutBannerTitle
         
          aboutBannerImage {
            mediaItemUrl
            altText
            mediaDetails {
              height
              width
            }
          }
        }
        aboutSolutionsSection {
          solutionDescription
          solutionTitle
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
        aboutWhatWeDo {
          whatWeDoDescription
          whatWeDoTitle
          whatWeDoImage {
            mediaItemUrl
            altText
            mediaDetails {
              height
              width
            }
          }
        }
        bestEcommerceSection {
          bestEcommerceTitle
          bestEcommerceRepeater {
            bestEcommerceImages {
              mediaItemUrl
              altText
              mediaDetails {
                height
                width
              }
            }
            bestEcommerceLink {
              url
            }
          }
        }
        founderDetailSection {
          founderDesignation
          founderDetail
          founderName
          founderImage {
            altText
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
          founderLinkedLink
          founderLinkedImage {
            altText
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
        }
        clutchSection {
          clutchTitle
          starRatings
          addLink {
            title
            url
          }
          clutchRepeater {
            addDescription
            addRatingStar
            addAuthor
          }
          reviewCount
          reviewText
        }
        whyChooseAboutSection {
          whyChooseDescription
          whyChooseTitle
          whyChooseRepeater {
            addNumber
            addTitle
            classname
          }
        }
      }
      seo {
        seoSection {
          title
          metaDescription
          noIndex
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
  }
`;

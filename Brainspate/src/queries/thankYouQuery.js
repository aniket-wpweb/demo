import { gql } from "@apollo/client";

export const ThankYouQuery = gql`
  query thankYou {
    page(id: "thank-you", idType: URI) {
      thankYouPage {
        thankYouSection {
          addFirstImage {
            mediaItemUrl
            altText
            mediaDetails {
              height
              width
            }
          }
          addSecondImage {
            mediaItemUrl
            altText
            mediaDetails {
              height
              width
            }
          }
          addTitle
          addDescription
          callNowButton
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

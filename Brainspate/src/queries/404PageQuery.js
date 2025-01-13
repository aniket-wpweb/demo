import { gql } from "@apollo/client";

export const PageNotFoundQuery = gql`
  query page404 {
    page(id: "404-page", idType: URI) {
      Page404 {
        page404Section {
          image404 {
            mediaItemUrl
            altText
            mediaDetails {
              height
              width
            }
          }
          addButtonLink {
            title
            url
          }
          oopsText
          title404
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

import Head from "next/head";
import { useRouter } from "next/router";

const GlobalHead = (props) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const router = useRouter();
  let ogTitleFound = "";
  let ogDescriptionFound ="";
  let twitterTitleFound ="";
  let twitterDescriptionFound ="";
  
  let currentLocation =
    router.pathname === "/portfolio/[slug]"
      ? `/portfolio/${router.query.slug}`
      : router.pathname === "/blog/[slug]"
      ? `/blog/${router.query.slug}`
      : router.pathname === "/author/[slug]"
      ? `/author/${router.query.slug}`
      : router.pathname;
  return (
    <Head>
       {props.seoData.title != '' &&  props.seoData.title != null ? (
          <title>{props.seoData.title}</title>
       ):(
          <title> eCommerce Development Company | BrainSpate</title> 
        )
      }
      <link rel="shortcut icon" href="/favicon.ico"></link>
      {props.googleTagData.webSettings.dnsDomainList &&
      props.googleTagData.webSettings.dnsDomainList != null
        ? props.googleTagData.webSettings.dnsDomainList.map((item , index) => {
          if (item.domainName && item.domainName !=null) {
            return <link rel="dns-prefetch" href={item.domainName } key={index}/>;
          }else{
            return "";
          }
          })
        : ""}

      {props.seoData.metaDescription != '' &&  props.seoData.metaDescription != null ? (
          <meta name="description" content={props.seoData.metaDescription}></meta>
       ):(
          <meta name="description" content="Experience the future of eCommerce with BrainSpate. We leverage innovative technology to design, develop, and optimize user-centric eCommerce platforms, tailored to your business needs."></meta>
       )
      }
      
      <meta
        name="robots"
        content={
          props.seoData.noIndex === true ? "noindex,nofollow" : "index,follow"
        }
      />

      {/* OG Cards Meta  */}
      {props.seoData.ogCardsSection &&
      props.seoData.ogCardsSection.ogCards != null
        ? props.seoData.ogCardsSection.ogCards.map((item) => {
          if(item.ogProperty == "og:title"){
              ogTitleFound =1;

          }
          if(item.ogProperty == "og:description"){
            ogDescriptionFound =1;
          }

          if (item.ogProperty && item.ogContent) {
            return <meta property={item.ogProperty} content={item.ogContent} />;
          }else{
            return <meta property="description" content="Boost your online business with BrainSpate, the top eCommerce development company. Enhance sales, user experience, and stay ahead of the competition." />;
          
          }
          })
        : ""}
        
        {ogTitleFound== "" ? (
          <meta property="og:title" content={props.seoData.title}></meta>
          ):(
              ""
          )
        }
        {ogDescriptionFound== "" ? (
          <meta property="og:description" content={props.seoData.metaDescription}></meta>
          ):(
              ""
          )
        }
      {/* Twitter Cards Meta  */}
      {props.seoData.twitterCardsSection &&
      props.seoData.twitterCardsSection.twitterCards != null
        ? props.seoData.twitterCardsSection.twitterCards.map((item) => {
          if(item.twitterName == "twitter:title"){
            twitterTitleFound =1;

          }
          if(item.twitterName == "twitter:description"){
            twitterDescriptionFound =1;
          }

          if (item.twitterName && item.twitterContent ) {
            return <meta name={item.twitterName} content={item.twitterContent} />
          }else{
            return "";
          }
        })
      : ""}

      {twitterTitleFound== "" ? (
          <meta name="twitter:title" content={props.seoData.title}></meta>
          ):(
              ""
          )
        }
        {twitterDescriptionFound== "" ? (
          <meta name="twitter:description" content={props.seoData.metaDescription}></meta>
          ):(
              ""
          )
        }


      {/* Canonical Details  */}
      
      {currentLocation === '/' ? (
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}${currentLocation}`}
        />
      ) : (
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}${currentLocation}/`}
        />
      )}



      {!props.preLoadImage || props.preLoadImage == null || props.preLoadImage == undefined ? ('') : (
        (props?.preLoadImage && props?.preLoadImage?.split('?')[0]?.split('.')?.pop() == 'png' || props?.preLoadImage?.split('?')[0]?.split('.')?.pop() == 'jpg') ? (
        <link
          rel="preload" as="image" href={encodeURI("/_next/image/?url="+props.preLoadImage+"&w=1080&q=75") }
          />
        ) : <link
        rel="preload" as="image" href={props.preLoadImage}
        />)
      }

      {/* Header Script  */}
      {props.seoData.headerScript && props.seoData.headerScript != null
        ? props.seoData.headerScript.map((item) => {
            return (
            

            <script
  type={`${item.headerScriptType}`}
  dangerouslySetInnerHTML={{ __html: unescape(item.headerScript) }}
/>
            );
          })
        : ""}
    </Head>
  );
};

export default GlobalHead;

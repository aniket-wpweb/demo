import client from "@/src/apollo/client";
import { HomeQuery } from "@/src/queries/homeQuery";
import Layout from "@/src/components/layouts";
import { FooterQuery } from "@/src/queries/footerQuery";
import { authorBlogDetail } from "@/src/queries/authorDetailQuery";
import { AuthorListingQuery } from "@/src/queries/authorListingQuery";
import GetInTouchFooter from "@/src/components/getIntouchFooter";
import GlobalHead from "@/src/components/globalHead";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import PostWithReadingTime from "@/src/components/postWithReadingTime";


const AuthorInner = (homeData) => {

  const homePageData = homeData?.homeData.page.homePageSections;
  const blogListing = homeData?.blogListData.posts.nodes;
  const foundUser = homeData.userData.users.nodes ? homeData.userData.users.nodes.find((user) => user.slug === homeData.authorSlug) : null;

  
  function formatDateArray(blogListing) {
    for (let i = 0; i < blogListing.length; i++) {
      const date = new Date(blogListing[i].date);
      const options = { month: "short", day: "2-digit", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      blogListing[i].date = formattedDate;
    }
  }
  formatDateArray(blogListing);
  
  return (
    <div className="blog-page">
      <Layout data={homeData.footerData}>
        {/* <!-- SEO Section --> */}
        <GlobalHead
          seoData={foundUser?.seo.seoSection}
          googleTagData={homeData.footerData.generalSettings.acfGeneralSettings}
        />
 
        <div className="testimonial-section e-com dark-color triangle-bottom author-banner">
          <div className="container testimaonial-main test-content">
            <div className="sub-title-top text-top">
              <Link href="/">Home</Link> / <Link href="/blog">Blog</Link>  / <span>{foundUser.name}</span>
            </div>
            <div className="author-banner-content">
              <div className="author-img">
                      {foundUser.avatar != null ? (
                        <Image 
                          src={
                            foundUser.avatar &&
                            foundUser.avatar.url
                          }
                          alt="user"
                          height={
                            foundUser.avatar.height
                              ? foundUser.avatar.height
                              : 180
                          }
                          width={
                            foundUser.avatar.width
                              ? foundUser.avatar.width
                              : 180
                          }
                        />
                      ) : (
                        ""
                      )}
              </div>
              <div className="author-content">
                  <h1>{foundUser.name}</h1>
                  <p>{foundUser.description}</p>
              </div>
            </div>
          </div>
        </div>
{/*
        <div className="recent-blogs">
          <div className="container">
            <div className="recent-blogs-box d-flex flex-wrap">
              {blogListing.map((item) => {
               
                return (
                  <div key={item.postId} className="recent-blogs-wrap">
                    <div className="inner">
                      <figure>
                        <Link href={`/blog/${item.slug}`}>
                          {item.featuredImage.node != null ? (
                            <Image
                              src={
                                item.featuredImage.node &&
                                item.featuredImage.node.mediaItemUrl
                              }
                              className="w-100"
                              alt={
                                item.featuredImage.node &&
                                item.featuredImage.node.altText != ""
                                  ? item.featuredImage.node.altText
                                  : "blog-image"
                              }
                              height={
                                item.featuredImage.node.mediaDetails &&
                                item.featuredImage.node.mediaDetails.height
                                  ? item.featuredImage.node.mediaDetails
                                      .height
                                  : 389
                              }
                              width={
                                item.featuredImage.node.mediaDetails &&
                                item.featuredImage.node.mediaDetails.width
                                  ? item.featuredImage.node.mediaDetails
                                      .width
                                  : 220
                              }
                            />
                          ) : (
                            ""
                          )}
                        </Link>
                      </figure>
                      <div className="provider d-flex justify-content-between align-items-center">
                        <div className="provider-details d-flex align-items-baseline">
                          {item.author.node.avatar != null ? (
                            <Image
                              className="provider-img"
                              src={
                                item.author.node.avatar &&
                                item.author.node.avatar.url
                              }
                              alt="user"
                              height={
                                item.author.node.avatar.height
                                  ? item.author.node.avatar.height
                                  : 96
                              }
                              width={
                                item.author.node.avatar.width
                                  ? item.author.node.avatar.width
                                  : 96
                              }
                            />
                          ) : (
                            ""
                          )}

                          <h6> <Link href={`/author/${homeData.authorSlug}`}>{item.author.node.name}</Link></h6>
                        </div>
                        <div className="provider-time">{item.date}</div>
                      </div>
                      <div className="recent-blogs-content">
                        <h3>
                          {" "}
                          <Link href={`/blog/${item.slug}`}>
                            {item.title}
                          </Link>
                          
                        </h3>
                        <div className="category-wrap">
                          <ul className="list-style-none">
                            {item.categories.edges.map((category) => {
                              return (
                                <li key={category.name}>
                                  {category.node.name}
                                </li>
                              );
                            })}
                          </ul>                          
                          <div className="min-read"><PostWithReadingTime content={item.content} /></div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>
        </div>
*/}
        <GetInTouchFooter data={homePageData.solutionSection} />
      </Layout>
    </div>
  );
};

export default AuthorInner;

export async function getStaticPaths() {
    const { data: userData } = await client.query({
        query: AuthorListingQuery,
      });
      
      const paths = userData.users.nodes.map((post) => ({
        params: { slug: post.slug },
      }));

    return {
      paths,
      fallback: false,
    };
  }

  export async function getStaticProps({ params }) {
  const revalidateInterval = Number(process.env.REVALIDATE_INTERVAL);
  const {authorSlug} =   params;
    
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

  const { data: authorblogData } = await client.query({
    query: authorBlogDetail,
    variables: {
      authorSlug: params.slug,
    },
});

const { data: userData } = await client.query({
  query: AuthorListingQuery,
});



//const authorData = userData.find(user => user.slug === params.slug);


  return {
    props: {
      homeData: homeData,
      footerData: footerData,
      blogListData: authorblogData,
      userData:userData,
      authorSlug:params.slug,
    },
    revalidate: revalidateInterval,
  };
  
}

import Image from "next/image";
import Link from "next/link";

const LatestWork = (props) => {
  const { data, workHomeData } = props;
  let portfoliolink =data.ourWorkLink.url;
  let portfoliotext =data.ourWorkLink.title;
 
  return (
    <div className="our-latest-work">
      <div className="container">
        <div className="main-title d-flex flex-wrap align-items-center justify-space-between pb-38">
          <div className="title-left w-80">
            <h2 dangerouslySetInnerHTML={{
                    __html: data.ourWorkTitle}}></h2>
            <div className="sub-title" dangerouslySetInnerHTML={{
                    __html: data.ourWorkDescription}}></div>
          </div>
          <div className="title-right">
            <div className="fillbtn">
              <Link className="fill"
                href={
                  data.ourWorkLink && data.ourWorkLink.url != null
                    ? data.ourWorkLink.url
                    : ""
                }
              >
                {data.ourWorkLink && data.ourWorkLink.title}
              </Link>
            </div>
          </div>
        </div>
        <div className="our-latest-post">
          {workHomeData.map((item) => {
            let image_path ="/images/no-image-available.webp";                         
            return (
              <div key={item.node.id} className="our-latest-wrap">
                <div className="inner d-flex flex-wrap align-items-center">
                  <div className="our-latest-left w50">
                    <figure>
                      {item.node.featuredImage == null   ? (
                         <Image
                         src={
                           image_path
                         }
                         alt={
                          "No Image available"
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
                           // image_path
                            item.node.featuredImage.node.mediaItemUrl
                          }
                          alt={
                            item.node.featuredImage.node &&
                            item.node.featuredImage.node.altText != ""
                              ? item.node.featuredImage.node.altText
                              : "JB-Estates"
                          }
                          className="w-100"
                          style={{height: "100%"}}
                          width={
                            item.node.featuredImage.node.mediaDetails &&
                            item.node.featuredImage.node.mediaDetails.width
                              ? item.node.featuredImage.node.mediaDetails.width
                              : 600
                          }
                          height={
                            item.node.featuredImage.node.mediaDetails &&
                            item.node.featuredImage.node.mediaDetails.height
                              ? item.node.featuredImage.node.mediaDetails.height
                              : 440
                          }
                        />
                       
                      )}
                    </figure>
                  </div>
                  <div className="our-latest-right w50">
                    <figure>
                      {item.node.ourWorkACF.logo != null ? (
                        <Image
                          src={
                            item.node.ourWorkACF.logo &&
                            item.node.ourWorkACF.logo.mediaItemUrl
                          }
                          alt={
                            item.node.ourWorkACF.logo &&
                            item.node.ourWorkACF.logo.altText != ""
                              ? item.node.ourWorkACF.logo.altText
                              : "JB-Estates-logo"
                          }
                          width={
                            item.node.ourWorkACF.logo.mediaDetails &&
                            item.node.ourWorkACF.logo.mediaDetails.width
                              ? item.node.ourWorkACF.logo.mediaDetails.width
                              : 257
                          }
                          height={
                            item.node.ourWorkACF.logo.mediaDetails &&
                            item.node.ourWorkACF.logo.mediaDetails.height
                              ? item.node.ourWorkACF.logo.mediaDetails.height
                              : 95
                          }
                        />
                      ) : (
                        ""
                      )}
                    </figure>
                  
                  {item.node.title != '' &&  item.node.title != null ? (
                        <h3>{item.node.title}</h3>
                    ):(
                       ""
                      )
                    }
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: item.node.content,
                      }}
                    >
                      {/* {item.node.content} */}
                    </div>
                    <div className="read-more">
                      <Link href={`/portfolio/${item.node.slug}`}>
                        View More Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Link className="fill"
                href={
                  portfoliolink
                }
              >
                {portfoliotext}
           </Link>
      </div>       
    </div>
  );
};

export default LatestWork;

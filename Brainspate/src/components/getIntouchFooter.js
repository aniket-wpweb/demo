import React from "react";
import Link from "next/link";
import Image from "next/image";

const GetInTouchFooter = (props) => {
  const { data } = props;

  return (
    <>
      <div className="color-bg-half">
        <div className="container">
          <div className="solutions-sec">
            <div className="our-solutions-footer get-in-touch-wrap d-flex flex-wrap justify-space-between align-items-center">
              <div className="title white-text w-60">
                <h2 className="white-text" dangerouslySetInnerHTML={{
                    __html: data?.solutionTitle,
                  }}></h2>
                <div
                  className="sub-title colored-text"
                  dangerouslySetInnerHTML={{
                    __html: data?.solutionDescription,
                  }}
                >
                  {/* {data?.solutionDescription} */}
                </div>
              </div>
              <div className="fillbtn">
                <Link className="fill"
                  href={
                    data.solutionLink && data?.solutionLink.url != null
                      ? data?.solutionLink.url
                      : ""
                  }
                >
                  {data?.solutionLink && data?.solutionLink.title}
                </Link>
              </div>
              <div className="">
                <figure>
                  {data?.solutionImage != null ? (
                    <Image
                      src={
                        data?.solutionImage && data?.solutionImage.mediaItemUrl
                      }
                      alt={
                        data?.solutionImage && data?.solutionImage.altText != ""
                          ? data?.solutionImage.altText
                          : "ecommerce"
                      }
                      width={
                        data?.solutionImage.mediaDetails &&
                        data?.solutionImage.mediaDetails.width
                          ? data?.solutionImage.mediaDetails.width
                          : 111
                      }
                      height={
                        data?.solutionImage.mediaDetails &&
                        data?.solutionImage.mediaDetails.height
                          ? data?.solutionImage.mediaDetails.height
                          : 197
                      }
                    />
                  ) : (
                    ""
                  )}
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouchFooter;

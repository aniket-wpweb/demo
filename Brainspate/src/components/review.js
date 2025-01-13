import React from "react";
import { Container } from "react-bootstrap";
import DiscriptionBtn from "./discriptionBtn";
import Link from "next/link";
import Rating from "./rating";
import Image from "next/image";

const Review = (props) => {
  const { data } = props;
  return (
    <div className="our-clients triangle-bottom">
      <Container>
        <div className="main-title d-flex flex-wrap align-items-center justify-space-between pb-38">
          <div className="title-left w-80">
            <h2 dangerouslySetInnerHTML={{
                __html:
                data?.testimonial.ourClientsSection.ourClientsTitle,
              }}></h2>
            <div
              className="sub-title"
              dangerouslySetInnerHTML={{
                __html:
                  data?.testimonial.ourClientsSection.ourClientsDescription,
              }}
            ></div>
          </div>
          <div className="title-right">
            <div className="fillbtn">
              <Link className="fill"
                href={
                  data.testimonial.ourClientsSection.buttonUrl &&
                  data.testimonial.ourClientsSection.buttonUrl.url != null
                    ? data.testimonial.ourClientsSection.buttonUrl.url
                    : ""
                }
              >
                {data.testimonial.ourClientsSection.buttonUrl &&
                  data.testimonial.ourClientsSection.buttonUrl.title}
              </Link>
            </div>
          </div>
        </div>

        <div className="our-clients-box d-flex flex-wrap">
          {data?.testimonial.ourClientsSection.ourClientsContentRepeater
            .slice(0, 2)
            .map((item) => {
              return (
                <div
                  key={
                    item.ourClientsImage && item.ourClientsImage.mediaItemUrl
                  }
                  className="our-clients-wrap w50"
                >
                  <div className="inner">
                    <div className="clients-wrap d-flex flex-wrap">
                      <figure>
                        {item.ourClientsImage != null ? (
                          <Image
                            src={
                              item.ourClientsImage &&
                              item.ourClientsImage.mediaItemUrl
                            }
                            alt={
                              item.ourClientsImage &&
                              item.ourClientsImage.altText != ""
                                ? item.ourClientsImage.altText
                                : "testimonial_image"
                            }
                            width={
                              item.ourClientsImage.mediaDetails &&
                              item.ourClientsImage.mediaDetails.width
                                ? item.ourClientsImage.mediaDetails.width
                                : 100
                            }
                            height={
                              item.ourClientsImage.mediaDetails &&
                              item.ourClientsImage.mediaDetails.height
                                ? item.ourClientsImage.mediaDetails.height
                                : 100
                            }
                          />
                        ) : (
                          ""
                        )}

                        <div className="custome-popup">
                          <a
                            href="https://youtu.be/XcOWiImKnsQ"
                            data-fancybox=""
                            data-caption="This image has a simple caption"
                          >
                            <div className="popup-btn"></div>
                          </a>
                        </div>
                      </figure>
                      <div className="clients-right">
                        <div className="clients-right-inner">
                          <h3>{item.ourClientsContentTitle}</h3>
                          <div className="sub-title">
                            {item.ourClientsContentText}
                          </div>
                          <Rating rating={item.ourClientsRatings} />
                        </div>
                        <div className="custome-popup">
                          <a
                            href="https://youtu.be/XcOWiImKnsQ"
                            data-fancybox=""
                            data-caption="This image has a simple caption"
                          >
                            <div className="popup-btn"></div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="sub-title title-hover" dangerouslySetInnerHTML={{
                      __html:item.ourClientsContentDescription,}}>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Link className="fill"
                href={
                  data.testimonial.ourClientsSection.buttonUrl &&
                  data.testimonial.ourClientsSection.buttonUrl.url != null
                    ? data.testimonial.ourClientsSection.buttonUrl.url
                    : ""
                }
              >
                {data.testimonial.ourClientsSection.buttonUrl &&
                  data.testimonial.ourClientsSection.buttonUrl.title}
              </Link>
      </Container>      
    </div>
  );
};

export default Review;

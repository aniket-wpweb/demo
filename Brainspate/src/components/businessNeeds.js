import Image from "next/image";
import React from "react";

const BusinessNeeds = (props) => {
  const { data } = props;
  return (
    <div className="business-main triangle-bottom bg-purple-light pb-50">
      <div className="container">
        <div className="main-title pb-50 pt-50">
          <h2  dangerouslySetInnerHTML={{
              __html: data.businessNeedsTitle,
            }}></h2>
          <div
            className="sub-title"
            dangerouslySetInnerHTML={{
              __html: data.businessNeedsDescription,
            }}
          ></div>
        </div>
        <div className="feature-wrapper">
          {data.businessNeedsRepeater.map((item) => {
            return (
              <div
                key={item.id}
                className="business-features d-flex flex-wrap align-items-center"
              >
                <div className="icon">
                {item.addImage != null ? (
                  <Image
                    src={item.addImage && item.addImage.mediaItemUrl}
                    alt={
                      item.addImage && item.addImage.altText != ""
                        ? item.addImage.altText
                        : "Icon"
                    }
                    height={
                      item.addImage.mediaDetails &&
                      item.addImage.mediaDetails.height
                        ? item.addImage.mediaDetails.height
                        : 51
                    }
                    width={
                      item.addImage.mediaDetails &&
                      item.addImage.mediaDetails.width
                        ? item.addImage.mediaDetails.width
                        : 51
                    }
                  />
                ) : (
                  ""
                )}

                <span dangerouslySetInnerHTML={{
                  __html: item.id,
                }}></span>
                </div>
                <h4>{ item.addTitle} </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusinessNeeds;

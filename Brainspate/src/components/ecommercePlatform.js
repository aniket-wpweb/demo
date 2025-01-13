import Link from "next/link";
import Image from "next/image";

const EcommercePlatform = (props) => {
    
  return (
  <div className="platforms">
    <div className="container">
      <div className="main-title pb-50">
        <h2 className="" dangerouslySetInnerHTML={{
                    __html: props.data.weUseTitle,
                    }}>
        </h2>
        <div
          className="sub-title"
          dangerouslySetInnerHTML={{
            __html: props.data.weUseDescription,
          }}
        ></div>
      </div>
      <div className="platforms-main d-flex flex-wrap">
        {props.data.weUseRepeater.map((item) => {
          return (
            <div
              key={item.addContentNumber}
              className="platforms-box w-50"
            >
              <div className={`inner ${item.addClassname}-border`}>
                <div className="platforms-image-text d-flex flex-wrap align-items-center">
                  <figure className={`${item.addClassname}-bg`}>
                    {item.addContentImage != null ? (
                      <Image
                        src={
                          item.addContentImage &&
                          item.addContentImage.mediaItemUrl
                        }
                        alt={
                          item.addContentImage &&
                          item.addContentImage.altText != ""
                            ? item.addContentImage.altText
                            : "shopify-icon"
                        }
                        height={
                          item.addContentImage.mediaDetails &&
                          item.addContentImage.mediaDetails.height
                            ? item.addContentImage.mediaDetails.height
                            : 33
                        }
                        width={
                          item.addContentImage.mediaDetails &&
                          item.addContentImage.mediaDetails.width
                            ? item.addContentImage.mediaDetails.width
                            : 40
                        }
                      />
                    ) : (
                      ""
                    )}
                  </figure>
                  <h3>{item.addContentTitle}</h3>
                </div>
                <div className="description"
                    dangerouslySetInnerHTML={{
                      __html: item.addContentDescription,
                    }}
                  ></div>
               
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
      
  );
};

export default EcommercePlatform;

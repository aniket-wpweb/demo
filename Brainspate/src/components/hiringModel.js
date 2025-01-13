import Image from "next/image";
import Link from "next/link";

const HiringModel = (props) => {
  const data = props.modelData;

  return (
    <div className="hiring-model pt-50 pb-50">
      <div className="container">
        <div className="main-title pb-50 text-align-center">
          <h2 dangerouslySetInnerHTML={{
                    __html: data.hiringModelsTitle}}></h2>
          <div className="sub-title " dangerouslySetInnerHTML={{
                    __html: data.hiringModelsDescription}}></div>
        </div>
        <div className="model-content">
          {data.hiringModelsRepeater.map((item) => {
            return (
              <div
                className={`model-content-card d-flex align-items-center model-${item.addClassname}`}
              >
                {item.addIcon != null ? (
                  <Image
                    src={item.addIcon && item.addIcon.mediaItemUrl}
                    alt={
                      item.addIcon && item.addIcon.altText != ""
                        ? item.addIcon.altText
                        : "fixed cost"
                    }
                    height={
                      item.addIcon.mediaDetails &&
                      item.addIcon.mediaDetails.height
                        ? item.addIcon.mediaDetails.height
                        : 120
                    }
                    width={
                      item.addIcon.mediaDetails &&
                      item.addIcon.mediaDetails.width
                        ? item.addIcon.mediaDetails.width
                        : 120
                    }
                  />
                ) : (
                  ""
                )}

                <div className="model-text">
                  <h4 dangerouslySetInnerHTML={{
                    __html: item.addTitle}}></h4>
                  <p dangerouslySetInnerHTML={{
                    __html: item.addDescription}}></p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="fillbtn ">
          <Link className="fill mx-auto"
            href={
              data.addButtonLink && data.addButtonLink.url != null
                ? data.addButtonLink.url
                : ""
            }
          >
            {data.addButtonLink && data.addButtonLink.title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HiringModel;

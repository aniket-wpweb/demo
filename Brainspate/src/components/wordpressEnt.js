import { useRef, useState } from "react";
import accordionOneIcon from "../../public/images/Home-resources/accordian-one.svg";
import accordionTwoIcon from "../../public/images/Home-resources/accordian-two.svg";
import Image from "next/image";
import IsMobile from "@/src/components/isMobile";
import IsDesktop from "@/src/components/isDesktop";

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, feature } = props;
  const { accordionTitle, id, accordionBody } = feature;

  return (
    <>
      <div className="accordions">
        <div
          className={` ${
            active === id ? "accordion-card-shadow" : "accordion-card"
          }`}
        >
          {/* <div className="accordion-card"> */}
          <div className="rc-accordion-header">
            <div
              className={`rc-accordion-toggle ${active === id ? "active" : ""}`}
              onClick={() => handleToggle(id)}
            >
              <h4
                className={` ${
                  active === id
                    ? "accordion-title-colored"
                    : "rc-accordion-title"
                }`}
              >
                {accordionTitle}
              </h4>
              <Image
                src={
                  active === id ? accordionOneIcon.src : accordionTwoIcon.src
                }
                alt="accordion-down"
                height={36}
                width={36}
              />
            </div>
          </div>
          <div
            ref={contentEl}
            className={`rc-collapse ${active === id ? "show" : ""}`}
            style={active === id ? { height: "100px" } : { height: "0px" }}
          >
            <div className="rc-accordion-body">
              <p className="mb-0">{accordionBody}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const WordpressEnt = (props) => {
  const { data } = props;
  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };
  return (
    <div className="wordpress-ent">
      <div className="container">
        <div className="half-grid d-flex flex-wrap align-items-center">
          <div className="half-grid-right w50">
            <h2 className="">{data.enterpriseTitle}</h2>
            <IsMobile>
              <div className="half-grid-left text-align-right w50">
                {data.enterpriseImage != null ? (
                  <Image
                    src={data.enterpriseImage && data.enterpriseImage.mediaItemUrl}
                    alt={
                      data.enterpriseImage && data.enterpriseImage.altText != ""
                        ? data.enterpriseImage.altText
                        : "EnterPrise-img"
                    }
                    style={{height: "100%", maxWidth: "503px"}}
                    height={
                      data.enterpriseImage.mediaDetails &&
                      data.enterpriseImage.mediaDetails.height
                        ? data.enterpriseImage.mediaDetails.height
                        : 675
                    }
                    width={
                      data.enterpriseImage.mediaDetails &&
                      data.enterpriseImage.mediaDetails.width
                        ? data.enterpriseImage.mediaDetails.width
                        : 503
                    }
                  />
                ) : (
                  ""
                )}
              </div>
            </IsMobile>
            <div className="sub-title">{data.enterpriseDescription}</div>
            <div className="accordion-sec">
              {data.enterpriseRepeater.map((feature, index) => {
                return (
                  <AccordionItem
                    key={index}
                    active={active}
                    handleToggle={handleToggle}
                    feature={feature}
                  />
                );
              })}
            </div>
          </div>
          <IsDesktop>
            <div className="half-grid-left text-align-right w50">
              {data.enterpriseImage != null ? (
                <Image
                  src={data.enterpriseImage && data.enterpriseImage.mediaItemUrl}
                  alt={
                    data.enterpriseImage && data.enterpriseImage.altText != ""
                      ? data.enterpriseImage.altText
                      : "EnterPrise-img"
                  }
                  style={{height: "100%", maxWidth: "503px"}}
                  height={
                    data.enterpriseImage.mediaDetails &&
                    data.enterpriseImage.mediaDetails.height
                      ? data.enterpriseImage.mediaDetails.height
                      : 675
                  }
                  width={
                    data.enterpriseImage.mediaDetails &&
                    data.enterpriseImage.mediaDetails.width
                      ? data.enterpriseImage.mediaDetails.width
                      : 503
                  }
                />
              ) : (
                ""
              )}
            </div>
          </IsDesktop>
        </div>
      </div>
    </div>
  );
};

export default WordpressEnt;

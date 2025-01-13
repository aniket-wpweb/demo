import { useRef, useState } from "react";
import accordionPlus from "../../public/images/Home-resources/plus-accord.svg";
import accordionMinus from "../../public/images/Home-resources/minus-accord.svg";
import Image from "next/image";

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, faq } = props;
  const { faqQuestion, faqId, faqAnswer } = faq;

  return (
    <div className="set">
      <div className="rc-accordion-header">
        <div className="accordian-div">
          <h4 className="rc-accordion-title">
            <span>{faqId}.</span>
            {faqQuestion}
          </h4>
          <Image
            src={active === faqId ? accordionMinus.src : accordionPlus.src}
            alt="accordion-down"
            height={36}
            width={36}
            className={`rc-accordion-toggle ${
              active === faqId ? "active" : ""
            }`}
            onClick={() => handleToggle(faqId)}
          />
        </div>
      </div>
        <div
          ref={contentEl}
          className={`rc-collapse ${active === faqId ? "show" : ""}`}
          style={
            active === faqId
              ? { height: contentEl?.current?.scrollHeight }
              : { height: "0px" }
          }
        >
        <div
          className="rc-accordion-body"
          dangerouslySetInnerHTML={{
            __html: faqAnswer,
          }}
        ></div>
      </div>
    </div>
  );
};

const FAQ = (data) => {  
  const [active, setActive] = useState(1); 

  const handleToggle = (faqId) => {
    if (active === faqId) {
      setActive(null);
    } else {
      setActive(faqId);
    }
  };

  return (
    <>
      <div className="faq-section">
        <div className="container">
          <div className="main-title pb-50">
            <h2 className="" dangerouslySetInnerHTML={{
                __html: data.data.faqTitle,
              }}></h2>
            <div
              className="sub-title"
              dangerouslySetInnerHTML={{
                __html: data.data.faqDescription,
              }}
            ></div>
          </div>
          <div className="accordion-container">
            {data.data.faqContent.map((faq, faqId) => {
              return (
                <AccordionItem
                  key={faqId}
                  active={active}
                  handleToggle={handleToggle}
                  faq={faq}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;

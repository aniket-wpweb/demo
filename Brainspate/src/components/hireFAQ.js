import { useRef, useState } from "react";
import upArrow from "../../public/images/Up-Arrow.svg";
import { Image } from "react-bootstrap";

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, faq } = props;
  const { addQuestion, questionsId, addAnswer } = faq;

  return (
    <div className="rc-accordion-set">
      <div className="rc-accordion-header">
        <div className="accordian-div">
          <div className="rc-accordion-set-title d-flex align-items-center">
            <span>{questionsId}</span>
            <h4 className="">{addQuestion}</h4>
          </div>

          <Image
            // src={active === questionsId ? accordionMinus.src : upAerrow.src}
            src={upArrow.src}
            alt="accordion-down"
            className={`rc-accordion-toggle ${
              active != questionsId ? "active active-rotate" : ""
            }`}
            onClick={() => handleToggle(questionsId)}
          />
        </div>
      </div>   
      <div
        ref={contentEl}
        className={`rc-collapse ${active === questionsId ? "show" : ""}`}
        style={
          active === questionsId
            ? { height: contentEl?.current?.scrollHeight }
            : { height: "0px" }
        }
        >
        <div
          className="rc-accordion-body"
          dangerouslySetInnerHTML={{
            __html: addAnswer,
          }}
        ></div>
      </div>
    </div>
  );
};

const HireFAQ = (props) => {
  const { data,classFaqName } = props;
  //const [active, setActive] = useState(1);
  const [active, setActive] = useState(
    data.questionsRepeater.length > 0 ? data.questionsRepeater[0].questionsId : null
  );

  const handleToggle = (faqId) => {
    if (active === faqId) {
      setActive(null);
    } else {
      setActive(faqId);
    }
  };

  return (
    <>
      <div className={`faq-section ${classFaqName}`}>
        <div className="container">
          <div className="main-title pb-50">
            <h2 className="">{data.questionsTitle}</h2>
            <div
              className="sub-title"
              dangerouslySetInnerHTML={{
                __html: data.questionsDescription,
              }}
            ></div>
          </div>
          <div className="accordion-container">
            {data.questionsRepeater.map((faq, faqId) => {
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

export default HireFAQ;

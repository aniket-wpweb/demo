import Link from "next/link";

const GetInTouch = (props) => {
  const { data } = props;

  return (
    <>
      <div className="title white-text">
        <h2 className="white-text">{data?.getInTouchTiitle}</h2>
        <div className="sub-title colored-text" dangerouslySetInnerHTML={{
                    __html: data?.getInTouchDescription}}></div>
      </div>
      <div className="fillbtn">
        <Link className="fill"
          href={
            data?.getInTouchLink && data?.getInTouchLink.url != null
              ? data?.getInTouchLink.url
              : ""
          }
        >
          {data?.getInTouchLink && data?.getInTouchLink.title}
        </Link>
      </div>
    </>
  );
};

export default GetInTouch;

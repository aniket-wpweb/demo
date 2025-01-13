import Link from "next/link";

const discriptionBtn = (props) => {
  return (
    <div className="main-title d-flex flex-wrap align-items-center justify-space-between pb-38">
      <div className="title-left w-80">
        <h2>{props.title}</h2>
        <div className="sub-title">{props.subTitle}</div>
      </div>
      <div className="title-right">
        <div className="fillbtn">
          
          <Link
                  className="fill"
                    href={
                     props?.link?.url
                    }
                  >
                   {props?.link?.title}
                  </Link>
                  </div>
      </div>
    </div>
  );
};

export default discriptionBtn;

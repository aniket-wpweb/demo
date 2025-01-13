const ChooseUs = (props) => {
  const { data } = props;
  return (
    <div className="why-choose-us">
      <div className="container">
        <div className="why-choose-us-main">
          <div className="title-left w-60 why-choose-content">
            <h2
              dangerouslySetInnerHTML={{
                __html: data.whyChooseTitle,
              }}
            ></h2>
            <div className="sub-title" dangerouslySetInnerHTML={{
                        __html: data.whyChooseDescription,
                    }}></div>
          </div>
          <div className="why-box-content d-flex flex-wrap">
            {data.whyChooseRepeater.map((item) => {
              return (
                <div
                  key={item.addContentNumber}
                  // className={item.cName}
                  className="why-choose-box"
                >
                  <div className="inner">
                    <div className="why-choose-title d-flex flex-wrap">
                      <div className="choose-title">
                        <h4
                          dangerouslySetInnerHTML={{
                            __html: item.addContentTitle,
                          }}
                        >
                        </h4>
                      </div>
                      <div className="why-choose-number">
                        {item.addContentNumber}
                      </div>
                    </div>
                    <div className="description" dangerouslySetInnerHTML={{
                        __html: item.addContentDescription,
                    }}>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;

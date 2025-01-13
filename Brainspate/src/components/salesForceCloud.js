const SalesForceCloud = (props) => {
  const { data } = props;
  return (
    <div className="salesforce-main pb-50 pt-50">
      <div className="container">
        <div className="main-title pb-50">
          <h2>{data.cloudServicesTitle}</h2>
          <div
            className="sub-title"
            dangerouslySetInnerHTML={{
              __html: data.cloudServicesDescription,
            }}
          ></div>
        </div>

        <div className="salesforce-sub d-flex flex-wrap align-items-center justify-space-between">
          {data.cloudServicesRepeater.map((item) => {
            return (
              <div key={item.addContentTitle} className="salesforce-cards w-50">
                <div className={`salesforce-content-${item.addClassname}`}>
                  <div className="salesforce">
                    <h3 dangerouslySetInnerHTML={{
                      __html:item.addContentTitle,}}></h3>
                    <p dangerouslySetInnerHTML={{
                      __html:item.addContentDescription,}}></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalesForceCloud;

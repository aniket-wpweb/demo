import Image from "next/image";

const ThemesAndPlugins = (props) => {
  const { data } = props;
  return (
    <div className="themes-main bg-purple-light triangle-bottom">
      <div className="container">
        <div className="half-grid d-flex flex-wrap align-items-center">
          <div className="theme-left w-40">
            <h2>{data.themesAndPluginsTitle}</h2>
            <div className="sub-title">
              <p
                dangerouslySetInnerHTML={{
                  __html: data.themesAndPluginsDescripiton,
                }}
              ></p>
            </div>
          </div>
          <div className="theme-right text-align-right w-60">
            {data.themesAndPluginsImage != null ? (
              <Image
                src={
                  data.themesAndPluginsImage &&
                  data.themesAndPluginsImage.mediaItemUrl
                }
                className="w-100"
                style={{ height: "100%", maxWidth: "580px" }}
                alt={
                  data.themesAndPluginsImage &&
                  data.themesAndPluginsImage.altText != ""
                    ? data.themesAndPluginsImage.altText
                    : "themes and plugins"
                }
                height={
                  data.themesAndPluginsImage.mediaDetails &&
                  data.themesAndPluginsImage.mediaDetails.height
                    ? data.themesAndPluginsImage.mediaDetails.height
                    : 462
                }
                width={
                  data.themesAndPluginsImage.mediaDetails &&
                  data.themesAndPluginsImage.mediaDetails.width
                    ? data.themesAndPluginsImage.mediaDetails.width
                    : 580
                }
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemesAndPlugins;

import queryString from "query-string";
import facebookGroup from "../../public/images/facebook-icon.png";
import twitterGroup from "../../public/images/twitter-icon.png";
import linkedinGroup from "../../public/images/linkdin-icon.png";
import { Image } from "react-bootstrap";

const ShareButtons = ({ url, title }) => {
  const handleShareLinkedIn = () => {
    const width = 800;
    const height = 600;
    const left =
      typeof window !== "undefined" && window.screen.width / 2 - width / 2;
    const top =
      typeof window !== "undefined" && window.screen.height / 2 - height / 2;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${queryString.stringify(
      {
        url: url,
        title: title,
      }
    )}`;
    typeof window !== "undefined" &&
      window.open(
        linkedInUrl,
        "Share on LinkedIn",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );
  };

  const handleShareFacebook = () => {
    const width = 800;
    const height = 600;
    const left =
      typeof window !== "undefined" && window.screen.width / 2 - width / 2;
    const top =
      typeof window !== "undefined" && window.screen.height / 2 - height / 2;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;

    typeof window !== "undefined" &&
      window.open(
        facebookUrl,
        "Share on Facebook",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );
  };

  const handleShareTwitter = () => {
    const width = 800;
    const height = 600;
    const left =
      typeof window !== "undefined" && window.screen.width / 2 - width / 2;
    const top =
      typeof window !== "undefined" && window.screen.height / 2 - height / 2;
    const twitterUrl = `https://twitter.com/intent/tweet?${queryString.stringify(
      {
        url: url,
        title: title,
      }
    )}`;
    typeof window !== "undefined" &&
      window.open(
        twitterUrl,
        "Share on Twitter",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );
  };

  return (
    <div className="group-logos d-flex flex-wrap">
      <Image
        src={facebookGroup.src}
        alt="facebook"
        onClick={handleShareFacebook}
        style={{ cursor: "pointer" }}
      />
      <Image
        src={twitterGroup.src}
        alt="twitter"
        onClick={handleShareTwitter}
        style={{ cursor: "pointer" }}
      />
      <Image
        src={linkedinGroup.src}
        alt="linkedin"
        onClick={handleShareLinkedIn}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default ShareButtons;

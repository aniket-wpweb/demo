import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogComment = () => {
  const [comments, setComments] = useState([]);
  const [replyFormVisible, setReplyFormVisible] = useState(false);
  const [replyData, setReplyData] = useState({
    parentCommentId: '',
    name: '',
    comment: ''
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const postId = 329; // Replace with the ID of the post you want to retrieve comments for
        const response = await axios.get(
          `https://projects.theglobalwebdev.com/brainsapte/wp-json/wp/v2/comments?post=${postId}`
        );
        console.log("response", response);
        if (response.status === 200) {
          setComments(response.data);
        } else {
          console.log("Failed to fetch comments.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchComments();
  }, []);

  function formatDateArray(comments) {
    for (let i = 0; i < comments.length; i++) {
      const date = new Date(comments[i].date);
      const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDate = date.toLocaleDateString("en-US", options);
      comments[i].date = formattedDate;
    }
  }
  formatDateArray(comments);

  const handleReplyClick = (commentId) => {
    setReplyData({
      parentCommentId: commentId,
      name: "",
      comment: "",
    });
    setReplyFormVisible(true);
  };

  return (
    <div className="comments-section-wrap">
      <h2 className="comments-title">{comments.length} comments </h2>

      {comments &&
        comments.map((item) => {
          return (
            <>
              <div className="comment-main">
                <div className="comment-details d-flex align-items-center justify-content-between">
                  <div className="comment-author d-flex align-items-center">
                    <Image
                      src={item.author_avatar_urls}
                      alt=""
                      height={50}
                      width={50}
                    />
                    <h5>{item.author_name}</h5>
                  </div>
                  <div className="comment-date">{item.date}</div>
                </div>
                <div
                  className="comment-content"
                  dangerouslySetInnerHTML={{
                    __html: item.content.rendered,
                  }}
                ></div>

                <button
                  className="replyBtn"
                  onClick={() => handleReplyClick(item.id)}
                >
                  Reply
                </button>
                {/* <div className="comment-border"></div> */}
              </div>
              <hr />
            </>
          );
        })}

      
    </div>
  );
};

export default BlogComment;

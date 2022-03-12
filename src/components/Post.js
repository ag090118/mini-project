import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { RiBookmarkLine } from "react-icons/ri";
import Comments from "./Comments";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import parse from "html-react-parser";
function Post(props) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const { type, data, isLoading } = props;
  const [postinfo, setPostinfo] = useState({
    name: "Smitesh",
    dp: "",
    date: "27/02/21",
    title: "Recent malware attacks from emails",
    content:
      "An email virus consists of malicious code distributed in email messages to infect one or more devices. This malicious code can be activated in numerous ways: when the email recipient clicks on an infected link within the message, opens an infected attachment or interacts with the message in some other way.",
  });
  function handleCommentChange(e) {
    setCommentsOpen((setCommentsOpen) => !setCommentsOpen);
  }

  return (
    <div className="post">
      <div className="post-side-bar">
        <div className="upvote-button">
          <div>
            <FaChevronUp className="upvote-icon" />
          </div>
          <div>
            <FaChevronDown className="upvote-icon" />
          </div>
        </div>
        <div className="comment-button">
          <div>
            <RiBookmarkLine
              onClick={handleCommentChange}
              className="comment-icon"
            />
          </div>
          <div>
            <MdOutlineModeComment
              onClick={handleCommentChange}
              className="comment-icon"
            />
          </div>
        </div>
      </div>
      <Divider color="#000000" orientation="vertical" flexItem />
      <div className="post-main">
        <Paper variant="elevation" elevation={2}>
          <div className="post-header">
            <p style={{ marginLeft: "2%" }}>{postinfo.name}</p>
            {isLoading ? (
              <Skeleton />
            ) : (
              <p style={{ marginRight: "2%" }}>{data.time}</p>
            )}
          </div>

          <div className="post-title">
            {isLoading ? (
              <Skeleton />
            ) : (
              <h2 style={{ marginLeft: "2%" }}>{data.title}</h2>
            )}
          </div>
        </Paper>
        <div className="post-main-content">
          {isLoading ? (
            <Skeleton />
          ) : (
            <Typography
              component={"span"}
              sx={{
                padding: "3%",
              }}
              align="left"
              variant="body2"
            >
              {/* {data.description} */}
              <Data convertedText={data.description} />
            </Typography>
          )}
        </div>

        {commentsOpen ? (
          <div className="post-footer">
            <Divider color="#000000" flexItem />
            <Comments postinfo={postinfo} />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}
const options = {
  replace: (domNode) => {
    if (domNode.attribs && domNode.attribs.class === "remove") {
      return <></>;
    }
  },
};

function Data(props) {
  return parse(props.convertedText, options);
}

export default Post;

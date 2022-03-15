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
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GoKebabVertical } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);
function Post(props) {
  const { type, data, isMenuButtons, handleOpen, handleDelete } = props;
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [upvotes, setUpvotes] = useState(data.upvotes.length);
  const [downvotes, setDownvotes] = useState(data.downvotes.length);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
  function handleEdit() {
    handleClose();
    handleOpen(data._id);
  }
  function handleDeleteButton() {
    handleClose();
    handleDelete(data._id);
  }
  function handleUpvote() {
    setUpvotes((prev) => prev + 1);
  }
  function handleDownvote() {
    setDownvotes((prev) => prev + 1);
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="post">
        <div className="post-side-bar">
          <div className="upvote-button">
            <div onClick={handleUpvote}>
              <FaChevronUp className="upvote-icon" />
            </div>

            <div className="upvote-wrapper">
              <Typography variant="body1" align="center">
                {upvotes}
              </Typography>
              <Divider
                style={{
                  marginBottom: "1%",
                  background: "#000000",
                  width: "70%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Typography variant="body1" align="center">
                {downvotes}
              </Typography>
            </div>

            <div onClick={handleDownvote}>
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
          <Paper
            sx={{
              width: "100%",
            }}
            variant="elevation"
            elevation={2}
          >
            <div className="post-header">
              <div className="post-title-main">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/userprofile/${data.authorid}`}
                  underline="none"
                  variant="h1"
                >
                  {data.authorname}
                </Link>
                <p style={{ marginRight: "2%" }}>{data.time}</p>
              </div>

              <div className="post-menuButton">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  disableRipple={true}
                  endIcon={<GoKebabVertical />}
                  style={{
                    padding: "0",
                    margin: "0",
                    width: "fit-content",
                    color: "white",
                  }}
                  variant="text"
                ></Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleDeleteButton}> Delete</MenuItem>
                  <MenuItem onClick={handleEdit}> Edit</MenuItem>
                </Menu>
              </div>
            </div>

            <div className="post-title">
              <h2 style={{ marginLeft: "2%" }}>{data.title}</h2>
            </div>
          </Paper>
          <div className="post-main-content">
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
          </div>

          {commentsOpen ? (
            <div className="post-footer">
              <Divider color="#000000" flexItem />
              <Comments postinfo={postinfo} />{" "}
            </div>
          ) : null}
        </div>
      </div>
    </ThemeProvider>
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

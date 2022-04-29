import React, { useState, useEffect } from "react";
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
import { MdFilePresent } from "react-icons/md";
import ReactQuill from "react-quill";
import { ImFolderUpload } from "react-icons/im";
import LinearProgress from "@mui/material/LinearProgress";
import { IoSend } from "react-icons/io5";
import { storage } from "./Firebase/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { useCookies } from "react-cookie";

let theme = createTheme();
theme = responsiveFontSizes(theme);
function Post(props) {
  const { liked, profile, data, isMenuButtons, handleOpen, handleDelete } =
    props;
  //console.log(data);
  const [cookies, setCookie] = useCookies({});
  const [convertedText, setConvertedText] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [upvotes, setUpvotes] = useState(data.upvotes.length);
  const [downvotes, setDownvotes] = useState(data.downvotes.length);
  const [localLiked, setLocalLiked] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [collabForm, setCollabForm] = useState(false);
  const [progress, setProgress] = useState(0);
  const [collabPostNo,setCollabPostNo]=useState(-1);
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
  const handleUpvote = async () => {
    if (localLiked === 0) {
      setLocalLiked(1);
      setUpvotes((prev) => prev + 1);
    } else if (localLiked === 1) {
      setLocalLiked(0);
      setUpvotes((prev) => prev - 1);
    } else {
      setLocalLiked(1);
      setUpvotes((prev) => prev + 1);
      setDownvotes((prev) => prev - 1);
    }

    const res = await fetch(
      `https://dry-crag-93232.herokuapp.com/${data._id}/upvote`,
      {
        method: "PATCH",
        headers: {
          Authorization: cookies.jwtoken,
        },
      }
    );
    const resp = await res.json();
    console.log(resp);
  };
  const handleDownvote = async () => {
    if (localLiked === 0) {
      setLocalLiked(2);
      setDownvotes((prev) => prev + 1);
    } else if (localLiked === 1) {
      setLocalLiked(2);
      setUpvotes((prev) => prev - 1);
      setDownvotes((prev) => prev + 1);
    } else {
      setLocalLiked(0);
      setDownvotes((prev) => prev - 1);
    }
    const res = await fetch(
      `https://dry-crag-93232.herokuapp.com/${data._id}/downvote`,
      {
        method: "PATCH",
        headers: {
          Authorization: cookies.jwtoken,
        },
      }
    );
    const resp = await res.json();
    console.log(resp);
  };
  const routeChange = () => {
    window.open(data.filelink, "_blank");
  };
  function handleCollab() {
    setCollabForm((prev)=> (!prev));
  }
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };
  const postSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://dry-crag-93232.herokuapp.com/${data._id}/unacceptpost`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.jwtoken,
      },
      body: JSON.stringify({
        description: convertedText,
        filelink: localStorage.getItem("download"),
      }),
    });
    const respon = await res.json();
    console.log(respon);
    setConvertedText(null);
    setCollabForm(false);
    localStorage.removeItem("download");
  };
  const uploadFiles = (file) => {
    //
    if (!file) return;
    console.log(file);
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          localStorage.setItem("download", downloadURL);
        });
      }
    );
  };
  useEffect(() => {
    const up = data.upvotes;
    const down = data.downvotes;
    //console.log(data);
    if (up.find((element) => element === cookies.userid)) {
      setLocalLiked(1);
    } else if (down.find((element) => element === cookies.userid)) {
      setLocalLiked(2);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="post">
        <div className="post-top">
          <div className="post-side-bar">
            <div className="upvote-button">
              <div onClick={handleUpvote}>
                {(localLiked === 0 || localLiked === 2) && <FaChevronUp />}
                {localLiked === 1 && <FaChevronUp className="upvote-icon" />}
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
                {(localLiked === 0 || localLiked === 1) && <FaChevronDown />}
                {localLiked === 2 && <FaChevronDown className="upvote-icon" />}
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

                {profile ? (
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
                ) : null}
              </div>

              <div className="post-title">
                <h2 style={{ marginLeft: "2%" }}>{data.title}</h2>
              </div>
            </Paper>
            <div className="post-main-content">
              <div className="collab-wrapper">
                <div>
                  {data.tags.map((tag) => (
                    <Typography
                      component={"span"}
                      sx={{
                        fontSize: "70%",
                        marginRight: "3%",
                        color: "#b7b8b9",
                      }}
                      align="left"
                      variant="subtitle1"
                    >
                      #{tag.label}
                    </Typography>
                  ))}
                </div>
                {/* <div className="collab-empty"></div> */}
                <Button
                  size="small"
                  className="post-collab"
                  disableRipple={true}
                  variant="text"
                  sx={{
                    color: "teal",
                  }}
                  onClick={handleCollab}
                >
                  <Typography
                    component={"span"}
                    sx={{
                      fontSize: "80%",
                      ml: "auto",
                    }}
                    align="center"
                  >
                    Collaborate
                  </Typography>
                </Button>
              </div>
              {collabForm && (
                <div>
                  <ReactQuill
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                    theme="snow"
                    value={convertedText}
                    onChange={setConvertedText}
                    style={{ minHeight: "60px" }}
                  />
                  <div className="postform-fileupload">
                  <br></br>
                  <form onSubmit={formHandler}>
                    <input type="file" className="input" />
                    <Button
                      type="submit"
                      endIcon={<ImFolderUpload />}
                      variant="contained"
                    >
                      Upload
                    </Button>
                    {/* <button type="submit">Upload</button> */}
                  </form>
                  <br></br>
                  <hr />
                  <LinearProgress variant="determinate" value={progress} />
                  {/* <h2>Uploading done {progress}%</h2> */}
                </div>
                <div className="postform-postbutton">
                  <Button
                    onClick={postSubmit}
                    size="large"
                    endIcon={<IoSend />}
                    variant="contained"
                  >
                    request collaboration
                  </Button>
                </div>
                </div>
                )}
              <div className="post-desc-wrapper">
                <div>
                  <Typography
                    component={"span"}
                    sx={{
                      fontSize: "100%",
                    }}
                    align="left"
                    variant="body2"
                  >
                    <Data convertedText={data.description} />
                  </Typography>
                </div>
                <br />
                <br />
                <div className="post-attachment">
                  {data.filelink && (
                    <Button
                      size="large"
                      className="post-collab"
                      disableRipple={true}
                      variant="text"
                      sx={{
                        color: "teal",
                      }}
                      onClick={routeChange}
                    >
                      <MdFilePresent />
                      <Typography
                        component={"span"}
                        sx={{
                          fontSize: "80%",
                          ml: "auto",
                        }}
                        align="center"
                      >
                        Attachments
                      </Typography>
                    </Button>
                  )}
                </div>
                <br/>
              </div>
            </div>
          </div>
        </div>

        {commentsOpen ? (
          <div className="post-footer">
            <Divider color="#000000" flexItem />
            <Comments id={data._id} comm={data.comments} />
          </div>
        ) : null}
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

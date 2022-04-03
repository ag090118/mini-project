import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function MyFunction() {
  var myCurrentDate = new Date();
  var date =
    myCurrentDate.getFullYear() +
    "-" +
    (myCurrentDate.getMonth() + 1) +
    "-" +
    myCurrentDate.getDate() +
    " " +
    myCurrentDate.getHours() +
    ":" +
    myCurrentDate.getMinutes() +
    ":" +
    myCurrentDate.getSeconds();
  const newCurrentDate = date;
  return newCurrentDate;
}

function Comments(props) {
  const { id, comm } = props;
  const [cookies, setCookies] = useCookies({});
  const [comments, setComments] = useState(comm);
  const [open, setOpen] = React.useState(false);
  const [changedId, setChangedId] = useState();
  const [isLoading, setLoading] = useState(true);
  const [currentComment, setCurrentComment] = useState({
    authorid: "",
    authorname: "",
    description: "",
    time: "",
  });
  function handleChange(e) {
    const value = e.target.value;
    setCurrentComment((prevValue) => {
      return {
        ...prevValue,
        ["description"]: value,
      };
    });
  }
  const handleSubmit = async () => {
    setCurrentComment((prevValue) => {
      return {
        ...prevValue,
        ["authorname"]: "smith",
        ["time"]: MyFunction(),
      };
    });
    console.log("umm",currentComment);
    localStorage.setItem("time", MyFunction());
    const res = await fetch(
      `https://dry-crag-93232.herokuapp.com/${id}/createcomment`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.jwtoken,
        },
        body: JSON.stringify({
          description: currentComment.description,
        }),
      }
    );
    const resp = await res.json();
    console.log(resp);

    setComments((prevNotes) => {
      return [currentComment, ...prevNotes];
    });
    setCurrentComment({
      authorid: "",
      authorname: "",
      description: "",
      time: "",
    });
    // setCurrentComment((prevValue) => {
    //   return {
    //     ...prevValue,
    //     [name]: ""
    //   };
    // });
  };
  return (
    <div>
      <div className="comment-wrapper">
        <div className="comment-box">
          <TextField
            variant="filled"
            multiline={true}
            name="description"
            value={currentComment.description}
            onChange={handleChange}
            id="outlined-basic"
            fullWidth="true"
            placeholder="comment"
          />
        </div>
        <div onClick={handleSubmit} className="comment-send-icon">
          <IoSend />
        </div>
      </div>
      {comments.map((comment, index) =>
        /* index === 0 && !comment.authorname ? (
          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.inherit",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={cookies.username}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={cookies.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {localStorage.getItem("time")}
                    </Typography>
                    {" — "}
                    {comment.description}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ) : ( */
          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.inherit",
            }}
          >
          {
            (true)?
          (<ListItem
          alignItems="flex-start"
                  secondaryAction={
                    <IconButton  
                    onClick={()=>console.log(comment)}
                    edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
              >):
                (<ListItem
                alignItems="flex-start"
              >
            )}
              <ListItemAvatar>
                <Avatar
                  alt={comment.authorname}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.authorname}
                
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.time}
                    </Typography>
                    {" — "}
                    {comment.description}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        
      )}
    </div>
  );
}
export default Comments;

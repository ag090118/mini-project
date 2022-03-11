import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function Comments() {
  const [comments, setComments] = useState([
    {
      username: "Smitesh",
      date: "28/02/22",
      data: "my test comment"
    },
    {
      username: "Oggy",
      date: "28/02/22",
      data: "hmm test comment part 2"
    }
  ]);
  const [currentComment, setCurrentComment] = useState({
    username: "Smitesh",
    date: "28/02/22",
    data: ""
  });
  function handleChange(e) {
    const value = e.target.value;
    setCurrentComment((prevValue) => {
      return {
        ...prevValue,
        ["data"]: value
      };
    });
  }
  function handleSubmit() {
    setComments((prevNotes) => {
      return [currentComment, ...prevNotes];
    });
    setCurrentComment((prevValue) => {
      return {
        ...prevValue,
        ["data"]: ""
      };
    });
  }
  return (
    <div>
      <div className="comment-wrapper">
        <div className="comment-box">
          <TextField
            variant="filled"
            multiline="true"
            value={currentComment.data}
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

      {comments.map((comment) => (
        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "background.inherit"
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={comment.username}
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary={comment.username}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.date}
                  </Typography>
                  {" — "}
                  {comment.data}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>
  );
}
export default Comments;

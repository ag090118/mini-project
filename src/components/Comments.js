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
import EditIcon from '@mui/icons-material/Edit';
import Loader from './Loader';

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
  const [isLoading, setLoading] = useState(false);
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
    setLoading(true);
    await fetch(
      `https://dry-crag-93232.herokuapp.com/${id}/createcomment`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": cookies.jwtoken,
        },
        body: JSON.stringify({
          description: currentComment.description,
        }),
      })
      .then((resp) => resp.json())
      .then((resp) => {    
        setComments(resp.comments);
        setLoading(false);
      });
    console.log(comments);
    setCurrentComment({
      authorid: "",
      authorname: "",
      description: "",
      time: "",
    });
  };
  const handleUpdate = async (uid) => {
    const res = await fetch(
      `https://dry-crag-93232.herokuapp.com/${id}/updatecomment/${uid}`,
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
  };
  const handleDelete = async (did) => {
    setLoading(true);
    const res = await fetch(
      `https://dry-crag-93232.herokuapp.com/${id}/deletecomment/${did}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": cookies.jwtoken,
        },
      }
    );
    const resp = await res.json();
    console.log(resp);
    setComments(resp.comments);
    setLoading(false);
    console.log(comments);
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
        <div onClick={()=>handleSubmit()} className="comment-send-icon">
          <IoSend />
        </div>
      </div>

      {isLoading ? (
        <Loader/>
      ) : (comments.map((comment, index) =>
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
          
          <ListItem
          alignItems="flex-start"
                  secondaryAction={
                  (cookies.userid==comment.authorid)? <div><IconButton  
                    onClick={()=>handleDelete(comment._id)}
                    edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton  
                    onClick={()=>handleUpdate(comment._id)}
                    edge="end" aria-label="delete">
                      <EditIcon />
                    </IconButton>
                    </div>
                    : null
                  }
              >
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
      ))}
    </div>
  );
}
export default Comments;

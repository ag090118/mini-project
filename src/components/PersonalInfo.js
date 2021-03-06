import React, { useState,useEffect } from "react";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { RiUserFollowLine } from "react-icons/ri";
import { RiUserFollowFill } from "react-icons/ri";
import {useCookies} from "react-cookie";
import { useParams } from "react-router-dom";

let theme = createTheme();
theme = responsiveFontSizes(theme);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "20%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
  overflow: "auto",
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "37.5%",
  transform: "translate(-50%, -50%)",
  width: "10%",
  height: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};
const style2 = {
  position: "absolute",
  top: "50%",
  right: "29%",
  transform: "translate(-50%, -50%)",
  width: "10%",
  height: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};
function PersonalInfo(props) {
  const { data, isLoading ,routeUserId} = props;
  //console.log(data);
  // console.log(isLoading);
  //console.log(localStorage.getItem('isfollow'));
  const [follow, setFollow] = useState(localStorage.getItem('isfollow'));
  //console.log(follow);
  const [cookies, setCookie] = useCookies();
  //console.log(routeUserId);
  //console.log(cookies.userid);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const [image, setImage] = useState(null);
  const [followerData, setFollowerData] = React.useState(null);
  const [plus, setPlus] = React.useState(0);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const fecthData = async() => {
    const res = await fetch(`https://dry-crag-93232.herokuapp.com/${routeUserId}/follow`, {
      method: "PATCH",
      headers: {
        "Authorization" : cookies.jwtoken
      },
    });
    const resp= await res.json();
    console.log(resp);
  };
  const handleFollow = async() => {
    console.log(follow)
    fecthData();
    setFollowerData(cookies.username);
    setFollow('true');
    localStorage.setItem('isfollow','true');
    setPlus((prev)=>(prev+1));
  };
  const handleUnFollow = async() => {
    handleOpen3();
  };
  function handleUnfollowConfirm(){
    setFollowerData(null);
    fecthData();
    setFollow('false');
    localStorage.setItem('isfollow','false');
    handleClose3();
    setPlus((prev)=>(prev-1));
  }
  
  useEffect(() => {
    setFollow(localStorage.getItem('isfollow'));
  }, []);
  return (
    <div className="user-profile-wrap">
      <ThemeProvider theme={theme}>
        <div class="container">
          <div class="cover-photo">
            <img
              src={
                image
                  ? image
                  : "https://images.unsplash.com/photo-1565464027194-7957a2295fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              }
              class="profile"
            />
          </div>
          <div class="profile-name">
          {isLoading ? (
              null
            ) : ( <div>
            {
              cookies.userid===routeUserId ? null : 
            <div>
            {console.log(follow)}
            { localStorage.getItem('isfollow')==='true' ? (<button onClick={handleUnFollow} class="cta">
                      <span>Following</span>
                    <div><RiUserFollowFill /></div>
                  </button>)
                  :
                  (<button onClick={handleFollow} class="cta">
                      <span>Follow</span>
                    <div><RiUserFollowLine /></div>
                  </button>)
            }
            </div>
            }
            </div>
            )}
            <Modal
              open={open3}
              onClose={handleClose3}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} id="scroll">
                <Typography
                  variant="h4"
                  sx={{
                    padding: "2%",
                    fontSize: "80%",
                  }}
                  align="center"
                >
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <div className="unfollow-modal">
                      Are you sure you want to unfollow {data.name}
                      <button onClick={handleUnfollowConfirm} className="unfollow-confirm-button"> YES</button>
                    </div>
                  )}
                </Typography>
              </Box>
            </Modal>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography
                variant="h4"
                sx={{
                  padding: "3%",
                  fontSize: "80%",
                }}
                align="right"
              >
                {data.name}
              </Typography>
            )}
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography
                variant="body2"
                sx={{
                  paddingRight: "3%",
                  fontSize: "80%",
                }}
                align="right"
              >
                {data.username}
              </Typography>
            )}
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography
                variant="body2"
                sx={{
                  paddingRight: "3%",
                  fontSize: "80%",
                }}
                align="right"
              >
                {data.email}
              </Typography>
            )}
          </div>
          <Divider
            style={{
              margin: "8% 0 0 0",
              background: "#9575cd",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <br></br>
          <div className="pinfo-reach">
            <div onClick={handleOpen1} className="followers1">
              {isLoading ? (
                <Skeleton />
              ) : (
                <Typography
                  variant="h4"
                  sx={{
                    paddingRight: "3%",
                    fontSize: "80%",
                  }}
                  align="center"
                >
                  {data.followers.length+plus}
                </Typography>
              )}
              <Typography
                variant="caption"
                sx={{
                  paddingRight: "3%",
                  fontSize: "80%",
                }}
                align="center"
              >
                FOLLOWERS
              </Typography>
            </div>
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
            {isLoading ? (
                    <Skeleton />
                  ) : (
              <Box sx={style1} id="scroll">
              { followerData && <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {followerData}
                    </Typography>
              }
                {data.followers.map((item) => {
                  return (
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {item.username}
                    </Typography>
                  );
                })}
              </Box>
                  )}
            </Modal>
            <div onClick={handleOpen2} className="followers2">
              {isLoading ? (
                <Skeleton />
              ) : (
                <Typography
                  variant="h4"
                  sx={{
                    paddingRight: "3%",
                    fontSize: "80%",
                  }}
                  align="center"
                >
                  {data.following.length}
                </Typography>
              )}
              <Typography
                variant="caption"
                sx={{
                  paddingRight: "3%",
                  fontSize: "80%",
                }}
                align="center"
              >
                FOLLOWING
              </Typography>
            </div>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
            {isLoading ? (
                    <Skeleton />
                  ) : (
              <Box sx={style2} id="scroll">
                {data.following.map((item) => {
                  return (
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {item.username}
                    </Typography>
                  );
                })}
              </Box>
               )}
            </Modal>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default PersonalInfo;

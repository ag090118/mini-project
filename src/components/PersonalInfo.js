import React, { useState } from "react";
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

let theme = createTheme();
theme = responsiveFontSizes(theme);

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
function PersonalInfo() {
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const [data, setData] = React.useState([
    "Smitesh",
    "Aryan",
    "Mehul",
    "Ankit",
    "Shreyas",
    "Arpit",
    "Smitesh",
    "Aryan",
    "Mehul",
    "Ankit",
    "Shreyas",
    "Arpit",
    "Smitesh",
    "Aryan",
    "Mehul",
    "Ankit",
    "Shreyas",
    "Arpit",
    "Smitesh",
    "Aryan",
    "Mehul",
    "Ankit",
    "Shreyas",
    "Arpit",
  ]);
  return (
    <div className="user-profile-wrap">
      <ThemeProvider theme={theme}>
        <div class="container">
          <div className="personalinfo-editbtn">
            <Button variant="text">Text</Button>
          </div>
          <div class="cover-photo">
            {/* <input type="file" onChange={onImageChange} className="filetype" /> */}
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
            <Typography
              variant="h4"
              sx={{
                padding: "3%",
                fontSize: "80%",
              }}
              align="right"
            >
              Smitesh Hadape
            </Typography>
            <Typography
              variant="body2"
              sx={{
                paddingRight: "3%",
                fontSize: "80%",
              }}
              align="right"
            >
              ZEROCHAN
            </Typography>
            <Typography
              variant="body2"
              sx={{
                paddingRight: "3%",
                fontSize: "80%",
              }}
              align="right"
            >
              iit2019090@iiita.ac.in
            </Typography>
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
              <Typography
                variant="h4"
                sx={{
                  paddingRight: "3%",
                  fontSize: "80%",
                }}
                align="center"
              >
                1100
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  paddingRight: "3%",
                  fontSize: "80%",
                }}
                align="center"
              >
                Following
              </Typography>
            </div>
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style1} id="scroll">
                {data.map((item) => {
                  return (
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {item}
                    </Typography>
                  );
                })}
              </Box>
            </Modal>
            <div onClick={handleOpen2} className="followers2">
              <Typography
                variant="h4"
                sx={{
                  paddingRight: "3%",
                  fontSize: "80%",
                }}
                align="center"
              >
                1100
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  paddingRight: "3%",
                  fontSize: "80%",
                }}
                align="center"
              >
                Followers
              </Typography>
            </div>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2} id="scroll">
                {data.map((item) => {
                  return (
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {item}
                    </Typography>
                  );
                })}
              </Box>
            </Modal>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default PersonalInfo;

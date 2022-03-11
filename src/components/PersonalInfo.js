import React from "react";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function PersonalInfo() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div class="container">
          <div class="cover-photo">
            <img
              src="https://images.unsplash.com/photo-1565464027194-7957a2295fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              class="profile"
            />
          </div>
          <div class="profile-name">
            <Typography
              variant="h4"
              sx={{
                padding: "3%",
              }}
              align="right"
            >
              Smitesh Hadape
            </Typography>
            <Typography
              variant="body2"
              sx={{
                paddingRight: "3%",
              }}
              align="right"
            >
              ZEROCHAN
            </Typography>
            <Typography
              variant="body2"
              sx={{
                paddingRight: "3%",
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
          <div onClick={()=>{console.log("hi")}}className="followers">
            <Typography
              variant="h4"
              sx={{
                paddingRight: "3%",
              }}
              align="center"
            >
              1100
            </Typography>
            <Typography
              variant="caption"
              sx={{
                paddingRight: "3%",
              }}
              align="center"
            >
              Followers
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
        </div>
      </ThemeProvider>
    </div>
  );
}
export default PersonalInfo;

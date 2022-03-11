import React from "react";
import Button from "@mui/material/Button";
import GppGoodIcon from "@mui/icons-material/GppGood";
import store from "./store";
import { loginFunc, logoutFunc } from "./actions/index";

function Header2() {
  // function handlePost() {
  //   store.dispatch(loginFunc("2", "Oggy"));
  // }
  return (
    <Button
      onClick={handlePost}
      className="postbutton"
      size="large"
      variant="contained"
      disableElevation
    >
      <GppGoodIcon fontSize="medium" />
      POST
    </Button>
  );
}
export default Header2;

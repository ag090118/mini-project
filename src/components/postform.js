import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextField from "@mui/material/TextField";
import parse from "html-react-parser";
import Tagchips from "./Tagchips";

function Postform(props) {
  const [convertedText, setConvertedText] = useState("");
  return (
    <div className="Postform-main">
      <div className="close-postform">
        <Button variant="contained" onClick={props.handlePostButton}>
          <IoMdArrowRoundBack />
        </Button>
      </div>
      <div className="postform-title">
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          name="userName"
          fullWidth={true}
          sx={{
            "& label.Mui-focused": {
              color: "white",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "cyan",
              },
            },
          }}
        />
      </div>
      <div className="postform-data">
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
      </div>

      {/* <Data convertedText={convertedText} /> */}
      <Tagchips />
      <div className="postform-postbutton">
        <Button size="large" endIcon={<IoSend />} variant="contained">
          POST
        </Button>
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

export default Postform;

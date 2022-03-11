import React, { useEffect, useState } from "react";
import Header from "./Header";
import Header2 from "./Header2";
import Main from "./Main";
import News from "./News";
import AddCollaborators from "./AddCollaborators";
import "../styles.css";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoSend } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextField from "@mui/material/TextField";
import parse from "html-react-parser";
import Tagchips from "./Tagchips";
import { IoCloseSharp } from "react-icons/io5";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { v4 as uuidv4 } from "uuid";
import Paper from "@mui/material/Paper";
import FileUpload from "react-mui-fileuploader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "90%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
  overflow: "auto",
};

function Home() {
  const name = useSelector((state) => state.checkUserLogin.userName);
  const [postType, setPostType] = React.useState("Discussion");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [convertedText, setConvertedText] = useState("");
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Virus" },
    { key: 1, label: "Worms" },
    { key: 2, label: "Trojan" },
    { key: 3, label: "Ransomware" },
    { key: 4, label: "Bots" },
    { key: 5, label: "Adware" },
    { key: 6, label: "Spyware" },
    { key: 7, label: "Rootkits" },
    { key: 8, label: "Fileless" },
    { key: 9, label: "Malvertising" },
  ]);
  const [chipDataPre, setChipDataPre] = React.useState([
    { key: 0, label: "Discussion" },
    { key: 1, label: "Malware" },
  ]);
  const [collaborators, setCollaborators] = React.useState([]);

  const handleDelete = (chipToDelete) => () => {
    var newChip = { key: uuidv4(), label: chipToDelete.label };
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    setChipDataPre([...chipDataPre, newChip]);
  };
  const handleDeletePre = (chipToDelete) => () => {
    var newChip = { key: uuidv4(), label: chipToDelete.label };
    //console.log(uuidv4());
    setChipDataPre((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    setChipData([...chipData, newChip]);
  };
  const handleDeleteCol = (chipToDelete) => () => {
    var newChip = { key: uuidv4(), label: chipToDelete.label };
    setCollaborators((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleAddCol = (chipToAdd) => {
    console.log(chipToAdd);
    setCollaborators([...collaborators, chipToAdd]);
  };

  const handleChange = (event, newpostType) => {
    setPostType(newpostType);
    setChipDataPre((prev) => {
      var tmp = prev;
      tmp[0].label = newpostType;
      return tmp;
    });
  };
  const handleFileUploadError = (error) => {
    // Do something...
  };

  const handleFilesChange = (files) => {
    console.log(files);
    // Do something...
  };
  const checkRender = async () => {
    if (!cookies.jwtoken) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkRender();
  }, []);

  const postSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://dry-crag-93232.herokuapp.com/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : cookies.jwtoken
      },
      body: JSON.stringify({
        title: title,
        description: convertedText,
        tags: chipDataPre,
        postadmins: collaborators,
      }),
    });
    const data = await res.json();
    console.log(data);
    // if (res.status === 200 || res.status === 201) {
    //   localStorage.setItem("Token", data.token);
    //   setCookie("username", userName, {
    //     path: "/",
    //     expire: new Date(new Date().getTime() + 258920000),
    //   });
    //   setCookie("jwtoken", localStorage.getItem("Token"), {
    //     path: "/",
    //     expire: new Date(new Date().getTime() + 258920000),
    //   });
    //   //setCookie('useremail', userName, { path: '/' , expire: new Date(new Date().getTime()+ 258920000)});
    //   store.dispatch(
    //     loginFunc(user.userId, user.userName, localStorage.getItem("Token"))
    //   );
    //   navigate("/");
    // } else if (res.status === 400 || res.status === 404) {
    //   alert("USER NOT REGISTERED");
    // } else alert("FAILED");
  };
  return (
    <div className="App">
      <div className="postform-wrapper">
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box id="scroll" sx={style}>
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={postType}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton
                selected={postType === "Discussion" ? true : false}
                value="Discussion"
              >
                Discussion
              </ToggleButton>
              <ToggleButton
                selected={postType === "Project" ? true : false}
                value="Project"
              >
                Project
              </ToggleButton>
            </ToggleButtonGroup>
            <div className="close-postform">
              <Button variant="contained" onClick={handleClose}>
                <IoCloseSharp />
              </Button>
            </div>
            <div className="postform-title">
              <TextField
                id="outlined-basic"
                label="Title"
                size="small"
                variant="outlined"
                name="userName"
                fullWidth={true}
                onChange={(e) => {
                  setTitle(e.target.value);
                  console.log(title);
                }}
                sx={{
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#BCBCBC",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
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
            {postType === "Project" ? (
              <div className="postform-fileupload">
                <FileUpload
                  multiFile={true}
                  disabled={false}
                  title="Attach Project"
                  header="[Drag to drop]"
                  leftLabel="or"
                  rightLabel="to select files"
                  buttonLabel="click here"
                  maxFileSize={10}
                  maxUploadFiles={0}
                  maxFilesContainerHeight={357}
                  errorSizeMessage={
                    "fill it or move it to use the default error message"
                  }
                  allowedExtensions={["jpg", "jpeg", "pdf", "zip"]}
                  onFilesChange={handleFilesChange}
                  onError={handleFileUploadError}
                  // imageSrc={"path/to/custom/image"}
                  bannerProps={{ elevation: 0, variant: "outlined" }}
                  containerProps={{ elevation: 0, variant: "outlined" }}
                />
              </div>
            ) : null}

            <div className="postform-tagchips">
              <Tagchips
                chipData={chipData}
                setChipData={setChipData}
                handleDelete={handleDelete}
                chipDataPre={chipDataPre}
                setChipDataPre={setChipDataPre}
                handleDeletePre={handleDeletePre}
              />
            </div>
            {postType === "Project" ? (
              <div className="postform-addcollaborators">
                <AddCollaborators
                  collaborators={collaborators}
                  setCollaborators={setCollaborators}
                  handleAddCol={handleAddCol}
                  handleDeleteCol={handleDeleteCol}
                />
              </div>
            ) : null}

            <div className="postform-postbutton">
              <Button
                onClick={postSubmit}
                size="large"
                endIcon={<IoSend />}
                variant="contained"
              >
                POST
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="header">
        <Header handleOpen={handleOpen} />
      </div>
      <h1>{cookies.username}</h1>
      <div className="center">
        <div className="main">
          <Main />
        </div>
        <div className="side">
          <News />
        </div>
      </div>
    </div>
  );
}
export default Home;

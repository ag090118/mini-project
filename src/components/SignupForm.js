import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { authentication } from "./Firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Divider from "@mui/material/Divider";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import store from "./store";
import { loginFunc, logoutFunc } from "./actions/index";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const navigate= useNavigate();
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        console.log(re);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [user, setUser] = useState({
    userName: "",
    userId: uuidv4(),
    pwd: "",
    userEmail: "",
    userfullname: "",
    userToken: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userfullname, userName, userEmail,pwd } = user;

    console.log(userName);
      const res=await fetch("https://dry-crag-93232.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: userfullname,
        username: userName,
        email : userEmail,
        password: pwd
      })
    });
    const data = await res.json();
    console.log(data);
    if(res.status === 200 || res.status === 201){
      navigate("/login");
    }
    else{
        alert("Failed");
    }
  };
  return (
    <div className="form-box-wrapper">
      <div className="form-box">
        <Typography
          sx={{
            padding: "3%",
            color: "white",
            justifyContent: "centre",
            alignItems: "centre",
            fontSize: "1.5em",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          Sign Up
        </Typography>
        <div>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="userfullname"
            onChange={handleChange}
            value={user.userfullname}
            sx={{
              "& label.Mui-focused": {
                color: "white"
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black"
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black"
                },
                "&:hover fieldset": {
                  borderColor: "black"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "cyan"
                }
              }
            }}
          />
        </div>
        <br></br>
        <div>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="userName"
            onChange={handleChange}
            value={user.userName}
            sx={{
              "& label.Mui-focused": {
                color: "white"
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black"
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black"
                },
                "&:hover fieldset": {
                  borderColor: "black"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "cyan"
                }
              }
            }}
          />
        </div>
        <br></br>
        <div>
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            name="userEmail"
            onChange={handleChange}
            value={user.userEmail}
            sx={{
              "& label.Mui-focused": {
                color: "white"
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black"
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black"
                },
                "&:hover fieldset": {
                  borderColor: "black"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "cyan"
                }
              }
            }}
          />
        </div>
        <br></br>
        <div>
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="pwd"
            onChange={handleChange}
            value={user.pwd}
            sx={{
              "& label.Mui-focused": {
                color: "white"
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black"
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black"
                },
                "&:hover fieldset": {
                  borderColor: "black"
                },
                "&.Mui-focused fieldset": {
                  borderColor: "cyan"
                }
              }
            }}
          />
        </div>
        {/* <input type="submit" value="LOGIN" className="login-btn" /> */}
        <Button
          sx={{
            marginBottom: "2%",
            marginTop: "2%"
          }}
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          REGISTER
        </Button>
        {/* <Button
          onClick={signInWithGoogle}
          startIcon={<FcGoogle />}
          sx={{
            marginBottom: "2%",
            marginTop: "2%",
            backgroundColor: "white",
            color: "black"
          }}
          type="submit"
          variant="contained"
        >
          SIGN UP WITH GOOGLE
        </Button> */}
        {/* <Button variant="contained">Contained</Button> */}
      </div>
    </div>
  );
};

export default LoginForm;

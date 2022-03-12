import React, { useState,useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { authentication } from "./Firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import store from "./store";
import { loginFunc, logoutFunc } from "./actions/index";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie';

const LoginForm = () => {
  const [cookies, setCookie] = useCookies({});
  const navigate= useNavigate();
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        console.log(re.user);
        setCookie('username', re.user.displayName, { path: '/' , expire: new Date(new Date().getTime()+ 25892000000)});
        setCookie('jwtoken', re.user.accessToken, { path: '/' , expire: new Date(new Date().getTime()+ 25892000000)});
        //setCookie('useremail', re.user.email, { path: '/' , expire: new Date(new Date().getTime()+ 25892000000)});
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
      
  }
  const [user, setUser] = useState({
    userName: "",
    userId: uuidv4(),
    pwd: "",
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
//       componentDidMount() {
//     // Simple POST request with a JSON body using fetch
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//         username: userName,
//         password: pwd
//       })
//     };
//     fetch('https://shielded-plateau-34245.herokuapp.com/signin', requestOptions)
//         .then(response => response.json())
//         .then(data => setUser({...user, userToken: data.token }));
// }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, pwd } = user;

    console.log(userName);
      const res=await fetch("https://dry-crag-93232.herokuapp.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userName,
        password: pwd
      })
    });
    const data = await res.json();
    console.log(data);
    if(res.status === 200 || res.status === 201){
        localStorage.setItem('Token', data.token)
        setCookie('username', userName, { path: '/' , expire: new Date(new Date().getTime()+ 258920000)});
        setCookie('jwtoken', localStorage.getItem('Token'), { path: '/' , expire: new Date(new Date().getTime()+ 258920000)});       
        //setCookie('useremail', userName, { path: '/' , expire: new Date(new Date().getTime()+ 258920000)});
        store.dispatch(loginFunc(user.userId, user.userName, localStorage.getItem('Token')));
        navigate("/");
    }
    else if(res.status === 400 || res.status === 404 ){
        alert("USER NOT REGISTERED");
    }
    else alert("FAILED");
      // .then((res) => {
      //   let data = res.json();
      //   console.log(data);
      //   // if(res.status === 200 || res.status === 201){
      //   //     localStorage.setItem('Token', data.token)
      //   //     store.dispatch(loginFunc(user.userId, user.userName, localStorage.getItem('Token')));
      //   //     navigate("/");
      //   //   }
      //   //   else{
      //   //       alert("Failed");
      //   //   }
      // })
      // .catch((err)=>{
      //       // if(err.response.status === 400 || err.response.status === 403)
      //        alert("USER NOT REGISTERED");
      //           console.log("FAILED");
      // });
    //console.log(localStorage.getItem('Token'));
    //setUser({...user,userToken:result.token}))
    // const body = {
    //     username: userName,
    //     password: pwd
    // }
    // const headers = {
    //     "Content-Type": "application/json"
    // }
    //     await axios.post('https://shielded-plateau-34245.herokuapp.com/signin',body,headers)
    //     .then((res)=>{
    //         let data = res.data;
    //         console.log(data);
    //         if(res.status === 200 || res.status === 201){
    //             //setCookie('user', {key: data.authKey, type:"STUDENT", email:EmailValues}, { path: '/' });
    //             setUser({...user,userToken:data.token});
    //             //return history.push("/student/dashboard");
    //         }else{
    //             alert("Failed");
    //         } 
    //     })
    //     .catch((err)=>{
    //         if(err.response.status === 400 || err.response.status === 403)
    //             console.log("FAILED");
    //     });
    //console.log(user);
    // console.log(message);
  };
  //https://shielded-plateau-34245.herokuapp.com
  return (
    <div className="form-box-wrapper">
      <div className="form-box">
          <Typography
            sx={{
              textAlign: "center",
              padding: "3%",
              color: "white",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5em",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            Sign In
          </Typography>
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
              width: "100%",
              marginBottom: "2%",
              marginTop: "2%"
            }}
            // component={Link}
            // to="/"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            SIGN IN
          </Button>
          <Button
            onClick={signInWithGoogle}
            startIcon={<FcGoogle />}
            sx={{
              width: "100%",
              marginBottom: "2%",
              marginTop: "2%",
              backgroundColor: "white",
              color: "black"
            }}
            type="submit"
            variant="contained"
          >
            SIGN IN WITH GOOGLE
          </Button>
          {/* <Button variant="contained">Contained</Button> */}
          <Divider
            sx={{
              marginBottom: "2%",
              marginTop: "2%"
            }}
          />
          <Button
            component={Link}
            to="/signup"
            sx={{ width: "100%", marginBottom: "5%" }}
            type="submit"
            variant="contained"
          >
            REGISTER
          </Button>
      </div>
    </div>
  );
};

export default LoginForm;

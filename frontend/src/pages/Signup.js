import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import React from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import "../index.css"
const Signup = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState("");
    const [handle, setHandle] = useState("");
    const [userData, setUserData] = useState({});
    const signup = async() => {
        
    try {
        const data = await (await axios.post("/signup", userData)).data;
    console.log("data", data)
    setUserData("response", data); 
    localStorage.setItem("FBIdToken", `Bearer ${data.token}`)
    history.push("/");
    } catch (error) {
        console.log("error fetching the data", error.request)
    }  
}
    const handleSubmit = async (e)=> {
        e.preventDefault();

    setUserData({
      email,
      password,
      confirmPassword,
      type,
      handle
    });
    console.log("data", userData)
    signup();
    }
    return (
        <Grid container className="loginForm">
            <Grid item sm/>
            <Grid item >
            <Typography variant="h1"style= {{margin: "25px auto 25px auto"}}>
          Signup
        </Typography>
       
        <form noValidate onSubmit={handleSubmit} style={{maxWidth: "500px"}}>
        <TextField
            id="handle"
            name="handle"
            type="handle"
            label="handle"
            className="textField"
            value={handle}
            style={{marginTop: "5px",
                }}
            onChange={(e) => {
              setHandle(e.target.value);
            }}
            fullWidth
            // helperText={errors.email}
            // error={errors.email ? true : false}
          ></TextField>

        <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className="textField"
            value={email}
            style={{marginTop: "5px",
                }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            // helperText={errors.email}
            // error={errors.email ? true : false}
          ></TextField>

          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            style={{marginTop: "5px",
                }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth
            // helperText={errors.password}
            // error={errors.password ? true : false}
          ></TextField>

<TextField
            id="confirmPassword"
            name="confirmPassword"
            type="confirmPassword"
            label="confirmPassword"
            style={{marginTop: "5px",
                }}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            fullWidth
            // helperText={errors.password}
            // error={errors.password ? true : false}
          ></TextField>

<TextField
            id="type"
            name="type"
            type="type"
            label="type"
            style={{marginTop: "5px",
                }}
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            fullWidth
            // helperText={errors.password}
            // error={errors.password ? true : false}
          ></TextField>
          <Button
            varient="contained"
            type="submit"
            color="primary"
            className="loginBtn"
            // onClick={() => {handleSubmit()}}
          >
              Signup
          </Button>
        </form>
            </Grid>
            <Grid item sm/>

        </Grid>
    )
}

export default Signup

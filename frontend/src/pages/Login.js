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
const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});
    const Login = async() => {
        
    try {
        const data = await (await axios.post("/login", userData)).data;
    console.log("data", data)
    setUserData("response", data); 
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
    });
    console.log("data", userData)
    Login();
    }
    return (
        <Grid container className="loginForm">
            <Grid item sm/>
            <Grid item >
            <Typography variant="h1"style= {{margin: "25px auto 25px auto"}}>
          Login
        </Typography>
       
        <form noValidate onSubmit={handleSubmit}>
        <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className="textField"
            value={email}
            style={{margin: "15px auto",
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
            style={{margin: "15px auto",
                }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
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
              Login
          </Button>
        </form>
            </Grid>
            <Grid item sm/>

        </Grid>
    )
}

export default Login

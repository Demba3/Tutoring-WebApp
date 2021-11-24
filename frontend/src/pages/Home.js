import { Grid } from '@material-ui/core'
import React from 'react'
import Course from '../components/Course'
import "../index.css"
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

import TuteeProfile from '../components/TuteeProfile'
const Home = ({authenticated, user}) => {
    console.log("user type", user)
    const history = useHistory();
   
    if(!authenticated){
        return(
            <div  className="homePage-unauthenticated">
            <Button
            varient="contained"
            type="submit"
            color="primary"
            className="loginBtn"
            onClick={() => {history.push("/login");}}
            style={{padding: "30px", fontSize: "60px"}}
          >
              Login
          </Button>
          <Button
            varient="contained"
            type="submit"
            color="primary"
            className="loginBtn"
            onClick={() => {history.push("/signup");}}
            style={{padding: "30px", fontSize: "60px"}}
          >
              Signup
          </Button>
            </div>
        )
    }
    return (
    <div className="homePage">
        <Grid container spacing = {16} >
            <Grid item sm={8} xs={12}>
            <h1>Schedule App</h1>
                <Course subject={"Math"}/>
                <Course subject={"Chemistry"}/>
                <Course subject={"Biology"}/>
                <Course subject={"Algorithms"}/>
                <Course subject={"English"}/>
                <Course subject={"Systems Programing"}/> 
            </Grid>
            <Grid item sm={4} xs={12}>
            <h1>Profile</h1>
            <TuteeProfile authenticated={authenticated} user={user}/>
            </Grid>
        </Grid>
    </div>
        
    )
}

export default Home

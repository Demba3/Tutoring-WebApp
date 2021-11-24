import React from "react";
import { Card, CardContent, CardMedia } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "../index.css";
const Appointment = ({
  appointment: {
    appointmentId,
    approved,
    createdAt,
    imageUrl,
    location,
    subject,
    time,
    userHandle,
  },
  userType,
}) => {
    const approveAppointment = async() => {
        try {
              const token = localStorage.FBIdToken;
              
              axios.defaults.headers.common["Authorization"] = token;
              const data =  ( await axios.post(`/appointment/${appointmentId}`)).data
              console.log("appointment approved", data);
          }
           catch (error) {
            
              console.log("error approving appointment ", error)
              // console.log("done loading")
          }
    }
  console.log("type appointments", userType);
  return (
    <div>
      <Card
        className="appointment"
        style={{ backgroundColor: "lightblue", marginBottom: "20px " }}
      >
        <CardMedia image={imageUrl} title="Profile Image" />
        <CardContent className="appContent" className="appImage">
          <Typography variant="h5">{userHandle}</Typography>
          <Typography variant="body2" color="textSecondary">
            {createdAt}
          </Typography>
          <Typography variant="body1">
            <a href={location} target=" blank" rel="noopener noreferrer">
              {`Location: ${location}`}
            </a>
          </Typography>
          <Typography variant="body1"> {`Subject: ${subject}`}</Typography>
          <Typography variant="body1"> {`Time: ${time}`}</Typography>
          <Typography variant="body2">{`Approved? ${approved}`}</Typography>
          {userType == "Tutor" ? (
            <Button
              varient="contained"
              type="submit"
              color="primary"
              className="loginBtn"
              onClick={() => {
                approveAppointment();
              }}
              style={{padding: "10px", fontSize: "30px", marginLeft: "50%" }}
            >
              Approve
            </Button>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;

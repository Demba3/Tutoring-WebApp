import { useState } from 'react';
import MyButton from '../util/MyButton';
import "../index.css";
//MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
// Icons
// import EditIcon from "@material-ui/icons/Edit"
import EditIcon from '@material-ui/icons/Schedule';
import { set } from 'date-fns';
export const AddAppointment = () => {
    const [location, setLocation] = useState("");
    const [subject, setSubject] = useState("");
    const [appointmentDetails, setAppointmentDetails] = useState({});
    const [time, setTime] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const postAppointment = async() => {
      try {
        setAppointmentDetails({
          location,
          subject,
          time
        })
          const token = localStorage.FBIdToken;
          setLoading(true)
          axios.defaults.headers.common["Authorization"] = token;
          const data =  ( await axios.post("https://us-central1-tutoring-app-3c59d.cloudfunctions.net/api/appointment", appointmentDetails )).data
          setAppointmentDetails(data);
          console.log("new appointment created", data);
      }
       catch (error) {
          setLoading(false)
          console.log("error creating new appointment", error)
          // console.log("done loading")
      }
  }
    const handleSubmit = () => {
      postAppointment();
  }
    return (
        <div className="courseContainer">
            <Tooltip title="Add an appoinment" placement="top">
          <IconButton onClick={() => {setOpen(true)}} className="edit-btn">
              <EditIcon color="primary"/>
          </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => {setOpen(false)}} fullWidth maxWidth="sm">
      <DialogTitle>Schedule an appoinment</DialogTitle>  
      <DialogContent>
        <form>
        <TextField 
            name="location"
            type="text"
            label="location"
            placeholder="Enter your prefered Location or let tutor enter location"
            className= "textfield"
            value={location}
            onChange={(e) => {
                setLocation(e.target.value);
              }}
            fullWidth
            />

        <TextField 
            name="Subjects"
            type="text"
            label="Subjects"
            placeholder="Retype subject you need help with"
            className= "textfield"
            value={subject}
            onChange={(e) => {
                setSubject(e.target.value);
              }}
            fullWidth
            />
            
            <TextField 
            name="time"
            type="text"
            label="time"
            placeholder="11/1/2021 3:00 - 4:30"
            className= "textfield"
            value={time}
            onChange={(e) => {
                setTime(e.target.value);
              }}
            fullWidth
            />      
          </form>
          </DialogContent>

          <DialogActions>
              <Button onClick={() => {setOpen(false)}} color="primary">
                  Cancle
              </Button>
              <Button onClick={handleSubmit} color="primary">
                  Save
              </Button>
          </DialogActions>
      </Dialog>
        </div>
    )
}

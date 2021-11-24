import { useState } from 'react';
import MyButton from '../util/MyButton';
import axios from 'axios';
//MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

// Icons
import EditIcon from "@material-ui/icons/Edit"
export const EditTutorProfile = () => {
    const [bio, setBio] = useState("");
    const [open, setOpen] = useState(false);
    const [name, SetName] = useState("");
    const [Subjects, setSubjects] = useState("");
    const [major, setMajor] = useState("");
    const [classStanding, setClassStanding] = useState("");
    const [user, setUser] = useState({});

    const UdateProfile = async() => {
      try {
        setUser({
          major,
          bio,
          classStanding
        })
          const token = localStorage.FBIdToken;
          
          axios.defaults.headers.common["Authorization"] = token;
          const data =  ( await axios.post("/user", user )).data
          setUser(user)
          console.log("profile updated", data);
      }
       catch (error) {
        
          console.log("error updating profile", error)
          // console.log("done loading")
      }
  }
    
    const handleSubmit = () => {
        UdateProfile();
        console.log(user);
        setOpen(false);
    }
    return (
        <>
            <Tooltip title="Edit details" placement="top">
          <IconButton onClick={() => {setOpen(true)}} className="edit-btn">
              <EditIcon color="primary"/>
          </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => {setOpen(false)}} fullWidth maxWidth="sm">
      <DialogTitle>Edit your details</DialogTitle>  

      <DialogContent><form>
         

        {/* <TextField 
            name="Name"
            type="text"
            label="Name"
            placeholder="Enter your Name"
            className= "textfield"
            value={name}
            onChange={(e) => {
                SetName(e.target.value);
              }}
            fullWidth
            /> */}

        {/* <TextField 
            name="Subjects"
            type="text"
            label="Subjects"
            placeholder="Subjects Taught"
            className= "textfield"
            value={Subjects}
            onChange={(e) => {
                setSubjects(e.target.value);
              }}
            fullWidth
            /> */}
            
            <TextField 
            name="Major"
            type="text"
            label="major"
            placeholder="Major"
            className= "textfield"
            value={major}
            onChange={(e) => {
                setMajor(e.target.value);
              }}
            fullWidth
            />

            <TextField 
            name="Class Standing"
            type="text"
            label="classStanding"
            placeholder="Class Standing"
            className= "textfield"
            value={classStanding}
            onChange={(e) => {
                setClassStanding(e.target.value);
              }}
            fullWidth
            />

             <TextField 
            name="Bio"
            type="text"
            label="Bio"
            multiline
            rows="2"
            placeholder="a short bio about yourself"
            className="textfield"
            value={bio}
            onChange={(e) => {
                setBio(e.target.value);
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
        </>
    )
}

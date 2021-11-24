import { useState } from "react"
import axios from "axios";
// images
import profileimg from "../images/noName.png"
// MUI stuff
import '../index.css';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import MyButton from "../util/MyButton";
import { EditTutorProfile } from "./EditTutorProfile";
const TuteeProfile = ({authenticated, user:{major, bio, classStanding, handle, imageUrl, type}}) => {
console.log("image", imageUrl)
    const handleImageChange = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        const token = localStorage.FBIdToken;
        axios.defaults.headers.common["Authorization"] = token;
        const data =  ( await axios.post("/user/image", formData )).data    
    }
    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
      };
    return (
        <>
        <Paper className= "profile-container">
            <div className="profile">
                <div className= "profile-image-wrapper">
                    <img src={imageUrl} alt="profile" className= "profile-img"/>
                    <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
                    <MyButton
                tip="Edit profile picture"
                onClick={handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
                </div>
            </div>
            <hr/>
            <hr/>
            <div className= "profile-details">
            <Typography variant="body2"><hr /> {handle && <Typography variant="body2">{handle}</Typography>} <hr /> </Typography>
            <Typography variant="body2"><hr /> {major && <Typography variant="body2">{major}</Typography>} <hr /> </Typography>
            <Typography variant="body2"><hr /> {classStanding && <Typography variant="body2">{classStanding}</Typography>} <hr /> </Typography>
            <Typography variant="body2"><hr /> {bio && <Typography variant="body2">{bio}</Typography>} <hr /></Typography>
            </div>
            <div>
                <EditTutorProfile/>
            </div>        
        </Paper>
            
        </>
    )
}

export default TuteeProfile

import React from 'react'
import { Card, CardContent, CardMedia} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import "../index.css"
const Appointment = ({ appointment:{appointmentId, approved, createdAt, imageUrl, location, subject, time, userHandle}}) => {
    return (
        <div>
            <Card className="appointment" style={{ backgroundColor: "lightblue", marginBottom: "20px "}}>
                <CardMedia image={imageUrl} title="Profile Image"/>
                <CardContent className="appContent" className="appImage">
                    <Typography  variant="h5">{userHandle}</Typography>
                    <Typography  variant="body2" color="textSecondary">{createdAt}</Typography>
                    <Typography  variant="body1">
                    <a href={location} target=" blank" rel="noopener noreferrer">
                    {`Location: ${location}`}
                        </a>
                         </Typography>
                    <Typography  variant="body1"> {`Subject: ${subject}`}</Typography>
                    <Typography  variant="body1"> {`Time: ${time}`}</Typography>
                    <Typography variant="body2">{`Approved? ${approved}`}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Appointment

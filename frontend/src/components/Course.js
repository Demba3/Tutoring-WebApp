import {useState, useEffect} from 'react'
import { AddAppointment } from './AddAppointment'
import { Card, CardContent, CardMedia} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
// dispalys the subject name and allows the student to set an appointment
const Course = ({subject}) => {
    console.log("cousres prop", subject)
    return (
        <>
          <Card style={{margin: "10px"}}>
            <CardContent>
                <Typography><h1>{subject}</h1></Typography>  
                <AddAppointment/>
            </CardContent>  
          </Card> 
        </>
    )
}

export default Course

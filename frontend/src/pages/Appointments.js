import { useState, useEffect } from 'react'
import axios  from 'axios'
import Appointment from '../components/Appointment'
import { da } from 'date-fns/locale';
import { Tune } from '@material-ui/icons';
const Appointments = ({authenticated, type}) => {
    const [appArrayStudent, setAppointmentsStudent] = useState([]);
    const [appArrayTutor, setAppointmentsTutor] = useState([]);
    const [loading, setLoading] = useState(true);

//get student appointment
    const getAppointmnetsStudent = async() => {
        try {
            if(authenticated && type === "Student"){
                const token = localStorage.FBIdToken;
                setLoading(true)
                 axios.defaults.headers.common["Authorization"] = token;
            const data =  ( await axios.get("/user/appointments")).data
            setAppointmentsStudent(data);
                console.log("student appointments", data)
        }else{setLoading(false)
            // console.log("done loading")
            return;
            //return message asking them to login as student
        }
        } catch (error) {
            setLoading(false)
            console.log("fetching user app", error)
            // console.log("done loading")
        }
        
    }
    const getAppointmentsTutor = async() => {
        try {
            if(authenticated  && type === "Tutor"){
                const token = localStorage.FBIdToken;
                setLoading(true)
                axios.defaults.headers.common["Authorization"] = token;
            const data =  (await axios.get("/appointments")).data
            setAppointmentsTutor(data);
                console.log("tutor appointments", data)
        }else{
            //return message asking them to login as student
            setLoading(false)
            return;
        }
        } catch (error) {
            setLoading(false)
            // console.log("done loading")
            console.log("fetching user app", error)
        }
    }
    useEffect(() => {
            getAppointmnetsStudent();
            getAppointmentsTutor();
            setLoading(false)
            console.log("done loading")
    },[])
    if(loading === true){
        console.log("loading appointments")
        return(
            <div style={{marginTop:"100px"}}>
                <h1>Loading</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>hello</h1>
           {appArrayStudent.map((app, idx) => {
              return <Appointment key={idx} appointment={app}/>
           })}       
        </div>
    )
}

export default Appointments
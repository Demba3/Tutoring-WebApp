import './App.css';
import {useEffect, useState} from "react"
import TutorProfile from './components/TuteeProfile';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';
import Appointment from './components/Appointment';
import jwtDecode from 'jwt-decode';
// pages
import Appointments from './pages/Appointments';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// react router stuff
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import AuthRoute from './util/AuthRoute';
import axios from 'axios';
const token = localStorage.FBIdToken;
let authenticated;
if(token){
const decodedToken = jwtDecode(token)
// console.log("decodec token ", decodedToken);
if(decodedToken.exp * 1000 < Date.now()){
  authenticated = false;
  localStorage.removeItem("FBIdToken");
  window.location.href = "/login"
}else{
  authenticated = true;
}
}
//get user data to derternmine type of user

function App() {
  const [user, setUser] = useState({})
  const setUserType = async () => {
    if(authenticated){
        try {
            axios.defaults.headers.common["Authorization"] = token;
        const data =  ( await axios.get("/user")).data
        setUser(data);
        } catch (error) {
            console.log(error)
        }
    }
  }
  useEffect(() => {
    setUserType();
  },[])

  console.log("user type from app", user.type)
  return (
    <>
    
    
    <Router>
    <Navbar/>
    <div className="appContainer">
     <Route exact path = '/'> <Home authenticated={authenticated} user={user}/> </Route>
     <AuthRoute authenticated={authenticated} exact path = '/login' component={Login}/> 
     <AuthRoute authenticated={authenticated} exact path = '/signup' component={Signup}/>
     <Route exact path = "/appointments"><Appointments authenticated={authenticated} type={user.type}/></Route>
     </div>
   </Router>
    
   </>
  );
}

export default App;
{/* <div className="App"> */}
{/* <TutorProfile/> */}
{/* <Appointment /> */}
{/* <Navbar/> */}
{/* <TutorProfile/> */}
{/* <Calendar/> */}
{/* </div> */}
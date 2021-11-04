import { Link } from 'react-router-dom'
import '../index.css'
import { AppBar } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import MyButton from '../util/MyButton'
import { Search } from '@material-ui/icons'
import { Home} from '@material-ui/icons'
import TextField from '@material-ui/core/TextField';
import Appointment from "@material-ui/icons/School"
import LoginIcon from '@mui/icons-material/Login';
import Signup from '@mui/icons-material/PersonAdd';

const Navbar = () => {
    return (
        <AppBar>
            <Toolbar className="nav-container">
            <Link to="/">
            <MyButton tip="Home">
                <Home 
                style={{ color: "white" }}/>
            </MyButton>
             </Link>
            <Link to="/login">
            <MyButton tip="Login">
                <LoginIcon 
                style={{ color: "white" }}/>
            </MyButton>
            </Link>
            
            <MyButton tip="Search for Tutor">
                < Search
                style={{ color: "white" }}/>
                <TextField
                // name="Name"
                type="text"
                placeholder="Search"
                className= "search-text"
                id="standard-basic" 
                variant="standard" 
                />
            </MyButton>
            <Link to="/signup">
            <MyButton tip="Signup">
                <Signup 
                style={{ color: "white" }}/>
            </MyButton>
            </Link>
            <Link to="/appointments">
            <MyButton tip="Appointments">
                <Appointment 
                style={{ color: "white" }}/>
            </MyButton>
            </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

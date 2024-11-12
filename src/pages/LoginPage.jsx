import React, { useEffect, useState } from 'react'
//import './LoginPage.css'
import './Login2.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornments from '../assets/components/Passwordfield';
import AppBar1 from '../assets/components/Navbar1';
import { AdminLogin } from '../services/api/Auth';
import { useNavigate } from 'react-router-dom';
// import AutohideSnackbar from '../assets/components/snackbar';
import Snackbar from '@mui/material/Snackbar';



const LoginPage = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };




    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const handleNameChange = (e) =>{
        setUsername(e.target.value)
    }
    // useEffect(()=>{
    //    console.log(username, password) 
    // }, [username, password])

    const handleLogin = async() =>{
        setIsDisabled(true)
        const data = {
            username: username,
            password: password
        }
        const Authenticated = await AdminLogin(data)

        if(Authenticated) {navigate('/home')
            window.location.reload()
        }
        else{
            handleClick();
            setIsDisabled(false);
        };
        // window.location.reload();                                   // refreshing page each time routed to /home....!
    }
    return (
    <div>
        <div className="Loginpagecontainer">
            <div className="navbar">
                <AppBar1/>
            </div>
            <div className="loginbox">
                <div className="box">
                    <div className="username">
                        <TextField value={username} onChange={handleNameChange} fullWidth id="outlined-basic" label="USERNAME" variant="outlined" />
                    </div>
                    <div className="password">
                        {/* <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" /> */}
                        <InputAdornments password ={ password } setPassword={ setPassword } />
                    </div>
                    <div className="divide">
                    <Divider />

                    </div>

                    <div className="loginbutton">
                        <Button onClick={handleLogin} disabled={isDisabled} fullWidth variant="contained" size="large">Login</Button>
                    </div>
                </div>
            </div>
            {/* <AutohideSnackbar /> */}
            
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Invalid Username or password"
      />
        </div>
    </div>
  )
}

export default LoginPage
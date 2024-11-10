import React from 'react'
import './LoginPage.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornments from '../assets/components/Passwordfield';
import AppBar1 from '../assets/components/Navbar1';


const LoginPage = () => {
  return (
    <div>
        <div className="Loginpagecontainer">
            <div className="navbar">
                <AppBar1/>
            </div>
            <div className="loginbox">
                <div className="box">
                    <div className="username">
                        <TextField fullWidth id="outlined-basic" label="USERNAME" variant="outlined" />
                    </div>
                    <div className="password">
                        {/* <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" /> */}
                        <InputAdornments />
                    </div>
                    <div className="divide">
                    <Divider component="li" />

                    </div>

                    <div className="loginbutton">
                        <Button fullWidth variant="contained" size="large">Login</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
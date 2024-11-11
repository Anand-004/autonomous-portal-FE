import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornments from '../assets/components/Passwordfield';
import AppBar1 from '../assets/components/Navbar1';
import { AdminLogin } from '../services/api/Auth';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
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

        if(Authenticated) navigate('/home');
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
                    <Divider component="li" />

                    </div>

                    <div className="loginbutton">
                        <Button onClick={handleLogin} disabled={isDisabled} fullWidth variant="contained" size="large">Login</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
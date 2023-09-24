import React, { Fragment, useState } from 'react';
import {Container, Grid, Button, Box, TextField, Typography, Checkbox, Link, Alert} from "@mui/material"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { config } from '../../config';

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  const handleChange = (e, fn) => {
    setError("")
    fn(e.target.value)
  }

  const handleSignup = async () => {
    if (!email || !password || !email || !password) {
      setError('All field are required.');
      return;
    }
  
    if (!isStrongPassword(password)) {
      setError('Password must be strong.');
      return;
    }
    try {
      const fullName = `${firstname} ${lastname}`
      const response = await axios.post(`${config.BASE_URL}/auth/sign-up`, {
        fullName,
        email,
        password
      });
  
      navigate('/user/dashboard/home');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };
  
  return (
    <Fragment>
      <Box sx={{background: 'linear-gradient(45deg, #cfbcdf, #c7ebf0)', width: "100%"}}>
        <Container alignItems="center" >
          <Grid container  sx={{height: "100vh", alignItems: "center", justifyContent: "center",  }}>
            <Grid item xs={12} sm={12} md={5} lg={4} sx={{background: "white",boxShadow: 3, borderRadius: 3, p:3, width: "100%" }}>
              <Typography variant="h4" pb={5} color="initial" align="center" fontWeight="bold">
                Sign up
              </Typography>
              <Typography pb={5} color="initial" align="center">
                { error ? <Alert severity="error">{error}</Alert> : null }
              </Typography>
              <Box>
                <TextField 
                id="outlined-basic" 
                label="Firstname" 
                variant="outlined" fullWidth
                onChange={(e) => handleChange(e, setFirstname)} />
              </Box>
              <Box  my={3}>
                <TextField 
                id="outlined-basic" 
                label="LastName" 
                variant="outlined" 
                fullWidth 
                onChange={(e) => handleChange(e, setLastname)} />

              </Box>
              <Box>
                <TextField 
                id="outlined-basic" 
                type="email" 
                label="Email" 
                variant="outlined" fullWidth 
                onChange={(e) => handleChange(e, setEmail)} />
              </Box>
              <Box my={3} >
                <TextField type="password" 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" fullWidth 
                onChange={(e) => handleChange(e, setPassword)} />
              </Box>
              <Box sx={{ background: '#0288d1', color: '#fff', p: 0.4, borderRadius: '4px'}}>
              <Button fullWidth sx={{color: "white", }} onClick={handleSignup}>Register</Button>
              </Box>
              <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Box display="flex">
                  <p>Already Registered? <Link href="/login">Login</Link></p>
                </Box>
              </Box>
              <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mt:3}}>
                <Box display="flex">
                  <Checkbox defaultChecked />
                  <p>Remember me</p>
                </Box>
                <Box>
                  <p>Forgot Password</p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  )
}

export default Signup

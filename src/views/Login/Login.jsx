import React, { Fragment, useState } from 'react';
import {Container, Grid, Button, Box, TextField, Typography, Checkbox, Link, Alert} from "@mui/material"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { config } from '../../config';

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e, fn) => {
    setError("")
    fn(e.target.value)
  }

  const handleLogin = async () => {
    setError("")
    console.log(email, password)
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/auth/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/user/dashboard/home');
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <Fragment>
      <Box sx={{background: 'linear-gradient(45deg, #cfbcdf, #c7ebf0)', width: "100%"}}>
        <Container alignItems="center" >
          <Grid container  sx={{height: "100vh", alignItems: "center", justifyContent: "center",  }}>
            <Grid item xs={12} sm={12} md={5} lg={4} sx={{background: "white",boxShadow: 3, borderRadius: 3, p:3, width: "100%" }}>
              <Typography variant="h4" pb={5} color="initial" align="center" fontWeight="bold">
                Login
              </Typography>
              <Typography pb={5} color="initial" align="center">
              { error ? <Alert severity="error">{error}</Alert> : null }
              </Typography>
              <Box>
                <TextField 
                  type="email"
                  id="outlined-basic" 
                  label="Email" 
                  variant="outlined" fullWidth 
                  onChange={(e) => handleChange(e, setEmail)}
                  />
              </Box>
              <Box my={3} >
              <TextField 
                type="password"
                id="outlined-basic" 
                label="Password" variant="outlined" 
                fullWidth 
                onChange={(e) => handleChange(e, setPassword)}

                />
              </Box>
              <Box sx={{ background: '#0288d1', color: '#fff', p: 0.4, borderRadius: '4px'}}>
              <Button fullWidth sx={{color: "white", }} onClick={handleLogin}>Login</Button>
              </Box>
              <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Box display="flex">
                  <p>Not yet registered? <Link href="/signup">Signup</Link></p>
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

export default Login

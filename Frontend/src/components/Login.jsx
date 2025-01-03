import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, IconButton } from '@mui/material';
import { Google, Facebook, Twitter } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import Logo from '../assets/images/login.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authslice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/login', loginData);
      const { user, token } = response.data;

      localStorage.setItem('user', JSON.stringify({ name: user.name, token }));

      dispatch(login({ name: user.name, token }));

      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/register', registerData);
      toast.success('User registered successfully! Please log in now.');

      setIsFlipped(false);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  
  return (
<div className="flex min-h-screen items-center justify-center bg-[#0093E9] bg-gradient-to-br from-[#0093E9] to-[#80D0C7]">
  <ToastContainer />
  <div className="flex w-4/5 max-w-6xl shadow-lg rounded-lg h-[600px]   overflow-hidden">
    {/* Left Side Image */}
    <div className="w-3/5 hidden md:block">
      <img
        src={Logo}
        alt="Auth Illustration"
        className="h-[600px] w-[600x] object-cover"
      />
    </div>

    {/* Right Side Auth Card */}
    <div className="w-full md:w-2/5 bg-white p-12 flex items-center">
      <div className={`relative w-full h-full transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Login Form */}
        <div className={`absolute inset-0 flex items-center justify-center ${isFlipped ? 'hidden' : 'block'}`}>
          <Card className="w-full  shadow-xl">
            <CardContent>
              <Typography variant="h5" className="text-center font-bold mb-6">
                Login
              </Typography>
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth className="mt-6">
                  Login
                </Button>
              </form>
              <Button onClick={() => setIsFlipped(true)} fullWidth className="mt-4 text-blue-500">
                Don't have an account? Register Now
              </Button>
              <div className="flex justify-center gap-4 mt-6">
                <IconButton color="primary">
                  <Google />
                </IconButton>
                <IconButton color="primary">
                  <Facebook />
                </IconButton>
                <IconButton color="primary">
                  <Twitter />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Register Form */}
        <div className={`absolute inset-0 flex items-center justify-center ${isFlipped ? 'block' : 'hidden'} rotate-y-180`}>
          <Card className="w-full">
            <CardContent>
              <Typography variant="h5" className="text-center font-bold mb-6">
                Register
              </Typography>
              <form onSubmit={handleRegisterSubmit}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth className="mt-6">
                  Register
                </Button>
              </form>
              <Button onClick={() => setIsFlipped(false)} fullWidth className="mt-4 text-blue-500">
                Already have an account? Login
              </Button>
              <div className="flex justify-center gap-4 mt-6">
                <IconButton color="primary">
                  <Google />
                </IconButton>
                <IconButton color="primary">
                  <Facebook />
                </IconButton>
                <IconButton color="primary">
                  <Twitter />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;

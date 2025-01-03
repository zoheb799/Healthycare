import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authslice";
import { IconButton, Typography, AppBar, Toolbar, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TopBar = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user);
  console.log(userName, 'name');
  

  const handleLogout = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;
  
      if (!token) {
        throw new Error("Token not found");
      }
  
      await axios.post(
        "api/v1/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      localStorage.removeItem("user");
      toast.success("Logout successful... redirecting to login page");
  
      dispatch(logout());
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed... try again");
    }
  };
  

  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-white">
          Welcome, {userName}
        </Typography>

        <Button
          onClick={handleLogout}
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

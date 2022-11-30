import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector} from "react-redux";
import { logout } from '../store/auth.js';

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  function _logout() {
    Cookies.remove('token');
    dispatch(logout())
    navigate('/login');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/' className='text-white'>
              Expensor
            </Link>
          </Typography>

          <Link to='/category' className='text-white'>
            <Button color="inherit">Category</Button>
          </Link>
          
          {
            isAuthenticated && (
              <Button color="inherit" onClick={_logout}>Logout</Button>
            )
          }

          { 
            !isAuthenticated && (
              <>
                <Link to='/login' className='text-white'>
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to='/register' className='text-white'>
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            )
          }
          
        </Toolbar>
      </AppBar> 
    </Box>
  );
}
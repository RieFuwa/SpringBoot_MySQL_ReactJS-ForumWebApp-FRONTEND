
import * as React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.scss"
function NavBar() {

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='default'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign:"left" }}>
                            <Link className='link' to="/">Home</Link>
                        </Typography>
                        <Typography variant="h6" component="div">
                        <Link className='link' to={{ pathname: '/users/' }}>USER</Link>
                        </Typography>
                        
                        {/* <Button color="inherit">Login</Button> */}
                    </Toolbar>
                </AppBar>
            </Box>

        </div>
    )
}
export default NavBar;

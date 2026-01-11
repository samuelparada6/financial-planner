import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Container,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

// Displays the AppBar header with menu
export default function AppBarHeader() {
    
    // Handles Menu functionality for AppBar
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            {/* Full-bleed AppBar with centered content. Using position fixed so it stays visible on scroll.
            We place a Container inside the Toolbar to keep the inner content centered while the
            AppBar background spans the full viewport. A spacer Toolbar follows to push page content down. */}
            <AppBar position="fixed" sx={{ width: '100%', left: 0, right: 0 }}> 
            <Toolbar disableGutters>
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Budget Tracker
                </Typography>
                <Button color="inherit">Login</Button>
                </Container>
            </Toolbar>
            </AppBar>
        </>
    )
}
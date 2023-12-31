import React from 'react';
import { Typography, Toolbar, IconButton, Badge} from "@mui/material"
import styled from '@emotion/styled';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const AppTopBar = (props) => {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
      };
    
    return (
    <AppBar position="absolute" open={open}>
        <Toolbar
        sx={{
            pr: '24px', // keep right padding when drawer closed
        }}
        >
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
            }}
        >
            <MenuIcon />
        </IconButton>
        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
        >
            { props.routeName}
        </Typography>
        <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
            </Badge>
        </IconButton>
        </Toolbar>
    </AppBar>
    )
 }
  
export default AppTopBar

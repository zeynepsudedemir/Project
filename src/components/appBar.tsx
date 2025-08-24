import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Menu, MenuItem } from '@mui/material';
import { Link, Navigate } from '@tanstack/react-router';
import logo from '../assets/htr.jpg';
import { isAuthenticated } from '@/api/auth';
const pages=['Home', 'Dashboard'];

export default function ResponsiveAppBar() {

  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated());
  React.useEffect(() => {
    const handleAuthChange = () => {
    setLoggedIn(isAuthenticated());
  };
  handleAuthChange();
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setLoggedIn(false);
    handleCloseNavMenu();
    window.location.reload();
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor: '#0f172aff'
      }}>
        <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }, //problem
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            </Box>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
            HTR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}>
                  {page}
                </Button>
              ))}
            </Box>
          <Box sx={{flexGrow:0, display: 'flex'}}>
            {loggedIn ?(
              <Button color='inherit' onClick={handleLogout}> Logout </Button>
            ) :(
              <Button color='inherit' component={Link} to="/login"> Login </Button>
            )}

          </Box>

        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

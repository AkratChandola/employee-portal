import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function NavBar({ onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => window.location.href = "/profile"}>MyLogo</Typography>
        <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => { setAnchorEl(null); onLogout(); }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}


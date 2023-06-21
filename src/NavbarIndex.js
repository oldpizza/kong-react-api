import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>

          <Typography  variant="h4" sx={{ flexGrow: 1 }}>
           <Button href='/react-kong'  variant="h1" component="div" sx={{ flexGrow: 1 }}>KONGZA</Button> 
          </Typography>
          <Button href='/react-kong/login' color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
import * as React from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@mui/material';

export default function ButtonAppBar() {
  return (
      <AppBar position="static" color="warning" style={{ color: "blue" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            join'em
          </Typography>
          <Button color="inherit">Events</Button>
          <Button color="inherit">Profile</Button>
          <Button color="inherit">Switch Profile</Button>
        </Toolbar>
      </AppBar>
  );
}
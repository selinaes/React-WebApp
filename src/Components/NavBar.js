import * as React from 'react';
import {AppBar, Toolbar, Typography, Button } from '@mui/material';
import Events from './Events';


export default function ButtonAppBar() {

  return (
      <AppBar position="static" color="warning" style={{ backgroundColor: "white", color:"orange", marginBottom:"2%" }}>
        <Toolbar>
          <Typography variant="h6" component="div" >
            join'em
          </Typography>
          <Button color="inherit" align="right" onClick={<Events/>}>Events</Button>
          <Button color="inherit">Profile</Button>
          <Button color="inherit">Switch Profile</Button>
        </Toolbar>
      </AppBar>
  );
}
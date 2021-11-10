import * as React from 'react';
import {AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function ButtonAppBar() {

  return (
      <AppBar position="static" color="warning" style={{ backgroundColor: "white", color:"orange", marginBottom:"2%" }}>
        <Toolbar>
          <Typography variant="h6" component="div" >
            join'em
          </Typography>
          <Button href="#events" color="inherit" align="right">Events</Button>
          <Button href="#members" color="inherit">Members</Button>
          <Button href="#switchUser" color="inherit">Switch Profile</Button>
          <Button href="#addEvent" color="inherit">Add Event</Button>
          <Button href="#addUser" color="inherit">Add Member</Button>
        </Toolbar>
      </AppBar>
  );
}
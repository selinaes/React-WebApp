import React from 'react'
import {Card, CardContent, Typography, CardActions, Button } from '@mui/material';

class Profile extends React.Component{
  deleteUser(){
    this.setState({  //not working atm
      members: this.props.state.members.filter(member => member.username !== this.props.state.member.username)
    }) 
  }
    render() {
      return <Card sx={{ minWidth: 275, maxWidth:300 }} style={{ marginBottom:20 }}variant="outlined" >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Member
        </Typography>
        <Typography variant="h5" component="div">
          
          {this.props.state.member.firstname} {this.props.state.member.lastname}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {this.props.state.member.username}
        </Typography>
        <Typography variant="body2">
          events: insert list of events here
          <br/> coinem: {this.props.state.member.coinem}
          {/* {JSON.stringify(this.props.state)} */}
        </Typography>

      </CardContent>
      <CardActions style={{justifyContent: 'center'}}>
        {/* <Button size="small" onClick={() => this.updateUser()}>Update User</Button> */}
        <Button size="small" onClick={() => this.deleteUser()}>Delete User</Button>
      </CardActions>
    </Card>;
    }
  }

  export default Profile;
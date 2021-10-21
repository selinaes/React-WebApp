import React from 'react'
import {Card, CardContent, Typography, CardActions, Button } from '@mui/material';

// const Person = state
const props = []
class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {id:0,
                  name: 'Wendy',
                  location: 'Wellesley',
                  pronouns:"she/they",
                  interests:"baking, hiking"};
  }
    render() {
      return <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Member
        </Typography>
        <Typography variant="h5" component="div">
          {this.state.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {this.state.location}
        </Typography>
        <Typography variant="body2">
        {this.state.pronouns}
          <br />
          interests: {this.state.interests}
        </Typography>
      </CardContent>
      <CardActions style={{justifyContent: 'center'}}>
        <Button size="small">Update User</Button>
        <Button size="small">Delete User</Button>
      </CardActions>
    </Card>;
    }
  }

  export default Profile;
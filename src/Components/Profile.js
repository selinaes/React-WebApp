import React from 'react'
import {Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const Profile = props => (
  <div style ={{ display:"inline-block"}}>
  <Card sx={{ width:300, height:225 }} style={{ margin:20 }} variant="outlined">
  <CardContent>
    <Typography sx={{ fontSize: 14 }} color="orange" gutterBottom>
    { props.member.username }
    </Typography>
    <Typography variant="h5" component="div">
      {props.member.firstname} {props.member.lastname}
    </Typography>
    
    <Typography variant="body2">
      events planned: { (props.events.filter(event => event.planner === props.member.username)).map(event => <span>{event.uid}, </span>)} 
      | { Object.values(props.events.filter(event => event.planner === props.member.username)).length } total
      <br/> coinem spent: {props.coinemLeft} coinem left: {props.coinemLeft}
      <br/> coinem pairs: { JSON.stringify(props.member.coinem)}
    </Typography>

  </CardContent>
  <CardActions style={{justifyContent: 'center'}}>
    <Button size="small" onClick={props.onDelete}>Delete User</Button>
  </CardActions>
</Card>
</div>
)
export default Profile;
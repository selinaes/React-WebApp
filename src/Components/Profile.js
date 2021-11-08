import React from 'react'
import {Card, CardContent, Typography, CardActions, Chip} from '@mui/material';
import AlertDialog from './Delete';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
const Profile = props => (

  <div style ={{ display:"inline-block"}}>
  <Card sx={{ width:300, height:275 }} style={{ margin:20 }} variant="outlined">
  <CardContent>
    <Typography sx={{ fontSize: 14 }} color="orange" gutterBottom>
    { props.member.username }
    </Typography>
    <Typography variant="h5" component="div">
      {props.member.firstname} {props.member.lastname}
    </Typography>
    
    <Typography variant="body2">
    <Chip sx={{ m: 0.5 }}icon={<EventIcon />} 
    label={'Events Planned '+ props.events.filter(event => event.planner === props.member.username).map(event => event.uid) + " | " 
    + Object.values(props.events.filter(event => event.planner === props.member.username)).length +" total | "
    + (parseInt(props.MAX_EVENTS) - parseInt(Object.values(props.events.filter(event => event.planner === props.member.username)).length)) + ' left'} variant="outlined" />
      <Chip sx={{ m: 0.5 }}icon={<MonetizationOnIcon />} label={props.coinemSpent+" Coinem Spent | " +props.coinemLeft +" Coinem Left"} variant="outlined" />
      <br/> 
    </Typography >
  
    <Typography variant="body2" color="gray">
    coinem pairs: { JSON.stringify(props.member.coinem)}
    </Typography>

  </CardContent>
  {(props.currentUser===props.member.username || props.currentUser === 'admin')
        ? <CardActions style={{justifyContent: 'center'}}>
          <AlertDialog onDelete={props.onDelete}/> 
          </CardActions>
        : <br />
      }
</Card>
</div>
)
export default Profile;
import React from 'react'
import NavBar from './NavBar';
import PeoplePage from './PeoplePage';
import { Card, CardContent, Typography, TextField, CardActions, Button, FormControl, Select, MenuItem } from '@mui/material';

//child component of EventPage, displaying a single event
class Event extends React.Component{
  render(){
    return(
      <div style ={{ display:"inline-block"}}>
        <Card sx={{ minWidth: 275, maxWidth:300 }} style={{ margin:20 }} variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Event { this.props.evtObj.uid }
            </Typography>
            <Typography variant="h5" component="div">
                  {this.props.evtObj.title}
            </Typography>
                
            <Typography variant="body2">
                { this.props.evtObj.description }
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="orange" gutterBottom>
                planner: { this.props.evtObj.planner }
            </Typography>
        
          </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
              <Button size="small" onClick={this.props.onDelete}>Delete Event</Button>
            </CardActions>
          </Card>
      </div>
    );
  }
}








//child component #2 of EventPage, enter info & create new event
class InputEvent extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      newEvent : {
        "uid": this.props.NEXT_EVENT_UID, 
        "title":'', 
        "description": '',
        "planner": this.props.planner,
      },
    }
    this.handleNewTitle = this.handleNewTitle.bind(this);
    this.handleNewDescription = this.handleNewDescription.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  handleNewTitle(e){
    this.setState({
      newEvent: {...this.state.newEvent, title : e.target.value} //keep all other key-value pairs, but update title
    });
  }

  handleNewDescription(e){
    this.setState({
      newEvent: {...this.state.newEvent, description : e.target.value} //keep all other key-value pairs, but update description
    });
  }
  
  onAddClick(e){
    e.preventDefault();
    this.props.addEvent(this.state.newEvent); //can only call props.method here, not in render(), else get into infinite loop
    this.setState({
      newEvent: {
        "uid": this.props.NEXT_EVENT_UID, 
        "title":'', 
        "description": '',
        "planner": this.props.planner,
      }
    })
  }

  render () {
    return (
      <div id="addEvent" style ={{ display:"inline-block"}}>
            <Card  sx={{ minWidth: 275, maxWidth:300 }} style={{ padding: 15, margin:30, align:"center" }} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Add New Event
                </Typography>
                <FormControl fullWidth>
                  <TextField
                  required
                  id="title"
                  label = "Title"
                  sx = {{m: 2}}
                  value = {this.state.newEvent.title}
                  onChange={this.handleNewTitle}
                       />
                    </FormControl>
                    <FormControl fullWidth>
                  <TextField
                  required
                  id="description"
                  sx = {{mx: 2, mt:1}}
                  multiline = "true"
                  minRows = "3"
                  label ="Description"
                  value = {this.state.newEvent.newDescription}
                  onChange={this.handleNewDescription}
                       />
                    </FormControl>
              </CardContent>
              <CardActions style={{justifyContent: 'center'}}>
                <Button size="medium" onClick={this.onAddClick}>Add Event</Button> 
                {/* must name a seperate click handler this.onAddClick here, because within render cannot call any function, 
                cannot call this.props.xxx or will get into infinite loop*/}
              </CardActions>
            </Card>
            </div>
    );
  }
}
















//parent component for all of the Events + AddEvent
class EventsPage extends React.Component {
    
  constructor(props){
    super(props);

    this.onAddEvent = this.onAddEvent.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
   }

  onAddEvent(newEvt){
    this.props.onAddEvent(newEvt)
  }
  
  onDeleteEvent(eventObj){
    this.props.onDeleteEvent(eventObj);
  } 

  render() {
    return <div>
      <div>
        <InputEvent 
          key = {this.props.NEXT_EVENT_UID+this.props.currentUser} //not sure why I have to use this to force InputEvent to re-render
          NEXT_EVENT_UID = {this.props.NEXT_EVENT_UID}
          planner = {this.props.currentUser}
          addEvent = {this.onAddEvent}
        />
          <p>Event</p>
            {this.props.events.map(
                (event) => 
                <Event 
                evtObj = {event}
                onDelete = {() => this.onDeleteEvent(event)}/>)
            }
        </div>
      {/* <p>{JSON.stringify(this.state)}</p> */}
    </div>
  }
}

  export {Event,EventsPage, InputEvent};
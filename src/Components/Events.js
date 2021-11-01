import React from 'react'
import NavBar from './NavBar';
import PeoplePage from './PeoplePage';
import {Input, InputAdornment, Card, CardContent, Typography, CardActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const initialData = {
//   "events": 
//       [
//         {"uid": 1, 
//          "title": "Introductory Glass Blowing",
//          "description" : "Let's gather a group for an intro glass blowing class at Diablo Glass in Boston. Aiming for a Tue/Wed night in November.", 
//          "planner": "gigi"
//          },
  
//         {"uid": 2, 
//          "title": "Whale Watching",
//          "description" : "Organizing a weekend whale watching group from Gloucester via Cape Ann Whale Watch (https://www.seethewhales.com/).", 
//          "planner": "finz"
//          },
//         {"uid": 3, 
//          "title": "Disc golf at Borderlands", 
//          "description" : "Have you ever played disc golf? It's a fun activity for newbies and there's a nice course a Borderlands. Parts of Knives Out were filmed in the mansion there! Looking to form a foursome.",
//          "planner": "dyland"
//          }
//       ]
// }
// var MAX_EVENTS = 3; 
// var MAX_COINEM_PER_EVENT= 5;
// var MAX_COINEM= 20;
// var NEXT_EVENT_UID= 1;

//child component of EventPage, displaying a single event
class Event extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      'uid': 1,
      'title': "new event",
      'description': "new description",
      'planner': "ww1",
    };
  }
  
  render(){
    return(
      <div style ={{ display:"inline-block"}}>
        <Card sx={{ minWidth: 275, maxWidth:300 }} style={{ margin:20 }} variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Event { this.state.uid }
            </Typography>
            <Typography variant="h5" component="div">
                  {this.state.title}
            </Typography>
                
            <Typography variant="body2">
                { this.state.description }
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="orange" gutterBottom>
                planner: { this.state.planner }
            </Typography>
        
          </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
              <Button size="small" onClick={() => this.props.onDelete(this.state)}>Delete Event</Button>
            </CardActions>
          </Card>
      </div>
    );
  }
}

//child component #2 of EventPage, enter info & create new event
class AddEvent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentEvt: {
        'uid': this.props.NEXT_EVENT_UID,
        'title': '',
        'description': '',
        'planner':this.props.currentUser,
      }
    }
    this.handleNewDescription = this.handleNewDescription.bind(this);
    this.handleNewTitle = this.handleNewTitle.bind(this);
  }

  handleNewTitle(event) {
    event.preventDefault();
    const newEvt = {...this.state.currentEvt};
    newEvt.title = event.target.value
    this.setState ({currentEvt: newEvt});
  }

  handleNewDescription(event) {
    event.preventDefault();
    const newEvt = {...this.state.currentEvt};
    newEvt.description = event.target.value
    this.setState ({currentEvt: newEvt});
  }

  render () {
    const crEvt = this.state.currentEvt;
    return (
      <div id="addEvent" style ={{ display:"inline-block"}}>
            <Card  sx={{ minWidth: 275, maxWidth:300 }} style={{ margin:20, align:"center" }} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Add New Event
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="title">Title</InputLabel>
                  <Input
                  required
                  id="title"
                  onChange={this.handleNewTitle}
                       />
                    </FormControl>
                    <FormControl fullWidth>
                  <InputLabel id="description">Description</InputLabel>
                  <Input
                  required
                  id="description"
                  onChange={this.handleNewDescription}
                       />
                    </FormControl>
              </CardContent>
              <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" onClick={() => this.props.onAddEvent()}>Add Event</Button> 
              </CardActions>
            </Card>
            </div>
    );
    /* should I bind this in "this.state.currentEvt"? */
  }
}

//parent component
class EventsPage extends React.Component {
    
  constructor(props){
    super(props);
    this.state =  {
      MAX_EVENTS: 3, 
      MAX_COINEM_PER_EVENT: 5, 
      MAX_COINEM: 20, 
      NEXT_EVENT_UID: 13, 
      currentUser: 'admin',
      events:[{uid:1, 
                title:"new event", 
                description:"describe event here",
                planner:"ww1"}],
    }
  }
  


  handleAddEvent(eventObj){
    this.setState(
      {events: [...this.state.events, eventObj]}
    );
  }

  handleDeleteEvent(eventObj){
    this.setState(
      {events: this.state.events.filter(event => event.uid != eventObj.uid)}
    );
  }

  render() {
    return <div>
      <div>
        <AddEvent onAddEvent = {(eventObj) => this.handleAddEvent(eventObj)}/>
          <p>Event</p>
            {this.state.events.map(
                (event) => <Event onDelete = {(event) => this.handleDeleteEvent(event)}/>)
            }
        </div>
      <p>{JSON.stringify(this.state)}</p>
    </div>
  }
}

  export {Event,AddEvent};
import React from 'react'
import NavBar from './NavBar';
import PeoplePage from './PeoplePage';
import {Input, InputAdornment, Card, CardContent, Typography, CardActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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
      newEvent : this.props.newEvt,
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
      newEvent: this.props.newEvt,
    })
  }

  render () {
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
                  value = {this.state.newEvent.title}
                  onChange={this.handleNewTitle}
                       />
                    </FormControl>
                    <FormControl fullWidth>
                  <InputLabel id="description">Description</InputLabel>
                  <Input
                  required
                  id="description"
                  value = {this.state.newEvent.newDescription}
                  onChange={this.handleNewDescription}
                       />
                    </FormControl>
              </CardContent>
              <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" onClick={this.onAddClick}>Add Event</Button> 
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
    this.state =  {
      MAX_EVENTS: 3, 
      MAX_COINEM_PER_EVENT: 5, 
      MAX_COINEM: 20, 
      NEXT_EVENT_UID: 0, 
      currentUser: 'admin',
      events:[
         {"uid": 1, 
         "title": "Introductory Glass Blowing",
         "description" : "Let's gather a group for an intro glass blowing class at Diablo Glass in Boston. Aiming for a Tue/Wed night in November.", 
         "planner": "gigi"
         },
  
        {"uid": 2, 
         "title": "Whale Watching",
         "description" : "Organizing a weekend whale watching group from Gloucester via Cape Ann Whale Watch (https://www.seethewhales.com/).", 
         "planner": "finz"
         },
        {"uid": 3, 
         "title": "Disc golf at Borderlands", 
         "description" : "Have you ever played disc golf? It's a fun activity for newbies and there's a nice course a Borderlands. Parts of Knives Out were filmed in the mansion there! Looking to form a foursome.",
         "planner": "dyland"
         },
        {"uid": 4, 
         "title": "Passion for Pumpkins!",
         "description" : "I love carving jack-o-lanterns and would like to teach my craft to others. This is is a fun event with Halloween around the corner. Plus we'll raost the pumpkin seeds and eat them.", 
         "planner": "alexaa"
         },
        {"uid": 5, 
         "title": "Blue Hills Hike", 
         "description" : "Fall is a fantastic time for a hike! The Fall colors in the Blue Hils are amazing. I'm planning a hike of the Skyline Trail on Saturday, November 6. Join me!", 
         "planner": "flyer"
         },
        {"uid": 6, 
         "title": "Forest Edibles",
         "description" : "Squirrels aren't the only ones finding food in the forest. I'll show you lots of things that people can eat in the forest. After all the rain this summer, mushrooms are everywhere! I'm leading a trip in the Noanet Woodlands on Sun Oct. 31.", 
         "planner": "emerm" 
         },
        {"uid": 7, 
         "title": "Beginning Knitting", 
         "description" : "Fall and Winter are a great time to learn knitting. I'll show you the basics, including how to cast on, knit, purl, and bind off. Classes will run Thursdays@7pm Nov 3 through Dec 8, except Thanksgiving (Nov 25).",
         "planner": "alexaa"
         },
        {"uid": 8, 
         "title": "Apple Picking and Pies",
         "description" : "Fall is apple picking time! Tangerini Farm in Medway has a great orchard. After picking, let's make apple pie and tarte tartin (my favorite). Let's figure out a good time for this.", 
         "planner": "alexaa"
         },
        {"uid": 9, 
         "title": "Baker Estate?",
         "description" : "I've been reading about the history of the Baker Estate in Wellesley and want to learn more, including exploring the ruins of the old estate. Anyone want to join me?", 
         "planner": "fisher"
         },
        {"uid": 10, 
         "title": "Minuteman Bike Trail",
         "description" : "I'm planning a bike trip on the Minuteman Bike Trail from Lincoln Center to Davis Square and back. Tenatively for Sat. Oct. 30. Care to join me?", 
         "planner": "dyland"
         },
        {"uid": 11, 
         "title": "Chocolate Tasting?",
         "description" : "I hear Taza Chocolate in Somerville has a great tour and chocolate tasting. I'd like to organize a group to do this. Who's interested?", 
         "planner": "finz" 
         },
        {"uid": 12, 
         "title": "Whist Group!",
         "description" : "I'm looking to organize a group to play whist at a regular weekly time. Anyone interest in this?", 
         "planner": "emerm"
         },
        {"uid": 13, 
         "title": "BSO Tchaikovsky/Dvořák Nov 4-6",
         "description" : "The Boston Symphony Orchestra has a Tchaikovsky/Dvořák weekend Nov 4-6 featuring pianist Beatrice Rana and conductor Dima Slobodeniouk. I'd love to go, but don't want to go alone. Who wants to go with me? What date is best for you?",
         "planner": "gigi"
        },
        {"uid": 14, 
         "title": "Algorithmic Inequality Reading Group",
         "description" : "I'm organizing a reading group on algorithmic inequality. Books will include Noble's \"Algorithms of Oppression\", Eubanks's \"Automating Inequality\", and O'Neils's \"Weapons of Math Destruction\". Join me! Are there other books we should add to the list?",
         "planner": "dyland"
         }
      ],

    };
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
   }
  
  handleAddEvent(newEvt){
    this.setState(
      {events: [...this.state.events, newEvt],
      NEXT_EVENT_UID: this.state.NEXT_EVENT_UID +1,}    //update the count after a new event added
    );
  }

  handleDeleteEvent(eventObj){
    this.setState(
      {events: this.state.events.filter(event => event.uid !== eventObj.uid)}
    );
  }

  render() {
    return <div>
      <div>
        <InputEvent 
          key = {this.state.NEXT_EVENT_UID} 
          //when NEXT_EVENT_UID changes, InputEvent will not automatically re-render, therefore it won't sense that 
          //the uid now needs to be an updated one. However, if 'key' property for InputEvent changes, it will re-render
          newEvt = {{
            "uid": this.state.NEXT_EVENT_UID, 
            "title":'', 
            "description": '',
            "planner": this.state.currentUser,
          }}
          addEvent = {this.handleAddEvent}
        />
          <p>Event</p>
            {this.state.events.map(
                (event) => 
                <Event 
                evtObj = {event}
                onDelete = {() => this.handleDeleteEvent(event)}/>)
            }
        </div>
      <p>{JSON.stringify(this.state)}</p>
    </div>
  }
}

  export {Event,EventsPage, InputEvent};
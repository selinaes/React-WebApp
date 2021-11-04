import React from 'react'
import NavBar from './NavBar';
import PeoplePage from './PeoplePage';
import { Card, CardContent, Chip, Paper, Typography, TextField, CardActions, Button, FormControl, Select, MenuItem } from '@mui/material';

import { styled } from '@mui/material/styles';
import TagFacesIcon from '@mui/icons-material/TagFaces';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));



export default function ChipsArray() {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);


  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}


//child component of EventPage, displaying a single event
class Event extends React.Component{
  
  render(){
    let sponsorCoins = {};
    let num = this.props.evtObj.uid;
    let sponsorsList = this.props.members.filter(member => member.coinem[num] !== undefined);
    sponsorsList.map( member => sponsorCoins[member.username] = member.coinem[num]);
    let sponsors = Object.keys(sponsorCoins);
    let coinems = Object.values(sponsorCoins);

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
            <Paper sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap',listStyle: 'none',p: 0.5,m: 0,}}
                  component="ul" elevation='0'>
          
                {sponsors.map((item,index) => {return (
                    <ListItem key={item}>
                      <Chip
                        label={item+":"+coinems[index]} 
                      />
                    </ListItem>
                  );
                })}    
            </Paper>
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
        <h2 id="events">Events</h2>
          <div>
            {this.props.events.map(
                (event) => 
                <Event 
                evtObj = {event}
                members = {this.props.members}
                onDelete = {() => this.onDeleteEvent(event)}/>)
            }
          </div>
      </div>
      {/* <p>{JSON.stringify(this.state)}</p> */}
    </div>
  }
}

  export {Event,EventsPage, InputEvent};
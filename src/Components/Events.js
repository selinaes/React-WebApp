import React from 'react'
import AlertDialog from './Delete';
import { Badge, Card, CardContent, Chip, IconButton, Paper, Typography, TextField, CardActions, Button, FormControl, 
  FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FaceIcon from '@mui/icons-material/Face';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#6573c3",
      dark:"#3f51b5"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#99d5cf',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});


//child component of EventPage, displaying a single event
class Event extends React.Component{

  render(){
    let sponsorCoinsPair = {};
    let num = this.props.evtObj.uid;
    let sponsorsList = this.props.members.filter(member => member.coinem[num] !== undefined);
    sponsorsList.map( member => sponsorCoinsPair[member.username] = member.coinem[num]);
    let sponsors = Object.keys(sponsorCoinsPair);
    let coinems = Object.values(sponsorCoinsPair);
    let totalMembers = sponsors.length;
    let totalCoinems = coinems.reduce((n,sum)=>n+sum,0)

    let selfPlannedEvent;
    let coinedEvent;
    //Events created by the currentUser
    if (this.props.currentUser===this.props.evtObj.planner || this.props.currentUser === 'admin') {
      selfPlannedEvent = true;
      coinedEvent = false;
    } else { //event created by someone else
      selfPlannedEvent = false;
      if (this.props.members.find(member => member.username === this.props.currentUser).coinem[num] !== undefined){ //already Coined
        coinedEvent = true;
      } else { //not yet coined
        coinedEvent = false;
      }
    }

    return(
      <div style ={{ display:"inline-block"}}>
        <ThemeProvider theme={theme}>
        <Card sx={{ minWidth: 275, maxWidth:300 }} style={{ margin:20, padding:15}} variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Event { this.props.evtObj.uid }
            </Typography>
            <Typography variant="h5" component="div">
                  {this.props.evtObj.title}
            </Typography>
            <Chip sx={{ m: 0.5 }} icon={<FaceIcon />} label={totalMembers+" Members"} variant="outlined" />
            <Chip sx={{ m: 0.5 }}icon={<MonetizationOnIcon />} label={totalCoinems+" Coinems"} variant="outlined" />
            <Typography variant="body2">
                { this.props.evtObj.description }
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="orange" gutterBottom>
                Planner: { this.props.evtObj.planner }
            </Typography>
            <Paper sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap',listStyle: 'none',p: 0.5,m: 0}}
                  component="ul" elevation='0'>
          
                {sponsors.map((item,index) => {
                  let addCoin;
                  let minusCoin;
                   if (item === this.props.currentUser) {
                    addCoin = 
                    <IconButton aria-label="add" size="small" onClick={()=>this.props.onAddCoin(num)}>
                    <AddCircleOutlineIcon />
                    </IconButton>;
                    minusCoin =
                    <IconButton aria-label="minus" size="small" onClick={()=>this.props.onMinusCoin(num)}>
                    <RemoveCircleOutlineIcon />
                    </IconButton>;
                  }
                  return (
                    <ListItem key={item}>
                      {minusCoin}
                      <Badge badgeContent={coinems[index]} color="secondary">
                      <Chip
                        // variant ="outlined"
                        color="primary"
                        label={item} 
                      />
                      </Badge>
                      {addCoin}
                    </ListItem>
                  );
                })}    
            </Paper>
          </CardContent>
          <CardActions style={{justifyContent: 'center',m:10} }>
          {selfPlannedEvent && <AlertDialog onDelete={this.props.onDelete} />}
          {(!selfPlannedEvent && !coinedEvent) && <Button variant="contained" onClick={()=>this.props.onCoinit(num)} startIcon={<MonetizationOnIcon/>}>Coin'it</Button>}
          </CardActions>
          </Card>
          </ThemeProvider>
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

class RadioButtonsGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'all'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }

  render(){
  return (
    <div>
      {this.props.currentUser !== 'admin' &&
          <FormControl component="fieldset">
            <RadioGroup row aria-label="events-viewing-options"  defaultValue="all" value={this.state.value} onChange={this.handleChange}>
              <FormControlLabel value="all" control={<Radio />} label="All events" color="secondary"/>
              <FormControlLabel value="self-planned" control={<Radio />} label="Events I planned" />
              <FormControlLabel value="others-planned" control={<Radio />} label="Events others planned" />
              <FormControlLabel value="coinem-spent" control={<Radio />} label="I've spent coinems"/>
              <FormControlLabel value="coinem-not-spent" control={<Radio />} label="I haven't spent coinems"/>
            </RadioGroup>
          </FormControl>
      }
      </div>
    );
  }
}

//parent component for all of the Events + AddEvent
class EventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedEvents: this.props.events,
    };
    this.onSelectViewing = this.onSelectViewing.bind(this);
  }

  onSelectViewing(option){
    switch (option){
      case "all":
        this.setState({displayedEvents: this.props.events});
        break;
      case "self-planned":
        let selfplannedEvents = this.props.events.filter(event => this.props.currentUser===event.planner).map(event => JSON.parse(JSON.stringify(event)));
        this.setState({displayedEvents: selfplannedEvents});
        break;
      case "others-planned":
        let othersEvents = this.props.events.filter(event => this.props.currentUser!==event.planner).map(event => JSON.parse(JSON.stringify(event)));
        this.setState({displayedEvents: othersEvents});
        break;
      case "coinem-spent":
        let mycoinem = this.props.members.find(member => member.username === this.props.currentUser).coinem;
        let mycoinedList = Object.keys(mycoinem);
        let coinedEvents = [];
        mycoinedList.forEach(
          item => {coinedEvents.push(JSON.parse(JSON.stringify(this.props.events.find(event => item===event.uid.toString()))))}
        );
        this.setState({displayedEvents: coinedEvents});
        break;
      case "coinem-not-spent":
        let coinem = this.props.members.find(member => member.username === this.props.currentUser).coinem;
        let coinedList = Object.keys(coinem);
        let allUIDList = this.props.events.map(event => event.uid.toString());
        let uncoinedList = allUIDList.filter(uid => !coinedList.includes(uid));
        let notcoinedEvents = [];
        uncoinedList.forEach(
          item => {notcoinedEvents.push(JSON.parse(JSON.stringify(this.props.events.find(event => item===event.uid.toString()))))}
        );
        this.setState({displayedEvents: notcoinedEvents});
    }
  }

  render() {
    return <div>
      <div>
        <InputEvent 
          key = {this.props.NEXT_EVENT_UID+this.props.currentUser} 
          NEXT_EVENT_UID = {this.props.NEXT_EVENT_UID}
          planner = {this.props.currentUser}
          addEvent = {this.props.onAddEvent}
        />
        <h2 id="events">Events</h2>
          <RadioButtonsGroup currentUser = {this.props.currentUser} onChange={this.onSelectViewing}/>
          <div>
            {this.state.displayedEvents.map(
                (event) => 
                <Event 
                evtObj = {event}
                currentUser = {this.props.currentUser}
                members = {this.props.members}
                onDelete = {() => this.props.onDeleteEvent(event)}
                onAddCoin = {this.props.onAddEvtCoin}
                onMinusCoin = {this.props.onMinusEvtCoin}
                onCoinit ={this.props.onCoinit}
                />)
            }
          </div>
      </div>
    </div>
  }
}

  export {Event,EventsPage, InputEvent};
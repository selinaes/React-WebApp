import React from 'react'
import AlertDialog from './Delete';
import { Badge, Card, CardContent, Chip, IconButton, Paper, Typography, TextField, CardActions, Button, FormControl, 
  FormControlLabel, Radio, RadioGroup, InputLabel, Select, Stack, MenuItem } from '@mui/material';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FaceIcon from '@mui/icons-material/Face';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';

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

function calculateEventCoinem(evtObj, members){
  let sponsorCoinsPair = {};
  let num = evtObj.uid;
  let sponsorsList = members.filter(member => member.coinem[num] !== undefined);
  sponsorsList.map( member => sponsorCoinsPair[member.username] = member.coinem[num]);
  let sponsors = Object.keys(sponsorCoinsPair);
  let coinems = Object.values(sponsorCoinsPair);
  return [sponsors, coinems];
}

//child component of EventPage, displaying a single event
class Event extends React.Component{
  constructor(props){
    super(props);
    this.state =  {
      editing: false,
      editedEvent: {
        "uid": 0,
        "title": '',
        "description": '',
        "planner": ''
      }
    }
    this.checkCoinemMax = this.checkCoinemMax.bind(this);
    this.checkCoinemZero = this.checkCoinemZero.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  checkCoinemMax(){
    const coin = this.props.members.find(member => member.username === this.props.currentUser).coinem[this.props.evtObj.uid];
    if (coin < this.props.MAX_COINEM_PER_EVENT){
      return false;
    } else {
      return true;
    }
  }

  checkCoinemZero(){
    const coin = this.props.members.find(member => member.username === this.props.currentUser).coinem[this.props.evtObj.uid];
    if (coin > 0){
      return false;
    } else {
      return true;
    }
  }

  handleChangeTitle(e){
    this.setState({
      editedEvent: {...this.state.editedEvent, title : e.target.value}
    });
  }

  handleChangeDescription(e){
    this.setState({
      editedEvent: {...this.state.editedEvent, description : e.target.value}
    });
  }

  onEdit(){
    this.setState({
      editing: true,
      editedEvent: this.props.evtObj
    });
  }

  onConfirm(){
    if ( this.state.editedEvent.title.length===0 || this.state.editedEvent.description.length===0){
      alert('Please make sure title/description is not empty!');
    } else{
    this.props.editEvent(this.state.editedEvent); 
    this.setState({
      editing: false,
      editedEvent:  {
        "uid": 0,
        "title": '',
        "description": '',
        "planner": ''
      }
    });
    }
  }

  render(){
    const [sponsors,coinems] = calculateEventCoinem(this.props.evtObj, this.props.members);
    const totalMembers = sponsors.length;
    const totalCoinems = coinems.reduce((n,sum)=>n+sum,0)

    let selfPlannedEvent;
    let coinedEvent;
     if (this.props.currentUser===this.props.evtObj.planner || this.props.currentUser === 'admin') {
      selfPlannedEvent = true;
      coinedEvent = false;
    } else { //event created by someone else
      selfPlannedEvent = false;
      if (this.props.members.find(member => member.username === this.props.currentUser).coinem[this.props.evtObj.uid] !== undefined){ //already Coined
        coinedEvent = true;
      } else { //not yet coined
        coinedEvent = false;
      }
    }


    return(
      <div style ={{ display: "inline-block"}} > 
        <ThemeProvider theme={theme}>
        <Card sx={{ maxWidth:350, minHeight:350 }} style={{ margin:20, padding:15}} variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Event { this.props.evtObj.uid }
            </Typography>
            {this.state.editing ? 
              <div>
              <FormControl fullWidth>
                  <TextField
                  required
                  id="title"
                  label = "Title"
                  sx = {{m: 2}}
                  value = {this.state.editedEvent.title}
                  onChange={this.handleChangeTitle}
                       />
                    </FormControl>
              </div>
             : 
              <Typography variant="h5" component="div">
                  {this.props.evtObj.title}
            </Typography>
            }
            
            <Chip sx={{ m: 0.5 }} icon={<FaceIcon />} label={totalMembers+" Members"} variant="outlined" />
            <Chip sx={{ m: 0.5 }}icon={<MonetizationOnIcon />} label={totalCoinems+" Coinems"} variant="outlined" />
            {this.state.editing ? 
              <div>
              <FormControl fullWidth>
                  <TextField
                  required
                  id="title"
                  label = "Description"
                  multiline = "true"
                  minRows = "3"
                  sx = {{m: 2}}
                  value = {this.state.editedEvent.description}
                  onChange={this.handleChangeDescription}
                       />
                    </FormControl>
              </div>
             : 
            <Typography variant="body2">
                { this.props.evtObj.description }
            </Typography>
            }
            <Typography sx={{ fontSize: 16 }} color="orange" gutterBottom>
                planner: { this.props.evtObj.planner }
            </Typography>
            <Paper sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap',listStyle: 'none',p: 0.5,m: 0}}
                  component="ul" elevation='0'>
          
                {sponsors.map((item,index) => {
                  let addCoin;
                  let minusCoin;
                   if (item === this.props.currentUser) {
                    addCoin = 
                    <IconButton aria-label="add" size="small" disabled={this.checkCoinemMax()} onClick={()=>this.props.onAddCoin(this.props.evtObj.uid)}>
                    <AddCircleOutlineIcon />
                    </IconButton>;
                    minusCoin =
                    <IconButton aria-label="minus" size="small" disabled={this.checkCoinemZero()} onClick={()=>this.props.onMinusCoin(this.props.evtObj.uid)}>
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
          {(selfPlannedEvent && !this.state.editing) && <Stack spacing={2} direction="row">
            <AlertDialog onDelete={this.props.onDelete} />
            <Button variant="contained" onClick={this.onEdit} >Edit</Button>
            </Stack>}
          {this.state.editing && <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={this.onConfirm} >Confirm</Button>
            </Stack>}
          {(!selfPlannedEvent && !coinedEvent) && <Button variant="contained" onClick={()=>this.props.onCoinit(this.props.evtObj.uid)} startIcon={<MonetizationOnIcon/>}>Coin'it</Button>}
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
    if ( this.state.newEvent.title.length===0 || this.state.newEvent.description.length===0){
      alert('Please make sure title/description is not empty!');
    } else{
    this.props.addEvent(this.state.newEvent); //can only call props.method here, not in render(), else get into infinite loop
    console.log(this.state.newEvent);
    this.setState({
      newEvent: {
        "uid": this.props.NEXT_EVENT_UID, 
        "title":'', 
        "description": '',
        "planner": this.props.planner,
      }
    })
    }
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
                  value = {this.state.newEvent.description}
                  onChange={this.handleNewDescription}
                       />
                    </FormControl>
              </CardContent>
              <CardActions style={{justifyContent: 'center'}}>
              {(this.props.currentUser === 'admin' ||
                  (this.props.events.filter(event => event.planner === this.props.currentUser).length) < this.props.MAX_EVENTS )? <div>
              <Button variant="contained" onClick={this.onAddClick} startIcon={<EventIcon/>}>Add Event</Button> </div>
              : <p style={{color:'red'}}>You have planned the maximum number of events. Delete one to add a new one!</p>}
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


const sortTypes = ['uid', 'title', 'coinem spent'];
class SortSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'uid'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt){
    this.props.onChange(evt);
    this.setState({value: evt.target.value});
  }

  render(){
    return (<FormControl size='medium' style={{width:'15%'}}>
              <InputLabel id="sort" >Sort By</InputLabel>
                 <Select variant='outlined' labelId="sort" id="sort" value={this.state.value} label="Sort By" onChange={evt => this.handleChange(evt)}>
                        {sortTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                 </Select>
            </FormControl>)
  }
}

//parent component for all of the Events + AddEvent
class EventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewOption: 'all',
      sortBy: 'uid'
    };
    this.onSelectViewing = this.onSelectViewing.bind(this);
    this.onSorting = this.onSorting.bind(this);
    this.calculateDisplay = this.calculateDisplay.bind(this);
    this.calculateSortedEvents = this.calculateSortedEvents.bind(this);
  }


  onSelectViewing(option){
    this.setState({viewOption: option});
  }

  onSorting(e){
    this.setState( {sortBy: e.target.value} );
  }

  calculateDisplay(viewOption, events){
    if (this.props.currentUser === 'admin'){
      viewOption = 'all';
    }
    switch (viewOption){
      case "all":
        return events;
      case "self-planned":
        let selfplannedEvents = events.filter(event => this.props.currentUser===event.planner).map(event => JSON.parse(JSON.stringify(event)));
        return selfplannedEvents;
      case "others-planned":
        let othersEvents = events.filter(event => this.props.currentUser!==event.planner).map(event => JSON.parse(JSON.stringify(event)));
        return othersEvents;
      case "coinem-spent":
        let mycoinem = this.props.members.find(member => member.username === this.props.currentUser).coinem;
        let mycoinedList = Object.keys(mycoinem);
        let coinedEvents = [];
        mycoinedList.forEach(
          item => {coinedEvents.push(JSON.parse(JSON.stringify(events.find(event => item===event.uid.toString()))))}
        );
        return coinedEvents;
      case "coinem-not-spent":
        let coinem = this.props.members.find(member => member.username === this.props.currentUser).coinem;
        let coinedList = Object.keys(coinem);
        let allUIDList = events.map(event => event.uid.toString());
        let uncoinedList = allUIDList.filter(uid => !coinedList.includes(uid));
        let notcoinedEvents = [];
        uncoinedList.forEach(
          item => {notcoinedEvents.push(JSON.parse(JSON.stringify(events.find(event => item===event.uid.toString()))))}
        );
        return notcoinedEvents;
    }
  }

  calculateSortedEvents(sortType, events){
    let sortedEvents;
    if (sortType === 'uid'){
      sortedEvents = [...events].sort((a, b) => a.uid-b.uid);
    }
    else if (sortType === 'title'){
      sortedEvents = [...events].sort((a, b) => (a.title.toLowerCase()<b.title.toLowerCase())? -1:1);
    }
    else if (sortType === 'coinem spent'){
      sortedEvents = [...events].sort((a, b) => calculateEventCoinem(b,this.props.members)[1].reduce((n,sum)=>n+sum,0) - calculateEventCoinem(a,this.props.members)[1].reduce((n,sum)=>n+sum,0) );
    }
    return sortedEvents;
  }

  render() {
    //calculate the latest filtered list at the render
    const displayedEvents = this.calculateDisplay(this.state.viewOption, this.props.events);
    const sortedEvents = this.calculateSortedEvents(this.state.sortBy, displayedEvents);

    return (<div>
      <div>
        <InputEvent 
          key = {this.props.NEXT_EVENT_UID+this.props.currentUser} 
          NEXT_EVENT_UID = {this.props.NEXT_EVENT_UID}
          planner = {this.props.currentUser}
          addEvent = {this.props.onAddEvent}
          currentUser = {this.props.currentUser}
          events = {this.props.events}
          MAX_EVENTS={this.props.MAX_EVENTS}
        />
        <h2 id="events">Events</h2>
          <SortSelection onChange={this.onSorting}/>
          <RadioButtonsGroup currentUser = {this.props.currentUser} onChange={this.onSelectViewing}/>
          <div>
            {sortedEvents.map( 
                (event) => 
                <Event 
                evtObj = {event}
                currentUser = {this.props.currentUser}
                MAX_COINEM_PER_EVENT = {this.props.MAX_COINEM_PER_EVENT}
                members = {this.props.members}
                onDelete = {() => this.props.onDeleteEvent(event)}
                onAddCoin = {this.props.onAddEvtCoin}
                onMinusCoin = {this.props.onMinusEvtCoin}
                onCoinit ={this.props.onCoinit}
                viewOption = {this.props.viewOption}
                editEvent = {this.props.editEvent}
                />)
            }
          </div>
      </div>
    </div>)
  }
}

  export {Event,EventsPage, InputEvent};
import React from 'react'
import NavBar from './NavBar';
import PeoplePage from './PeoplePage';
import { Badge, Card, CardContent, Chip, IconButton, Paper, Typography, TextField, CardActions, Button, FormControl, Select, MenuItem } from '@mui/material';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

        // if (data.label === 'React') {
        //   addCoin = 
        //   <IconButton aria-label="add">
        //   <AddCircleOutlineIcon />
        //   </IconButton>;
        //   minusCoin =
        //   <IconButton aria-label="minus">
        //   <RemoveCircleOutlineIcon />
        //   </IconButton>;
        // }

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
    let sponsorCoinsPair = {};
    let num = this.props.evtObj.uid;
    let sponsorsList = this.props.members.filter(member => member.coinem[num] !== undefined);
    sponsorsList.map( member => sponsorCoinsPair[member.username] = member.coinem[num]);
    let sponsors = Object.keys(sponsorCoinsPair);
    let coinems = Object.values(sponsorCoinsPair);

    

    return(
      <div style ={{ display:"inline-block"}}>
        <ThemeProvider theme={theme}>
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
          {(this.props.currentUser===this.props.evtObj.planner || this.props.currentUser === 'admin')
        ? <CardActions style={{justifyContent: 'center'}}>
          <Button size="small" onClick={this.props.onDelete}>Delete Event</Button>
          </CardActions>
        : <br />
      }
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
                currentUser = {this.props.currentUser}
                members = {this.props.members}
                onDelete = {() => this.onDeleteEvent(event)}
                onAddCoin = {this.props.onAddEvtCoin}
                onMinusCoin = {this.props.onMinusEvtCoin}/>)
            }
          </div>
      </div>
      {/* <p>{JSON.stringify(this.state)}</p> */}
    </div>
  }
}

  export {Event,EventsPage, InputEvent};
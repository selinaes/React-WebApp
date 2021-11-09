import sun from './sun-svgrepo-com.svg';
import './App.css';
import React from 'react'
import NavBar from './Components/NavBar';
import PeoplePage from './Components/PeoplePage';
import {EventsPage} from './Components/Events';
import {Input, Box, Card, CardContent, Typography, TextField, CardActions, Button, FormControl, InputLabel } from '@mui/material';


const initialData =  {
  "MAX_EVENTS": 3, 
  "MAX_COINEM_PER_EVENT": 5, 
  "MAX_COINEM": 20, 
  "NEXT_EVENT_UID": 15, 
  
  "members":
    [
      {"username": "alexaa", 
       "firstname": "Alex", 
       "lastname": "Aardvark", 
       "coinem": {
          "1": 3, 
          "6": 5,
          "11": 4,  
          "14": 2
        }
      }, 
      {"username": "fisher", 
       "firstname": "Bailey", 
       "lastname": "Bass", 
       "coinem": {                     
          "1": 5,
          "7": 1, 
          "8": 2, 
          "10": 3
        }
      }, 
      {"username": "ccamel", 
       "firstname": "Cameron", 
       "lastname": "Camel", 
       "coinem": {
          "2": 5,
          "5": 3, 
          "8": 3, 
          "10": 1, 
          "13": 5, 
          "14": 3
        }
      }, 
      {"username": "dyland", 
       "firstname": "Dylan", 
       "lastname": "Deer", 
       "coinem": {
          "1": 1,
          "2": 1, 
          "6": 3, 
          "7": 4, 
          "9": 3, 
          "11": 1, 
          "13": 3
        }
      }, 
      {"username": "emerm", 
       "firstname": "Emerson", 
       "lastname": "Ermine", 
       "coinem": {
          "1": 1,
          "3": 3,
          "5": 3, 
          "7": 1, 
          "9": 2, 
          "13": 3
        }
      }, 
      {"username": "finz", 
       "firstname": "Finley", 
       "lastname": "Flounder", 
       "coinem": {
          "1": 1,
          "3": 2, 
          "4": 3, 
          "5": 2, 
          "8": 1, 
          "10": 3, 
          "14": 3
        }
      }, 
      {"username": "gigi", 
       "firstname": "Greer", 
       "lastname": "Gecko", 
       "coinem": {
          "2": 1,
          "5": 2, 
          "6": 3, 
          "8": 1, 
          "10": 3, 
          "11": 5, 
          "14": 2
        }
      }, 
      {"username": "flyer", 
       "firstname": "Hayden", 
       "lastname": "Hawk", 
       "coinem": {
          "2": 1,
          "3": 1,
          "6": 3, 
          "7": 1, 
          "8": 3, 
          "10": 3, 
          "11": 1, 
          "14": 5
        }
      } 
     ], 
 
  "events": 
    [
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

    ]
}

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      MAX_EVENTS: initialData.MAX_EVENTS, 
      MAX_COINEM_PER_EVENT: initialData.MAX_COINEM_PER_EVENT, 
      MAX_COINEM: initialData.MAX_COINEM, 
      NEXT_EVENT_UID: initialData.NEXT_EVENT_UID,
      members: initialData.members, // a list of member objects
      events: initialData.events, //a list of event objects
      currentUser: "admin",
      fileDownloadUrl: null,
      fileInfo: "",
      fileName: "joinem.json",
    }
    this.switchUser = this.switchUser.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleAddEvtCoin = this.handleAddEvtCoin.bind(this);
    this.handleMinusEvtCoin = this.handleMinusEvtCoin.bind(this);
    this.handleCoinit = this.handleCoinit.bind(this);
    this.downloadHandler = this.downloadHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.openFileHandler = this.openFileHandler.bind(this);
    this.handleNewFilename = this.handleNewFilename.bind(this);
    this.handleChangeMAX_EVENT = this.handleChangeMAX_EVENT.bind(this);
    this.handleChangeMAX_COINEM_PER_EVENT = this.handleChangeMAX_COINEM_PER_EVENT.bind(this);
    this.handleChangeMAX_COINEM = this.handleChangeMAX_COINEM.bind(this);
    
  }

  switchUser(user) {
    this.setState ({currentUser: user});
  }

  addHandler(newUser) {
    let usernames = this.state.members.map(member => toString(member.username));
    if (usernames.indexOf(newUser.username) !== -1){
      console.log("Error: Cannot add another user with username: ", newUser.username)
    } 
    else {
      let copyMembers = this.state.members.map(member => JSON.parse(JSON.stringify(member)));
      this.setState({members: [...copyMembers, 
        newUser]}
        );
    }
  }

  deleteHandler(username) {
    if ((username === this.state.currentUser) || (this.state.currentUser === "admin")){
      let newEvents = this.state.events.filter(event => event.planner !== username).map(event => JSON.parse(JSON.stringify(event)));
      //get list of events planned by to-be-delete user
      let plannedEvents = this.state.events.filter(event => event.planner === username).map(event => event.uid);  
      //for each member, see if they spent coinem on events list above, and delete these coinems
      let newMembers = this.state.members.filter(member => member.username !== username).map( member => {
        let pairs = Object.entries(member.coinem);
        plannedEvents.forEach(num => {
          let newPairs = pairs.filter(pair => pair[0]!==num.toString());
          pairs = newPairs;
        });
        let newCoinem = Object.fromEntries(pairs);
        return {...member, coinem: newCoinem}
      });
      this.setState({
        events: newEvents,
        members: newMembers });
    }            
    if (username === this.state.currentUser){
      this.setState({currentUser: 'admin'})
    }
  }

  handleAddEvent(newEvt){
    if (this.state.currentUser === 'admin' ||
    Object.values(this.state.events.filter(event => event.planner === this.state.currentUser)).length > 0){
      let prevUID = this.state.NEXT_EVENT_UID;
      let copyEvents = this.state.events.map(event => JSON.parse(JSON.stringify(event))); //make deep copy
      this.setState(
      {events: [...copyEvents, newEvt],
      NEXT_EVENT_UID: prevUID +1,}    //update the count after a new event added
    );
    console.log('Added new event');

    }
    else{
      console.log('Cannot add a new event, you have reached the max number of events.');

    }
  }

  handleDeleteEvent(eventObj){
    if ((eventObj.planner === this.state.currentUser) || (this.state.currentUser === "admin")){
    let newEvents = this.state.events.filter(event => event.uid !== eventObj.uid).map(event => JSON.parse(JSON.stringify(event)));
    let newMembers = this.state.members.map(member => {
      let pairs = Object.entries(member.coinem);
      let newPairs = pairs.filter(pair => pair[0]!==eventObj.uid.toString());
      let newCoinem = Object.fromEntries(newPairs);
      return {...member, coinem: newCoinem}});
    this.setState(
      {events: newEvents,
       members: newMembers
      } //remove the event from events list
    );
    }
  }

  handleAddEvtCoin(uid){
    let otherMembers = this.state.members.filter(member => member.username !== this.state.currentUser).map(member => JSON.parse(JSON.stringify(member)));
    let currentMember = this.state.members.find(member => member.username === this.state.currentUser);
    let oldCoin = currentMember.coinem[uid];
    let oldCoinem = currentMember.coinem;
    let modifiedCoinem = JSON.parse(JSON.stringify(oldCoinem));
    modifiedCoinem[uid] = oldCoin+1; //need to prevent increasing over MAX!!
    let newMember = {...currentMember, coinem: modifiedCoinem};
    this.setState(
      {members: [...otherMembers, newMember]}
    );
  }


  handleMinusEvtCoin(uid){
    let otherMembers = this.state.members.filter(member => member.username !== this.state.currentUser).map(member => JSON.parse(JSON.stringify(member)));
    let currentMember = this.state.members.find(member => member.username === this.state.currentUser);
    let oldCoin = currentMember.coinem[uid];
    let oldCoinem = currentMember.coinem;
    let modifiedCoinem = JSON.parse(JSON.stringify(oldCoinem));
    modifiedCoinem[uid] = oldCoin-1; //need to prevent decreasing lower than 0!!
    let newMember = {...currentMember, coinem: modifiedCoinem};
    this.setState(
      {members: [...otherMembers, newMember]}
    );
  }

  handleCoinit(uid){
    let otherMembers = this.state.members.filter(member => member.username !== this.state.currentUser).map(member => JSON.parse(JSON.stringify(member)));
    let currentMember = this.state.members.find(member => member.username === this.state.currentUser);
    let oldCoinem = currentMember.coinem;
    let modifiedCoinem = JSON.parse(JSON.stringify(oldCoinem));
    modifiedCoinem[uid] = 1;
    let newMember = {...currentMember, coinem: modifiedCoinem};
    this.setState(
      {members: [...otherMembers, newMember]}
    );
  }

  downloadHandler (event) {
    event.preventDefault(); // Prevent default actions of event                   
    // Prepare the file 
    
    let dataObject = {"MAX_EVENTS": this.state.MAX_EVENTS, 
    "MAX_COINEM_PER_EVENT": this.state.MAX_COINEM_PER_EVENT, 
    "MAX_COINEM": this.state.MAX_COINEM, 
    "NEXT_EVENT_UID": this.state.NEXT_EVENT_UID,
     "members": this.state.members, 
     "events": this.state.events}

    let output = JSON.stringify(dataObject, null, 4);

    // Download it            
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    console.log(fileDownloadUrl)
    this.setState ({fileDownloadUrl: fileDownloadUrl},
      // setState takes a callback function as an optional 2nd argument.          
      // It is called only after the state has been updated.                       
      () => {
        this.domFileDownload.click();
        URL.revokeObjectURL(fileDownloadUrl);  // free up storage--no longer needed.       
        this.setState({fileDownloadUrl: ""})
    })
  }
  
  uploadHandler(event) {
    event.preventDefault();
    this.domFileUpload.click() // This will browse for a file to upload 
                               // and then call the openFileHandler from 
                               // the input component's onChange handler.      
  }

  /**  
   * Process the uploaded file within the React app.
   */

  handleNewFilename(event) {
    event.preventDefault();
    let name = event.target.value + ".json";
    this.setState ({fileName: name});
  }

  openFileHandler(event) {
      let fileInfoList = []; // Status output 
      const fileObj = event.target.files[0]; // From automated .click() on file input component
      const reader = new FileReader();

      let fileLoadedHandler = e => {
        // e.target.result is the file's content as text 
        const fileContents = e.target.result;
        fileInfoList.push(`File name: "${fileObj.name}". Length: ${fileContents.length} bytes.`);
        fileInfoList.push (`File contents: ${fileContents}`)
        const jsonData= JSON.parse(fileContents);
        const memberList = jsonData.members;
        const maxEvents= jsonData.MAX_EVENTS;
        const maxCoinemPerEvent= jsonData.MAX_COINEM_PER_EVENT;
        const maxCoinem= jsonData.MAX_COINEM;
        const nextEventUid= jsonData.NEXT_EVENT_UID;   
        const eventsList = jsonData.events;
        this.setState (
          {
          MAX_EVENTS: maxEvents, 
          MAX_COINEM_PER_EVENT: maxCoinemPerEvent, 
          MAX_COINEM: maxCoinem, 
          NEXT_EVENT_UID: nextEventUid,
          members: memberList,
          events: eventsList,
          fileInfo: fileInfoList.join("\n"),
        });      
      }
      // Mainline of the method 
      fileLoadedHandler= fileLoadedHandler.bind(this);
      reader.onload = fileLoadedHandler;
      reader.readAsText(fileObj);
    }

  handleChangeMAX_EVENT(event){
    event.preventDefault();
    this.setState(
      {MAX_EVENTS: event.target.value}
    );
  }

  handleChangeMAX_COINEM_PER_EVENT(event){
    event.preventDefault();
    this.setState(
      {MAX_COINEM_PER_EVENT: event.target.value}
    );
  }

  handleChangeMAX_COINEM(event){
    event.preventDefault();
    this.setState(
      {MAX_COINEM: event.target.value}
    );
  }

  render(){
  return (
    <div className="App">
      {/* <style type="text/css">
        .hidden { {display:none} }
      </style> */}
      <header className="App-header">
      <NavBar />
        <img src={sun} className="App-logo" alt="logo" />
        </header>
        <h1>
          join'em
        </h1>
        <p><em>Events. Plan'em. Join'em!</em></p>
        {/* {adminOnly} */}
        {(this.state.currentUser === 'admin')
        ? <div>
          <div style ={{ display:"inline-block"}}>
          <Card sx={{ minWidth: 275, maxWidth:500 }} style={{ margin:20 }} variant="outlined">
          <CardContent>
        <Typography variant="h3" color="orange" component="div">
         *Admin Only*
        </Typography>
        <Typography variant="body1" component="div">
        <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <TextField
          id="max-events"
          label="MAX_EVENTS"
          value={this.state.MAX_EVENTS} 
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange={this.handleChangeMAX_EVENT}
        /><br/>
           <TextField
          id="max-coinem-per-event"
          label="MAX_COINEM_PER_EVENT"
          value={this.state.MAX_COINEM_PER_EVENT} 
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange={this.handleChangeMAX_COINEM_PER_EVENT}
        /><br/>
           <TextField
          id="max-coinem"
          label="MAX_COINEM"
          value={this.state.MAX_COINEM} 
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange={this.handleChangeMAX_COINEM}
        /><br/>
           <TextField
          id="next-event-uid"
          label="NEXT_EVENT_UID"
          value={this.state.NEXT_EVENT_UID}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        /><br/>
        </Box>
        </Typography>
        </CardContent>
          <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          File Upload/Download
          </Typography>
          <Typography variant="body2">
          Name of File to Download
          <FormControl fullWidth>
          <InputLabel id="filename">file name</InputLabel>
          <Input
          required
          id="filename"
          onChange={this.handleNewFilename}
               />
            </FormControl>.json
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="orange" gutterBottom>
     
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'center'}}>
        <Button size="small" onClick={this.downloadHandler}>Download file as {this.state.fileName} </Button>
        <Button size="small" onClick={this.uploadHandler}>Upload a file!</Button>
        </CardActions>
        </Card> 
    </div>
  
    <h2 className="hidden"> Normally Hidden Inputs</h2>
    <p className="hidden">
      <span className="explanation">(Change the .hidden CSS class to hide these)</span></p>
    <input type="file"
          className="hidden"                                                                   
        multiple={false}
        accept=".json, application/json" // Only upload JSON files                              
        onChange={evt => this.openFileHandler(evt)}
        ref={
          // This is so-called "callback ref" that captures the associated
          // DOM element on rendering.
          // See https://reactjs.org/docs/refs-and-the-dom.html 
          domElt => this.domFileUpload = domElt
        }
      />
      <a className="hidden" 
        download={this.state.fileName} // download attribute specifies file name                                        // to download to when clicking link 
         href={this.state.fileDownloadUrl}
         ref={
          // This is so-called "callback ref" that captures the associated 
          // DOM element on rendering.
          // See https://reactjs.org/docs/refs-and-the-dom.html
          domElt => this.domFileDownload = domElt
        }
      > download it</a>
    <h2 className="hidden">File Data</h2>
    <pre className="status">{this.state.fileInfo}</pre>
    </div>
        : <br />
      }
        <PeoplePage 
        NEXT_EVENT_UID = {this.state.NEXT_EVENT_UID}
        MAX_EVENTS = {this.state.MAX_EVENTS}
        MAX_COINEM_PER_EVENT = {this.state.MAX_COINEM_PER_EVENT}
        MAX_COINEM = {this.state.MAX_COINEM}
        members = {this.state.members}
        events = {this.state.events}
        currentUser = {this.state.currentUser}
        addHandler = {this.addHandler}
        switchUser = {this.switchUser}
        deleteHandler = {this.deleteHandler}
        />
        <EventsPage 
        NEXT_EVENT_UID = {this.state.NEXT_EVENT_UID}
        MAX_EVENTS = {this.state.MAX_EVENTS}
        currentUser = {this.state.currentUser}
        members = {this.state.members}
        events = {this.state.events}
        onAddEvent = {this.handleAddEvent}
        onDeleteEvent = {this.handleDeleteEvent}
        onAddEvtCoin = {this.handleAddEvtCoin}
        onMinusEvtCoin = {this.handleMinusEvtCoin}
        onCoinit = {this.handleCoinit}
        />
      <p style={{padding:"5%"}}>joining'em since 2021</p>
    </div>
  );

}
}
export default App;
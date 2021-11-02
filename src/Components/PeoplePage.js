import React from 'react';
import {Input, InputAdornment, Card, CardContent, Typography, CardActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Profile from "./Profile";


  class AddUser extends React.Component {
    constructor(props){
      super(props);
      this.state =  {
        newUser : 
        {"username": '', 
        "firstname": '', 
        "lastname": '',
        "coinem": {},     } 
      };
      this.handleNewUsername = this.handleNewUsername.bind(this);
      this.handleNewFirstname = this.handleNewFirstname.bind(this);
      this.handleNewLastname = this.handleNewLastname.bind(this);
      this.onClick = this.onClick.bind(this);
    }

    handleNewUsername(e) {
      this.setState({
        newUser: {...this.state.newUser, username: e.target.value} //keep all other key-value pairs, but update username
      });
    }

    handleNewFirstname(e) {
      this.setState({
        newUser: {...this.state.newUser, firstname: e.target.value} //keep all other key-value pairs, but update firstname
      });
    }

    handleNewLastname(e) {
      this.setState({
        newUser: {...this.state.newUser, lastname: e.target.value} //keep all other key-value pairs, but update lastname
      });
    }

    onClick(e){
      e.preventDefault();
      this.props.onClick(this.state.newUser);
      this.setState({
      newUser: {"username": '', 
      "firstname": '', 
      "lastname": '',
      "coinem": {},     } ,
    })
    }

    render(){
      return(
        <div id="addUser" style ={{ display:"inline-block"}}>
            <Card  sx={{ minWidth: 275, maxWidth:300 }} style={{ margin:20, align:"center" }} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Add User
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="username">Username</InputLabel>
                  <Input
                  required
                  id="username"
                  onChange={this.handleNewUsername}
                  startAdornment={
                  <InputAdornment position="start">
                  <AccountCircle />
                  </InputAdornment>
                   }
                       />
                    </FormControl>
                    <FormControl fullWidth>
                  <InputLabel id="firstname">First Name</InputLabel>
                  <Input
                  required
                  id="firstname"
                  onChange={this.handleNewFirstname}
                       />
                    </FormControl>
                    <FormControl fullWidth>
                  <InputLabel id="firstname">Last Name</InputLabel>
                  <Input
                  required
                  id="lastname"
                  onChange={this.handleNewLastname}
                       />
                    </FormControl>
              </CardContent>
              <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" onClick={this.onClick}>Add User</Button>
              </CardActions>
            </Card>
          </div>
      );
    }
  }


  class SwitchUser extends React.Component {
    constructor(props){
      super(props);
      this.onChangeUser = this.onChangeUser.bind(this);
    }

    onChangeUser(e){
      e.preventDefault();
      this.props.onChange(e.target.value);
    }

    render(){
      let updateUser;
      return(
        <div id="switchUser">
            <Card  sx={{ minWidth: 275, maxWidth:300 }} style={{ margin:20, align:"center",display:"block", marginLeft: "auto", marginRight: "auto" }} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Switch User
                </Typography>
                <Typography variant="body1" component="div" color="orange">
                  current user: {this.props.currentUser}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Username</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateUser}
                        label="Username"
                        onChange={this.onChangeUser}
                      >
                        <MenuItem value="admin">
                          <em>admin</em>
                        </MenuItem>
                        {this.props.members.map((member) => (
                          <MenuItem
                            key={member.username}
                            value={member.username}>
                            {member.username}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
              </CardContent>
            </Card>
            </div>
      );
    }
  }




  class FileUploadDownload extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        fileDownloadUrl: null,
        fileInfo: "",
        fileName: "joinem.json",
      }
      this.downloadHandler = this.downloadHandler.bind(this);
      this.uploadHandler = this.uploadHandler.bind(this);
      this.openFileHandler = this.openFileHandler.bind(this);
      this.handleNewFilename = this.handleNewFilename.bind(this);
    }

    downloadHandler (event) {
      event.preventDefault(); // Prevent default actions of event                   
      // Prepare the file 
      
      let dataObject = {"members": this.props.members}//FIX! MUST ADD ALL RELEVANT DATA!!!!!
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
          //FIX! MUST ADD ALL RELEVANT DATA!!!!!
          this.setState ({fileInfo: fileInfoList.join("\n")});
          this.setState ({members: memberList});
        }
  
        // Mainline of the method 
        fileLoadedHandler= fileLoadedHandler.bind(this);
        reader.onload = fileLoadedHandler;
        reader.readAsText(fileObj);
    }

    render(){
      return(
        <div>
        <div>
          <Card sx={{ minWidth: 275, maxWidth:300 }} style={{ margin:20 }} variant="outlined">
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
    );
    }
  }


  class PeoplePage extends React.Component {
    constructor(props) {
      super(props);
  
      this.onAddUser = this.onAddUser.bind(this);
      this.onDeleteUser = this.onDeleteUser.bind(this);
      this.onSwitch = this.onSwitch.bind(this);
      this.calculateEventCoinem = this.calculateEventCoinem.bind(this);
      this.remainingCoinem = this.remainingCoinem.bind(this);
      
    }

    onSwitch(user){
      this.props.switchUser(user);
    }

    onDeleteUser(username){
      this.props.deleteHandler(username);
    }

    onAddUser(newUser){
      this.props.addHandler(newUser)
    }

    calculateUserCoinem(member) {
      return Object.values(member.coinem).reduce((n,sum)=>n+sum, 0)
      
    }
    remainingCoinem(member){
      return this.props.MAX_COINEM - this.calculateUserCoinem(member)
    }

    calculateEventCoinem(uid) {
      // from list of members, select member with username, then get their coinem list and add key values
      
    }

    render() {
      let adminOnly;
      if (this.props.currentUser === "admin") {
          adminOnly = <FileUploadDownload members={this.props.members} />;}

      return (
        <div>
          <SwitchUser currentUser={this.props.currentUser} members= {this.props.members} onChange={this.onSwitch}/>
          <AddUser onClick = {this.onAddUser} />
          <h2 id="members">Members</h2>
          <div>
            {this.props.members.map (member => (
              <Profile member={member} events={this.props.events} coinemSpent = { this.calculateUserCoinem(member)} coinemLeft= {this.remainingCoinem(member)} onDelete={() => this.onDeleteUser(member.username)}/>
            ))}
          </div>
          
          {adminOnly}
    
        </div>
        );
    }
  }
  
 export default PeoplePage;
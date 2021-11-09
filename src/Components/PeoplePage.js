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
                  Add Member
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
                <Button size="small" variant="contained" onClick={this.onClick}>Add User</Button>
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
                        {(this.props.currentUser === 'admin')
        ? (this.props.members
        .sort(function(a, b){
          if(a.username < b.username) { return -1; }
          if(a.username > b.username) { return 1; }
          return 0;
      })
      .map((member) => (
          <MenuItem
            key={member.username}
            value={member.username}>
            {member.username}
          </MenuItem>
        )))
        : <br />
      }
                      </Select>
                    </FormControl>
              </CardContent>
            </Card>
            </div>
      );
    }
  }






  const sortTypes = ['username', 'events planned', 'coinem spent'];
  class PeoplePage extends React.Component {
    constructor(props) {
      super(props);

      this.state =  {
        hide: true,
        sortBy: 'username',
      };

      this.onAddUser = this.onAddUser.bind(this);
      this.onDeleteUser = this.onDeleteUser.bind(this);
      this.onSwitch = this.onSwitch.bind(this);
      this.hideUsers = this.hideUsers.bind(this);
      this.remainingCoinem = this.remainingCoinem.bind(this);
      this.sortMembers = this.sortMembers.bind(this);
      
    }

    onSwitch(user){
      this.props.switchUser(user);
    }

    onDeleteUser(username){
      this.props.deleteHandler(username);
    }

    onAddUser(newUser){
      let usernames = this.props.members.map(member => member.username);
      if (usernames.indexOf(newUser.username) !== -1){
        console.log("Error: Cannot add another user with username: ", newUser.username)
      } else {
        console.log("Added new user")
        this.props.addHandler(newUser)}
    }

    calculateUserCoinem(member) {
      return Object.values(member.coinem).reduce((n,sum)=>n+sum, 0)
    }

    remainingCoinem(member){
      return this.props.MAX_COINEM - this.calculateUserCoinem(member)
    }
    hideUsers(e){
      e.preventDefault();
      if (this.state.hide){
        this.setState({hide: false})
      }
      else{
        this.setState({hide: true})
      }
    }

    sortMembers(e) {
      let sortType = e.target.value;
      this.setState( {sortBy: sortType} );
    }

    calculateSortedMembers(sortType, members){
      let sortedData = [...members] //default is to sort by member
      if (sortType === 'events planned'){
        sortedData = [...members].sort((a, b) => Object.values(this.props.events.filter(event => event.planner === b.username)).length - Object.values(this.props.events.filter(event => event.planner === a.username)).length);
      }
      else if (sortType === 'coinem spent'){
        sortedData = [...members].sort((a, b) => this.calculateUserCoinem(b) - this.calculateUserCoinem(a));
      }
      return sortedData;
    }
    
    render() {
      const sortedMembers = this.calculateSortedMembers(this.state.sortBy, this.props.members);

      return (
        <div>
          <SwitchUser currentUser={this.props.currentUser} members= {this.props.members} onChange={this.onSwitch}/>
          <AddUser onClick = {this.onAddUser} />
          <h2 id="members">Members</h2>
          <FormControl size='medium' style={{width:'10%'}}>
                  <InputLabel id="sort">Sort By</InputLabel>
                      <Select variant='outlined'
                        labelId="sort"
                        id="sort"
                        // value={updateUser}
                        label="Sort"
                        onChange={evt => this.sortMembers(evt)}
                      >
                        {sortTypes.map(type => <MenuItem
                        key={type}
                        value={type}>
                        {type}
                    </MenuItem>)}
                      </Select>
                    </FormControl>
        
          {(this.props.currentUser !== 'admin')
        ?<div><br/><Button size="small" variant="contained" onClick={this.hideUsers}>{(this.state.hide)?"Show":"Hide"} other members</Button></div>
        :<div>
        {sortedMembers.map(member => 
        (<Profile member={member}
          currentUser={this.props.currentUser}
          events={this.props.events}
          coinemSpent = { this.calculateUserCoinem(member)}
          coinemLeft= {this.remainingCoinem(member)}
          onDelete={() => this.onDeleteUser(member.username)}
          MAX_EVENTS = {this.props.MAX_EVENTS}/>
        ))}
      </div>}
      {(this.state.hide)
        ?<div>
        {this.props.members.filter(member=> member.username === this.props.currentUser).map(member => 
        (<Profile member={member}
          currentUser={this.props.currentUser}
          events={this.props.events}
          coinemSpent = { this.calculateUserCoinem(member)}
          coinemLeft= {this.remainingCoinem(member)}
          onDelete={() => this.onDeleteUser(member.username)}
          MAX_EVENTS = {this.props.MAX_EVENTS}/>
        ))}
      </div>
        :<div>
        {sortedMembers.map(member => 
        (<Profile member={member}
          currentUser={this.props.currentUser}
          events={this.props.events}
          coinemSpent = { this.calculateUserCoinem(member)}
          coinemLeft= {this.remainingCoinem(member)}
          onDelete={() => this.onDeleteUser(member.username)}
          MAX_EVENTS = {this.props.MAX_EVENTS}/>
        ))}
      </div>}
          
        </div>
        );
    }
  }
export default PeoplePage;
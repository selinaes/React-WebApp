import sun from './sun-svgrepo-com.svg';
import './App.css';
import React from 'react'
import NavBar from './Components/NavBar';
import PeoplePage from './Components/PeoplePage';
import {Event,EventsPage, AddEvent} from './Components/Events';

const initialData =  {
  "MAX_EVENTS": 3, 
  "MAX_COINEM_PER_EVENT": 5, 
  "MAX_COINEM": 20, 
  "NEXT_EVENT_UID": 13, 
  
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
    }
    this.switchUser = this.switchUser.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
  }

  switchUser(user) {
    this.setState ({currentUser: user});
  }

  addHandler(newUser) {
    this.setState({members: [...this.state.members, 
      newUser]}
      );
  }

  deleteHandler(username) {
    if ((username === this.state.currentUser) || (this.state.currentUser === "admin")){
      this.setState({events: this.state.events.filter(event => event.planner != username)} );
      this.setState({members:this.state.members.filter(member => member.username !== username)});
    }            
                  //FIX!!! warn user they are about to delete someone
                  //FIX!!! ALSO REMOVE ASSOCIATED COINEM WHEN YOU DELETE AN EVENT
                    
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
    console.log(this.state.events)
  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
      <NavBar />
        <img src={sun} className="App-logo" alt="logo" />
        </header>
        <h1>
          join'em
        </h1>
        <p><em>Events. Plan'em. Join'em!</em></p>
        <PeoplePage 
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
        currentUser = {this.state.currentUser}
        events = {this.state.events}
        onAddEvent = {this.handleAddEvent}
        onDeleteEvent = {this.handleDeleteEvent}
        />
      <p style={{padding:"5%"}}>joining'em since 2021</p>
    </div>
  );
  }
}

export default App;

import React from 'react'
// import NavBar from './NavBar';
const initialData = {
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
         }
      ]
}

// var MAX_EVENTS = 3; 
// var MAX_COINEM_PER_EVENT= 5;
// var MAX_COINEM= 20;
// var NEXT_EVENT_UID= 1;

class Events extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      uid: 1,
      title: "new event",
      description: "new description",
      planner: "ww1",
    };
  }

  render(){
    return(
      <div> </div>
    );
  }
}



class EventsPage extends React.Component {
    
  constructor(props){
    super(props);
    this.state =  {MAX_EVENTS: 3, 
                  MAX_COINEM_PER_EVENT: 5, 
                  MAX_COINEM: 20, 
                  NEXT_EVENT_UID: 13, 
                  members:[{username:"ww1",
                  firstname: 'Wendy',
                  lastname: 'Wellesley',
                  coinem:20 },{username:"sclark4",
                  firstname: 'Sara',
                  lastname: 'Clark',
                  coinem:20 }],
                  events:[{uid:1, 
                    title:"new event", 
                    description:"describe event here",
                    planner:"ww1"}],
                  event:{uid:1, 
                    title:"new event", 
                    description:"describe event here",
                    planner:"ww1"},
                  member: {username:"ww1",
                    firstname: 'Wanda',
                    lastname: 'Wellesley',
                    coinem:20 },
    }
  }

    render() {
      return <div>
          {/* <NavBar/> */}
                     <div>
                         <p>Event</p>
             {this.state.events.map(
                 (event) => <div>
                 <h4>
                 {event.title} | <span style={{color:"orange"}}>{event.planner}</span>
             </h4>
             <p>{event.description}</p></div>)
            }
           </div>
      <p>{JSON.stringify(this.state)}</p>
      </div>
  }
}


  export default Events;
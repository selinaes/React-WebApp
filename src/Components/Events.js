import React from 'react'
// import NavBar from './NavBar';

class Events extends React.Component {
    
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
import React from 'react'
import Profile from './Profile';

class Members extends React.Component {
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
                  events:[],
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
          
                     <div>
                         <p>Username | Name | Coinem</p>
             {this.state.members.map(
                 (member) => <div>
                 <p>
                 {member.username} | {member.firstname} {member.lastname} | {member.coinem}
             </p></div>)

            }
           </div>
          <Profile state = {this.state}/>
      <p>{JSON.stringify(this.state)}</p>
      </div>
  }
}

  export default Members;
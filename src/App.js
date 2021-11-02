import sun from './sun-svgrepo-com.svg';
import './App.css';
// import Events from './Components/Events';
import NavBar from './Components/NavBar';
import PeoplePage from './Components/PeoplePage';
import {Event,EventsPage, AddEvent} from './Components/Events';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  

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
        <PeoplePage />
        <EventsPage />
        {/* <ul>
          <li>profiles that can be added viewed and deleted</li>
          <li>fake login used to change current user</li>
          <li>members have c coinem to spend on events</li>
          <li>members can propose up to N events</li>
          <li>ability to delete events</li>
          <li>members can update/delete profiles, manage events, (re)allocate coinem</li>
        </ul> */}
        {/* <Members /> */}
        
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      
    </div>
  );
}

export default App;

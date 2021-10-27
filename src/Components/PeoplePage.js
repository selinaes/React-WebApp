import React from 'react';
// import ReactDOM from 'react-dom';
import {Card, CardContent, Typography, CardActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// let currentUser = "admin";
let updateUser;
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

  
  class PeoplePage extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        fileDownloadUrl: null,
        fileInfo: "",
        members: initialData.members, // a list of member objects
        events: initialData.events, //a list of event objects
        currentUser: "admin"
      }
      this.downloadHandler = this.downloadHandler.bind(this);
      this.uploadHandler = this.uploadHandler.bind(this);
      this.openFileHandler = this.openFileHandler.bind(this);
      this.deleteHandler = this.deleteHandler.bind(this);
    }

    downloadHandler (event) {
      event.preventDefault(); // Prevent default actions of event                   
      // Prepare the file 
      let dataObject = {"members": this.state.members}
      let output = JSON.stringify(dataObject, null, 4);
  
      // Download it            
      const blob = new Blob([output]);
      const fileDownloadUrl = URL.createObjectURL(blob);
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
// BUGGY
    switchUser(event) {
      this.setState ({currentUser: event.target.value});
    }
  
    /**  
     * Process the uploaded file within the React app.
     */
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
          this.setState ({fileInfo: fileInfoList.join("\n")});
          this.setState ({members: memberList});
        }
  
        // Mainline of the method 
        fileLoadedHandler= fileLoadedHandler.bind(this);
        reader.onload = fileLoadedHandler;
        reader.readAsText(fileObj);
    }
    
    deleteHandler(username) {
       this.setState({members: 
                       this.state.members
                        .filter( member => member.username !== username )
                      });
    }
  
    render() {
      return (
        <div>
            <Card sx={{ minWidth: 275, maxWidth:300 }} style={{ margin:20, align:"center" }} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  Switch User
                </Typography>
                <Typography variant="body1" component="div">
                  current user: {this.state.currentUser}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Username</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateUser}
                        label="Username"
                        onChange={this.switchUser}
                      >
                        <MenuItem value="admin">
                          <em>admin</em>
                        </MenuItem>
                        {this.state.members.map((member) => (
                          <MenuItem
                            key={member.username}
                            value={member.username}>
                            {member.username}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" onClick={() => this.switchUser(updateUser)}>Switch</Button>
              </CardActions> */}
              </CardContent>
            </Card>
          <h2>Members</h2>
          <div>
            {this.state.members.map (member => (
              <div style ={{ display:"inline-block"}}>
              <Card sx={{ minWidth: 275, maxWidth:300 }} style={{ margin:20 }} variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                { member.username }
                </Typography>
                <Typography variant="h5" component="div">
                  {member.firstname} {member.lastname}
                </Typography>
                
                <Typography variant="body2">
                  events planned: in progress
                  <br/> coinem spent: in progress
                  <br/> coinem pairs: buggy{ member.coinem.entries }
                  {/* BUG */}
                </Typography>
        
              </CardContent>
              <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" onClick={() => this.deleteHandler(member.username)}>Delete User</Button>
              </CardActions>
            </Card>
            </div>
                // <td>{member.username}</td>
              //   <tr>
              // {/* <tr key={member.username}> */}
              //   <td>{member.username}</td>
              //   <td>{member.firstname} {member.lastname}</td>
              //   <td>{member.coinem}</td>
              //   <td><button onClick={() => this.deleteHandler(member.username)}>
              //       delete</button></td>
              // </tr>
            ))}
                  </div>
  
          {/* <p><button onClick={this.downloadHandler}>
            Download the file members.json
          </button></p>
  
          <p><button onClick={this.uploadHandler}>
            Upload a file!
          </button></p>
          
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
              download="members.json" // download attribute specifies file name                                        // to download to when clicking link 
               href={this.state.fileDownloadUrl}
               ref={
                // This is so-called "callback ref" that captures the associated 
                // DOM element on rendering.
                // See https://reactjs.org/docs/refs-and-the-dom.html
                domElt => this.domFileDownload = domElt
              }
            >download it</a>
          <h2>File Data</h2>
          <pre className="status">{this.state.fileInfo}</pre> */}
        </div>
        );
    }
  }
  
  /**
   * ErrorBoundaries can improve error reporting. This class is copied from:
   * https://reactjs.org/docs/error-boundaries.html
   */
//   class ErrorBoundary extends React.Component {
  
//     constructor(props) {
//       super(props);
//       this.state = { hasError: false };
//     }
  
//     static getDerivedStateFromError(error) {    
//       // Update state so the next render will show the fallback UI.    
//       return { hasError: true };
//     }
    
//     componentDidCatch(error, errorInfo) {    
//       // You can also log the error to an error reporting service    
//       console.log(`error: ${error}; errorInfo: ${errorInfo}`);  
//     }
   
//     render() {
//       if (this.state.hasError) {      
//         // You can render any custom fallback UI      
//         return <h1>Something went wrong.</h1>;    
//       }
//       return this.props.children; 
//     }
//   }
  
//   ReactDOM.render( // The top-level page is a FileUploadDownloadApp
//     <ErrorBoundary>
//         <PeoplePage />
//     </ErrorBoundary>
//     ,
//     document.getElementById('root')
//   );
  
  export default PeoplePage;
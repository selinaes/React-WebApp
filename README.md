# CS 317 Homework 3: Join'em
#### Sara Clark and Jiawei Liu | November 2021
## Design and Implementation
explain (at a high level) the key design and implementation decisions you made; in cases where you made a choice, explain *why* you made that choice
### React Component Structure
Decision to break up code into components:

A key aspect of React is to break down functionalities into smaller parts called "components", smaller components both returns their part of the UI to the parent component they are in, but also deal with certain behaviors strictly within their scope of concern. As Jordan Walke mentioned in his video, React enables engineers to define their components and achieve the separation of concerns (although as newbies our understanding of SoC must be shallow). 

We organized the body of our Join'em Web App into an App.js file, within which we have three major components: 
- NavBar: navigating to a part of the page
- PeoplePage: members-related
- EventsPage: events-related

Within the App component, we also had a chunk of codes related to file upload/download, and we would like to separate it out if we had time. 

PeoplePage is responsible for all functionalities related to members, within which we have three major child components:
- SwitchUser: become another member
- AddUser: add new member
- Profile: display individual members

EventsPage is responsible for all functionalities related to events, within which we have four child components:
- InputEvent: adding new event from input
- SortSelection: select a way to sort events
- RadioButtonsGroup: members may select a category to filter events
- Event: display of individual events

Breaking down a large chunk of code into smaller self-contained components make our code more understandable in collaboration, but even more, it makes our picture of the app clearer, and each component is easy to reuse whenever needed. We also got to practice with information flow between components, which is crucial in React.


### Conditional Rendering
We used conditional rendering in several places, specifically deciding what to display based on the status/identity of the current user.
#### A.Security for admin-only behaviors
Preventing regular users from having priviledges of an admin: file upload/download, seeing and changing global variables, and ability to add or delete events/users that are not their own.
#### B.Different Event actions based on coinem status/planner status
Within each event's display, UI differs a bit from user to user, depending on what they have done/could do to the events. Here, we used logical && operator to conditionally render these buttons to make sure:
1. only planner can delete & edit their own event (in addition to admin)
2. only non-planner can "coin'it" events they have not yet coined 
3. only after a member already "coined" a event, can they edit coinems through -/+ buttons

We designed the possible actions on events to display in a straight-forward manner. Users don't need to think twice to understand what they can and cannot do. Examples of such user-friendly design includes:
- Editing events at their own place, rather than a separate editing box
- The chip showing the current user/spent coinem pair is surrounded by two -/+ icon buttons to edit the coinem, making it clear:
    - they can only edit their own coinem, not others'
    - which event they are changing coinem for
    - what's the current coinem value
- Delete and Edit buttons are only visible for one's own events
- Once start editing, the two buttons are replaced by a confirm button, prompting the user to save the change before other actions
- A 'Coin'it' button is displayed when one is not the planner, and has not yet coined the event


### State and Props
#### 1.Stateful component & lifting states up
To avoid complication, we stick to the "single source of truth" principle and stored key information only in one place. Whenever two or more components need to use the same piece of changing information, we lift the states up to their closest common ancestor.

All the members, events, and global variables, are stored in states of 'App' component. Thus, any changes are done on this copy, and the result is passed down to child components as props. 

Certain child components also have states, but their state has nothing to do with their parents, or other components, so it does not violate the one information source principle.

Generally, input components have states to keep track of the current value of input, before these values are handled by the passed down functions from parent through props:
- Event: state for editing status & editedEvent
- InputEvent: state for new event entries
- AddUser: state for new user entries
- RadioButtonGroup: state for current selection
- SortSelection: state for current selection

In addition, EventsPage and PeoplePage both have states for current sorting options AND/OR filtering categories, which only affects their own display but not other parts of the app, so we did not lift them up to App.js.

#### 2.What props we passed
Props are used to pass down information from parent component to child component, and also pass down handlers so that child can inform parent certain information has changed for the parent to update their states. Generally, all the needed information by child are passed down as props.

#### 3.Deep & shallow copying
React determines whether to rerender a component based on whether its states or props changes, so whenever we use setState, we make sure to create new value rather than mutating the old value. New values are natural when the state is assigned a new string/int (selections or NEXT_EVENT_ID), or when the assigned value comes from uploaded files. However, things get complicated when we alter a list of objects (i.e. events/members). 

For these cases, we make sure to make copies of the original list, using spread, map, filter, etc. Certain times, we use JSON.stringify & JSON.parse to make sure that every individual object inside of the list is copied, so we create a deep copy with different objects, not just shallow copies with a new list structure but point to the old objects. 

#### 4.Object methods
Object.value/Object.key and reducing




## Noteworthy Aspects

### Material UI
usage of MUI
icons, cards, nested mapping, pop-up dialog, spinning sun logo, drop down inputs, text inputs, buttons, 
### Modularization
We restructured everything to be more professional and readable
### Navigation Bar
Links to components in page


explain (at a high level) noteworthy aspects of your app code for each screen. Do not explain low-level aspects of the app code, only high-level bits that may not be obvious. (Non-obvious low-level details should be expressed in code comments.)
describe any features that don’t work quite right in your submitted implementation.

## Incomplete Code
At the moment, the following features work inconsistently or are otherwise flawed:
1. Add User: For untraceable reasons, the feature that prevents adding a second user with a preexisting username occasionally fails. Additionally, the add user button allows for empty strings which is unhelpful and indicates that the required feature is not functional.

## Wish List of New Features
1. Customize alert dialog to be include a more specific warning with information on the user / event being deleted. Replace basic javascript alerts with MUI alert dialogs.
2. Give each new user a different color and use that color to represent them whenever their username is referred to.
3. Update Nav Bar depending on the current user and their Join'em access priviledges.
4. Modularize every aspect of the app into components, rather than having massive files with every aspect.
5. Remove the chip of a user/coinem pair from Event if one decreases coinem to 0, rather than just disable the - button.


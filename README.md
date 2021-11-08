# CS 317 Homework 3: Join'em
#### Sara Clark and Jiawei Liu | November 2021
## Design and Implementation
explain (at a high level) the key design and implementation decisions you made; in cases where you made a choice, explain *why* you made that choice
### React Component Structure
Decision to break up code into components in order to make it easier to understand
### Conditional Rendering
distinguishes between admin and regular member features
#### Security for admin-only behaviors
Preventing regular users from having priviledges of an admin and ability to add or delete events/users that are not their own
#### Coin'it and Delete buttons for different user/event relationship
When displaying each event, we used conditional rendering, specifically logical && operator to make sure:
(1) only planner can delete their own event, and 
(2) only non-planner can "coin'it" events they have not yet coined (coinems for already coined event will be modified through -/+ buttons)
### State and Props
when we chose to use state (eg App.js) and when we chose to use propsng 
keeping all info in one place & using states to manage them
when to lift states up and when not to
deep vs shallow copying
passing handlers as props
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

## Wish List of New Features
1. Customize alert dialog to be include a more specific warning with information on the user / event being deleted.
2. Give each new user a different color and use that color to represent them whenever their username is referred to.
3. Update Nav Bar depending on the current user and their Join'em access priviledges.
4. Modularize every aspect of the app into components, rather than having massive files with every aspect.
5. Add more security features, such as warning a user when they cannot complete an action and explaining why they cannot complete a specific action (e.g. a message when trying to add a user with a username that has already been used rather than just a console.log message).


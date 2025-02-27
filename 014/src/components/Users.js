import { Component, useState } from 'react';
import User from './User';

import classes from './Users.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUsers: true,
    }  // always an object
  }

  componentDidUpdate() {
    if(this.props.users.length === 0) {
      throw new Error('No users provided!');
    }
  }

  toggleUsersHandler() {
    // built in method to set this.state
    // it DOESN'T overwrite the whole this.state object
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    })
  }

  render() {
    // you can define helper function in render method
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/* bind is for replacing the this keyword from the specified method with another
        thing  */}
        <button onClick={this.toggleUsersHandler.bind(this)}>  
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;

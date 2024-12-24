import React, { useState } from 'react';
import AddUser from './Components/Users/AddUser';
import Card from './Components/UI/Card';
import UsersList from './Components/Users/UsersList';

function App() {
  const [usersList, setUserList] = useState([]);

  const addUserHandler = (uName, age) => {
    setUserList((prev) => {
      return [...prev, {
        'username': uName,
        'age': age,
        id: Math.random().toString()
      }]
    })
  }

  return (
    <div>
      <AddUser addUserHandler={addUserHandler}/>

      <UsersList users={usersList}/>
    </div>
  );
}

export default App;

import "./App.css";
import { useState } from "react";

function App() {
  let [users, setUsers] = useState([]);

  let getDataFromServer = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch("/getUsers", reqOptions);

    let JSOData = await JSONData.json();

    setUsers(JSOData);
    console.log(JSOData);
  };

  return (
    <div className="app">
      <button
        onClick={() => {
          getDataFromServer();
        }}
      >
        Get Users
      </button>
      {users.map((user) => {
        return (
          <div>
            <h1>===============</h1>
            <h2>First Name: {user.firstName}</h2>
            <h2>Last Name: {user.lastName}</h2>
            <h2>Age: {user.age}</h2>
            <h2>gender: {user.gender}</h2>
            <h2>City: {user.city}</h2>
            <h2>State: {user.state}</h2>
            <h2>Country: {user.country}</h2>
            <h1>===============</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;

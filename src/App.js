import logo from './logo.svg';
import './App.css';
import React from 'react';
import { initializeDatabase, createAccount, loginGoogle, loginEmail } from './Database';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';

function App() {
  let [user, setUser] = React.useState(null);
  initializeDatabase();  

  function handleLogout() {
    signOut(getAuth());
  }

  onAuthStateChanged(getAuth(), (currUser) => {
    if(currUser) {
      setUser(currUser);
    } else {
      setUser(null);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <div style={{backgroundColor: user === null ? 'red' : 'green', width: 500, height: 500}} onClick={user === null ? createAccount('tdesot3@lsu.edu', '4206969') : handleLogout}>

        </div>
      </main>
    </div>
  );
}

export default App;

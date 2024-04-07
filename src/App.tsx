import React, { useState, useRef } from "react";
import HomePage from "./HomePage.tsx";
import  {Protected} from "./Protected.tsx";
import { AuthContext } from './AuthContext.tsx'
import { initializeDatabase, createAccount, loginGoogle, loginEmail } from './Database.js';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';

import SignInRegister from "./SignInRegister.tsx";
import SetUpAccount from "./SetUpAccount.tsx"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

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
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Protected><HomePage/></Protected>
    },
    {
      path:"/home",
      element:<Protected><HomePage/></Protected>
    },
    {
      path:"/signin",
      element:<SignInRegister></SignInRegister>
    },
    {
      path:"/setup",
      element:<SetUpAccount></SetUpAccount>
    }
  ])

  return (
    
    <AuthContext>
    <RouterProvider router={router}></RouterProvider>
    </AuthContext>

  );
}

export default App;
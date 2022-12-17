
// export default App
import React, { useState } from "react";
import PocketBase from "pocketbase";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

// const USERNAME = 'email@email.com'
// const PASSWORD = 'poggers123'

const pb = new PocketBase('https://cpsc349project4.fly.dev')

export default function App () {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className='min-h-screen flex items-center justify-center text-center bg-cyan-700'>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

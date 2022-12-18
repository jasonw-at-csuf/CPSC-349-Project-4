// export default App
import PocketBase from "pocketbase";
import React, { useState } from "react";

import { Lobby } from "./Lobby";
import { Login } from "./Login";
import { SignUp } from "./SignUp";


const pb = new PocketBase("https://cpsc349project4.fly.dev");

export default function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const [isLogin, setIsLogin] = useState("false");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-center bg-cyan-700">
      {isLogin === "false" ? (
        currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} checkLogin={setIsLogin} />
        ) : (
          <SignUp onFormSwitch={toggleForm} />
        )
      ) : (
        <Lobby />
      )}
    </div>
  );
}

import PocketBase from "pocketbase";
import React, { useState } from "react";

export const Login = (props) => {
  const pb = new PocketBase("https://cpsc349project4.fly.dev");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let authData = await pb.collection("users").authWithPassword(email, pass);

    if (authData != 400) {
      console.log("isLoggedIn");
      props.checkLogin("true");
    } else {
      alert("ERROR");
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-h2">Log In</h2>
          {/* Email */}
          <label htmlFor="email" className="form-label">
            Email{" "}
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            id="email"
            name="email"
            className="form-input"
          />
          {/* Password */}
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="form-input"
          />
          {/* Submission */}
          <input type="submit" id="submitBtn" value="Submit" className="btn" />
        </form>
        <button
          onClick={() => props.onFormSwitch("SignUp")}
          type="button"
          className="btn"
        >
          Don't have an account? Register
        </button>
      </div>
    </>
  );
};

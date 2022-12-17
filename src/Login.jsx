import React, { useState } from "react";
import PocketBase from "pocketbase"

export const Login = (props) => {
    const pb = new PocketBase('https://cpsc349project4.fly.dev')
    const [email, setEmail]  = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)

        let authData = await pb.collection('users').authWithPassword(
            email, 
            pass,
        );
        if(authData != 400){
            console.log("isLoggedIn")
        }else{
            console.log("Error")
        }
    };

    return(
    <>
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          {/* Email */}
          <label htmlFor="email">Email </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" id="email" name="email"/>
          {/* Password */}
          <label htmlFor="password">Password</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
          {/* Submission */}
          <input type="submit" id="submitBtn" value="Submit"/>
        </form>
        <button onClick={() => props.onFormSwitch('SignUp')} type="button">Don't have an account? Register</button>
    </>
    )
  
}
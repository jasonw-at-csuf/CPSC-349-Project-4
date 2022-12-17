
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
    <div className='App'>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

// function SignUp () {
//     let email, password, confirmPassword = ''
    
//     const handleSubmit = async event => {
//       event.preventDefault();
//       console.log('Sign Up Submitted');
//       console.log(email)
//       console.log(password)

      
//       let data = await pb.collection('users').create({
//         email:            email,
//         password:         password,
//         passwordConfirm:  confirmPassword,
//       })

//       console.log(data)
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Sign Up</h2>

//             {/* Email */}
//             <label for="email">Email </label>
//             <input type="email" id="email" placeholder="Email Address"
//             onChange={event=>email=event.target.value}></input>

//             {/* Password */}
//             <label for="password">Password</label>
//             <input type="password" id="password" placeholder="Password"
//             onChange={event=>password=event.target.value}></input>

//             {/* Confirm Password */}
//             <label for="passwordConfirm">Confirm Password</label>
//             <input type="password" id="password" placeholder="Confirm Password"
//             onChange={event=>confirmPassword=event.target.value}></input>

//             {/* Submission */}
//             <input type="submit" id="submitBtn" value="Submit"></input>
//         </form>
//     )
// }

// function Login () {
//   let email, password = ''
    
//   const handleSubmit = async event => {
//     event.preventDefault();
//     console.log('Log In Submitted');
//     console.log(email)
//     console.log(password)

//     let authData = await pb.collection('users').authWithPassword(
//       email, 
//       password
//       );
//     if(authData != 400){
//       console.log("isLoggedIn")
//     }
//   }

//   return (
//       <>
//       <form onSubmit={handleSubmit}>
//           <h2>Log In</h2>

//           {/* Email */}
//           <label for="email">Email </label>
//           <input type="email" id="email" placeholder="Email Address"
//           onChange={event=>email=event.target.value}></input>

//           {/* Password */}
//           <label for="password">Password</label>
//           <input type="password" id="password" placeholder="Password"
//           onChange={event=>password=event.target.value}></input>

//           {/* Submission */}
//           <input type="submit" id="submitBtn" value="Submit"></input>
//       </form>
//       <button type="button">Register</button>
//       </>
//   )
// }

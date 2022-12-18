import React, { useState } from "react";
import PocketBase from "pocketbase";


export const SignUp = (props) => {
    const pb = new PocketBase('https://cpsc349project4.fly.dev')
    const [email, setEmail]  = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(pass.length < 8 || confirmPass.length < 8){
            alert("Password needs to be over 8 characters")
        }
        else if (pass != confirmPass) {
            alert("Confirm password must match password")
        }else{
            await pb.collection('users').create({
                email:            email,
                password:         pass,
                passwordConfirm:  confirmPass,
            });
            console.log("Account Created")
        }
    };

    return(
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h2 className="form-h2">Sign Up</h2>
                {/* Email */}
                <label htmlFor="email" className="form-label">Email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Email Address" className="form-input"></input>

                {/* Password */}
                <label htmlFor="password" className="form-label">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" placeholder="Password" className="form-input"></input>

                {/* Confirm Password */}
                <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" id="conPassword" placeholder="Confirm Password" className="form-input"></input>

                {/* Submission */}
                <input type="submit" id="submitBtn" value="Submit" className="btn"/>
            </form>
            <button onClick={() => props.onFormSwitch('login')} type="button" className="btn">Already have an account? Login</button>
        </div>
        </>

        
    )
}

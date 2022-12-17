import React, { useState } from "react";
import PocketBase from "pocketbase";


export const SignUp = (props) => {
    const pb = new PocketBase('https://cpsc349project4.fly.dev')
    const [email, setEmail]  = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(confirmPass);
        let data = await pb.collection('users').create({
            email:            email,
            password:         pass,
            passwordConfirm:  confirmPass,
        });
        console.log(data);
    };

    return(
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit} class="form">
                <h2 class="form-h2">Sign Up</h2>
                {/* Email */}
                <label htmlFor="email" class="form-label">Email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Email Address" class="form-input"></input>

                {/* Password */}
                <label htmlFor="password" class="form-label">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" placeholder="Password" class="form-input"></input>

                {/* Confirm Password */}
                <label htmlFor="passwordConfirm" class="form-label">Confirm Password</label>
                <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password" id="conPassword" placeholder="Confirm Password" class="form-input"></input>

                {/* Submission */}
                <input type="submit" id="submitBtn" value="Submit" class="btn"/>
            </form>
            <button onClick={() => props.onFormSwitch('login')} type="button" class="btn">Already have an account? Login</button>
        </div>
        </>

        
    )
}
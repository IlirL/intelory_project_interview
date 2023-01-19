import React, { useState } from "react";
import axios from "axios";
import {authActions} from './store/index'
import { useDispatch } from "react-redux";
import { saveToken } from "./saveToken";
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ilir = ", process.env.REACT_APP_BASE_URL)
       axios({
            method:'POST',
            url:`${process.env.REACT_APP_BASE_URL}/authenticate`,
            data:{
                email:email,
                password:pass
            }
        }).then(async (response) => {
            console.log("response = ", response);
           if(response.status>=200 && response.status<300)
           {
               alert("Successful Login");
              await dispatch(authActions.login({token:response.data.token, name:response.data.name, email:response.data.email}))

           }
        }).catch(e => {
            alert("Unsuccessful Login");
               setEmail("");
               setPass("");
        })
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
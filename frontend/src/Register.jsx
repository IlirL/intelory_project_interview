import React, { useState } from "react";
import axios from 'axios';
export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_BASE_URL}/register`,
            data:{
                email:email,
                password:pass,
                name:name
            }
        }).then(response => {
            if(response.status >=200 && response.status < 300)
            {
                props.onFormSwitch('login');
                alert("Successful Registering")
            }
            else{
                alert("Unsuccessful Registering")
                setEmail("");
                setName("");
                setPass("");
            }
        }).catch(e=>{
            alert("Unsuccessful Registering")
            setEmail("");
            setName("");
            setPass("");
        })
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}

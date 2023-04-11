import { useEffect, useState } from "react"
import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let a = []
export default function Login() {


    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [data, setdata] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('data')) {
            a = JSON.parse(localStorage.getItem('data'))
            setdata(a)
        }

    }, data)
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const logemail = (e) => {
        console.log(e.target.value)
        setusername(e.target.value)


    }
    const logpass = (e) => {
        console.log(e.target.value)
        setpassword(e.target.value)

    }



    const lsubmit = () => {

        let isLoggedIn = false
        for (let i = 0; i < data.length; i++) {

            if (username === data[i].loginusername && password === data[i].loginpassword) {

                isLoggedIn = true
            }
            // if (username === data[i].loginusername && password !== data[i].loginpassword) {

            // alert('password wrong')
            // }
            // if (username !== data[i].loginusername && password === data[i].loginpassword) {
            // alert('username wrong')

            // }
            // if (username !== data[i].loginusername && password !== data[i].loginpassword) {
            // alert('both wrong')

            // }

        }


        if (isLoggedIn) {
            toast('success')
            localStorage.setItem('login', 'true')
            window.location.href = '/view'
        } else {
            toast('registered your self')
            window.location.href = '/admin'

        }

    }

    return (
        <>
            <div><h1>Login page</h1>
                <br></br>
                <label id="username1">username</label>   <input id="username1" type='text' value={username} onChange={logemail} /><br></br><br></br>
                <label id='password1'>password</label><input id='password1' type={showPassword ? "text" : "password"} value={password} onChange={logpass} />
                <button onClick={handlePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
                <br></br><br></br>
                <button onClick={lsubmit} >lsubmit</button>
                <ToastContainer />
            </div>
        </>
    )

}
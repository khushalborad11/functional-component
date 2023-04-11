import React, { useEffect, useState } from 'react';
import Login from './Login.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let data = []
export default function Registered() {

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [newdata, setdata] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('data')) {
            data = JSON.parse(localStorage.getItem('data'))
            setdata(data)
        }
    }, newdata)
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleusernameChange = (e) => {
        setusername(e.target.value)
        localStorage.setItem('username', e.target.value)
    }
    const handlepasswordChange = (e) => {
        setpassword(e.target.value)
        localStorage.setItem('password', e.target.value)
    }
    const submit = () => {
        let oldData = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : []
        let alreadyregistered = false
        for (let i = 0; i < oldData.length; i++) {
            console.log('username', username)
            console.log('olddata', oldData[i].loginusername)
            if (username === oldData[i].loginusername && password === oldData[i].loginpassword) {
                alreadyregistered = true

            }

        }
        if (alreadyregistered) {
            toast('already signup')


        } else {
            let obj = {
                loginusername: username,
                loginpassword: password,

            }
            data.push(obj)
            setdata(data)
            localStorage.setItem('data', JSON.stringify(data))

        } window.location.href = '/login'


    }
    return (
        <>
            <div>
                <h1>Registration form</h1>

                <label id='username'>username </label><input type='text' value={username} name='username' onChange={handleusernameChange} id='username' /><br></br><br></br>
                <label id='password'>password </label><input type={showPassword ? "text" : "password"} value={password} id='password' onChange={handlepasswordChange} />
                <button onClick={handlePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
                <br></br><br></br>
                <button onClick={submit}> submit</button>
                <ToastContainer />
            </div>

        </>

    );
}



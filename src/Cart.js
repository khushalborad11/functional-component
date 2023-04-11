import React, { useState, useEffect } from "react";
import './App.css';
// import location from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let a = []
let cart = []

export default function Cart() {
    const [data, setdata] = useState([])
    const [cart1, setcart] = useState([])
    const [show, setshow] = useState([])

    useEffect(() => {
        if (localStorage.getItem('newproject')) {
            a = JSON.parse(localStorage.getItem('newproject'))
            setdata(a)
            console.log('view', a)
        }

        if (localStorage.getItem("data2")) {
            cart = JSON.parse(localStorage.getItem("data2"))

        }
        if (localStorage.getItem('login') === 'true') {
            setshow(true)
        }


        const matchedArray = [];
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < cart.length; j++) {
                if (a[i].id === cart[j].id) {
                    matchedArray.push({ ...a[i], ...cart[j] });

                }

                console.log('abc', matchedArray, cart1)
            }

        }
        setcart(matchedArray)
    }, { data })

    const logout = () => {
        if (localStorage.getItem('username')) {
            localStorage.removeItem('login')

            localStorage.removeItem('username')
            window.location.href = '/rj'
        } else {
            window.location.href = '/rj'
        }
    }
    const login = () => {
        alert('PLEAS REGISTER YOUR SELF')
        window.location.href = '/rj'
    }

    const removeclick = (id) => {
        const afterDelData = cart1.filter((item) => item.id !== id);
        localStorage.removeItem('afterDelData')
        setcart(afterDelData)
        localStorage.setItem('data2', JSON.stringify(afterDelData))
        console.log('after', afterDelData)
        // const newCartItems = [...cart1];
        // newCartItems.splice(item, 1);
        // setcart(newCartItems);

    }

    return (
        <>
            <div>
                {show && <button className='bu12' onClick={logout}>LOG OUT</button>}
                {!show && <button className='bu12' onClick={login}>LOG IN</button>}
            </div>

            {cart1.map(item => (
                <div className="dd" key={item.id}>
                    <img width={100} height={100} src={item.thumbnail}></img><br></br>
                    Title:{item.Title}<br></br>
                    Price:{item.Price}
                    <button onClick={() => removeclick(item.id)}>remove</button>
                </div>
            ))}
        </>
    )
};

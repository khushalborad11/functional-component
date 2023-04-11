import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function View() {
    const [otherdata, setotherdata] = useState([])
    const [newcurrentData, setcurrentData] = useState([])
    const [data, setdata] = useState([])
    const [show, setshow] = useState(false)
    const [selectedIds, setSelectedIds] = useState([])
    let cart = []
    let a = []


    useEffect(() => {
        if (localStorage.getItem('newproject')) {
            a = JSON.parse(localStorage.getItem('newproject'))
            setdata(a)
            console.log('view', a)
        }
        if (localStorage.getItem("data2")) {
            cart = JSON.parse(localStorage.getItem("data2"))
            setSelectedIds(cart)
            console.log('b', selectedIds)
        }
        if (localStorage.getItem('login') === 'true') {
            setshow(true)
        }
    }, { data })
    const imageclick = (id) => {
        localStorage.setItem('id', id)
        window.location.href = '/image1'
    }
    const addtocart = (id) => {
        if (localStorage.getItem('username')) {
            localStorage.setItem('id', id)
            toast('success')
            console.log('before', id)
            if (selectedIds.includes(id)) {
                console.log('if')
                toast("ID already selected!");
            } else {
                setSelectedIds([...selectedIds, id]);
                let data1 = {
                    id: id
                }
                selectedIds.push(data1)

                localStorage.setItem("data2", JSON.stringify(selectedIds))
                console.log('else')
            }
        } else {
            toast('login your self')
            window.location.href = '/admin'
        }


    }
    const logout = () => {
        if (localStorage.getItem('login')) {
            localStorage.removeItem('username')
            window.location.href = 'admin'
        }
    }
    const login = () => {
        toast('login your self')
        window.location.href = '/login'
    }
    return (
        <>
            <Dashboard>
                <div className="b12">
                    {!show && <button onClick={login}>Login</button>}
                    {show && <button onClick={logout}>logout</button>}
                </div>
                <div id="view">
                    <div className="vv row">
                        <div className=' v2 col-lg-12 img-fluid '>
                            {data.map((item, index) => (
                                <div key={index}>
                                    <img width={100} onClick={() => imageclick(item.id)} src={item.thumbnail}></img>
                                    <p className="v">{item.Title}</p>
                                    <button onClick={() => addtocart(item.id)} >addtocart</button>
                                    <ToastContainer />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Dashboard>
        </>
    )
};
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import ReactDOM from 'react-dom';
// import ReactImageZoom from 'react-image-zoom';
let cart = []
let a = []
let currentData = ''
let id = ''
export default function Image1() {
    const [data, setdata] = useState([])
    const [alldata, setalldata] = useState([])
    const [newcurrentData, setnewcurrentData] = useState([])
    const [thumbnail, setthumbnail] = useState('')
    const [show, setshow] = useState(false)
    // const props = { width: 400, height: 250, zoomWidth: 500, img: 'https://decodeadmin.web.app/img/about.jpg' };
    useEffect(() => {
        if (localStorage.getItem('newproject')) {
            a = JSON.parse(localStorage.getItem('newproject'))
            setalldata(a)
        }
        if (localStorage.getItem('id')) {
            id = localStorage.getItem('id')
            for (let i = 0; i < a.length; i++) {
                if (a[i].id == id) {
                    currentData = a[i]
                }
            }
            setthumbnail(currentData.thumbnail)

            setnewcurrentData(currentData)
        }
        if (localStorage.getItem('login') === 'true') {
            setshow(true)
        }

    }, { data });

    const abc = (item) => {
        setthumbnail(item)
    }
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
    const addtocart = (id) => {
        let data1 = {
            id: id
        }
        cart.push(data1)
        localStorage.setItem("data2", JSON.stringify(cart))


        if (localStorage.getItem('username')) {
            localStorage.setItem('id', id)
            alert('success')

        } else {
            alert('login your self')
            window.location.href = '/admin'

        }

    }


    return (
        <>

            <div>
                {show && <button className='bu12' onClick={logout}>LOG OUT</button>}
                {!show && <button className='bu12' onClick={login}>LOG IN</button>}
            </div>



            <div className='abc1 '>
                <div className='row'>
                    <div className='col-md-4 col-sm-12'>
                        <img className=' text-center img-fluid img12' src={thumbnail} ></img>
                        {/* <ReactImageZoom {...props} /> */}

                        <br></br>
                    </div>
                    <div className='col-md-8 col-sm-12 w1'>
                        TITLE:<p className='red'>{currentData.Title}</p>
                        PRICE:<p className='red'>{currentData.Price}</p>
                        DESCRIPTION :<p className='red'>{currentData.Description}</p>
                        {cart && cart.length > 0 && cart.map((item, index) => (
                            <div className='col-lg-1 ' key={index}>
                                <button onClick={() => addtocart(item.id)} >addtocart</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='container'>
                    <div className='abc2'>
                        {newcurrentData.multiple && newcurrentData.multiple.length > 0 && newcurrentData.multiple.map((item, index) => (
                            <div className='col-lg-1 ' key={index}>
                                <img width={40} src={item} className='i1 img-fluid' onClick={() => abc(item)}></img>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>)
}

import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './Admin';
import Addproduct from './Addproduct';
import Product from './Product';
import View from './View';
import Cart from './Cart';
import Login from './Login';
import Image1 from './Image1';

export default class RouterContainer extends Component {
    render() {
        return (

            <BrowserRouter>
                <Routes>
                    <Route path='/admin' element={<Admin />}></Route>
                    <Route path='/addproduct' element={<Addproduct />}></Route>
                    <Route path='/product' element={<Product />}></Route>
                    <Route path='/view' element={<View />}></Route>
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/image1' element={<Image1 />}></Route>

                </Routes>
            </BrowserRouter>

        )
    }
}

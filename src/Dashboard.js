import Amazon from './Amazon.png';
import { Link } from 'react-router-dom';
import React from 'react';
export default function Dashboard(props) {
    return (
        <>
            <div>
                <div className='logo' ><img src={Amazon} className='lg' ></img></div>
                <div className='sidebar'>
                    <div><Link to='/addproduct' id='addproduct'>ADDPRODUCT</Link></div>
                    <div><Link to='/product' id='product'>PRODUCT</Link></div>
                    <div><Link to='/view' id='view'>VIEW</Link></div>
                    <div><Link to='/image1' id='image1'>Image</Link></div>
                    <div><Link to='/cart' id="cart">cart</Link></div>
                </div>
                {props.children}
            </div>
        </>
    )
};
import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useNavigate } from 'react-router';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let a = [];

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
});


export default function Product(params) {
    const navigation = useNavigate()
    const [responsive, setResponsive] = useState("vertical");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [otherdata, setotherdata] = useState([])
    const [newcurrentData, setcurrentData] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setdata] = useState([])

    let a = []
    useEffect(() => {
        if (localStorage.getItem('newproject')) {
            a = JSON.parse(localStorage.getItem('newproject'))
            setdata(a)
        }

    }, { data })

    const editclick = (id) => {
        localStorage.setItem('id', id)

        navigation('/addproduct')
    }
    const removeclick = (id) => {


        const afterDelData = data.filter((item) => item.id !== id);

        setdata(afterDelData)
        localStorage.setItem('newproject', JSON.stringify(afterDelData))
        console.log(afterDelData)
    }
    const viewclick = (id) => {
        let otherdata = []
        let currentData = []
        if (localStorage.getItem('newproject')) {

            otherdata = JSON.parse(localStorage.getItem('newproject'))
        }


        console.log('otherdata ::', otherdata, id)
        for (let i = 0; i < otherdata.length; i++) {

            if (otherdata[i].id == id) {
                currentData = otherdata[i]
            }
        }

        console.log('current data :: ', currentData)
        setcurrentData(currentData)
        setotherdata({ fulldata: otherdata, title: currentData.Title, thumbnail: currentData.thumbnail, price: currentData.Price })
        handleShow()
    }



    const columns = [


        {
            name: "Title",
            label: "title",
            options: {
                filter: true,
                sort: true,

            }
        },
        {
            name: "thumbnail",
            label: " thumbnail",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img width={50} src={value}></img>
                )

            }
        },
        {
            name: "Price",
            label: " price",
            options: {
                filter: true,
                sort: true,

            }
        },
        {
            name: "id",
            label: "Edit",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button onClick={() => editclick(value)}>{value}</button>
                )
            }
        },
        {
            name: "id",
            label: "Delete",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button onClick={() => removeclick(value)}>{value}</button>
                )
            }
        },
        {
            name: "id",
            label: "view",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button onClick={() => viewclick(value)}>{value}</button>
                )
            }

        }
    ];

    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: "dropdown",
        onTableChange: (action, state) => {

        }
    };

    return (
        <>
            <Dashboard>
                <div id='product' >
                    <div className="vv">
                        <div>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"seller central"}
                                        data={data}
                                        columns={columns}
                                        options={options}

                                    />
                                </ThemeProvider>
                            </CacheProvider>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>label</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className=' align-center justify-around'>

                                        <div className='d-flex'>
                                            <div className='col-lg-6'> <label id='d1'> Title</label><br></br><b>{newcurrentData.Title}</b> </div>
                                            <div className='col-lg-4'>  <label id='d2'>Image</label><br></br><img width={100} src={newcurrentData.thumbnail}></img></div>
                                            <div className='col-lg-2'>  <label id='d2'>Price</label><br></br><b>{newcurrentData.Price}</b></div>
                                        </div>


                                    </div>
                                </Modal.Body>
                            </Modal>

                        </div>
                    </div>

                </div>


            </Dashboard>
        </>
    )
};
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import App from './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let a = [];
let currentData = ''

export default function Addproduct() {
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    // const [thumbnail, setthumbnail] = useState('')
    // const [multipleimage, setmultipleimage] = useState('')
    const [price, setprice] = useState('')
    const [category, setcategory] = useState('')
    const [data, setdata] = useState([])
    const [ImageUrl, setImageUrl] = useState("");
    const [SelectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('newproject')) {
            a = JSON.parse(localStorage.getItem('newproject'));
            const id = localStorage.getItem('id')
            for (let i = 0; i < a.length; i++) {
                if (a[i].id == id) {

                    settitle(a[i].Title)
                    setdescription(a[i].Description)
                    setprice(a[i].Price)
                    setImageUrl(a[i].thumbnail)
                    setSelectedImages(a[i].multiple)
                    setcategory(a[i].Category)
                }
            }

        }
    }, { data });




    const changetitle = (e) => {
        settitle(e.target.value)
    }
    const changedescription = (e) => {
        setdescription(e.target.value)
    }
    // const changethumbnail = (e) => {
    //     let newimage = ''
    //     let file = e.target.files[0];
    //     let reader = new FileReader();
    //     reader.onloadend = () => {
    //         console.log('RESULT:', reader.result);
    //         newimage = reader.result
    //     }
    //     reader.readAsDataURL(file);
    //     setTimeout(() => {
    //         console.log('ABC1', newimage)
    //         setthumbnail(newimage)
    //         console.log('ABC2', newimage)
    //     }, 1000);
    // }
    const changethumbnail2 = (e) => {

        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            let files = e.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = (e) => {
                images.push(e.target.result);
                if (i === files.length - 1) {
                    setSelectedImages(images);
                }
            };
        }
    };





    // {
    //     let newimage = []

    //     for (let i = 0; i < e.target.files.length; i++) {
    //         let file = e.target.files[i];
    //         let reader = new FileReader();
    //         reader.onloadend = () => {
    //             console.log('RESULT:', reader.result);
    //             newimage.push(reader.result);
    //         }
    //         reader.readAsDataURL(file);
    //     }
    //     setmultipleimage(newimage)
    // }
    const handleImageChange = (e) => {
        let selectedFile = e.target.files[0];
        let ImageUrl = URL.createObjectURL(selectedFile);
        setImageUrl(ImageUrl);
    };

    const changeprice = (e) => {
        setprice(e.target.value)
    }
    const changecategory = (e) => {
        setcategory(e.target.value)
    }
    const submit = () => {
        if (localStorage.getItem('id')) {
            editdata()
        } else {
            adddata()

        }

    }
    const editdata = () => {

        let id = localStorage.getItem('id')
        let data = JSON.parse(localStorage.getItem('newproject'))

        console.log('data', data)

        let objIndex = data.findIndex((obj => obj.id === id));
        console.log(objIndex)
        if (objIndex !== -1) {
            data[objIndex].Title = title
            data[objIndex].Description = description
            data[objIndex].Price = price
            data[objIndex].thumbnail = ImageUrl
            data[objIndex].multiple = SelectedImages
            data[objIndex].Category = category

        }
        settitle(title)
        setprice(description)
        setdescription(price)
        setcategory(category)
        setImageUrl(ImageUrl)
        setSelectedImages(SelectedImages)
        localStorage.setItem('newproject', JSON.stringify(data))
        localStorage.removeItem('id')
        settitle('')
        setprice('')
        setdescription('')
        setcategory('')
        setImageUrl('')
        setSelectedImages([])

    }


    const adddata = () => {
        let obj = {
            Title: title,
            Description: description,
            Price: price,
            thumbnail: ImageUrl,
            multiple: SelectedImages,
            Category: category,
            id: Date.now()
        }
        a.push(obj)
        setdata(a)
        settitle(title)
        setprice(description)
        setdescription(price)
        setcategory(category)
        setImageUrl(ImageUrl)
        setSelectedImages(SelectedImages)

        localStorage.setItem('newproject', JSON.stringify(a))

        settitle('')
        setprice('')
        setdescription('')
        setcategory('')
        setImageUrl('')
        setSelectedImages([])

    }
    return (
        <>
            <Dashboard>

                <div id="addproduct ">
                    <div className="vv"><br></br>
                        <label for='title'>Title</label><input id='title' type="text" name='Title' value={title} onChange={changetitle}></input><br></br><br></br>
                        <label for='description'>Description </label><br></br><textarea rows={5} cols={30} id='description' type="text" name='Description' value={description} onChange={changedescription}></textarea><br></br><br></br>
                        <label for='thumbnail'>Thumbnail </label><input id='thumbnail' type='file' name='thumbnail' onChange={handleImageChange}></input>

                        {ImageUrl && <img width={20} src={ImageUrl} alt="Selected Image" />}
                        <br></br><br></br>
                        <label for='price'>Price </label><input id='price' type="number" name='Price' value={price} onChange={changeprice}></input><br></br><br></br>
                        <label for='category'>category </label>
                        <select id='category' name="Category" onChange={changecategory}>

                            <option value='T-shirt'>T-shirt</option>
                            <option value='shoes'>shoes</option>
                            <option value='watch'>watch</option>
                            <option value='saree'>Saree</option>
                        </select><br></br><br></br>
                        <label for='thumbnail2'>Image Here</label><input id='thumbnail2' type='file' multiple name='multiple' onChange={changethumbnail2}></input>
                        {SelectedImages.length > 0 &&
                            SelectedImages.map((image, index) => (
                                <img key={index} width={20} src={image} alt={`Selected Image ${index}`} />
                            ))}
                        <br></br><br></br>
                        < button onClick={submit}>submit </button>
                        <ToastContainer />
                    </div>


                </div>
            </Dashboard>
        </>
    )
};
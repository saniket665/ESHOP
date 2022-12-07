import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {fs,storage} from "../../Config/Firebase"
import Alert from '@mui/material/Alert';
import "./AddProducts.css";
import { Collections } from '@mui/icons-material';


const AddProducts = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
    const handleImage = (file) => {
        if(file) {
            if(file && types.includes(file.type)) {
                setImage(file);
                setImageError('');
            }
            else {
                setImageError("Please select a valid image type(png or jpg)");
                setTimeout(() => {
                    setImageError("");
                }, 3000)
            }
        }
        else {
            setImageError("Please select a image");
            setTimeout(() => {
                setImageError("");
            }, 3000)
        }
    } 
    const handleSubmit = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`Product/${image.name}`).put(image);
        uploadTask.on("state_changed", fn1, fn2, fn3);
        function fn1(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done.`);
        }
        function fn2(err) {
            setError(err);
            setTimeout(()=>{
                setError("");
            }, 3000)
            return;
        }
        function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                console.log(url);
                let obj = {
                    title: title,
                    desc: desc,
                    price: Number(price), 
                    url: url
                }
                fs.collection('Products').add(obj).then(() => {
                    setSuccess("Product is successfully added");
                    setTitle("");
                    setDesc("");
                    setPrice("");
                    setImage("");
                    // document.getElementById("image").value = "";
                    setError("");
                    setTimeout(() => {
                        setSuccess("");
                    }, 3000)
                }).catch((err) => {
                    setError(err);
                    setTimeout(() => {
                        setError("");
                    }, 3000)
                })
            })
        }
    }
  return (
    <div className="add-products-container">
        <form onSubmit={handleSubmit}>
            <div className="title">
                <h2>Add Products</h2>
                <hr />
            </div>
            <>{error && <Alert severity="error">{error}</Alert>}</>
            <>{success && <Alert severity="success">{success}</Alert>}</>
            <label htmlFor="">Product Title</label>
            <TextField id="outlined-basic" variant="outlined" margin="dense" fullWidth={true} size="small" type="text" value={title} onChange = {(e) => setTitle(e.target.value)} required />
            <label htmlFor="">Product Description</label>
            <TextField id="outlined-basic" variant="outlined" margin="dense" fullWidth={true} size="small" type="text" value={desc} onChange={(e) => setDesc(e.target.value)} reqiured />
            <label htmlFor="">Product Price</label>
            <TextField id="outlined-basic" variant="outlined" margin="dense" fullWidth={true} size="small" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <label>Product Image</label>
            <TextField id="outlined-basic image" accept="video/*" variant="outlined" margin="dense" fullWidth={true} size="small" type="file" onChange={(e) => handleImage(e.target.files[0])} required />
            {imageError && <Alert severity="error">{imageError}</Alert>}
            <Button variant="contained" margin="dense" style={{marginTop: "1rem"}} type="submit">Submit</Button>
        </form>
    </div>
  )
}

export default AddProducts;
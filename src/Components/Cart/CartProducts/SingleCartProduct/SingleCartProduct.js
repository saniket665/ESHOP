import React from 'react';
import Button from '@mui/material/Button';
import "../../../Home/Products/SingleProduct/SingleProduct.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./SingleCartProduct.css";
import { auth, fs } from '../../../../Config/Firebase';

const SingleCartProduct = ({prod, increaseCartProduct, decreaseCartProduct}) => {
    console.log("single called");
    console.log(prod);
    const handleIncreaseCartProduct = () => {
        console.log("called");
        increaseCartProduct(prod);
    }
    const handleDecreaseCartProduct = () => {
        console.log("decreament called");
        decreaseCartProduct(prod);
    }
    const handleCartProductDelete = () => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                fs.collection('Cart ' + user.uid).doc(prod.Id).delete().then(() => {
                    console.log("successfully deleted");
                })
            }
        })
    }
  return (
    <div className="product-card cart-product">
        <div className="product-img">
            <img src={prod.url} alt=""/>
        </div>
        <div className="product-title">{prod.title}</div>
        <div className="product-description">{prod.desc}</div>
        <div className="product-price">₹ {prod.price}</div>
        <div className="product-qty">
            <div className="qty-title">Qty: </div>
            <div className="qty-box">
                <AddIcon style={{cursor: "pointer"}} onClick={handleIncreaseCartProduct} />
                <div className="qty">{prod.qty}</div>
                <RemoveIcon style={{cursor: "pointer"}} onClick={handleDecreaseCartProduct} />
            </div>
        </div>
        <div className="product-title">₹ {prod.totalProductPrice}</div>
        <Button variant="contained" style={{marginTop: "0.7rem", marginBottom: "0.5rem"}} color="error" size="medium" onClick={handleCartProductDelete} >Delete</Button>
    </div>
  )
}

export default SingleCartProduct;
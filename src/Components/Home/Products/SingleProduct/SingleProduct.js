import React from 'react';
import Button from '@mui/material/Button';
import "./SingleProduct.css";
import { useNavigate } from "react-router-dom";

const SingleProduct = ({singleProd, addToCart, user}) => {
    const navigate = useNavigate();
    const handleAddToCart = () => {
      if(user != null) {
          addToCart(singleProd);
      }
      else {
        navigate("/login");
      }
    }
  return (
    <div className="product-card">
        <div className="product-img">
            <img src={singleProd.url} alt="" />
        </div>
        <div className="product-title">{singleProd.title}</div>
        <div className="product-description">{singleProd.desc}</div>
        <div className="product-price">₹ {singleProd.price}</div>
        <Button variant="contained" style={{marginTop: "0.7rem", marginBottom: "0.5rem"}} onClick={handleAddToCart}>ADD TO CART</Button>
    </div>
  )
}

export default SingleProduct;
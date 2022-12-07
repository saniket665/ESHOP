import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from "react-router-dom";
import "./CartSummary.css";
import { coupons } from '../../../Coupons';

const CartSummary = ({cartProducts, handleStripeSuccess}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [revertPrice] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [coupon, setCoupon] = useState('');
    useEffect(() => {
        let calcPrice = 0;
        let calcProd = 0;
        if(cartProducts.length > 0) {
            cartProducts.map(product => {
                calcPrice += product.totalProductPrice;
                calcProd += product.qty;
            })
        }
        setTotalPrice(calcPrice);
        setTotalProducts(calcProd);
    }, [cartProducts])
    const handleStripe = () => {
        handleStripeSuccess();
        setTimeout(() => {
            navigate("/");
        }, 3000)
    }
    const handleApply = () => {
        const couponm = coupon.trim().toUpperCase();
        console.log(couponm);
        let cd = coupons[couponm];
        if(cd === undefined) {
            setFail(true);
            setLoading(false);
            setSuccess(false);
        }
        else {
            setLoading(false);
            setFail(false);
            setSuccess(true);
            let discount = (totalPrice/100)*(cd.discount);
            let discountPrice = totalPrice-discount;
            setOldPrice(totalPrice);
            setTotalPrice(discountPrice);
        }
        setCoupon('');
    }
    const handleRevert = () => {
        setTotalPrice(oldPrice);
        setOldPrice(0);
        setLoading(true);
        setSuccess(false);
        setFail(false);
    }
    const handleAgain = () => {
        setLoading(true);
        setSuccess(false);
        setFail(false);
    }
  return (
    <div className="cart-summary-container">
            <div className="summary-title">Cart Summary</div>
            <div className="text summary-sub">Total No of Products: <span>{totalProducts}</span></div>
            <div className="text summary-sub">Total Price: <span>Rs {totalPrice}</span></div>
            {
                loading === true ? 
                <div className="coupon-container"> 
                    <TextField id="standard-basic" label="Enter Coupon Code" variant="standard" size="medium" value={coupon} onChange={(e) => setCoupon(e.target.value)} style={{width: "75%"}} />
                    <Button variant="outlined" size="medium" style={{width: "25%"}} onClick={handleApply} >Apply</Button>
                </div> :
                <>
                <>
                {
                    success === true && 
                    <>
                    <div className="text success-text">Coupon is Applied!</div>
                    <div className="btn">
                        <Button variant="contained" size="medium" style={{width: "auto"}} color="error" onClick={handleRevert}>Revert</Button>
                    </div>
                    </>
                }
                </>
                <>
                {
                    fail === true && 
                    <>
                        <div className="text error-text">Wrong Coupon Code!</div>
                        <div className="btn">
                            <Button variant="contained" size="medium" color="error" onClick={handleAgain}>Try Again!</Button>
                        </div>
                    </>
                }
                </>
            </>
        }
        <StripeCheckout
        stripeKey='pk_test_51KYWD4SFkN10dHavaYgA4IxquOOxIosyI0BGosDMKm2BQZ94VlQ7gXTVyMyoefTURUpbWUlx48QVyQmWx36rLHtF00q3DLWoUb'
        billingAddress
        shippingAddress
        name='EShop'
        amount={(totalPrice * 100)/77.93}
        token={handleStripe}
        style={{marginTop: "0.5rem", width: "100%"}}
        >
        </StripeCheckout>
    </div> 
    )
}

export default CartSummary;
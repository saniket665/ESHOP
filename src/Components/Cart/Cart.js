import React, { useEffect, useState } from 'react';
import { auth, fs } from "../../Config/Firebase";
import Navbar from '../Home/Navbar/Navbar';
import CartProducts from './CartProducts/CartProducts';
import CartSummary from './CartSummary/CartSummary';
import Success from './Success';
import CircularProgress from '@mui/material/CircularProgress';
import "./Cart.css"

const Cart = () => {
    const [user, setUser] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("user auth");
        auth.onAuthStateChanged(user => {
            if(user) {
                fs.collection('users').doc(user.uid).get().then(snapshot => {
                    setUser(snapshot.data().FullName);
                })
            }
            else {
                setUser(null);
            }
        })
    }, [])
    useEffect(() => {
        setLoading(true);
        console.log("product useEffect");
        auth.onAuthStateChanged(user => {
            if(user) {
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot => {
                    const products = snapshot.docs.map(doc => ({
                        Id: doc.id,
                        ...doc.data(),
                    }
                    ));
                    setCartProducts(products);
                });
            }
        })
        setLoading(false);
    }, [])
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if(user) {
            fs.collection('Cart ' + user.uid).onSnapshot((snapshot) => {
              setCartCount(snapshot.docs.length);
            })
          }
        })
      }, [])
    let Product;
    const increaseCartProduct = (prod) => {
        console.log("increase called");
        Product = prod;
        Product.qty = Product.qty+1;
        Product.totalProductPrice = Product.qty*Product.price;
        console.log(cartProducts);
        auth.onAuthStateChanged((user) => {
            if(user) {
                fs.collection('Cart ' + user.uid).doc(prod.Id).update(Product).then(() => {
                    console.log("increamented");
                })
            }
        })
    }
    const decreaseCartProduct = (prod) => {
        console.log("decrease called");
        Product = prod;
        if(Product.qty > 1) {
            Product.qty = Product.qty-1;
            Product.totalProductPrice = Product.qty*Product.price;
            auth.onAuthStateChanged((user) => {
                if(user) {
                    fs.collection('Cart ' + user.uid).doc(prod.Id).update(Product).then(() => {
                        console.log("decreamented");
                    })
                }
            })
        }
    }
    const handleStripeSuccess = () => {
        setPaymentSuccess(true);
        auth.onAuthStateChanged((user) => {
            if(user) {
                fs.collection('Cart ' + user.uid).get().then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        fs.collection('Cart ' + user.uid).doc(doc.id).delete();
                    })
                });
            }
        })    
    }
  return (
    <div>
        <Navbar user={user} cartCount={cartCount} />
        {
            paymentSuccess === true ? 
            <Success /> :
            <>
            {
                loading === true ? <CircularProgress /> : 
                <>
                {
                    cartProducts.length > 0 ? 
                    <div className="cart-container">
                        <h2 className="cart-title">Cart</h2>
                        <div className="cart-products-summary">
                            <div className="cart-products">
                                <CartProducts cartProducts={cartProducts} increaseCartProduct={increaseCartProduct} decreaseCartProduct={decreaseCartProduct} />
                            </div>
                            <div className="cart-summary">
                                <CartSummary cartProducts={cartProducts} handleStripeSuccess={handleStripeSuccess} />
                            </div>
                        </div>
                    </div> : 
                    <div className="cart-container">
                        <h2 className="empty-text">Cart is Empty</h2>
                    </div>
                }
            </>
        }
        </>
    }
    </div>
  )
}

export default Cart
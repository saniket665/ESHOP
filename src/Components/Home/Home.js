import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Products from './Products/Products';
import { auth, fs } from "../../Config/Firebase";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [uid, setUid] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUid(user.uid);
        fs.collection('users').doc(user.uid).get().then(snapshot => {
          setUser(snapshot.data().FullName);
        })
      }
      else {
        setUser(null);
      }
    })
  }, [])
  const getProductsFromDB = async() => {
    const prods = await fs.collection('Products').get();
    let productArr = [];
    console.log(products.docs);
    prods.docs.map((single) => {
      let product = single.data();
      product.id = single.id;
      productArr.push(product);
      if(productArr.length === prods.docs.length) {
        setProducts(productArr);
      }
    })
  }
  useEffect(() => {
    getProductsFromDB();
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
  const addToCart = (product) => {
    if(uid != null) {
      Product = product;
      Product["qty"] = 1;
      Product["totalProductPrice"] = Product.qty*Product.price;
      fs.collection('Cart ' + uid).doc(Product.id).set(Product).then(() => {
        console.log("Product added to cart");
      })
    }
    else {
      console.log("not added");
    }
  }
  return (
    <>
    <Navbar user={user} cartCount={cartCount} />
    {
      products.length > 0 ? 
      <div className="products-container">
      <div className="products-title">All Products</div>
      <div className="products">
        <Products products={products} addToCart={addToCart} user={user} /> 
      </div>
      </div> :
      <h2>Please Wait...</h2>
    } 
    </>
  )
}

export default Home
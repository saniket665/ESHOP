import React from 'react'
import SingleCartProduct from './SingleCartProduct/SingleCartProduct';
const CartProducts = ({cartProducts, increaseCartProduct, decreaseCartProduct}) => {
    console.log(cartProducts);
  return (
    cartProducts.map((prod) => (
        <SingleCartProduct prod={prod} key={prod.Id} increaseCartProduct={increaseCartProduct} decreaseCartProduct={decreaseCartProduct} />
    ))
  )
}

export default CartProducts;
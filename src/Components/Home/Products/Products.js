import React from 'react';
import SingleProduct from './SingleProduct/SingleProduct';

const Products = ({products, addToCart, user}) => {
  console.log(products)
  return (
    products.map((singleProd) => (
      <SingleProduct key={singleProd.id} singleProd = {singleProd} addToCart={addToCart} user={user} />
    ))
  )
}

export default Products
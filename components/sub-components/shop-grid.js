import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './product-card';
 
export default function ShopGrid(props){ 
  let products = useSelector(({products}) => products.shop);
  let productsMap = products.map(product => (
    <ProductCard theme='light' key={product.node.id} data={product.node} />
  ))
  return (
    <div className='flex flex-wrap justify-between pl-10 pr-5'>
      {productsMap}
   </div>
   )
 }
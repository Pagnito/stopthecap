import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './product-card';
 
export default function ShopGrid(props){ 
  let products = useSelector(({products}) => products.shop);
  let productsMap = products.map(product => (
    <ProductCard theme='light' key={product.node.id} data={product.node} />
  ))
  return (
    <div className='grid justify-start grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3  xl:gap-x-8 pl-10 pr-5'>
      {productsMap}
   </div>
   )
 }
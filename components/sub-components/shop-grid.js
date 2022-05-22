import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './product-card';
 
export default function ShopGrid(props){ 
  let products = useSelector(({products}) => products.shop);
  let productsMap = products.map(product => (
    <ProductCard dimensions="xxs:w-28 xs:w-48 sm:w-60 md:w-72 lg:w-11/12 xl:w-72" theme='light' key={product.node.id} data={product.node} />
  ))
  return (
    <div className='grid justify-start grid-cols-1 xxs:gap-y-6 sm:gap-y-10 gap-x-6 xxs:grid-cols-2 lg:grid-cols-3  xl:gap-x-8 xxs:px-1 sm:px-5 lg:pl-10 '>
      {products.length > 0 ? productsMap : 'Products failed to load'}
   </div>
   )
 }
import React from 'react';
import { useSelector } from 'react-redux';
import HeroOne from './hero';
import HeroTwo from './hero-two';

export default function Wrapper() {
  const featuredProducts = useSelector(({ products }) => products.featuredProducts);
  const Heroes = featuredProducts.slice(0,2).map((product, ind) => {
    return ind%2===0 ? <HeroOne product={product.node} /> : <HeroTwo product={product.node}/>
  })
  return (
    <div className="bg-white clip-path-one">
      {Heroes}
    </div>

  )
}

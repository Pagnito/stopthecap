import Home from "./home/home";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import products from "../shopify/product";
import wrapper from "../store";

function Body(props) {
  useEffect(() => {
    console.log(props.app)
  })
  return (
    <>
      <Home />
    </>
  );
}

export default Body;

// export const getStaticProps = async () => {
//   let { fetchCollection } = products;
//   try {
//     let collection = await fetchCollection('ADIDAS');
//     store.dispatch({ type: 'FEATURED_PRODUCTS', payload: collection});
//   } catch (err) {
//     console.log(err)
//   }
// };

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   let { fetchCollection } = useProducts();
//   try {
//     let collection = await fetchCollection('ADIDAS');
//     store.dispatch({ type: 'FEATURED_PRODUCTS', payload: collection});
//   } catch (err) {
//     console.log(err)
//   }
// });

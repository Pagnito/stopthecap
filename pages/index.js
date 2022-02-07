import Home from "./home/home";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import useProducts from "../shopify/product";
import wrapper from "../store";

function Body(props) {

  return (
    <>
      <Home />
    </>
  );
}
function stateToProps(state) {
  return {
    products: state.products,
  };
}
export default connect(stateToProps, null)(Body);

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  let { fetchCollection } = useProducts();
  try {
    let collection = await fetchCollection('ADIDAS');
    store.dispatch({ type: 'FEATURED_PRODUCTS', payload: collection});
  } catch (err) {
    console.log(err)
  }
});

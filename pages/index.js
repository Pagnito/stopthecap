import Home from "./home/home";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import products from "../shopify/product";



function Body(props) {
  return (
    <>
       
      <Home />
      
    </>
  );
}

export default Body;

export const getStaticProps = async () => {
  let { fetchCollection } = products;
  try {
    let collection = await fetchCollection('ADIDAS');
    return {
      props: {
        initialReduxState: {
          products: {
            features: {
              topProducts: collection
            }
          }
        }
      }
    }
    // store.dispatch({ type: 'FEATURED_PRODUCTS', payload: collection});
  } catch (err) {
    console.log(err)
  }
};

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   let { fetchCollection } = useProducts();
//   try {
//     let collection = await fetchCollection('ADIDAS');
//     store.dispatch({ type: 'FEATURED_PRODUCTS', payload: collection});
//   } catch (err) {
//     console.log(err)
//   }
// });

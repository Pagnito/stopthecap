import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Organizer from '../components/Organizer';
import Home from './home/home';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

function Body(props) {

  // let topProducts = props.products.features.topProducts.products.edges;
  // let featuredCollections = props.products.features.tripleBannerFeatures
  return (
    <>
      <Home/>
    </>
  )
  
}
// function stateToProps(state) {
//   return {
//     products: state.products
//   }
// }
// export default connect(stateToProps, null)(Home)

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   try {
//     let pr = await Promise.all([getCollectionImages("VANS", "NIKE", "SUPRA"), getFeaturedCollection("VANS")]);
//     let collections = pr[0];
//     let topProducts = pr[1];
//     store.dispatch({ type: 'HOME_TRIPLE_BANNER_FEATURES', payload: collections })
//     store.dispatch({ type: 'HOME_TOP_PRODUCTS', payload: topProducts })
//   } catch (err) {
//     console.log(err)
//   }
// });
export default Body;
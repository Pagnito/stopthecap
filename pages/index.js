import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Home from "./home/home";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";

const EdgyCarousel = dynamic(() =>
  import("../components/landing-carousel/edgy-landing-carousel")
);
const Incentives = dynamic(() => import("../components/banner-row/incentives"));
const FeaturedProduct = dynamic(() =>
  import("../components/featured-product/hero")
);
const FeaturedCollection = dynamic(() =>
  import("../components/featured-collection/edgy-featured-collection")
);
const AutoPlayVideoHero = dynamic(() =>
  import("../components/video/auto-play")
);
const Newsletter = dynamic(() =>
  import("../components/newsletter/edgy-newsletter")
);

function Body(props) {
  const { observe, unobserve, inView, scrollDirection, entry } = useInView({
    // threshold: 0.25, // Default is 0
    onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]
      console.log(inView)
    },
    onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
      console.log(entry)
      unobserve()
      // Triggered when the target enters the viewport
    },
    // onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
    //   // Triggered when the target leaves the viewport
    // },
    // More useful options...
  });
  // let topProducts = props.products.features.topProducts.products.edges;
  // let featuredCollections = props.products.features.tripleBannerFeatures
  return (
    <div ref={observe} className="home ">
      <EdgyCarousel />
      {inView && <Incentives />}
      {inView && <FeaturedProduct />}
      <FeaturedCollection />
      <AutoPlayVideoHero />
      {inView && <Newsletter />}
    </div>
  );
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

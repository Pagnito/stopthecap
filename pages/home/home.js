import React, { useEffect } from "react";
import dynamic from "next/dynamic";
// import useInView from "react-cool-inview";
import EdgyHeader from "../../components/sections/header/edgy-transparent";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// const EdgyCarousel = dynamic(() => import("../../components/landing-carousel/edgy-landing-carousel"));
const Landing = dynamic(() => import('../../components/sections/landing-carousel/slides/slide-one'));
const Incentives = dynamic(() => import("../../components/sections/incentives/incentives"));
// const FeaturedProduct = dynamic(() => import("../../components/sections/featured-product/hero"));
// const FeaturedProductTwo = dynamic(() => import("../../components/sections/featured-product/hero-two"));
const ModelDisplay = dynamic(() => import("../../components/sections/model-display/model-display"));
// const FeaturedProducts = dynamic(() => import("../../components/sections/featured-product/wrapper"));
const TopProductsCollectionCards = dynamic(() => import("../../components/sections/featured-collection/classic-featured-collection"));
const AutoPlayVideoHero = dynamic(() => import("../../components/sections/video/auto-play"));
const Newsletter = dynamic(() => import("../../components/sections/newsletter/edgy-newsletter"));

// import EdgyCarousel from "../../components/landing-carousel/edgy-landing-carousel";
// import Incentives from "../../components/banner-row/incentives";
// import FeaturedProduct from "../../components/featured-product/hero";
// import FeaturedCollection from "../../components/featured-collection/classic-featured-collection";
// import AutoPlayVideoHero from "../../components/video/auto-play";
// import Newsletter from "../../components/newsletter/edgy-newsletter";
// import { connect} from "react-redux";



function Home(props) {
  return (
    <div className="home">
      <EdgyHeader />
      <Landing />
      <ModelDisplay />
      {/* <FeaturedProducts /> */}
      <TopProductsCollectionCards />
      <AutoPlayVideoHero />
      <Incentives />

      <Newsletter />
    </div>
  );
}

// function stateToProps(state) {
//   return {
//     app: state.app,
//   };
// }
export default Home;

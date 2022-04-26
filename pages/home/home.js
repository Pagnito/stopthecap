import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";
import EdgyHeader from "../../components/header/edgy-transparent";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const EdgyCarousel = dynamic(() => import("../../components/landing-carousel/edgy-landing-carousel"));
const Incentives = dynamic(() => import("../../components/incentives/incentives"));
const FeaturedProduct = dynamic(() => import("../../components/featured-product/hero"));
const FeaturedCollection = dynamic(() => import("../../components/featured-collection/classic-featured-collection"));
const AutoPlayVideoHero = dynamic(() => import("../../components/video/auto-play"));
const Newsletter = dynamic(() => import("../../components/newsletter/edgy-newsletter"));

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
      <EdgyCarousel />
      <Incentives />
      <FeaturedProduct />
      <FeaturedCollection />
      <AutoPlayVideoHero />
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

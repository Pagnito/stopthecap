import React from "react";
import EdgyCarousel from "../../components/landing-carousel/edgy";
import Incentives from "../../components/banner-row/incentives";
import FeaturedProduct from "../../components/featured-product/hero";
import FeaturedCollection from "../../components/featured-collection/edgy";
import AutoPlayVideoHero from "../../components/video/auto-play";
export default function Home(props) {
  
  return (
    <div className="home ">
      <EdgyCarousel />
      <Incentives />
      <FeaturedProduct />
      <FeaturedCollection />
      {/* <AutoPlayVideoHero /> */}
    </div>
  );
}

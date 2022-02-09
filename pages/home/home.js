import React from "react";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";

// const EdgyCarousel = dynamic(() => import("../../components/landing-carousel/edgy-landing-carousel"));
// const Incentives = dynamic(() => import("../../components/banner-row/incentives"));
// const FeaturedProduct = dynamic(() => import("../../components/featured-product/hero"));
// const FeaturedCollection = dynamic(() => import("../../components/featured-collection/edgy-featured-collection"));
// const AutoPlayVideoHero = dynamic(() => import("../../components/video/auto-play"));
// const Newsletter = dynamic(() => import("../../components/newsletter/edgy-newsletter"));

import EdgyCarousel from "../../components/landing-carousel/edgy-landing-carousel";
import Incentives from "../../components/banner-row/incentives";
import FeaturedProduct from "../../components/featured-product/hero";
import FeaturedCollection from "../../components/featured-collection/edgy-featured-collection";
import AutoPlayVideoHero from "../../components/video/auto-play";
import Newsletter from "../../components/newsletter/edgy-newsletter";

export default function Home(props) {


  return (
    <div className="home">
      <EdgyCarousel />
      <Incentives />
      <FeaturedProduct />
      <FeaturedCollection />
      <AutoPlayVideoHero />
      <Newsletter />
    </div>
  );
}

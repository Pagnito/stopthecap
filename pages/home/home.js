import React from "react";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";

const EdgyCarousel = dynamic(() => import("../../components/landing-carousel/edgy-landing-carousel"));
const Incentives = dynamic(() => import("../../components/banner-row/incentives"));
const FeaturedProduct = dynamic(() => import("../../components/featured-product/hero"));
const FeaturedCollection = dynamic(() => import("../../components/featured-collection/edgy-featured-collection"));
const AutoPlayVideoHero = dynamic(() => import("../../components/video/auto-play"));
const Newsletter = dynamic(() => import("../../components/newsletter/edgy-newsletter"));

// import EdgyCarousel from "../../components/landing-carousel/edgy-landing-carousel";
// import Incentives from "../../components/banner-row/incentives";
// import FeaturedProduct from "../../components/featured-product/hero";
// import FeaturedCollection from "../../components/featured-collection/edgy-featured-collection";
// import AutoPlayVideoHero from "../../components/video/auto-play";
// import Newsletter from "../../components/newsletter/edgy-newsletter";

export default function Home(props) {
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
  console.log(inView)

  return (
    <div ref={observe} className="home ">
      {inView && <EdgyCarousel /> }
      {inView &&<Incentives />}
      {inView && <FeaturedProduct />}
      {inView && <FeaturedCollection />}
      {inView&& <AutoPlayVideoHero /> }
      {inView && <Newsletter />}
    </div>
  );
}

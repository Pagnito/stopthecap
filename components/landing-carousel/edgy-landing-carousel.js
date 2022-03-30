import React from "react";
import SlideOne from "./slides/slide-one";
import VideoSlide from "./slides/video-slide";
import { app } from "../../app.config";
import dynamic from "next/dynamic";
import { Carousel } from "react-responsive-carousel";
const SlideTwo = dynamic(() => import("./slides/slide-two"));

export default function EdgyCarousel() {
  let slides = () => {
    return app.layout.data.carousel.slides.map((obj) => {
      return obj.type === "one" ? (
        <SlideOne key={obj.type} data={obj} />
      ) : (
        <VideoSlide url={'/videos/video-two.mp4'} key={obj.type} data={obj} />
      );
    });
  };
  let couraselIndicator = (handler, isSelected, index, label) => {
    return (
      <div
        onClick={handler}
        value={index}
        key={index}
        role="button"
        onKeyDown={handler}
        className={`${
          isSelected ? "bg-red-500 w-6" : "bg-white w-3"
        }  h-3 inline-block transition-all cursor-pointer border-red-500 border-solid  border-2 rounded-xl ml-2 mb-2`}
      ></div>
    );
  };

  return (
    <div className="relative top-0">
      <Carousel
        autoPlay
        renderIndicator={couraselIndicator}
        showStatus={false}
        showThumbs={false}
        animationHandler={""}
        infiniteLoop={true}
        interval={10000}
      >
        {slides()}
      </Carousel>
    </div>
  );
}

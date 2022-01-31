import React from "react";
import SlideOne from "./slides/slide-one";
import { app } from "../../app.config";
import dynamic from "next/dynamic";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const SlideTwo = dynamic(() => import("./slides/slide-two"));

export default function EdgyCarousel() {
  let slides = () => {
    return app.layout.data.carousel.slides.map((obj) => {
      return obj.type === "one" ? (
        <SlideOne key={obj.type} data={obj} />
      ) : (
        <SlideTwo key={obj.type} data={obj} />
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
    <div className="absolute top-0">
      <Carousel
        autoPlay
        renderIndicator={couraselIndicator}
        showStatus={false}
        swipeable={true}
        showThumbs={false}
        animationHandler={""}
        infiniteLoop={true}
      >
        {slides()}
      </Carousel>
    </div>
  );
}

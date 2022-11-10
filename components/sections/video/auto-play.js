import React from "react";

export default function AutoPlayVideoHero(props) {
  props = {
    text_one: "OUR GEAR POPS",
    text_two: "Check out some influences who love our gear.",
    text_three: "",
    button: "Learn More",
  };
  return (
    <div className="h-screen-3/4 w-full overflow-hidden flex items-center relative">
      <div className="w-full h-full flex md:justify-end xxs:justify-center items-end xxs:p-10 sm:p-20">
        <div className="lg:w-1/3 md:w-1/2 flex-col flex xxs:text-center md:text-left xxs:items-center md:items-start">
          <div className="text-red-500 xxs:text-xl lg:text-2xl">{props.text_one}</div>
          <div className="text-white xxs:text-3xl lg:text-4xl mt-4 font-serif">{props.text_two}</div>
          <button className="hover:bg-red-500 transition-colors cursor-pointer mt-7 pt-4 pb-4 pl-8 pr-8 text-white md:self-start text-lg border-solid border-red-500 border-2 rounded">
            {props.button}
          </button>
        </div>
      </div>

      <video
        width="400"
        autoPlay={true}
        muted={true}
        loop={true}
        className="fixed top-0 h-screen w-full object-cover -z-10"
      >
        <source
          src="/videos/fashion-video.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

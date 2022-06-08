import React from "react";
import Image from 'next/image'
import { RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

export default function About(props) {
  return (
    <div className="min-h-screen w-full relative box-border lg:px-40 flex flex-col justify-center items-center">
      <Image src="/images/fashion-two.jpg" alt="Fashion" loading="eager" layout="fill" objectFit="cover" className="blur-sm scale-110" />

      {/* <div className="mt-32 text-5xl ml-32 text-shadow text-white">About Us</div> */}
      {/* <div className="animate-width-open w-0 h-screen-2/3 mt-32 box-border flex flex-col items-center justify-center relative">
        <video autoPlay={true} muted={true} loop={true} className="w-full absolute h-full  shadow-xl rounded object-cover ">
          <source src={"/videos/video-one.mp4"} type="video/mp4" />
        </video>
      </div> */}
      <div className="animate-down opacity-0 translate-y-10  xxs:w-11/12 md:w-full flex sm:flex-col xxs:flex-col-reverse">
        <div className="sm:mt-20 border-2 xxs:mb-10 sm:mb-0 rounded w-full sm:p-10 xxs:p-5">
          <div className="text-2xl text-white">About Us</div>
          <div className="text-red-500 mt-5">Bringing Truth To Market</div>
          <div className="text-white font-rajdhani-md font-bold text-md xxs:leading-6 lg:leading-7 mt-5">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {`We are a small business focused on bringing some truth to the market and helping the everyday person get the bang for their buck.
          When I first started out in e-commerce, I realized a lot of it is based on many lies. So many e-commerce stores try to paint a picture 
          that they are a business when they are not and that they have great shipping times when they don't. People are out to make a quick buck
          at your expense, they will portray, say and do whatever needed to get you to submit that order. They advertise products using
          existing chinese advertisements which are a lot of times edited to make the product look good. When you actually get the product,
          its terrible. I, like any other person, want to create an income for myself but also provide real value, so I decided that I will vet
          every product that I sell and make sure that my customers get good products. And I will also let you know about other widely 
          advertised products and if they are worth buying. `}
          </div>
        </div>
        <div className="p-10 flex justify-center items-center xxs:mt-20 sm:mt-10 sm:mb-10">
          <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-white xxs:mx-3 sm:mx-5 lg:mx-10">
            <FaFacebookF color="white" size="23px" />
          </div>
          <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-white xxs:mx-3 sm:mx-5 lg:mx-10">
            <RiInstagramFill color="white" size="25px" />
          </div>
          <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-white xxs:mx-3 sm:mx-5 lg:mx-10">
            <RiYoutubeFill color="white" size="28px" />
          </div>
          <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-white xxs:mx-3 sm:mx-5 lg:mx-10">
            <FaTiktok color="white" size="20px" />
          </div>
        </div>
      </div>
    </div>
  );
}

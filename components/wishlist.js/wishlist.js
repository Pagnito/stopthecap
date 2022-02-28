import React from "react";
import { RiCloseFill } from "react-icons/ri";
export default function Wishlist(props) {
  return (
    <div className="fixed z-40 top-0 flex flex-col justify-center items-center h-screen w-full p-20">
      <div onClick={props.hideWishlistModal} className="cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5">
        <RiCloseFill size="50px" color="white" />
      </div>
      <div className="w-0 h-full z-50 bg-white animate-width-open"></div>
      <div className="flex fixed top-0 w-full h-screen">
        <div className="bg-black z-40 opacity-60 w-1/2 -translate-x-full animate-doors-close"></div>
        <div className="bg-black z-40 opacity-60 w-1/2 translate-x-full animate-doors-close"></div>
      </div>
    </div>
  );
}

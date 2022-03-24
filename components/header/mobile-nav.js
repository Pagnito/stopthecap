import React, { createRef, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function MobileNav(props) {
  return (
    <div className="fixed z-40 top-0 flex flex-col justify-center bg-white items-center h-screen w-full">
      <div onClick={props.closeMobileNav} className="cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5">
        <RiCloseFill size="50px" color="white" />
      </div>

      <div className="w-3/4 z-50 flex justify-center">
        <div>Home</div>
        <div>Contact</div>
        <div>About</div>
        <div>Shop</div>

      </div>
    </div>
  );
}

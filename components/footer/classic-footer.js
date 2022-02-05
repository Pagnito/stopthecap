import React from "react";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
} from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
export default function Footer(props) {
  return (
    <div className=" bg-theme-blue lg:pt-20 lg:pl-20 lg:pr-20">
      <div className="flex lg:flex-row xxs:flex-col-reverse xxs:items-center lg:items-start justify-between">
        <div className="text-white flex lg:flex-row xxs:flex-col">
          <div>
            <h1 className="text-2xl text-red-500">Info</h1>
            <ul>
              <li className="hover:text-red-500">Terms And Conditions</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Shipping And Delivery</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Returns</li>
            </ul>
          </div>
          <div className="lg:ml-16 xxs:mt-10 lg:mt-0">
            <h1 className="text-2xl text-red-500">Menu</h1>
            <ul>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Home</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">About</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Shop</li>
            </ul>
          </div>
          <div className="lg:ml-16 xxs:mt-10 lg:mt-0">
            <h1 className="text-2xl text-red-500">Additional Links</h1>
            <ul>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Track Your Order</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Wishlist</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">FAQs</li>
            </ul>
          </div>
        </div>
        <div className="flex h-32 flex-col justify-between xxs:mt-5 lg:mt-0">
          <div className="flex">
            <div>
              <RiFacebookBoxFill
                className="mr-5"
                color="white"
                size="30px"
              />
            </div>
            <div>
              <RiInstagramFill className="mr-5" color="white" size="30px" />
            </div>
            <div>
              <RiYoutubeFill className="mr-5" color="white" size="33px" />
            </div>
            <div>
              <FaTiktok className="mr-5" color="white" size="25px" />
            </div>
          </div>
          <div className="text-white xxs:mb-10 lg:mb-0">info@stopthecap.com</div>
        </div>
      </div>

      <div className="text-white w-full text-center p-5 mt-10 text-xs">
        © 2022 StopTheCap
      </div>
    </div>
  );
}

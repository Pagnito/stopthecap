import React from "react";
import {useSelector} from 'react-redux';
import { RiCheckFill } from "react-icons/ri";
import config from "../../../app.config";
import { Image } from "next/image";
import Link from "next/link";
export default function FeaturedProduct(props) {
  let texts = config.app.data.featured_product;
  let featuredProduct = useSelector(({products}) => products.featuredProduct);
  let image = featuredProduct ? featuredProduct.images.edges[0].node.originalSrc : null;
  let handle = featuredProduct ? featuredProduct.handle : null;
  return (
    <div className="xxs:flex-col-reverse lg:flex-row flex xxs:items-center xxs:p-5 md:p-20 z-20 w-full -mt-3 clip-path-one bg-white">
      <div className="flex text-left flex-col items-center xxs:w-full md:w-1/2 md:ml-10">
        <div className="flex flex-col justify-start">
          <div className="xxs:text-3xl lg:text-4xl">{texts.text_one}</div>
          <div className="xxs:text-5xl lg:text-8xl text-red-500">{texts.text_two}</div>
          <div className="xxs:text-xl lg:text-2xl">{texts.text_three}</div>
          <ul className="pl-5">
            <li className="mt-5 flex">
              <RiCheckFill color="EF4444" size="20px" className="mr-1 mt-0.5" />
              {texts.feature_one}
            </li>
            <li className="mt-5 flex">
              <RiCheckFill color="EF4444" size="20px" className="mr-1 mt-0.5" />
              {texts.feature_two}
            </li>
            <li className="mt-5 flex">
              <RiCheckFill color="EF4444" size="20px" className="mr-1 mt-0.5" />
              {texts.featuure_three}
            </li>
          </ul>
          <Link href={`/product/${handle}`} passHref>
            <div className="hover:bg-red-500 transition-colors cursor-pointer mt-7 pt-4 pb-4 pl-8 pr-8 text-theme-blue self-start text-lg border-solid border-red-500 border-2 rounded">
              Buy Now
            </div>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center xxs:mt-20 md:mt-0 md:w-1/2">
        <img src={image} className="" />
      </div>
    </div>
  );
}

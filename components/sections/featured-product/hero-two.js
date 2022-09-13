import React from "react";
import Image from "next/image";
import Link from "next/link";
import useProduct from "../../../use/useProduct";

export default function FeaturedProduct({ product }) {
  let image = product.images.edges[0].node.transformedSrc;
  let handle = product.handle;
  let price = product.priceRange.minVariantPrice.amount;
  let { formatter } = useProduct();
  return (
    <div className="xxs:flex-col lg:flex-row flex xxs:items-center  z-30 w-full  xxs:h-screen-double lg:h-screen-4/5">
      <div className="flex justify-center flex-col items-center xxs:mt-20 md:mt-0 md:w-1/2 lg:p-32 xxs:p-10">
        <img src={image} className="" />
        <div className="text-2xl mt-2">
          {formatter.format(price)}
        </div>
        <Link href={`/product/${handle}`} passHref>
          <div className="hover:bg-red-500 transition-colors cursor-pointer mt-3 pt-4 pb-4 pl-8 pr-8 text-theme-blue  text-lg border-solid border-red-500 border-2 rounded">
            Buy Now
          </div>
        </Link>

      </div>
      <div className="flex text-left flex-col items-center xxs:w-full lg:w-2/3 h-full relative">
        <div className="w-full h-full relative clip-path-five self-start ">
          <Image layout="fill" objectFit="cover" src="/images/fashion-six.jpg" ></Image>
        </div>
      </div>

    </div>
  );
}

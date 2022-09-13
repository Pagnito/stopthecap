import React from "react";
import Image from "next/image";
import Link from "next/link";
import useProduct from "../../../use/useProduct";
export default function FeaturedProduct({ product }) {
  let image = product.images.edges[0].node.transformedSrc;
  console.log(product)
  let handle = product.handle;
  let price = product.priceRange.minVariantPrice.amount;
  let { formatter } = useProduct();
  return (
    <div className="xxs:flex-col-reverse lg:flex-row flex xxs:items-center xxs:h-screen-double lg:h-screen-4/5 z-20 w-full -mt-3">
      <div className="flex text-left flex-col items-center xxs:w-full lg:w-2/3 h-full relative">
        <div className="w-full h-full relative clip-path-four self-start">
          <Image layout="fill" objectFit="cover" src="/images/fashion-four.jpg" ></Image>
        </div>

      </div>
      <div className="flex justify-center items-center flex-col xxs:mt-20 md:mt-0 md:w-1/2 lg:p-32 xxs:p-10">
        <img src={image} className="" />
        <div className="text-2xl mt-1">
          {formatter.format(price)}
        </div>
        <Link href={`/product/${handle}`} passHref>
          <div className="hover:bg-red-500 transition-colors cursor-pointer mt-3 pt-4 pb-4 pl-8 pr-8 text-theme-blue  text-lg border-solid border-red-500 border-2 rounded">
            Buy Now
          </div>
        </Link>
    
      </div>
    </div>
  );
}


{/* <div className="flex flex-col justify-start">

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

</div> */}
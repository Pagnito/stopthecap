import React from "react";
import useProduct from "../../use/useProduct";

export default function SearchedProduct({ product }) {
  let {formatter} = useProduct();
  let image = product.images.edges[0].node.originalSrc;

  return (
    <div className="p-5 w-full rounded bg-white cursor-pointer hover:pl-10 hover:border-red-500 border-4 border-white transition-all">
      <div  className={`flex justify-between`}>
        <div className="flex">
          <img src={image} className="w-24 h-24" />
          <div className="pl-5 flex flex-col justify-between">
            <p className="text-md ">{product.title}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
        <p className="mt-1 text-sm ">{formatter.format(product.priceRange.minVariantPrice.amount)}</p>

        </div>
      </div>
    </div>
  );
}
import React, { useEffect } from "react";
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setWishlist } from "../../actions/products/products-actions";
import useProduct from "../../use/useProduct";
import Link from "next/link";
import router from "next/router";
import { toggleWishlist } from "../../actions/app/app-actions";
export default function Wishlist(props) {
  let dispatch = useDispatch();
  let wishlist = useSelector(({ products }) => products.wishlist) || [];
  let { formatter, searchWishlist } = useProduct();
  useEffect(() => {
    dispatch(setWishlist());
  }, []);

  let pushToProduct = (handle) => {
    dispatch(toggleWishlist());
    router.push("/product/" + handle);
  };
  let list = () => {
    return wishlist.map((product) => {
      let image = product.images.edges[0].node.originalSrc || product.images.edges[0].node.transformedSrc;
      return (
        <div
          onClick={() => pushToProduct(product.handle)}
          key={product.id}
          className="p-5 cursor-pointer hover:bg-zinc-100 transition-colors"
        >
          <img className="" src={image}></img>
          <div>{product.title}</div>
          <div className="text-red-500 text-sm">{formatter.format(product.variants.edges[0].node.priceV2.amount)}</div>
        </div>
      );
    });
  };
  return (
    <div className="fixed z-40 top-0 flex flex-col justify-center items-center h-screen w-full p-20">
      <div onClick={props.hideWishlistModal} className="cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5">
        <RiCloseFill size="50px" color="white" />
      </div>
      <div className="w-0 h-full z-50 bg-white animate-width-open overflow-y-scroll overflow-x-hidden rounded">
        <div className="animate-down opacity-0 -translate-y-5 p-10">
          <div className="flex items-center sticky top-5 bg-white">
            <input onChange={(e) => searchWishlist(e.target.value)} placeholder="Search products..." className="text-sm border-2 z-30 border-theme-blue rounded h-10 pl-3" />

            <div className="absolute bg-white w-full flex items-center justify-center">
              <Image
                alt="Brand Logo"
                width={80}
                height={80}
                className="m-1 cursor-pointer"
                src="/images/StopTheCapLogo-Black.png"
                objectFit="contain"
              />
            </div>
          </div>
          <div className=" mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-x-8">
            {list()}
          </div>
        </div>
      </div>
      <div className="flex fixed top-0 w-full h-screen">
        <div className="bg-black z-40 opacity-80 w-1/2 -translate-x-full animate-doors-close"></div>
        <div className="bg-black z-40 opacity-80 w-1/2 translate-x-full animate-doors-close"></div>
      </div>
    </div>
  );
}

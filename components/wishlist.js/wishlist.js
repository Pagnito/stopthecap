import React, { useEffect } from "react";
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import router from "next/router";
import { toggleWishlist } from "../../actions/app/app-actions";
import { removeFromWishList } from "../../actions/cart/cart-actions";
import { GoTrashcan } from "react-icons/go";
import useCart from "../../use/useCart";
import useProduct from "../../use/useProduct";

export default function Wishlist(props) {
  let dispatch = useDispatch();
  let wishlist = useSelector(({ cart }) => cart.wishlist) || [];
  let { searchWishlist } = useCart();
  let { formatter } = useProduct();

  let pushToProduct = (handle) => {
    dispatch(toggleWishlist());
    router.push("/product/" + handle);
  };

  let list = () => {
    return wishlist.map((product) => {
      let image = product.images.edges[0].node.originalSrc || product.images.edges[0].node.transformedSrc;
      return (
        <div key={product.id} className="sm:p-5 xxs:p-2 cursor-pointer hover:bg-zinc-100 transition-colors">
          <img className="" onClick={() => pushToProduct(product.handle)} src={image}></img>
          <div className="truncate">{product.title}</div>
          <div className="flex justify-between w-full items-center">
            <div className="text-red-500 text-sm">{formatter.format(product.variants.edges[0].node.priceV2.amount)}</div>
            <div onClick={() => dispatch(removeFromWishList(product.id))}>
              <GoTrashcan className="hover:text-red-500 hover:scale-125 transition-all" size="18px" color="black" />
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="fixed z-40 top-0 flex flex-col justify-center items-center h-screen w-full xxs:p-0 lg:p-20">
      <div
        onClick={props.hideWishlistModal}
        className="xxs:text-black lg:text-white cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5"
      >
        <RiCloseFill size="35px" />
      </div>
      <div className="w-0 h-full z-40 bg-white animate-width-open overflow-y-scroll overflow-x-hidden rounded">
        <div className="animate-down opacity-0 -translate-y-5 xxs:p-5 sm:p-10">
          <div className="flex xxs:flex-col-reverse lg:flex-row items-center sticky top-5">
            <input
              onChange={(e) => searchWishlist(e.target.value)}
              placeholder="Search products..."
              className="text-sm border-2 z-30 border-theme-blue rounded h-10 pl-3"
            />

            <div className="absolute bg-white w-full flex items-center justify-center xxs:hidden lg:flex">
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
          {wishlist.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 xxs:grid-cols-2 sm:grid-cols-4 2xl:grid-cols-8">{list()}</div>
          ) : (
            <div className="w-full h-56 flex justify-center items-center text-gray-400 z-50">Your Wishlist is empty</div>
          )}
        </div>
      </div>
      <div className="flex fixed top-0 w-full h-screen">
        <div className="bg-black z-40 opacity-80 w-1/2 -translate-x-full animate-doors-close"></div>
        <div className="bg-black z-40 opacity-80 w-1/2 translate-x-full animate-doors-close"></div>
      </div>
    </div>
  );
}

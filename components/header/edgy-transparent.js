import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiShoppingBagLine, RiHeartLine, RiSearchLine } from "react-icons/ri";
import { toggleSearch, toggleCart, toggleWishlist } from "../../actions/app/app-actions";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const EdgyTransparentHeader = (props) => {
  let app = useSelector((state) => state.app);
  let dispatch = useDispatch();
  let [cartItemsAmount, setCartItemsAmount] = useState(0);
  let cart = useSelector((state) => state.cart);
  useEffect(() => {
    setCartItemsAmount(cart.items.length);
  }, [cart.items]);

  return (
    <header className="z-10 w-full bg-gray-dark flex justify-between absolute">
      <div className="flex flex-col w-1/3">
        <div className="animate-down opacity-0 -translate-y-3 xxs:w-1/3 sm:w-1/5 transition-colors  cursor-pointer flex border-l-2  border-solid border-red-500 hover:text-white text-red-500 p-2 m-4">
          <div className="">USD</div>
          <div className="ml-2 font-super-bold -rotate-90 font-xs">{"<"}</div>
        </div>
        <div className="flex xxs:hidden md:flex text-white ml-12 mt-10 transition-opacity flex-col">
          <div className="self-start">
            <Link href="/" passHref>
              <div className="animate-link-one opacity-0 -translate-x-2 mt-3 cursor-pointer hover:text-red-500 transition-colors">
                01 . Home
              </div>
            </Link>
          </div>

          <div className="self-start">
            <Link href="/about" passHref>
              <div className="animate-link-two opacity-0 -translate-x-2 mt-3 cursor-pointer hover:text-red-500 transition-colors">
                02. About
              </div>
            </Link>
          </div>
          <div className="self-start">
            <Link href="/contact" passHref>
              <div className="animate-link-three opacity-0 -translate-x-2 mt-3 cursor-pointer hover:text-red-500 transition-colors">
                03. Contact
              </div>
            </Link>
          </div>
          <div className="self-start">
            <Link href="/shop" passHref>
              <div className="animate-link-four opacity-0 -translate-x-2 mt-3 cursor-pointer hover:text-red-500 transition-colors">
                04. Shop
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center sm:w-1/3">
        {/* ${app.searchVisible || app.cartVisible || app.wishlistVisible || app.quickViewVisible ? 'pr-10px' : ''} */}
        <div className={` mt-2 xxs:hidden md:block opacity-0 stamp-animate`}>
          <Image
            alt="Brand Logo"
            width={110}
            height={110}
            className="m-1 cursor-pointer"
            src="/images/StopTheCap-Favicon-White.png"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="sm:w-1/3">
        {/* ${app.searchVisible || app.cartVisible || app.wishlistVisible || app.quickViewVisible ? 'pr-14px' : ''}  */}
        <div className={`flex animate-down opacity-0 -translate-y-3 justify-end align-middle xxs:pr-1`}>
          <div onClick={() => dispatch(toggleSearch())} className="mt-5 mr-7">
            <RiSearchLine className="my-icon-style" color="white" size="25px" />
          </div>
          <div className="mt-5 mr-7 my-icon-style">
            <RiHeartLine onClick={() => dispatch(toggleWishlist())} className="my-icon-style-heart" color="white" size="25px" />
          </div>
          <div className="mt-5 mr-7">
            <div className="mr-3 flex relative">
              {cartItemsAmount > 0 ? (
                <div
                  onClick={() => dispatch(toggleCart())}
                  className="cursor-pointer absolute flex z-10 border-white border-solid border-2 justify-center items-center h-5 w-5 text-white line-h-.5 bg-red-500 rounded-full text-xs -right-5 -top-1"
                >
                  {cartItemsAmount}
                </div>
              ) : (
                false
              )}
            </div>
            <RiShoppingBagLine onClick={() => dispatch(toggleCart())} className="my-icon-style" color="white" size="25px" />
          </div>

          {/* <div className="m-10"></div> */}
        </div>
      </div>
    </header>
  );
};

// function stateToProps(state){
//   return {
//     app: state.app
//   }
// }

export default EdgyTransparentHeader;

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { connect, useDispatch } from "react-redux";
import { addToCartAction } from "../../actions/cart/cart-actions";
import { setQuickviewProduct } from "../../actions/product/product-actions";
import { addToWishList, removeFromWishList } from "../../actions/cart/cart-actions";
import { toggleProductQuickView } from "../../actions/app/app-actions";
import useCart from "../../use/useCart";
import Options from "./product-card-options";
import useReview from "../../use/useReview";
import useProduct from "../../use/useProduct";
import * as fbp from '../../util/fbpixel';

function ProductCard(props) {
  let title = props.data.title;
  let image = props.data.images.edges[0].node.transformedSrc || props.data.images.edges[0].node.originalSrc;
  let handle = props.data.handle;
  let dispatch = useDispatch();
  let cart = props.cart;
  let theme = props.theme;
  let dimensions = props.dimensions;
  let { isItOnWishlist } = useCart();
  let { formatter } = useProduct();
  let { calcOverview } = useReview();
  let price = formatter.format(props.data.variants.edges[0].node.priceV2.amount);
  let reviewOverview = useMemo(() => calcOverview(props.data.reviews || []));
  let available = props.data.totalInventory > 0;
  let [option, setOption] = useState({
    name: null,
    value: null,
  });
  useEffect(() => {
    if (option.value && option.name) {
      dispatch(selectVariantActionPC(option, props.data));
    }
  }, [option, dispatch, props.data]);

  let addToCart = () => {
    dispatch(addToCartAction(props.product.selectedVariant, cart.items));
  };

  let openQuickview = () => {
    dispatch(toggleProductQuickView());
    dispatch(setQuickviewProduct(props.data));
  };
  let onWishlist = isItOnWishlist(props.data.id);

  const addToOrRemoveFromWishlist = (data) => {
    if(onWishlist) {
      dispatch(removeFromWishList(data.id));
    } else {
      fbp.event('Add To Wishlist', {title});
      dispatch(addToWishList(data))
    }
  }
  return (
    <div className={`relative flex flex-col items-center ${theme === "light" ? "" : "transition-transform hover:scale-105"}`}>
      <div className={`${dimensions} flex justify-center`}>
        <div className={`max-w-md w-full ${theme === "light" ? "bg-white" : "bg-theme-blue shadow-lg p-4"} rounded-xl`}>
          <div className="flex flex-col">
            <div className="">
              <div className="relative w-full mb-3">
                <Link href={`/product/${handle}`} passHref>
                  <div className="cursor-pointer w-full absolute bottom-0 xxs:h-3/5 sm:h-4/5 z-30"></div>
                </Link>
                <div className="w-full pb-100% rounded-lg overflow-hidden relative bg-white">
                  <Image src={image} alt={props.data.title} layout="fill" objectFit="cover" className={`rounded-lg`} />
                </div>
                <div className="absolute flex flex-col -top-1 right-0 xxs:p-1 sm:p-3">
                  <button
                    onClick={() => addToOrRemoveFromWishlist(props.data)}
                    className={`transition ease-in  hover:text-red-600 ${
                      onWishlist ? "text-red-600" : "text-red-400"
                    } rounded-full  text-center p-1`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="xxs:w-5 xxs:h-5 xs:w-7 xs:h-7"
                      fill={onWishlist ? "#DC2626" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                {/* <img src={image} alt={props.data.title} className={`max-w-full object-fill rounded-xl ${theme==='light' ? '': ''}`} /> */}
                {/* <div className="xxs:h-20 xs:h-32 sm:h-40 md:h-60 lg:h-44 xl:h-60 h-"> */}
             
              </div>
              <div className="flex-auto justify-evenly">
                <div className="flex flex-wrap ">
                  <div className="w-full flex-none text-sm flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-400 whitespace-nowrap mr-3 sm:text-xs text-xxs">{reviewOverview.average ? reviewOverview.average : 'No Reviews'}</span>
                    {/* <span className="mr-2 text-gray-400">India</span> */}
                  </div>
                  <div className="flex items-center w-full justify-between min-w-0 ">
                    <Link href={`/product/${handle}`} passHref>
                      <h2
                        className={`${
                          theme === "light" ? "text-theme-blue" : "text-gray-300"
                        } xxs:text-xs sm:text-lg mr-auto cursor-pointer hover:text-green-500 truncate`}
                      >
                        {title}
                      </h2>
                    </Link>
                  </div>
                  {available ? <div className="flex items-center bg-green-400 text-white text-xs px-2 py-1 mt-1 rounded">IN STOCK</div> :
                  <div className="flex items-center bg-red-500 text-white text-xs px-2 py-1 mt-1 rounded">SOLD OUT</div>}
                </div>
                <div
                  className={`xxs:text-md sm:text-xl text-white font-semibold mt-1 ${theme === "light" ? "text-red-500" : "text-white"}`}
                >
                  {price}
                </div>
                {/* <Options setOption={setOption} options={optionsArrays} selected={props.product} product={props.data} /> */}
                <div className="flex space-x-2 text-sm font-medium justify-start">
                  {/* <button
                    onClick={addToCart}
                    className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-red-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-red-600 "
                  >
                    <span>Add Cart</span>
                  </button> */}
                  <div className="w-full flex justify-center">
                    <button
                      onClick={openQuickview}
                      className={`transition-all xxs:mt-2 sm:mt-5 ease-in duration-300  border-2 ${
                        theme === "light" ? "border-black" : "border-white"
                      }
                       hover:text-white  hover:scale-110 hover:shadow-lg text-gray-400 rounded-full xxs:w-7 xxs:h-7 xs:w-9 xs:h-9 text-center xxs:p-1 sm:p-2`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=""
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={`${theme === "light" ? "black" : "white"}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function stateToProps(state) {
  return {
    cart: state.cart,
    product: state.product.productCard,
  };
}
export default connect(stateToProps, null)(ProductCard);

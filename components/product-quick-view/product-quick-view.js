import React, { useEffect } from "react";
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useProduct from "../../use/useProduct";
import router from "next/router";
import ProductOptions from "../sub-components/pdp-product-options";
import ProductCarousel from "../sub-components/product-carousel";
import ReviewStars from "../sub-components/reviews-stars";
import useReview from "../../use/useReview";
import { addToCartAction } from "../../actions/cart/cart-actions";
import { selectVariantActionQV } from "../../actions/product/product-actions";

export default function Wishlist(props) {
  let dispatch = useDispatch();
  let { organizeOptions, determinePrimaryOptionIndex, filterVariantsByOption_ColorPrimary, formatter } = useProduct();
  let { calcOverview } = useReview();
  let cart = useSelector(({ cart }) => cart);
  let selectedVariant = useSelector(({ product }) => product.productQuickview.selectedVariant);
  let viewedProduct = useSelector(({ product }) => product.productQuickview.selectedProduct);
  let variants = viewedProduct.variants.edges;
  let carouselOptions = filterVariantsByOption_ColorPrimary(variants);
  let primaryOptionIndex = determinePrimaryOptionIndex(selectedVariant.selectedOptions);
  let organizedOptions = organizeOptions(variants, primaryOptionIndex);
  let reviewOverview = calcOverview(props.reviews);
  let title = viewedProduct.title;
  let price = formatter.format(selectedVariant.priceV2.amount);
  let description = viewedProduct.description;
  let variantsExist = viewedProduct.variants.edges.length > 1 ? true : false;
  function addToCart(variant) {
    dispatch(addToCartAction(variant, cart));
  }
  function selectVariant(variant) {
    dispatch(selectVariantActionQV(variant));
  }
  return (
    <div className="fixed z-40 top-0 flex flex-col justify-center items-center h-screen w-full lg:p-20">
      <div onClick={props.hideQuickView} className="cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5">
        <RiCloseFill size="50px" color="white" />
      </div>
      <div className="w-0 min-h-full z-50 bg-white animate-width-open overflow-y-scroll overflow-x-hidden lg:rounded">
        <div className="flex w-full min-h-full lg:p-10 xxs:pt-0 lg:pt-10 xxs:p-5 mt-3 xxs:flex-col lg:flex-row max-w-screen-2xl -translate-y-5 opacity-0 animate-down">
          <div onClick={props.hideQuickView} className="lg:hidden cursor-pointer z-50 scale-0 animate-close-x absolute top-0 right-5">
            <RiCloseFill size="50px" color="black" />
          </div>
          <div className="images lg:w-1/2 xxs:w-full">
            <div className="w-full xxs:h-96 lg:h-full lg:p-10">
              <ProductCarousel
                options={carouselOptions}
                primaryOptionIndex={primaryOptionIndex}
                selectedVariant={selectedVariant}
                selectVariant={selectVariant}
              />
            </div>
          </div>
          <div className="description lg:mt-0 lg:p-10 lg:w-1/2">
            <div className="breadcrumbs text-xs">{`Home > Car Gadgets > ${title}`}</div>
            <div className="mt-5 text-2xl font-bold">{title}</div>
            <div className="mt-5 text-xs font-light text-gray-400">{`SKU: ${selectedVariant.sku}`}</div>
            <div className="mt-5 text-4xl text-red-500 font-bold">{price}</div>
            {viewedProduct.reviews ? (
              <div className="mt-2 flex items-center">
                <ReviewStars rating={reviewOverview.average} />
                <span className="text-gray-600 ml-3 text-xs mt-2">{`${viewedProduct.reviews.length} reviews`}</span>
              </div>
            ) : (
              false
            )}
            <div className="mt-5 text-xs">{description}</div>
            {variantsExist ? (
              <ProductOptions
                addToCart={addToCart}
                primaryOptionIndex={primaryOptionIndex}
                options={organizedOptions}
                selectedVariant={selectedVariant}
                selectVariant={selectVariant}
                product={props}
              />
            ) : (
              false
            )}
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

// import styles from './product.module.css';

import shopify from "../../shopify/shopify-funcs";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { connect, useDispatch } from "react-redux";
import { selectVariantAction } from "../../actions/product/product-actions";
import { addToCartAction } from "../../actions/cart/cart-actions";
import ProductCarousel from "../../components/sub-components/product-carousel";
import ReviewStars from "../../components/sub-components/reviews-stars";
import PdpProductOptions from "../../components/sub-components/pdp-product-options";
import PdpImageGrid from "../../components/sub-components/pdp-image-grid";
import PdpCollapsibles from "../../components/sub-components/pdp-collapsibles";
import Recommendations from "../../components/recommendations/recommendations";
import htmlParser from "html-react-parser";
import { formatter } from "../../util/toUSD";
import Newsletter from "../../components/newsletter/edgy-newsletter";
import Reviews from "../../components/sub-components/reviews";
import useProduct from "../../use/useProduct";

function ProductPage(props) {
  useEffect(() => {
    document.body.firstChild.firstChild.scrollTo(0, 0);
  }, []);
  let dispatch = useDispatch();

  function addToCart(variant) {
    dispatch(addToCartAction(variant, props.cart));
  }
  function selectVariant(variant) {
    dispatch(selectVariantAction(variant));
  }

  let { organizeOptions, determinePrimaryOptionIndex, filterVariantsByOption_ColorPrimary } = useProduct();
  let variants = props.product.product.variants.edges;
  let title = props.product.product.title;
  let selected = props.product.selectedVariant;
  let price = formatter.format(selected.priceV2.amount);
  let description = htmlParser(props.product.product.descriptionHtml);
  let images = props.product.product.images.edges.map((obj) => obj.node.originalSrc);
  let variantsExist = props.product.product.variantsExist;
  let carouselOptions = filterVariantsByOption_ColorPrimary(variants);
  let primaryOptionIndex = determinePrimaryOptionIndex(selected.selectedOptions);
  let organizedOptions = useMemo(() => organizeOptions(variants, primaryOptionIndex));

  return (
    <div>
      <div className="mt-classic-header xxs:px-5 lg:px-0 ">
        <div className="flex flex-col items-center">
          <div className="flex w-2/3 justify-center items-center -mt-1">
            <div className="mr-5 h-2px bg-theme-blue w-1/3 rounded-full"></div>
            <Link href="/" passHref>
              <div>
                <Image
                  alt="Brand Logo"
                  width={100}
                  height={100}
                  className="m-1 cursor-pointer"
                  src="/images/StopTheCapLogo-Black.png"
                  objectFit="contain"
                />
              </div>
            </Link>

            <div className="ml-5 h-2px bg-theme-blue w-1/3 rounded-full"></div>
          </div>
          <div className="flex w-full h-full  mt-3 xxs:flex-col lg:flex-row max-w-screen-2xl">
            <div className="images lg:w-1/2 xxs:w-full">
              <div className="w-full xxs:h-96 lg:h-full lg:p-10">
                <ProductCarousel
                  options={carouselOptions}
                  primaryOptionIndex={primaryOptionIndex}
                  selectedVariant={selected}
                  selectVariant={selectVariant}
                />
              </div>
            </div>
            <div className="description lg:mt-0 xxs:mt-12 lg:p-10 lg:w-1/2">
              <div className="breadcrumbs text-xs">{`Home > Car Gadgets > ${title}`}</div>
              <div className="mt-5 text-2xl font-bold">{title}</div>
              <div className="mt-5 text-xs font-light text-gray-400">{`SKU: ${selected.sku}`}</div>
              <div className="mt-5 text-4xl text-red-500 font-bold">{price}</div>
              <ReviewStars />
              <div className="mt-5 text-xs">{description}</div>
              {variantsExist ? (
                <PdpProductOptions
                  addToCart={addToCart}
                  primaryOptionIndex={primaryOptionIndex}
                  options={organizedOptions}
                  selectedVariant={selected}
                  selectVariant={selectVariant}
                  product={props.product.product}
                />
              ) : (
                false
              )}
              {/* <div className="flex mt-8">
                <QuantityPicker setQuantity={setQuantity} quantity={quantity} />
                <button onClick={() => addToCart(selected)} className="rounded transition-colors hover:bg-green-500 bg-red-500 pl-10 pr-10 ml-3 text-white">
                  Add To Cart
                </button>
              </div> */}
              {/* <div className="h-2px bg-black rounded-full mt-6"></div> */}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col mt-5 items-center">
          <div className="flex xxs:flex-col w-full  lg:flex-row max-w-screen-2xl">
            <div className="xxs:w-full lg:w-1/2 px-10">
              <PdpImageGrid images={images} />
            </div>
            <div className="lg:w-1/2 xxs:w-full xxs:mt-10 lg:mt-0 lg:pl-10 lg:pr-10">
              <PdpCollapsibles description={description} />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center mt-40">
            <div className="max-w-screen-2xl px-40">
              <Reviews />
            </div>
          </div>
        </div>
        <div className="related products">
          <Recommendations />
        </div>
      </div>
      {/* <Newsletter /> */}
    </div>
  );
}

function stateToProps(state) {
  return {
    product: state.products.productPage,
    selectedVariant: state.products.productPage.selectedVariant,
    app: state.app,
    cart: state.cart,
  };
}
export default connect(stateToProps, null)(ProductPage);

export const getStaticProps = async ({ params }) => {
  const product = await shopify.getProduct(params.product);
  const recommendations = await shopify.getProductRecommendationsById(product.id);
  product.variantsExist = product.variants.edges.length > 1 ? true : false;
  let firstVariant = product.variants.edges[0].node;
  firstVariant.carouselIndex = 0;
  return {
    props: {
      initialReduxState: {
        products: {
          features: {
            recommendations,
          },
          productPage: {
            product: product,
            selectedVariant: firstVariant,
          },
          productCard: {
            selectedProduct: null,
            selectedVariant: null,
          },
        },
      },
    },
  };
};

export async function getStaticPaths() {
  const products = await shopify.recursiveCatalog();
  const paths = products.map((item) => {
    const product = String(item.node.handle);
    return {
      params: { product },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

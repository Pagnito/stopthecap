// import styles from './product.module.css';

import shopify from "../../shopify/shopify-funcs";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { connect, useDispatch } from "react-redux";
import { selectVariantAction } from "../../actions/product/product-actions";
import ProductCarousel from "../../components/sub-components/product-carousel";
import Reviews from "../../components/sub-components/reviews-stars";
import QuantityPicker from "../../components/sub-components/quantity-picker";
import PdpProductOptions from "../../components/sub-components/pdp-product-options";
import findOptionsIndexInShopifyResponse from "../../util/findVariantOptionIndex";
import PdpImageGrid from "../../components/sub-components/pdp-image-grid";
import PdpCollapsibles from "../../components/sub-components/pdp-collapsibles";
import Recommendations from "../../components/recommendations/recommendations";
import htmlParser from "html-react-parser";
import Newsletter from "../../components/newsletter/edgy-newsletter";
import { filterOptionsIntoArrays } from "../../util/filterOptionsIntoArrays";
import CartModal from "../../components/cart/drawer-cart";
import SearchModal from "../../components/sub-components/search-modal";
import { toggleSearch, toggleCart } from "../../actions/app/app-actions";

function ProductPage(props) {
  useEffect(() => {
    document.body.firstChild.firstChild.scrollTo(0, 0);
  }, []);
  let dispatch = useDispatch();

  function selectVariant(variant) {
    dispatch(selectVariantAction(variant));
  }
  let variants = props.product.product.variants.edges;
  let title = props.product.product.title;
  let selected = props.product.selectedVariant;
  let description = htmlParser(props.product.product.descriptionHtml);

  let images = props.product.product.images.edges.map((obj) => obj.node.originalSrc);
  let variantsExist = props.product.product.variantsExist;
  let primaryOptionExist = props.product.product.primaryOptionExist;
  let primaryOption = "color";
  let primaryOptionIndex = findOptionsIndexInShopifyResponse(variants[0].node.selectedOptions)[primaryOption];

  function filterByPrimaryOption(variants) {
    if (variantsExist && primaryOptionExist) {
      let primaryOptionArray = {};
      variants.map(({ node }) => {
        if (!primaryOptionArray[node.selectedOptions[primaryOptionIndex].value]) {
          primaryOptionArray[node.selectedOptions[primaryOptionIndex].value] = node;
        }
      });
      return primaryOptionArray;
    }
  }

  let optionsArrays = useMemo(() => filterOptionsIntoArrays(variants, variantsExist));
  let primaryOptionObj = useMemo(() => filterByPrimaryOption(variants));

  return (
    <div>
      {props.app.cartVisible ? <CartModal hideCartModal={() => dispatch(toggleCart())} open={props.app.cartVisible} /> : false}

      {props.app.searchVisible ? <SearchModal hideSearchModal={() => dispatch(toggleSearch())} open={props.app.searchVisible} /> : false}
      <div className="mt-classic-header">
        <div className=" flex flex-col items-center">
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
          <div className="flex w-full h-full mt-3 xxs:flex-col lg:flex-row max-w-screen-2xl">
            <div className="images lg:w-1/2 xxs:w-full">
              <div className="w-full xxs:h-96 lg:h-full lg:p-10">
                {variantsExist ? (
                  <ProductCarousel
                    primaryOptionIndex={primaryOptionIndex}
                    primaryOption={primaryOption}
                    variants={primaryOptionObj}
                    selectedVariant={selected}
                    selectVariant={selectVariant}
                  />
                ) : (
                  <img src={images[0]} alt={title} className=" w-full object-fill rounded" />
                )}
              </div>
            </div>
            <div className="description lg:mt-0 xxs:mt-12 lg:p-10 lg:w-1/2">
              <div className="breadcrumbs text-xs">{`Home > Car Gadgets > ${title}`}</div>
              <div className="mt-5 text-2xl font-bold">{title}</div>
              <div className="mt-5 text-xs font-light text-gray-400">{`SKU: ${selected.sku}`}</div>
              <div className="mt-5 text-4xl text-red-500 font-bold">{"$" + selected.priceV2.amount}</div>
              <Reviews />
              <div className="mt-5 text-xs">{description}</div>
              <PdpProductOptions options={optionsArrays} selectVariant={selectVariant} />
              <div className="flex mt-8">
                <QuantityPicker quantity={5} />
                <button className="rounded bg-red-500 pl-10 pr-10 ml-3 text-white">Add To Cart</button>
              </div>
              {/* <div className="h-2px bg-black rounded-full mt-6"></div> */}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col mt-5 items-center">
          <div className="flex xxs:flex-col lg:flex-row max-w-screen-2xl">
            <div className="xxs:w-full lg:w-1/2 px-10">
              <PdpImageGrid images={images} />
            </div>
            <div className="lg:w-1/2 xxs:w-full xxs:mt-10 lg:mt-0 lg:pl-10 lg:pr-10">
              <PdpCollapsibles description={description} />
            </div>
          </div>
        </div>
        <div className="related products">
          <Recommendations />
        </div>
      </div>
      <Newsletter />
    </div>
  );
}

function stateToProps(state) {
  return {
    product: state.products.productPage,
    selectedVariant: state.products.productPage.selectVariant,
    app: state.app,
  };
}
export default connect(stateToProps, null)(ProductPage);

export const getStaticProps = async ({ params }) => {
  const product = await shopify.getProduct(params.product);
  const recommendations = await shopify.getProductRecommendationsById(product.id);
  product.variantsExist = product.variants.edges.length > 1 ? true : false;
  product.primaryOptionExist = product.variants.edges[0].node.selectedOptions.find((option) => option.name.toLowerCase() === "color");
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

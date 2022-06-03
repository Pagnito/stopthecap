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
import Newsletter from "../../components/newsletter/edgy-newsletter";
import Reviews from "../../components/reviews/reviews";
import useProduct from "../../use/useProduct";
import mongo from "../../use/use-mongo";
import sortArrayByKey from "../../util/sortArrayByKey";
import filterReviewsByProduct from "../../util/filterReviewsByProduct";
import useReview from "../../use/useReview";
import Script from "next/script";

function ProductPage(props) {
  let { calcOverview } = useReview();
  let { organizeOptions, determinePrimaryOptionIndex, filterVariantsByOption_ColorPrimary, formatter } = useProduct();

  let product = props.product.product;
  let product_id = product!==null ? product.id : null;
  let variants = product!==null ? product.variants.edges : null;
  let title = product!==null ? product.title : null;
  let selected = product!==null ? props.product.selectedVariant : null;
  let price = product!==null ? formatter.format(selected.priceV2.amount) : null;
  let description = product!==null ? htmlParser(product.descriptionHtml) : null;
  let mainCollection = product!==null && product.collections.edges.length ? product.collections.edges[0].node.title : null;
  let images = product!==null ? product.images.edges.map((obj) => obj.node.originalSrc) : null;
  // let carouselOptions =  useMemo(() => filterVariantsByOption_ColorPrimary(variants), [variants]);
  // let primaryOptionIndex = useMemo(() => determinePrimaryOptionIndex(selected.selectedOptions, [selected.selectedOptions]));
  // let organizedOptions = useMemo(() => organizeOptions(variants, primaryOptionIndex), [variants]);
  let carouselOptions = product!==null ? filterVariantsByOption_ColorPrimary(variants) : null;
  let primaryOptionIndex = product !== null ? determinePrimaryOptionIndex(selected.selectedOptions) : null;
  let organizedOptions =  product !==null ? organizeOptions(variants, primaryOptionIndex) : null;

  let reviews = props.product.reviews;
  let reviewsSearchSource = props.product.reviewsSearchSource;
  let reviewOverview = useMemo(() => calcOverview(reviews || []) );

  useEffect(() => {
    fbp.pageView();
    document.body.firstChild.firstChild.scrollTo(0, 0);
  }, []);

  let dispatch = useDispatch();

  function addToCart(variant) {
    dispatch(addToCartAction(variant, props.cart));
  }

  function selectVariant(variant) {
    dispatch(selectVariantAction(variant));
  }

  return (
    <div>
       <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbp.FB_PIXEL_ID});
          `,
        }}
      />
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
          {props.product.product ? <div className="flex w-full h-full  mt-3 xxs:flex-col lg:flex-row max-w-screen-2xl">
            <div className="images lg:w-1/2 xxs:w-full">
              <div className="w-full xxs:h-96 lg:h-full lg:p-10">
                <ProductCarousel
                  options={carouselOptions}
                  primaryOptionIndex={primaryOptionIndex}
                  preselected={selected}
                  selectVariant={selectVariant}
                />
              </div>
            </div>
            <div className="description lg:mt-0 xxs:mt-8 lg:p-10 lg:w-1/2">
              <div className="breadcrumbs text-xs">{`Home > ${mainCollection} > ${title}`}</div>
              <div className="mt-5 text-2xl font-bold">{title}</div>
              <div className="mt-5 text-xs font-light text-gray-400">{`SKU: ${selected.sku}`}</div>
              <div className="mt-5 text-4xl text-red-500 font-bold">{price}</div>
              <div className="mt-2 flex items-center">
                <ReviewStars rating={reviewOverview.average} />
                <span className="text-gray-600 ml-3 text-xs mt-2">{`${reviews.length} reviews`}</span>
              </div>
              {/* <div className="mt-5 text-md font-bold font-rajdhani-md">{description}</div> */}
               
                <PdpProductOptions
                  addToCart={addToCart}
                  primaryOptionIndex={primaryOptionIndex}
                  options={organizedOptions}
                  selectedVariant={selected}
                  selectVariant={selectVariant}
                  product={props.product.product}
                />
              
            </div>
          </div> : <div className="h-screen-4/5 flex items-center">Product Failed To Load.</div>}
          
        </div>
        {props.product.product ? <>
      
        <div className="w-full flex flex-col mt-5 items-center">
          <div className="flex xxs:flex-col w-full  lg:flex-row max-w-screen-2xl">
            <div className="xxs:w-full lg:w-1/2 lg:px-10">
              <PdpImageGrid images={images} />
            </div>
            <div className="lg:w-1/2 xxs:w-full xxs:mt-10 lg:mt-0 lg:pl-10 lg:pr-10">
              <PdpCollapsibles reviewOverview={reviewOverview} description={description} />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center xxs:mt-10 lg:mt-40">
            <div className="lg:max-w-screen-2xl w-full lg:px-40 xxs:px-0">
              {reviewsSearchSource.length > 0 ? <Reviews product_id={product_id} reviews={reviews} /> : false}
            </div>
          </div>
        </div>
        <div className="related products">
          <Recommendations />
        </div>
        </> : false}
      </div>
      <Newsletter />
    </div>
  );
}

function stateToProps(state) {
  return {
    product: state.product,
    selectedVariant: state.products.selectedVariant,
    app: state.app,
    cart: state.cart,
  };
}
export default connect(stateToProps, null)(ProductPage);

export const getStaticProps = async ({ params }) => {
  let product;
  let productReviews;
  let recommendations;
  let recommendationsReviews;
  let sortedRecomReviews;
  let firstVariant;
  try {
    product = await shopify.getProduct(params.product);;
    firstVariant = product.variants.edges[0].node;
    firstVariant.carouselIndex = 0;
  } catch(err) {
    product = null;
    firstVariant = null;
  }
  try {
    productReviews = await mongo.getReviewsForProduct(product.handle);
    productReviews = productReviews.map((review) => {
      review._id = review._id.toString();
      review.date = new Date(review.created_at);
      return review;
    });
    productReviews = sortArrayByKey(productReviews, "date", false);
    productReviews = productReviews.map((review) => {
      delete review.date;
      return review;
    });
  } catch(err) {
    productReviews = [];
  }

  try {
    recommendations = await shopify.getProductRecommendationsById(product.id);
    recommendationsReviews = await mongo.getReviewsForProducts(recommendations.map((rec) => rec.handle));
    sortedRecomReviews = filterReviewsByProduct(recommendationsReviews);
    recommendations = recommendations.map((rec) => {
      if(sortedRecomReviews[rec.handle]){
        rec.reviews = sortedRecomReviews[rec.handle];
      }
      return rec;
    });
  } catch (err) {
    recommendations = [];
    recommendationsReviews = [];
  }

  return {
    props: {
      initialReduxState: {
        products: {
          recommendations,
          allProducts: [],
          searchedProducts:[]
        },
        product: {
          product: product,
          selectedVariant: firstVariant,
          reviews: productReviews,
          reviewsSearchSource: productReviews,
          productQuickview: {
            selectedProduct: {},
            selectedVariant: {},
          },
          errors: {}
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

import Home from "./home/home";
import mongo from '../use/use-mongo';
import products from "../shopify/shopify-funcs";
import filterReviewsByProduct from "../util/filterReviewsByProduct";
import appConfig from "../app.config";
import * as fbp from '../util/fbpixel';
import { useEffect } from "react";
import Script from "next/script";
function Body(props) {
  useEffect(() => {
    fbp.pageView();
  }, [])
  return (
    <>
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

      <Home />
    </>
  );
}


export default Body;

export const getStaticProps = async () => {
  let { getCollection, getProduct } = products;
  let featuredProductHandle = appConfig.app.data.featured_product.handle;
  let featuredCollection = appConfig.app.data.featured_collection.collection
  try {
    let collection;
    let collectionReviews;
    let sortedColReviews;
    let featuredProduct;
    try {
      collection = await getCollection(featuredCollection);
      collectionReviews = await mongo.getReviewsForProducts(collection.products.edges.map((rec) => rec.node.handle));
      sortedColReviews = filterReviewsByProduct(collectionReviews);
      collection.products.edges = collection.products.edges.map((rec) => {
        if (sortedColReviews[rec.node.handle]) {
          rec.node.reviews = sortedColReviews[rec.node.handle];
        }
        return rec;
      });
    } catch (err) {
      collection = [];
    }
    try {
      featuredProduct = await getProduct(featuredProductHandle);
    } catch (err) {
      featuredProduct = {};
    }

    return {
      props: {
        initialReduxState: {
          products: {
            topProducts: Object.keys(collection).length > 0 ? collection : [],
            featuredProduct,
            allProducts: [],
            searchedProducts: []
          },
          product: {
            productQuickview: {
              selectedProduct: {},
              selectedVariant: {},
            },
          }
        },
      },
    };
    // store.dispatch({ type: 'FEATURED_PRODUCTS', payload: collection});
  } catch (err) {
    console.log(err);
  }
};

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   let { fetchCollection } = useProducts();
//   try {
//     let collection = await fetchCollection('ADIDAS');
//     store.dispatch({ type: 'FEATURED_PRODUCTS', payload: collection});
//   } catch (err) {
//     console.log(err)
//   }
// });

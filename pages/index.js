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
    fbp.event('Home View', {placeholder: 'placeholder'});
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
  let { getCollection, getCollections } = products;
  const collections = await getCollections();

  let featuredProductsHandle = appConfig.app.data.featured_products.handle;
  let topProducts = appConfig.app.data.featured_collection.collection;
  try {
    let collection;
    let collectionReviews;
    let sortedColReviews;
    let featuredProducts;
    try {
      collection = await getCollection(topProducts);
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
      featuredProducts = await getCollection(featuredProductsHandle);
    } catch (err) {
      featuredProducts = [];
    }
    console.log('hey', featuredProducts.products.edges[0])
    return {
      props: {
        initialReduxState: {
          products: {
            topProducts: Object.keys(collection).length > 0 ? collection : [],
            featuredProducts: featuredProducts ? featuredProducts.products.edges : [],
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

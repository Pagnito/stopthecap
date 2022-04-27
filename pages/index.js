import Home from "./home/home";
import mongo from '../use/use-mongo';
import products from "../shopify/shopify-funcs";
import filterReviewsByProduct from "../util/filterReviewsByProduct";
import appConfig from "../app.config";
function Body(props) {
  return (
    <>
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
      let collection = await getCollection(featuredCollection);
      collectionReviews = await mongo.getReviewsForProducts(collection.products.edges.map((rec) => rec.node.handle));
      sortedColReviews = filterReviewsByProduct(collectionReviews);
      collection.products.edges = collection.products.edges.map((rec) => {
        if(sortedColReviews[rec.node.handle]){
          rec.node.reviews = sortedColReviews[rec.node.handle];
        }
        return rec;
      });
    } catch (err) {
      collection = []
    }
    try {
      featuredProduct = await getProduct(featuredProductHandle);
    } catch (err) {
      featuredProduct = null;
    }

    return {
      props: {
        initialReduxState: {
          products: {
            topProducts: Object.keys(collection).length > 0 ? collection : [],
            featuredProduct,
            allProducts: [],
            searchedProducts:[]
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

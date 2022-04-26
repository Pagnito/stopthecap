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
  try {
    let featuredProduct = await getProduct(featuredProductHandle);
    let collection = await getCollection("ADIDAS");
    let collectionReviews = await mongo.getReviewsForProducts(collection.products.edges.map((rec) => rec.node.handle));
    let sortedColReviews = filterReviewsByProduct(collectionReviews);
    collection.products.edges = collection.products.edges.map((rec) => {
      if(sortedColReviews[rec.node.handle]){
        rec.node.reviews = sortedColReviews[rec.node.handle];
      }
      return rec;
    });
    return {
      props: {
        initialReduxState: {
          products: {
            topProducts: Object.keys(collection).length > 0 ? collection : null,
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

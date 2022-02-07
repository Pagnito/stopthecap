import client from "./shopify-queries";
import queries from './shopify-queries'

async function ShopifyData(query) {
  const URL = `https://stopthecapp.myshopify.com/api/2021-10/graphql.json`

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": "e7f8a502ce01fd0ba1a61f3c50607a88",
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query })
  }

  try {
    const data = await fetch(URL, options).then(response => {
      return response.json();
    })

    return data
  } catch (error) {
    throw new Error("Products not fetched")
  }
}

const useProducts = function () {
  const fetchAllProducts = () => {
    return client.product.fetchAll().then((products) => {
      return products;
    });
  };
  const fetchProduct = function (id) {
    return client.product.fetch(id).then((product) => {
      return product;
    });
  };
  const fetchCollection = async function (name) {
    let collection = await ShopifyData(queries.getCollection('ADIDAS'));
    const data = collection.data.collectionByHandle ? collection.data.collectionByHandle : {}
    return data;
  };
  // const fetchAllCollection = function() {
  //   client.collection.fe
  // }
  return {
    fetchAllProducts,
    fetchProduct,
    fetchCollection,
  };
};

export default useProducts;

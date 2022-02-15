import queries from "./shopify-queries";

async function ShopifyData(query) {
  const URL = `https://stopthecapp.myshopify.com/api/2021-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": "e7f8a502ce01fd0ba1a61f3c50607a88",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

const products = {
  getAllProducts: () => {},
  getProduct: async function (handle) {
    let product= await ShopifyData(queries.getProductByHandle(handle));
    const data = product.data.productByHandle
      ? product.data.productByHandle
      : {};
    return data;
  },
  getCollection: async function (name) {
    let collection = await ShopifyData(queries.getCollection(name));
    const data = collection.data.collectionByHandle
      ? collection.data.collectionByHandle
      : {};
    return data;
  },
  recursiveCatalog: async function(
    cursor = "",
    initialRequest = true
  ) {
    let data;
    let query;
    if (cursor !== "") {
      query = queries.recursiveCatalogWithCursor();
    } else {
      query = queries.recursiveCatalogWithoutCursor();
    }

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;
      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  },

};

export default products;

import queries from "./shopify-queries";
import app from '../app.config';

async function frontStoreShopifyData(query) {
  const URL = app.app.shopify.storeFrontApiUrl;
  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": app.app.shopify.storeFrontAccessToken,
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

async function adminShopifyData(query){
  const URL = app.app.shopify.adminApiUrl;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": app.app.shopify.adminAccessToken,
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
    throw new Error("Data not fetched");
  }
  
}

const products = {
  getAllProducts: async () => {
    let response = await frontStoreShopifyData(queries.getAllProducts());
    const products = response.data.products ? response.data.products : [];
    return products;
  },
  getProduct: async function (handle) {
    let response = await frontStoreShopifyData(queries.getProductByHandle(handle));
    const product = response.data.productByHandle ? response.data.productByHandle : {};
    return product;
  },
  getProductRecommendationsById: async (id) => {
    let response = await frontStoreShopifyData(queries.getProductRecommendationsById(id));
    const recommendations = response.data.productRecommendations ? response.data.productRecommendations : {};
    return recommendations;
  },
  getCollection: async function (name) {
    let response = await frontStoreShopifyData(queries.getCollection(name));
    const collection = response.data.collectionByHandle ? response.data.collectionByHandle : {};
    return collection;
  },
  getCollections: async function () {
    let response = await frontStoreShopifyData(queries.getCollections());
    const collections = response.data.collections ? response.data.collections : {};
    return collections;
  },
  createCheckout: async function (id, quantity) {
    const response = await frontStoreShopifyData(queries.createCheckout(id, quantity));
    const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : [];
    return checkout;
  },
  updateCheckout: async function(id, lineItems) {
    const lineItemsObject = lineItems.map(item => {
      return `{
        variantId: "${item.id}",
        quantity:  ${item.variantQuantity}
      }`
    });
    const response = await frontStoreShopifyData(queries.updateCheckout(id, lineItemsObject));
    const checkout = response.data.checkoutLineItemsReplace.checkout ? response.data.checkoutLineItemsReplace.checkout : []
    return checkout
  },
  createSubscription: async function (email) {
    const response = await frontStoreShopifyData(queries.createSubscription(email, true));
    const success = response.data.customerCreate ? true : false;
    return success;
  },
  getOrdersByEmail: async (email) => {
    const response = await adminShopifyData(queries.getOrdersByEmail(email));
    if(response.errors){
      console.log(response.errors[0])
    } else {
      console.log(response)
    }
   
    // return page
  },
  getPolicy: async (type) => {
    const response = await frontStoreShopifyData(queries.getPolicy(type));
    const policy = response.data.shop;
    console.log(policy)
    return policy
  },
  getDeliveryProfiles: async (id) => {
    const response = await adminShopifyData(queries.getDeliveryProfile());
    // if(response.errors){
    //   console.log(response.errors[0])
    // } else {
    //   console.log(response.data.deliveryProfiles.edges)
    // }
  },
  recursiveCatalog: async function (cursor = "", initialRequest = true) {
    let data;
    let query;
    if (cursor !== "") {
      query = queries.recursiveCatalogWithCursor();
    } else {
      query = queries.recursiveCatalogWithoutCursor();
    }

    const response = await frontStoreShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;
      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  },

  shopCatalog: async function (cursor = "", initialRequest = true) {
    let data;
    let query;
    if (cursor !== "") {
      query = queries.shopRecursiveCatalogWithCursor();
    } else {
      query = queries.shopRecursiveCatalogWithoutCursor();
    }

    const response = await frontStoreShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];
    // if (response.data.products.pageInfo.hasNextPage) {
    //   const num = response.data.products.edges.length;
    //   const cursor = response.data.products.edges[num - 1].cursor;
    //   return data.concat(await shopRecursiveCatalog(cursor));
    // } else {
      return data;
    // }
  },
};

export default products;

import queries from "./shopify-queries";

async function ShopifyData(query) {
  const URL = `https://stopthecapp.myshopify.com/api/2021-10/graphql.json`;
  const adminURL = `https://stopthecapp.myshopify.com/admin/api/2022-01/graphql.json`

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

async function adminShopifyData(query){
  const URL = `https://stopthecapp.myshopify.com/admin/api/2022-01/graphql.json`

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": "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",
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
  getAllProducts: () => {},
  getProduct: async function (handle) {
    let product = await ShopifyData(queries.getProductByHandle(handle));
    const data = product.data.productByHandle ? product.data.productByHandle : {};
    return data;
  },
  getProductRecommendationsById: async (id) => {
    let product = await ShopifyData(queries.getProductRecommendationsById(id));
    const data = product.data.productRecommendations ? product.data.productRecommendations : {};
    return data;
  },
  getCollection: async function (name) {
    let collection = await ShopifyData(queries.getCollection(name));
    const data = collection.data.collectionByHandle ? collection.data.collectionByHandle : {};
    return data;
  },
  getCollections: async function () {
    let collections = await ShopifyData(queries.getCollections());
    const data = collections.data.collections ? collections.data.collections : {};
   
    return data;
  },
  createCheckout: async function (id, quantity) {
    const response = await ShopifyData(queries.createCheckout(id, quantity));
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
    const response = await ShopifyData(queries.updateCheckout(id, lineItemsObject));
    const checkout = response.data.checkoutLineItemsReplace.checkout ? response.data.checkoutLineItemsReplace.checkout : []
    return checkout
  },
  createSubscription: async function (email) {
    const response = await ShopifyData(queries.createSubscription(email, true));
    console.log(response)
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

  shopCatalog: async function (cursor = "", initialRequest = true) {
    let data;
    let query;
    if (cursor !== "") {
      query = queries.shopRecursiveCatalogWithCursor();
    } else {
      query = queries.shopRecursiveCatalogWithoutCursor();
    }

    const response = await ShopifyData(query);
    console.log(response)

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

const queries = {
  recursiveCatalogWithoutCursor: () => {
    return `
    {
      products(first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;
  },
  recursiveCatalogWithCursor: (cursor) => {
    return `{
      products(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;
  },
  getProductByHandle: (handle) => {
    return `{
      productByHandle(handle: "${handle}") {
          id
          title
          descriptionHtml
          productType
          tags
          images(first: 5) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          variants(first: 100) {
              edges {
                  cursor
                  node {
                      image {
                        originalSrc
                        altText
                      }
                      selectedOptions {
                        name
                        value
                      }
                      sku
                      id
                      title
                      quantityAvailable
                      priceV2 {
                          amount
                          currencyCode
                      }
                  }
              }
          }
      }
  }`;
  },
  getProductRecommendationsById: (id) => {
    return `
    {
      productRecommendations(productId: "${id}") {
        id
        title
        handle
        productType
        tags
        images(first: 5) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
              cursor
              node {
                  image {
                    originalSrc
                    altText
                  }
                  selectedOptions {
                    name
                    value
                  }
                  sku
                  id
                  title
                  quantityAvailable
                  priceV2 {
                      amount
                      currencyCode
                  }
              }
          }
        }
      }
    }
    `;
  },
  getCollection: (collection) => {
    return `{
    collectionByHandle(handle: "${collection}") {
        id
        title
        handle
        image {
          originalSrc
        }
        products(first: 8, sortKey: BEST_SELLING) {
          edges {
              node {
                  id
                  title
                  vendor
                  availableForSale
                  handle
                  variants(first: 25) {
                    edges {
                      node {
                        selectedOptions {
                          name
                          value
                        }
                        image {
                          originalSrc
                          altText
                        }
                        title
                        id
                        priceV2 {
                          amount
                        }
                      }
                    }
                  }
                  images(first: 1) {
                      edges {
                          node {
                              id
                              transformedSrc
                              width
                              height
                              altText
                          }
                      }
                  }
                  priceRange {
                      minVariantPrice {
                          amount
                          currencyCode
                      }
                      maxVariantPrice {
                          amount
                          currencyCode
                      }
                  }
              }
          }
      }
    }
  }`;
  },
  createCheckout: (id, quantity) => {
    return `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;
  },
  updateCheckout: (id, lineItemsObject) => {
    return `
    mutation {
      checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
        checkout {
          id
          webUrl
          lineItems(first: 25) {
            edges {
              node {
                id
                title
                quantity
              }
            }
          }
        }
      }
    }
    `;
  },
  getPageByHandle: (handle) => {
    return `
    {
      pageByHandle(handle: "${handle}") {
        title
        seo {
          description
          title
        }
      }
    }
    `;
  },

  getOrdersByEmail: (email) => {
    console.log(email)
    return `
    {
      orders(first: 30, query: "email:${email}") {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  },
  createSubscription: (email, acceptsMarketing) => {
    return `
      mutation 
      {
        customerCreate(input: {
        acceptsMarketing: ${acceptsMarketing},
        email: "${email}",
        password: "subscription"
      }) {
        customer {
          id
        }
      }
    }
    
    `;
  },
};

export default queries;

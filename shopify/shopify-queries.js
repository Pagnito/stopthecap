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
      products(after: "${cursor}", first: 24) {
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

  shopRecursiveCatalogWithCursor: (cursor) => {
    return `{
      products(after: "${cursor}", first: 24) {
        edges {
          cursor
          node {
            id
            title
            handle
            descriptionHtml
            productType
            tags
            totalInventory
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            collections(first: 30) {
              edges {
                node {
                  handle
                  title
                  id
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
                      compareAtPriceV2 {
                        amount
                        currencyCode
                      }
                  }
              }
            }
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;
  },

  shopRecursiveCatalogWithoutCursor: () => {
    return `
    {
      products(first: 24) {
        edges {
          cursor
            node {
            id
            title
            handle
            descriptionHtml
            productType
            tags 
            totalInventory
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            collections(first: 30) {
              edges {
                node {
                  handle
                  title
                  id
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
                      compareAtPriceV2 {
                        amount
                        currencyCode
                      }
                  }
              }
            }
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;
  },
  getAllProducts: () => {
    return `
    {
      products(first: 200) {
        edges {
          cursor
            node {
            id
            title
            handle
            descriptionHtml
            productType
            tags 
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
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }      
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
    `
  },
  getProductByHandle: (handle) => {
    return `{
      productByHandle(handle: "${handle}") {
          id
          title
          handle
          descriptionHtml
          productType
          tags
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          totalInventory
          collections(first: 30) {
            edges {
              node {
                handle
                title
                id
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
                      compareAtPriceV2 {
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
        totalInventory
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
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
                  compareAtPriceV2 {
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
                  tags
                  productType
                  availableForSale
                  handle
                  totalInventory
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
                        sku
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
  getCollections: () => {
    return `
      {
        collections(first: 25) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    `
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

  getOrders: () => {
    return `
    {
      orders(first: 1) {
        edges {
          node {
            id
            email
            lineItems(first: 30) {
              edges {
                node {
                  name
                }
              }
            }
          } 
        }
      }
    }
    `;
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
  getDeliveryProfile: (id) => {
    return `{
      deliveryProfiles(first: 5) {
        edges {
          node {
            name
            profileItems(first: 50) {
              edges {
                node {
                  product {
                    handle
                    id
                  }
                }
              }
            }
          }
        }
      }
    }`;
  },
  getPolicy: (type) => {
    return `
    {
      shop {
        ${type} {
          body
          title
          handle
        }
      }
    }
    `
  }
};

export default queries;

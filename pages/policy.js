import React from 'react';
import shopify from "../shopify/shopify-funcs";

 
export default function Policy(props){ 
  return (
    <div className=''>

   </div>
   )
 }

 export const getStaticProps = async () => {
  let { getPolicy } = shopify;
  let termsOfService = await getPolicy('termsOfService');
  let refundPolicy = await getPolicy('refundPolicy');
  let privacyPolicy = await getPolicy('privacyPolicy');
  let shippingPolicy = await getPolicy('shippingPolicy');

  try {
 
    return {
      props: {
        initialReduxState: {
          info: {
            policies: {
              termsOfService,
              privacyPolicy,
              refundPolicy,
              shippingPolicy
            }
          }

        },
      },
    };
    // store.dispatch({ type: 'FEATURED_PRODUCTS', payload: collection});
  } catch (err) {
    console.log(err);
  }
};
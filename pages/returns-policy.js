import React from 'react';
import { useSelector } from 'react-redux';
import shopify from "../shopify/shopify-funcs";
import htmlParser from "html-react-parser";


 
export default function RefundPolicy(){ 
  let policies = useSelector(({info}) => info.policies);
  return (
    <div className='min-h-screen xxs:p-10 lg:p-20 font-rajdhani-md'>
      <div className='text-center text-3xl mt-10'>{policies.refundPolicy.refundPolicy.title}</div>
      <div className='mt-10 px-32'>{htmlParser(policies.refundPolicy.refundPolicy.body)}</div>
   </div>
   )
 }

 export const getStaticProps = async () => {
  let { getPolicy } = shopify;
  let refundPolicy = await getPolicy('refundPolicy');
  try {
 
    return {
      props: {
        initialReduxState: {
          info: {
            policies: {
              refundPolicy,
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
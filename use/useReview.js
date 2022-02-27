import mongo from './use-mongo';
import validateEmail from '../util/validateEmail';
import shopify from '../shopify/shopify-funcs'
 
export default function useReviews(props){ 
  let submitReview = async (review) => {
    let validatedEmail = validateEmail(review.email);
    
    let shopifyOrdersForEmail = await shopify.getOrdersByEmail(review.email);
    console.log(shopifyOrdersForEmail)
    // if(validatedEmail){
    //   if(review.new) {
    //     mongo.createReview(review);
    //   } else {
    //     mongo.updateReview(review);
    //   }
    // } else {
    //   return false
    // }
  }
  return (
    submitReview
   )
 }
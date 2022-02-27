import mongo from './use-mongo';
import validateEmail from '../util/validateEmail';
import { useState } from 'react';
import { submitReviewAction } from '../actions/product/product-actions';
import { useDispatch, useSelector } from "react-redux";
import shopify from '../shopify/shopify-funcs'
 
export default function useReviews(props){ 
  let dispatch = useDispatch()
  let [email, setEmail] = useState("");
  let [body, setBody] = useState("");
  let [title, setTitle] = useState("");
  let [rating, setRating] = useState(0);
  let [author, setAuthor] = useState("");
  let product = useSelector(({products}) => products.productPage.product);

  let validateReview = (review) => {
    if(!validateEmail(review.email)){
      return {status: false, msg: 'Please enter a real email.'}
    }
    if(review.author.length< 3) {
      return {status: false, msg: 'Please enter your name (min 3 chars).'}
    }
    if(review.rating === 0) {
      return {status: false, msg: 'Please select a rating.'}
    }
    if(review.title.length < 3) {
      return {status: false, msg: 'Please enter at least 3 characters.'}
    }
    return{status: true}
  }

  let submitReview = () => {    
    let date = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let formattedDate = months[date.getMonth()] +' '+ date.getDay() + ' ' + date.getFullYear()
    let reviewObj = {
      product_id: product.id,
      product_handle: product.handle,
      author,
      email,
      body,
      title,
      rating,
      created_at: formattedDate
    };
    if(validateReview(reviewObj).status){
      setAuthor("");
      setBody("");
      setEmail("");
      setRating(0);
      setTitle("");
      dispatch(submitReviewAction(reviewObj));
    }

    // let shopifyOrdersForEmail = await shopify.getOrdersByEmail(review.email);
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
  return {
    submitReview,
    setAuthor,
    setBody,
    setEmail,
    setTitle,
    setRating,
    email,
    title,
    body,
    rating,
    author
  }
 }
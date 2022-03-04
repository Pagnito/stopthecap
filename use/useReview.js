import mongo from "./use-mongo";
import validateEmail from "../util/validateEmail";
import formatDate from "../util/formatDate";
import { useState } from "react";
import { submitReviewAction } from "../actions/product/product-actions";
import { useDispatch, useSelector } from "react-redux";
import { setReviewsAction } from "../actions/product/product-actions";
import shopify from "../shopify/shopify-funcs";

export default function useReview() {
  let dispatch = useDispatch();
  let [email, setEmail] = useState("");
  let [body, setBody] = useState("");
  let [title, setTitle] = useState("");
  let [rating, setRating] = useState(0);
  let [author, setAuthor] = useState("");
  let [error, setError] = useState({ msg: null, type: null });
  let product = useSelector(({ product }) => product.product);
  let reviewsSearchSource = useSelector(({ product }) => product.reviewsSearchSource);
  let keyStrokesForSearch = 0;

  let searchReviews = (keyword) => {
    let searched = reviewsSearchSource.filter((review) => {
      return review.title.indexOf(keyword) > -1 || review.body.indexOf(keyword) > -1;
    });
    dispatch(setReviewsAction(searched));
  };
  
  let calcOverview = (reviews) => {
    let overview = {
      fives: 0,
      fours: 0,
      threes: 0,
      twos: 0,
      ones: 0,
    };

    let sum = 0;
    reviews.forEach(function (value) {
      sum += value.rating;
      if (value.rating === 5) {
        overview.fives += 1;
      }
      if (value.rating === 4) {
        overview.fours += 1;
      }
      if (value.rating === 3) {
        overview.threes += 1;
      }
      if (value.rating === 2) {
        overview.twos += 1;
      }
      if (value.rating === 1) {
        overview.ones += 1;
      }
    });
    overview.fives = overview.fives !== 0 ? ((100 * overview.fives) / reviews.length).toFixed(0) : 0;
    overview.fours = overview.fours !== 0 ? ((100 * overview.fours) / reviews.length).toFixed(0) : 0;
    overview.threes = overview.threes !== 0 ? ((100 * overview.threes) / reviews.length).toFixed(0) : 0;
    overview.twos = overview.twos !== 0 ? ((100 * overview.twos) / reviews.length).toFixed(0) : 0;
    overview.ones = overview.ones !== 0 ? ((100 * overview.ones) / reviews.length).toFixed(0) : 0;

    let average = sum / reviews.length;
    overview.average = Math.round(average.toFixed(1));
    overview.count = reviews.length;
    return overview;
  };

  let validateReview = (review) => {
    if (!validateEmail(review.email)) {
      return { status: false, msg: "Please enter a real email.", type: "email" };
    }
    if (review.author.length < 3) {
      return { status: false, msg: "Please enter your name (min 3 chars).", type: "author" };
    }
    if (review.rating === 0) {
      return { status: false, msg: "Please select a rating.", type: "rating" };
    }
    if (review.title.length < 3) {
      return { status: false, msg: "Please enter at least 3 characters.", type: "title" };
    }
    return { status: true };
  };

  let submitReview = () => {
    let reviewObj = {
      product_id: product.id,
      product_handle: product.handle,
      author,
      email,
      body,
      title,
      rating,
      created_at: formatDate(new Date()),
    };
    let validated = validateReview(reviewObj);
    if (validated.status) {
      setAuthor("");
      setBody("");
      setEmail("");
      setRating(0);
      setTitle("");
      dispatch(submitReviewAction(reviewObj));
      setError({ msg: null, type: null });
    } else {
      if (validated.type === "email") {
        setEmail("");
      } else if (validated.type === "author") {
        setAuthor("");
      } else if (validated.type === "body") {
        setBody("");
      } else if (validated.type === "rating") {
        setRating("");
      } else if (validated.type === "title") {
        setTitle("");
      }
      setError(validated);
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
  };
  return {
    submitReview,
    setAuthor,
    setBody,
    setEmail,
    setTitle,
    setRating,
    searchReviews,
    error,
    email,
    title,
    body,
    rating,
    author,
    calcOverview,
  };
}

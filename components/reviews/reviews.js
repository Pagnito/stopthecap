import React, { createRef, useEffect, useState } from "react";
import Review from "../sub-components/review";
import useReview from "../../use/useReview";

export default function Reviews({ reviews, product_id }) {
  let {searchReviews} = useReview();
  let amountOfReviews = reviews.length;
  let [search, setSearch] = useState('');
  let reviewsContainer = createRef();
  let [paginationState, setPaginationState] = useState({
    reviews: reviews.slice(0, 4),
    page: 1,
  });
  let [clicked, setClicked] = useState(false);
  let [pages, setPages] = useState(
    amountOfReviews % 4 == 0 ? amountOfReviews / 4 : Math.ceil(amountOfReviews % 4) < 4 ? Math.ceil(amountOfReviews / 4) : Math.ceil(amountOfReviews % 4) + 1
  );
  pages = pages.toFixed(0);

  useEffect(() => {
    if (reviewsContainer.current !== null && clicked) {
      reviewsContainer.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [paginationState.page]);

  useEffect(() => {
    setPaginationState({
      reviews: reviews.slice(0, 4),
      page: 1,
    });
  }, [product_id, reviews]);


  let searchReviewsFunc = (e) => {
    setSearch(e.target.value);
    searchReviews(e.target.value)
  }


  let turnPage = (page) => {
    if (clicked === false) {
      setClicked(true);
    }
    let newPaginationState = {
      reviews: reviews.slice(page * 4 - 4, page * 4),
      page: page,
    };
    setPaginationState(newPaginationState);
  };

  let navigation = () => {
    let pagination = Array.from(Array(Number(pages)).keys());
    return pagination.map((pageNumber) => {
      return (
        <div
          onClick={() => turnPage(pageNumber + 1)}
          className={`${
            paginationState.page - 1 == pageNumber ? "text-xl text-red-700" : ""
          } relative z-30 ml-3 cursor-pointer text-red-500`}
          key={pageNumber}
        >
          {pageNumber + 1}
        </div>
      );
    });
  };

  return (
    <div ref={reviewsContainer} className="w-full xxs:p-3 lg:p-10 rounded border-2">
      {/* <div className="flex justify-center items-center">{navigation()}</div> */}
      <input value={search} onChange={searchReviewsFunc} placeholder="Search reviews..." className="w-full text-center text-sm p-2 rounded border-2"/>
      <div>
        {paginationState.reviews.map((review) => {
          return <Review review={review} rating={review.rating} key={review.author + review.email + review.created_at} />;
        })}
      </div>
      <div className="flex justify-center items-center mt-10">{navigation()}</div>
    </div>
  );
}

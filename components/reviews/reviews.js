import React, { createRef, useEffect, useState } from "react";
import Review from "../sub-components/review";

export default function Reviews({ reviews }) {
  let amountOfReviews = reviews.length;
  let [pages, setPages] = useState(amountOfReviews % 4 == 0 ? amountOfReviews / 4 : amountOfReviews / 4 + 1);
  let reviewsContainer = createRef();
  pages = pages.toFixed(0);
  let [paginationState, setPaginationState] = useState({
    reviews: reviews.slice(0, 4),
    page: 1,
  });
  let [clicked, setClicked] = useState(false);

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
  }, [reviews]);

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
          } relative z-50 ml-3 cursor-pointer text-red-500`}
          key={pageNumber}
        >
          {pageNumber + 1}
        </div>
      );
    });
  };

  return (
    <div ref={reviewsContainer} className="w-full xxs:p-3 lg:p-10 rounded border-2">
      <div className="flex justify-center items-center">{navigation()}</div>
      <div>
        {paginationState.reviews.map((review) => {
          return <Review review={review} key={review.author + review.location + review.created_at} />;
        })}
      </div>
      <div className="flex justify-center items-center mt-10">{navigation()}</div>
    </div>
  );
}

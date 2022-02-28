import React, { useEffect, useState } from "react";
import useReview from "../../use/useReview";
import ReviewsStars from "./reviews-stars";

export default function PdpReviewCollapse({overview}) {
  let { submitReview, setAuthor, setBody, setEmail, setRating, setTitle, email, body, title, author, rating, error} =
    useReview();
  return (
    <div className="bg-whiterounded-lg w-full ">
      <div className="mb-1 tracking-wide px-4 py-4">
        <h2 className="text-gray-800 font-semibold mt-1">{`${overview.count} User reviews`}</h2>
        <div className="border-b -mx-8 px-8 pb-3">
          <div className="flex items-center mt-1">
            <div className="w-1/5 text-red-500 tracking-tighter">
              <span>5 star</span>
            </div>
            <progress className="w-3/5 rounded" value={overview.fives} max={100} color="#EF4444" />
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">{overview.fives + "%"}</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-1/5 text-red-500 tracking-tighter">
              <span>4 star</span>
            </div>
            <progress className="w-3/5 rounded" value={overview.fours} max={100} color="#EF4444" />

            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">{overview.fours + "%"}</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-1/5 text-red-500 tracking-tighter">
              <span>3 star</span>
            </div>
            <progress className="w-3/5 rounded" value={overview.threes} max={100} color="#EF4444" />

            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">{overview.threes + "%"}</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className=" w-1/5 text-red-500 tracking-tighter">
              <span>2 star</span>
            </div>
            <progress className="w-3/5 rounded" value={overview.twos} max={100} color="#EF4444" />

            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">{overview.twos + "%"}</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-1/5 text-red-500 tracking-tighter">
              <span>1 star</span>
            </div>
            <progress className="w-3/5 rounded" value={overview.ones} max={100} color="#EF4444" />

            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">{overview.ones + "%"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <h3 className="font-medium tracking-tight">Review this item</h3>
        <p className="text-gray-700 text-sm py-1">give your opinion about this item.</p>

        <div className="flex mt-2">
          <div className="w-full">
            <p>Email</p>
            <input
              placeholder={`${error.type === "email" ? error.msg : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="border-2 pl-2 w-full text-xs py-2 rounded placeholder:text-red-300"
            />
          </div>
        </div>
        <div className="flex mt-2">
          <div className="w-full">
            <p>Name</p>
            <input
              placeholder={`${error.type === "author" ? error.msg : ""}`}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              className="border-2 pl-2 w-full text-xs py-2 rounded placeholder:text-red-300"
            />
          </div>
        </div>
        <div className="flex mt-2">
          <div className="w-full">
            <p>Rating</p>
            <div className=" flex items-end">
              <ReviewsStars setRating={setRating} rating={rating} />
              <div className="text-red-500 ml-2 text-xs">{error.type === "rating" ? error.msg : ""}</div>
            </div>
          </div>
        </div>

        <div className="flex mt-3">
          <div className="w-full">
            <p>Title</p>
            <input
              placeholder={`${error.type === "title" ? error.msg : ""}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="border-2 pl-2 w-full text-xs py-2 rounded placeholder:text-red-300"
            />
          </div>
        </div>
        <div className="mt-2">
          <p>Review</p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border-2 rounded pl-2 pt-2 text-xs min-h-20"
          ></textarea>
        </div>
      </div>
      <div className="px-4">
        <button
          onClick={submitReview}
          className="border-2 bg-theme-blue border-theme-blue px-3 py-1 rounded hover:bg-green-500 hover:border-green-500 transition-colors text-white mt-2"
        >
          Submit review
        </button>
      </div>
    </div>
  );
}

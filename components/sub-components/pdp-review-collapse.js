import React, { useState } from "react";
import useReviews from "../../use/useReview";
import ReviewsStars from "./reviews-stars";

export default function PdpReviewCollapse(props) {
  let { submitReview } = useReviews();
  let [email, setEmail] = useState("");
  let [review, setReview] = useState("");

  return (
    <div className="bg-whiterounded-lg w-full ">
      <div className="mb-1 tracking-wide px-4 py-4">
        <h2 className="text-gray-800 font-semibold mt-1">67 Users reviews</h2>
        <div className="border-b -mx-8 px-8 pb-3">
          <div className="flex items-center mt-1">
            <div className=" w-1/5 text-red-500 tracking-tighter">
              <span>5 star</span>
            </div>
            <div className="w-3/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className=" w-7/12 bg-red-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">51%</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-1/5 text-red-500 tracking-tighter">
              <span>4 star</span>
            </div>
            <div className="w-3/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className="w-1/5 bg-red-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">17%</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-1/5 text-red-500 tracking-tighter">
              <span>3 star</span>
            </div>
            <div className="w-3/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className=" w-3/12 bg-red-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">19%</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className=" w-1/5 text-red-500 tracking-tighter">
              <span>2 star</span>
            </div>
            <div className="w-3/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className=" w-1/5 bg-red-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">8%</span>
            </div>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-1/5 text-red-500 tracking-tighter">
              <span>1 star</span>
            </div>
            <div className="w-3/5">
              <div className="bg-gray-300 w-full rounded-lg h-2">
                <div className=" w-2/12 bg-red-600 rounded-lg h-2"></div>
              </div>
            </div>
            <div className="w-1/5 text-gray-700 pl-3">
              <span className="text-sm">5%</span>
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
            <input type="text" className="border-2 pl-2 w-full text-xs py-2 rounded" />
          </div>
        </div>
        <div className="flex mt-2">
          <div className="w-full">
            <p>Rating</p>
            <ReviewsStars />
          </div>
        </div>
        <div className="mt-2">
          <p>Review</p>
          <textarea className="w-full border-2 rounded pl-2 pt-2 text-xs min-h-20"></textarea>
        </div>
      </div>
      <div className="px-4">
        <button className="border-2 bg-theme-blue border-theme-blue px-3 py-1 rounded hover:bg-green-500 hover:border-green-500 transition-colors text-white mt-2">
          Submit review
        </button>
      </div>
    </div>
  );
}

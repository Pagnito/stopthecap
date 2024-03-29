import React, { useEffect, useState } from "react";
import parseHtmlString from "html-react-parser";
import ReviewStars from "./reviews-stars";

export default function Review({ review }) {
  let body = review.body;

  body = parseHtmlString(review.body, {
    replace: (node) => {
      if (node.name === "img") {
        return <img className="xxs:max-w-full md:max-w-xs mt-2" src={node.attribs.src} />;
      }
    },
  });
  return (
    <div className="lg:mt-10 xxs:mt-5">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {/* <div className="inline-block relative">
            <div className="relative w-16 h-16 rounded-full overflow-hidden" />
            <img
              className="absolute top-0 left-0 w-full h-full bg-cover object-fit rounded-full object-cover"
              src="https://picsum.photos/id/646/200/200"
              alt="Profile picture"
            />
            <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
          </div> */}
          {/* <svg
            className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
          </svg> */}
        </div>
      </div>
      <div className="lg:ml-6">
        <div className="flex items-baseline w-full justify-between">
          <div>
            <span className="text-gray-600 text-sm font-bold">{review.author}</span>
            <span className="ml-2 text-green-600 text-xs">Verified Buyer</span>
          </div>
          <div className="text-xs">{review.created_at}</div>
        </div>
        <div className="mt-2">
          <ReviewStars rating={review.rating} />
        </div>
        {/* <div className="flex items-center mt-4 text-gray-600">
          <div className="flex items-center">
            <span className="text-sm">Product Quality</span>
            <div className="flex items-center ml-2">
              <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <span className="text-sm">Purchasing Experience</span>
            <div className="flex items-center ml-2">
              <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="w-3 h-3 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg className="w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
          </div>
        </div> */}
        <div className="mt-3">
          <span className="font-bold">{review.title}</span>
          <div className="mt-1 text-md font-bold font-rajdhani-md">{body}</div>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
          <button className="flex items-center"></button>
          <div className="flex items-center"></div>
        </div>
      </div>
    </div>
  );
}

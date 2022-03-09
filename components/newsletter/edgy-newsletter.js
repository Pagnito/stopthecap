import React from "react";
import useNewsletter from "../../use/useNewsletter";

const Newsletter = (props) => {
  const { notif, email, changeEmailValue, submitEmail, submitEmailOnEnter} = useNewsletter();

  return (
    <div className="p-10 bg-theme-blue flex-col justify-between items-center w-full  z-20 ">
      <div className="mt-2 mb-2 flex justify-center"></div>
      <div className="flex items-center justify-center w-full xxs:flex-col md:flex-row">
        <img
          alt="Brand Logo"
          // width={80}
          // height={80}
          className="m-1 md:w-20 xxs:w-44 cursor-pointer"
          src="/images/StopTheCap-Favicon-White.png"
          // objectFit="contain"
        />
        <div className="md:ml-5 xxs:mt-5 md:mt-0 xxs:text-center md:text-left">
          <div className="text-white xxs:text-2xl md:text-lg">Subscribe!</div>
          <div className="text-red-500 xxs:text-4xl md:text-xl">Get Limited Time Deals!</div>
        </div>
        <input
          onKeyDown={submitEmailOnEnter}
          placeholder={notif.message}
          value={email}
          onChange={(e) => changeEmailValue(e.target.value)}
          className={`placeholder:${notif.color} rounded md:ml-5 xxs:mt-10 md:mt-0 xxs:w-full md:w-1/3  xl:w-1/2 h-12 pl-3`}
        />
        <button
          onClick={submitEmail}
          className="hover:bg-red-600 xxs:w-full md:w-fit hover:border-red-600 bg-red-500 text-white xxs:mt-4 md:mt-0
           border-red-500 md:ml-3 transition-colors cursor-pointer pl-10 pr-10 h-12 text-lg border-solid border-2 rounded"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};
export default Newsletter;

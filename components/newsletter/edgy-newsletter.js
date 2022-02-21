import React, { useState } from "react";
import useEmail from "../../db/use-db";
import shopify from "../../shopify/shopify-funcs";
import Image from "next/image";

const Newsletter = (props) => {
  let { insertEmail } = useEmail();
  let [email, setEmail] = useState("");
  let [notif, setNotif] = useState({
    message: "",
    color: "text-gray-400",
  });
  let emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  const changeEmailValue = (value) => {
    setNotif({
      message: "",
      color: "text-gray-400",
    });
    setEmail(value);
  };
  const submitEmail = async () => {
    if (emailRegex.test(email)) {
      let response = shopify.createSubscription(email);
      setEmail("");
      setNotif({
        color: "text-gray-400",
        message: "Sent!",
      });

      if (response === 200) {
        setNotif({
          color: "text-gray-400",
          message: "You're all set!",
        });
        setTimeout(() => {
          setNotif({
            color: "text-gray-400",
            message: "",
          });
        }, 2000);
      } else {
        setEmail("");
        setNotif({
          message: response.message,
          color: "bg-red-500",
        });
      }
    } else {
      setEmail("");
      setNotif({
        message: `You've entered an invalid email`,
        color: "bg-red-500",
      });
    }
  };
  const submitEmailOnEnter = (e) => {
    if (e.code === "Enter") {
      shopify.createSubscription(email);
      // submitEmail(email);
    }
  };

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

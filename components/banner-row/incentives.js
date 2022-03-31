import React from "react";
import { app } from "../../app.config";

export default function Incentives(props) {
  let activeIncentives = () => {
    return app.data.incentives.active_incentives.map(
      (incentiveInfo, ind) => {
        return (
          <div
            key={incentiveInfo.text_one}
            className={`pt-16 pb-16 pl-10 pr-10 flex flex-col xxs:text-center md:text-left justify-center items-center md:w-1/3 xxs:w-full
        ${ind === 1 ? "bg-theme-blue text-white" : "bg-red-500 text-theme-blue"}`}
          >
            <div className="text-white">{incentiveInfo.text_one}</div>
            <div className="font-serif text-3xl mt-2">{incentiveInfo.text_two}</div>

            <button
              className={`${ind !== 1 ? 'border-white hover:bg-white ':'hover:bg-red-500 border-red-500'} transition-colors cursor-pointer mt-5 pl-6 pr-6 pt-2 pb-2 text-md 
          border-solid border-2 md:self-start rounded`}
            >
              {incentiveInfo.button}
            </button>
          </div>
        );
      }
    );
  };

  return <div className="z-10 w-full flex md:flex-row xxs:flex-col shadow-[0px_-10px_16px_2px_rgba(0,0,0,0.3)]">{activeIncentives()}</div>;
}

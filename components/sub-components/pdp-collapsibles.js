import React, { useState } from "react";
import { app } from "../../app.config";
import ReactCollapsible from "react-collapsible";
import { RiArrowDropDownLine } from "react-icons/ri";
import PdpReviewCollapse from "./pdp-review-collapse";

export default function PdpCollapsibles({ description, reviewOverview }) {
  let initState = JSON.parse(JSON.stringify(app.layout.data.pdp_collapsibles));
  let trigger = (word) => {
    return (
      <div className="flex w-full justify-between pl-2 pr-2">
        <div>{word}</div>
        <RiArrowDropDownLine size="30px" />
      </div>
    );
  };
  let descriptionEl = () => {
    return (
      <div className="xxs:px-2 lg:px-5 description text-xs mt-5">
        {description}
        <iframe className="w-full mt-6 mb-5  lg:h-80" src="https://www.youtube.com/embed/1Be6YsjIXCs" allowFullScreen></iframe>
      </div>
    );
  };
  let shippingEl = () => {
    return (
      <div className="xxs:px-2 lg:px-5 description text-xs mt-5">
        <p>This item will arrive between 3-7 days.</p>
        <p className="mt-1">Delivery tracking is sent via email.</p>
    </div>
    )
  }
  // let collapsibles = () => {
  //   let keys = Object.keys(initState);
  //   return keys.map((collapsible,ind) => {
  //     return (
  //       <div key={collapsible}>
  //         <button onClick={() => toggleCollapsible(collapsible)} type="button" className="p-5">
  //           {collapsible}
  //         </button>
  //         <div className={`${state[collapsible] === true ? "h-auto" : "h-0"} ${ind===keys.length-1 && state[keys[keys.length-1]] ? 'pb-5': ''}
  //          overflow-hidden transition-all pr-5 pl-5`}>
  //           <p>
  //             asdasdasdaskdbaskjldbaskjdlbasdkksdbaskjdbasjkdbaskd<br/>askdsnakdjasdksadlk
  //             {/* {collapsible === 'description' ? description : (collapsible === 'shipping' ? shipping : reviews)} */}
  //           </p>
  //         </div>
  //       </div>
  //     );
  //   });
  // };
  let collapsibles = () => {
    let keys = Object.keys(initState);
    return keys.map((collapsible, ind) => {
      return (
        <ReactCollapsible
          open={collapsible === 'description' ? true : false}
          easing="ease-in-out"
          key={collapsible}
          transitionTime={150}
          className="border-solid border-red-500"
          trigger={trigger(collapsible)}
        >
          {collapsible === "reviews" ? <PdpReviewCollapse overview={reviewOverview} /> : collapsible === "description" ? descriptionEl() : shippingEl()}
        </ReactCollapsible>
      );
    });
  };
  return <div className="border-solid border-2 rounded collapsibles">{collapsibles()}</div>;
}

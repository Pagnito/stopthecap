import React, { useState } from "react";
import { app } from "../../app.config";
import ReactCollapsible from "react-collapsible";
import { RiArrowDropDownLine } from "react-icons/ri";
import PdpReviewCollapse from "./pdp-review-collapse";

export default function PdpCollapsibles({ description }) {
  let initState = JSON.parse(JSON.stringify(app.layout.data.pdp_collapsibles));
  let [state, setState] = useState(initState);
  let toggleCollapsible = (type) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState[type] = newState[type] ? false : true;
    setState(newState);
  };
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
      <div className="pl-5 description text-xs mt-5">
        {description}
        <iframe className="w-full mt-6 mb-5 h-335px" src="https://www.youtube.com/embed/1Be6YsjIXCs" allowFullScreen></iframe>
      </div>
    );
  };
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
          {collapsible === "reviews" ? <PdpReviewCollapse /> : collapsible === "description" ? descriptionEl() : "shipping"}
        </ReactCollapsible>
      );
    });
  };
  return <div className="border-solid border-2 rounded collapsibles">{collapsibles()}</div>;
}

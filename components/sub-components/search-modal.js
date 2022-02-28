import React, { createRef, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function SearchModal(props) {
  let [search, setSeach] = useState("");
  let input = createRef();

  useEffect(() => {
    if (input.current !== null) {
      input.current.focus();
    }
  }, []);
  return (
    <div className="fixed z-40 top-0 flex flex-col justify-center items-center h-screen w-full">
      <div onClick={props.hideSearchModal} className="cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5">
        <RiCloseFill size="50px" color="white" />
      </div>

      <div className="w-3/4 z-50 flex justify-center">
        <input
          ref={input}
          autoFocus={true}
          className="caret-red-500 pb-2 text-2xl animate-width-open text-center no-outline w-0 text-white border-b-solid border-b-2 bg-transparent"
          value={search}
          onChange={(e) => setSeach(e.target.value)}
        />
      </div>
      <div className="flex fixed top-0 w-full h-screen">
        <div className="bg-black z-50 opacity-90 w-1/2 -translate-x-full animate-doors-close"></div>
        <div className="bg-black z-50 opacity-90 w-1/2 translate-x-full animate-doors-close"></div>
      </div>

    </div>
  );
}

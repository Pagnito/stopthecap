import React from "react";

export default function Switch({ active, setActive }) {
  return (
    <div
      onClick={() => (active ? setActive(false) : setActive(true))}
      className={`p-1 w-10 ${active ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 hover:bg-gray-500"} rounded-full cursor-pointer `}
    >
      <div className={`transition-all h-3 w-3 rounded-full bg-white ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  );
}

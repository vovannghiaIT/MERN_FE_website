import React from "react";

const ButtonFilter = ({ text, colorRed }) => {
  return (
    <button
      className={`border border-gray-400 ${
        colorRed ? "bg-red-500" : "bg-slate-500"
      }  text-white rounded-lg px-4 lg:max-xl:px-2 md:max-lg:px-0 md:max-lg:text-[10px] py-1 w-full text-[13px] sm:max-md:px-0`}
    >
      {text}
    </button>
  );
};

export default ButtonFilter;

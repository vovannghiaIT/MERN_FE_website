import React from "react";
import { NavLink } from "react-router-dom";

const FillterItem = ({ text, images, link }) => {
  return (
    <NavLink
      to={`/${link}`}
      className={({ isActive }) =>
        isActive
          ? "border border-red-500 rounded-xl   w-full min-w-[180px]"
          : "border border-gray-300 rounded-xl  w-full min-w-[180px]"
      }
    >
      <div className=" flex gap-2  justify-center items-center  px-4 py-2 cursor-pointer ">
        <span className="">
          <img
            src={"./img/" + images}
            alt="anh icon filter"
            className="object-cover w-7 h-7"
          />
        </span>
        <span className="text-[13px] lg:max-xl:text-[12px] sm:max-md:text-[10px]">
          {text}
        </span>
      </div>
    </NavLink>
  );
};

export default FillterItem;

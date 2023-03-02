import React from "react";
import { Link } from "react-router-dom";
import ItemsProduct from "./ItemsProduct";

const ItemsContext = ({ text, left, right, slug }) => {
  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="font-medium uppercase sm:max-md:text-[13px]">{text}</h1>
        <Link to={"/category-product/" + slug}>
          <button className="text-[12px] border bg-slate-200 hover:border-red-500 hover:text-red-500 px-2 py-1 rounded-lg">
            Xem tất cả
          </button>
        </Link>
      </div>
      <div className="flex mt-2 gap-4 justify-start md:max-lg:flex-col-reverse sm:max-md:flex-col-reverse ">
        {left && (
          <div className="flex flex-col md:max-lg:flex-row  sm:max-md:flex-row gap-5 w-[25%] mt-5 md:max-lg:w-full sm:max-md:w-full ">
            <div className="relative cursor-pointer img__hover overflow-hidden ">
              <div className="bg-[#f2f2f2] w-[240px] rounded-lg h-[250px]  absolute  bg__hover"></div>
              <img
                src="./img/dt1_l.png"
                alt="anh "
                className="w-[250px] h-[250px] md:max-lg:w-full  md:max-lg:h-full sm:max-md:w-full sm:max-md:h-full   rounded-lg  cursor-pointer "
              />
            </div>
            <div className="relative  cursor-pointer img__hover overflow-hidden ">
              <div className="bg-[#f2f2f2] w-[240px] rounded-lg h-[250px]  absolute  bg__hover"></div>
              <img
                src="./img/dt2_l.png"
                alt="anh "
                className="w-[250px] h-[250px] md:max-lg:w-full md:max-lg:h-full  sm:max-md:w-full sm:max-md:h-full   rounded-lg "
              />
            </div>
          </div>
        )}

        {left && (
          <div className="grid grid-cols-4 gap-4 sm:max-md:grid-cols-2 sm:max-md:gap-1   sm:max-md:w-full md:max-lg:gap-2 lg:max-xl:grid-cols-4 lg:max-xl:gap-2 md:max-lg:grid-cols-4 md:max-lg:w-full w-[75%] ">
            <ItemsProduct contextleft />
          </div>
        )}
        {right && (
          <div className="grid grid-cols-4 gap-4 sm:max-md:grid-cols-2 sm:max-md:gap-1  sm:max-md:w-full md:max-lg:gap-2 lg:max-xl:grid-cols-4 lg:max-xl:gap-2 md:max-lg:grid-cols-4 md:max-lg:w-full w-[75%] ">
            <ItemsProduct contextright />
          </div>
        )}

        {right && (
          <div className="flex flex-col gap-5 w-[25%] mt-5 md:max-lg:w-full md:max-lg:flex-col-reverse md:max-lg:hidden  sm:max-md:hidden">
            <div className="relative cursor-pointer img__hover overflow-hidden ">
              <div className="bg-[#f2f2f2] w-[240px] rounded-lg h-[250px]  absolute  bg__hover"></div>
              <img
                src="./img/mt_r.png"
                alt="anh "
                className="w-[250px] h-[250px] rounded-lg  cursor-pointer "
              />
            </div>
            <div className="relative  cursor-pointer img__hover overflow-hidden ">
              <div className="bg-[#f2f2f2] w-[240px] rounded-lg h-[250px]  absolute  bg__hover"></div>
              <img
                src="./img/mt2_r.png"
                alt="anh "
                className="w-[250px] h-[250px] rounded-lg "
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsContext;

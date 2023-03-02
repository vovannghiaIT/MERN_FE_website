import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const { categories } = useSelector((state) => state.category);
  return (
    <div className="bg-white w-full mt-5 gap-5 border-t border-red-500">
      <div className="w-[80%] flex gap-2 mx-auto">
        create by <span className="text-red-500">Võ Văn Nghĩa</span>
      </div>
    </div>
  );
};

export default Footer;

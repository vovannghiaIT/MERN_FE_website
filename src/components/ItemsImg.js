import React, { memo } from "react";

const indexs = [0];
const ItemsImg = ({ images, homeItem }) => {
  return (
    <div>
      {!homeItem &&
        images?.length > 0 &&
        images
          .filter((i, index) => indexs.some((i) => i === index))
          ?.map((i, index) => {
            return (
              <img
                key={index}
                className="object-cover rounded-full w-full h-full"
                src={i}
                alt="anh category"
              />
            );
          })}
      {homeItem &&
        images?.length > 0 &&
        images
          .filter((i, index) => indexs.some((i) => i === index))
          ?.map((i, index) => {
            return (
              <img
                key={index}
                src={i}
                className={`object-cover hover:scale-105  ease-in duration-500  w-full h-full min-h-[150px]`}
                alt="img_product"
              />
            );
          })}
    </div>
  );
};

export default memo(ItemsImg);

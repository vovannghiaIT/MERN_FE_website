import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ItemsImg, ItemsProduct } from "../../components";
import * as actions from "../../store/actions";

const ProductAll = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  //PanginateProduct
  const [itemOffsetProduct, setItemOffsetProduct] = useState(0);
  const [itemsPerPageProduct, setItemsPerPageProduct] = useState(12);

  const endOffsetProduct = itemOffsetProduct + itemsPerPageProduct;
  const currentItemsProduct = products
    .filter((item) => item?.status === 1)
    .slice(itemOffsetProduct, endOffsetProduct);

  let data = products.filter((item) => item?.status === 1);
  const handleFetchProduct = () => {
    if (itemsPerPageProduct < data.length) {
      setItemsPerPageProduct(itemsPerPageProduct + 6);
    } else {
      setItemsPerPageProduct(12);
      window.scrollTo({ top: 0, behavior: "smooth" });
      // console.log(1);
    }
    // console.log(itemsPerPageProduct);
    // console.log(data.length);
  };
  // console.log(products.length);
  return (
    <div className="bg-[#e4e4e4] flex flex-col gap-4 w-full">
      <div className="w-[100%] mx-auto bg-white">
        <div className="w-[80%] mx-auto pt-2 pb-2">
          Trang chủ / Tất sản phẩm
        </div>
      </div>
      <div className="bg-white w-[80%] rounded-lg mx-auto p-2 ">
        <h1 className="text-[22px] sm:max-md:text-[13px]">Tất sản phẩm</h1>
        <div className="mt-2 grid grid-cols-6 lg:max-xl:grid-cols-4 gap-3 md:max-lg:grid-cols-3 sm:max-md:grid-cols-2 sm:max-md:gap-1 sm:max-md:p-0 p-2">
          {currentItemsProduct?.length > 0 &&
            currentItemsProduct
              .filter((items) => items.status === 1)
              .map((items, index) => {
                return (
                  <div key={index}>
                    <ItemsProduct
                      sale
                      slug={items?.slug}
                      name={items?.name}
                      images={items?.images}
                      pricesale={items?.pricesale}
                      price={items?.price}
                    />
                  </div>
                );
              })}
        </div>
        <button
          className="w-full shadow-4md rounded-lg mt-3 py-1 px-4"
          onClick={() => handleFetchProduct()}
        >
          {itemsPerPageProduct < data.length ? "Xem thêm" : "Thu gọn"}
        </button>
      </div>
    </div>
  );
};

export default ProductAll;

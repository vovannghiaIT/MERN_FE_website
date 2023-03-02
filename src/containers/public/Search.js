import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ItemsProduct, NoProduct } from "../../components";
import * as actions from "../../store/actions";
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchSearch();
  }, [searchParams]);

  const fetchSearch = async () => {
    let search = searchParams.get("key");
    dispatch(actions.getSearchProduct(search));
    // console.log(search);
  };

  // console.log(search);
  return (
    <div className="w-full bg-[#f1f1f1]">
      <div className="bg-white w-full ">
        <div className="w-[90%] mx-auto text-[13px]  pt-1 pb-1">
          Trang chủ / Tìm kiếm sản phẩm
        </div>
      </div>
      <div className=" w-[90%] mx-auto mt-2 bg-white  ">
        <p className="p-1">
          Tìm kiếm sản phẩm :
          <span className="text-red-500 px-2">{searchParams.get("key")}</span>
        </p>
        <div className="p-2 grid grid-cols-6 lg:max-xl:grid-cols-5 lg:max-xl:gap-2  md:max-lg:grid-cols-4 md:max-lg:gap-2 sm:max-md:grid-cols-2 sm:max-md:gap-2 gap-4 w-full mx-auto">
          {search?.length > 0 &&
            search
              .filter((item) => item.status === 1)
              .map((items) => {
                return (
                  <div key={items.id}>
                    <ItemsProduct
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
        {search.length <= 0 && <NoProduct />}
      </div>
    </div>
  );
};

export default Search;

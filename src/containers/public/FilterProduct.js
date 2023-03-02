import React, { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import ButtonFilter from "../../components/ButtonFilter";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Link, useParams, useSearchParams } from "react-router-dom";

const FilterProduct = ({ setsortDown, setsortUp }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000000);
  const handleInput = (e) => {
    setMin(e.minValue);
    setMax(e.maxValue);
  };
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { operas } = useSelector((state) => state.opera);

  const [searchParams, setSearchParams] = useSearchParams();

  const submitProduct = (items) => {
    setsortDown();
    setsortUp();
    setSearchParams(items);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const submitProductPrice = () => {
    setsortDown();
    setsortUp();
    let brandSlug = searchParams.get("brandSlug");

    if (brandSlug === null) {
      setSearchParams({ priceMin: min, priceMax: max });
    } else if (brandSlug) {
      setSearchParams({
        brandSlug: brandSlug,
        priceMin: min,
        priceMax: max,
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="p-2 ">
      <div className="flex  flex-col justify-start items-start gap-2 ">
        <div className="w-full">
          <h3 className="font-semibold text-red-500 capitalize">Thương hiệu</h3>
          <div className=" grid grid-cols-2 gap-2 w-full h-[150px] overflow-y-auto">
            {brands?.length > 0 &&
              brands
                .filter((items) => items.status === 1)
                .map((items, index) => {
                  return (
                    <div
                      onClick={() => submitProduct({ brandSlug: items?.slug })}
                      className="w-full "
                      key={index}
                    >
                      <ButtonFilter text={items?.name} />
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="w-full">
          <h3 className="font-semibold text-red-500 capitalize">Lọc giá</h3>
          <div className="flex flex-col gap-1">
            <MultiRangeSlider
              min={0}
              max={100000000}
              step={5}
              minValue={min}
              maxValue={max}
              label={false}
              ruler={false}
              style={{
                border: "none",
                boxShadow: "none",
                padding: "15px 10px",
              }}
              barLeftColor="#fff"
              barInnerColor="#ffa31a"
              barRightColor="#fff"
              thumbLeftColor="white"
              thumbRightColor="white"
              onInput={(e) => {
                handleInput(e);
              }}
              onChange={(e) => {
                handleInput(e);
              }}
            />
            <div className="grid grid-cols-2 gap-2 justify-center w-full">
              <span className="w-full">
                <ButtonFilter text={min} />
              </span>
              <span className="w-full">
                <ButtonFilter text={max} />
              </span>
            </div>
            <span className="w-[35%] mt-2" onClick={() => submitProductPrice()}>
              <ButtonFilter text={"Áp dụng"} colorRed />
            </span>
          </div>
        </div>
        <div className="w-full">
          <h3 className="font-semibold text-red-500 capitalize">
            Loại sản phẩm
          </h3>
          <div className="grid grid-cols-2 gap-2 w-full h-[200px] overflow-y-auto">
            {categories?.length > 0 &&
              categories
                .filter((items) => items.status === 1)
                .map((items, index) => {
                  return (
                    <Link
                      to={"/category-product/" + items.slug}
                      onClick={() => submitProduct()}
                      className="w-full "
                      key={index}
                    >
                      <ButtonFilter text={items?.name} />
                    </Link>
                  );
                })}
          </div>
        </div>
        {/* <div>
          <h3 className="font-semibold text-red-500 capitalize">
            Hệ điều hàng
          </h3>
          <div className="flex  flex-wrap justify-start gap-2 w-full h-[200px] overflow-y-auto">
            {operas?.length > 0 &&
              operas
                .filter((items) => items.status === 1)
                .map((items, index) => {
                  return (
                    <div
                      //   to={"/category-product/" + items.slug}
                      onClick={() => submitProduct({ operaSlug: items.slug })}
                      className="w-[48.5%] mt-2"
                      key={index}
                    >
                      <ButtonFilter text={items?.name} />
                    </div>
                  );
                })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FilterProduct;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { ItemsProduct, NoProduct } from "../../components";
import ButtonFilter from "../../components/ButtonFilter";
import * as actions from "../../store/actions";
import FilterProduct from "./FilterProduct";

const CategoryProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { operas } = useSelector((state) => state.opera);
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useSelector((state) => state.product);
  const [sortUp, setsortUp] = useState();
  const [sortDown, setsortDown] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(actions.getCategories());
    dispatch(actions.getProduct());
    dispatch(actions.getBrand());
    dispatch(actions.getOpera());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let slug = params?.slug;
  let ItemSlugCategory = categories?.filter((items) => items?.slug === slug);
  const brandSlug = searchParams.get("brandSlug");

  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  let ItemBrands = brands?.filter((items) => items.slug === brandSlug);

  let CategoryId = ItemSlugCategory[0]?._id;
  let BrandId = ItemBrands[0]?._id;

  let ProductItemCategory = [];
  if (BrandId && priceMin && priceMax) {
    ProductItemCategory = products.filter(
      (items) =>
        items?.categoryId === CategoryId &&
        items.price > priceMin &&
        items.price < priceMax &&
        items?.brandId === BrandId &&
        items?.status === 1
    );
  } else if (priceMin && priceMax) {
    ProductItemCategory = products.filter(
      (items) =>
        items?.categoryId === CategoryId &&
        items.price > priceMin &&
        items.price < priceMax &&
        items?.status === 1
    );
  } else if (BrandId) {
    ProductItemCategory = products.filter(
      (items) =>
        items?.categoryId === CategoryId &&
        items?.brandId === BrandId &&
        items?.status === 1
    );
  } else {
    ProductItemCategory = products.filter(
      (items) => items?.categoryId === CategoryId && items?.status === 1
    );
  }

  const defaultValue = () => {
    setsortDown();
    setsortUp();
    setSearchParams();
  };

  var ProductCategory = ProductItemCategory;

  const priceUp = (ProductCategory) => {
    setsortDown();
    setsortUp(ProductCategory.sort((a, b) => a.price - b.price));
  };

  const priceDown = () => {
    setsortUp();
    setsortDown(ProductCategory.sort((a, b) => b.price - a.price));
  };

  return (
    <div className=" bg-[#f1f1f1] flex flex-col gap-5  w-full ">
      <div className="bg-white w-full ">
        <div className="w-[80%] mx-auto pt-2 pb-2">
          Trang chủ / sản phẩm theo loại
        </div>
      </div>
      <div className=" w-[80%] sm:max-md:w-full mx-auto bg-white  rounded-lg flex justify-start items-start gap-4">
        <div className="w-[30%] sm:max-md:hidden">
          <FilterProduct setsortUp={setsortUp} setsortDown={setsortDown} />
        </div>
        <div className="w-[70%] sm:max-md:w-full p-2 flex flex-col gap-5">
          <span className="text-start hidden text-[13px] md:max-lg:text-[10px]  sm:max-md:block">
            Sắp xếp theo
          </span>
          <div className="grid grid-cols-5 sm:max-md:grid-cols-2 gap-2 sm:max-md:gap-1">
            <span className="text-center text-[13px] md:max-lg:text-[10px] py-2 sm:max-md:hidden">
              Sắp xếp theo
            </span>
            <span onClick={() => defaultValue()}>
              <ButtonFilter text={"Mặc định"} />
            </span>
            <span onClick={() => priceUp(ProductCategory)}>
              <ButtonFilter text={"Giá tăng dần"} />
            </span>
            <span onClick={() => priceDown(ProductCategory)}>
              <ButtonFilter text={"Giá giảm dần"} />
            </span>
            <span onClick={() => defaultValue()}>
              <ButtonFilter text={"Mới nhất"} />
            </span>
          </div>
          <div className="gird w-full  grid-cols-2 gap-2">
            {CategoryId ? (
              <p className="flex gap-2">
                <>
                  <span>Sản phẩm theo loại :</span>
                  {categories?.length > 0 &&
                    categories
                      .filter((items) => items._id === CategoryId)
                      .map((item, index) => {
                        return (
                          <span className="text-red-500" key={index}>
                            "{item.name}"
                          </span>
                        );
                      })}
                </>
                {BrandId ? (
                  <>
                    <span>Với thương hiệu :</span>
                    {brands?.length > 0 &&
                      brands
                        .filter((items) => items._id === BrandId)
                        .map((item, index) => {
                          return (
                            <span className="text-red-500" key={index}>
                              "{item.name}"
                            </span>
                          );
                        })}
                  </>
                ) : (
                  ""
                )}
              </p>
            ) : (
              ""
            )}
            {priceMax && priceMin && (
              <div className="flex gap-2">
                Giá từ <span className="text-red-500">{priceMin}</span>
                đến <span className="text-red-500">{priceMax}</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 md:max-lg:grid-cols-3 sm:max-md:grid-cols-2  xl:gap-4">
            {!sortUp &&
              sortDown?.length > 0 &&
              sortDown?.map((items, index) => {
                return (
                  <div key={index}>
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
            {!sortDown &&
              sortUp?.length > 0 &&
              sortUp?.map((items, index) => {
                return (
                  <div key={index}>
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
            {!sortUp &&
              !sortDown &&
              ProductCategory?.length > 0 &&
              ProductCategory?.map((items, index) => {
                return (
                  <div key={index}>
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
          {ProductCategory?.length <= 0 && <NoProduct />}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;

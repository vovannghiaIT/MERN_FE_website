import React, { useEffect, useState } from "react";
import imgSlider from "../../assets/img/big_bn_slide.png";
import Slider from "react-slick";
import icons from "../../ultils/icons";
import {
  ItemsProduct,
  FillterItem,
  ItemsContext,
  ItemsImg,
  Loading,
} from "../../components";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { path } from "../../ultils/constant";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "none" }} />;
}

const HomePage = () => {
  const { GrPrevious, GrNext } = icons;
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);
  const fetchData = async () => {
    dispatch(actions.getCategories());
    dispatch(actions.getProduct());
  };

  //PanginateCategory
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const endOffset = itemOffset + itemsPerPage;
  const currentItemsCategories = categories
    .filter((item) => item.status === 1 && item?.images?.length > 0)
    .slice(itemOffset, endOffset);
  //PanginateProduct
  const [itemOffsetProduct, setItemOffsetProduct] = useState(0);
  const [itemsPerPageProduct, setItemsPerPageProduct] = useState(10);

  const endOffsetProduct = itemOffsetProduct + itemsPerPageProduct;
  const currentItemsProduct = products
    .filter((item) => item.pricesale !== 0 && item.status === 1)
    .slice(itemOffsetProduct, endOffsetProduct);

  //PanginateProductFilter
  const [itemOffsetProductfill, setItemOffsetProductfill] = useState(0);
  const [itemsPerPageProductfill, setItemsPerPageProductfill] = useState(12);

  const endOffsetProductfill = itemOffsetProductfill + itemsPerPageProductfill;
  const currentItemsProductfill = products
    .filter((item) => item.pricesale === 0 && item.status === 1)
    .slice(itemOffsetProductfill, endOffsetProductfill);

  const slider = React.useRef(null);
  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const stroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const indexs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className="w-full border border-1 overflow-hidden bg-gray-200 ">
      <img src={imgSlider} alt="img slider " className="sm:max-md:hidden" />
      <div className="w-4/5 mx-auto absolute top-[300px]  sm:max-md:top-[75px] left-32 sm:max-md:left-0 lg:max-xl:left-[10%] sm:max-md:w-full sm:max-md:px-4 rounded-lg overflow-hidden md:max-lg:left-[10%]">
        <Slider ref={slider} {...settings}>
          <div>
            <h3 className="mr-2">
              <img
                src="./img/slide-img1.png"
                alt="anh"
                className="rounded-lg"
              />
            </h3>
          </div>
          <div>
            <h3 className="mr-2">
              <img
                src="./img/slide-img2.png"
                alt="anh"
                className="rounded-lg"
              />
            </h3>
          </div>
          <div>
            <h3 className="mr-2">
              <img
                src="./img/slide-img1.png"
                alt="anh"
                className="rounded-lg"
              />
            </h3>
          </div>
        </Slider>
        <div className="overflow-hidden w-4/5">
          <button
            onClick={() => slider?.current?.slickPrev()}
            className=" absolute top-10 sm:max-md:top-3 lg:max-xl:top-6 md:max-lg:top-2 sm:max-md:left-4 left-0 pt-11 pr-4 pb-10 pl-0 text-left  clip__pathPrev  bg-gray-100"
          >
            <GrPrevious />
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="absolute top-10 sm:max-md:top-3 lg:max-xl:top-6 sm:max-md:right-5 md:max-lg:top-2 right-1 pt-10 pr-0 pb-11 pl-4 clip__pathNext  bg-gray-100"
          >
            <GrNext />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-4/5 mx-auto">
        <div className=" flex w-full mt-[90px] md:max-lg:flex-wrap  sm:max-md:flex-wrap lg:max-xl:mt-[100px] md:max-lg:mt-[125px]  sm:max-md:mt-[130px] justify-center md:max-lg:justify-between  sm:max-md:justify-between gap-3">
          <div className="w-[25%] md:max-lg:w-[49%]  sm:max-md:w-[47.6%] bg-white py-6 sm:max-md:py-3 sm:max-md:px-1 sm:max-md:border sm:max-md:border-red-500 text-[17px] px-2 flex items-center gap-3  justify-start rounded-lg font-light">
            <span className="">
              <img src="./img/img_protect.png" alt="img" className="w-full" />
            </span>
            <span className="lg:max-xl:text-[13px] sm:max-md:text-[12px] ">
              Sản phẩm an toàn
            </span>
          </div>
          <div className="w-[25%]  md:max-lg:w-[49%]  sm:max-md:w-[47.6%] bg-white py-6 sm:max-md:py-3 sm:max-md:px-1 sm:max-md:border sm:max-md:border-red-500 text-[17px] px-2 flex items-center gap-3  justify-start rounded-lg font-light">
            <span>
              <img src="./img/img_hand.png" alt="img" />
            </span>
            <span className="lg:max-xl:text-[13px] sm:max-md:text-[12px]">
              Chất lượng cam kết
            </span>
          </div>
          <div className="w-[25%]  md:max-lg:w-[49%]  sm:max-md:w-[47.6%] bg-white py-6 sm:max-md:py-3 sm:max-md:px-1 sm:max-md:border sm:max-md:border-red-500 text-[17px] px-2 flex items-center gap-3  justify-start rounded-lg font-light">
            <span>
              <img src="./img/img_tick.png" alt="img" />
            </span>
            <span className="lg:max-xl:text-[13px] sm:max-md:text-[12px]">
              Dịch vụ vượt trội
            </span>
          </div>
          <div className="w-[25%]  md:max-lg:w-[49%]  sm:max-md:w-[47.6%] bg-white py-6 sm:max-md:py-3 sm:max-md:px-1 sm:max-md:border sm:max-md:border-red-500 text-[17px] px-2 flex items-center gap-3  justify-start rounded-lg font-light">
            <span>
              <img src="./img/img_truck.png" alt="img" />
            </span>
            <span className="lg:max-xl:text-[13px] sm:max-md:text-[12px]   ">
              Giao hàng nhanh chóng
            </span>
          </div>
        </div>
        <div className=" p-3   bg-white rounded-lg">
          <div className="flex justify-between">
            <h1 className="font-medium uppercase sm:max-md:text-[13px]">
              Danh mục nổi bật
            </h1>
            <Link
              onClick={() => stroll()}
              to={path.CATEGORYALL}
              className="text-[12px] border bg-slate-200 hover:border-red-500 hover:text-red-500 px-2 py-1 rounded-lg"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-8 sm:max-md:hidden md:max-lg:grid-rows-3  md:max-lg:grid-flow-col gap-3 md:max-lg:gap-2 lg:max-xl:gap-2 mt-4">
            {loading ? (
              <Loading />
            ) : (
              <>
                {currentItemsCategories?.length > 0 &&
                  currentItemsCategories.map((items, index) => {
                    return (
                      <Link
                        to={"/category-product/" + items.slug}
                        onClick={() => stroll()}
                        key={index}
                        className="flex flex-col justify-center items-center md:max-lg:h-[100px] h-[126px] min-w-[20%] max-w-full shadow-4md border font-light text-[13px] hover:text-red-500 hover:shadow-red-500/40 rounded-lg cursor-pointer"
                      >
                        <div className="w-[40%] lg:max-xl:w-[60%] md:max-lg:w-[60%]">
                          <ItemsImg images={items?.images} />
                        </div>
                        <span className="text-center md:max-lg:text-[10px]">
                          {items.name}
                        </span>
                      </Link>
                    );
                  })}
              </>
            )}
          </div>
          <div className="hidden  sm:max-md:flex gap-2  overflow-y-hidden overflow-x-auto p-2 ">
            {loading ? (
              <Loading />
            ) : (
              <>
                {currentItemsCategories?.length > 0 &&
                  currentItemsCategories.map((items, index) => {
                    return (
                      <Link
                        to={"/category-product/" + items.slug}
                        onClick={() => stroll()}
                        key={index}
                        className="flex flex-col justify-center items-center md:max-lg:h-[100px] h-[126px] sm:max-md:h-[100px] sm:max-md:min-w-[30%] min-w-[20%] max-w-full  shadow-4md border font-light text-[13px] hover:text-red-500 hover:shadow-red-500/40 rounded-lg cursor-pointer"
                      >
                        <div className="w-1/2 lg:max-xl:w-[60%] md:max-lg:w-[60%] sm:max-md:w-[70%]">
                          <ItemsImg images={items?.images} />
                        </div>
                        <span className="text-center md:max-lg:text-[10px]">
                          {items.name}
                        </span>
                      </Link>
                    );
                  })}
              </>
            )}
          </div>
        </div>
        <div className="  liner__gradient p-5 rounded-xl">
          <div className="flex gap-[25%] sm:max-md:flex-col sm:max-md:gap-2 sm:max-md:justify-center sm:max-md:items-center">
            <div className="uppercase flex items-center gap-1 font-semibold text-yellow-300 sm:max-md:text-[13px]">
              <img
                src="./img/flash.png"
                className="object-cover w-5 h-5"
                alt="img"
              />
              Flash Sale
            </div>
            <div className="text-center text-white  md:max-lg:text-[13px] sm:max-md:text-[12px]">
              Giảm ngay 120k (áp dụng cho các đơn hàng trên 500k)
            </div>
          </div>
          <div className="grid grid-cols-5 md:max-lg:grid-cols-4 gap-4 mt-5  lg:max-xl:gap-2  md:max-lg:gap-2 sm:max-md:hidden">
            {loading ? (
              <Loading />
            ) : (
              <>
                {currentItemsProduct?.length > 0 &&
                  currentItemsProduct.map((items, index) => {
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
              </>
            )}
          </div>
          <div className="hidden sm:max-md:flex overflow-x-auto overflow-y-hidden gap-2 p-2">
            {loading ? (
              <Loading />
            ) : (
              <>
                {products?.length > 0 &&
                  products
                    .filter((item) => item.pricesale !== 0 && item.status === 1)
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
              </>
            )}
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl">
          <div className="grid grid-cols-4 gap-4 w-full  md:max-lg:hidden sm:max-md:hidden">
            <FillterItem text={"Gợi ý cho bạn"} images={"goiy.png"} link={""} />
            <FillterItem
              text={"Xả hàng giảm sốc"}
              images={"iconxahang.png"}
              link={"Xahang"}
            />
            <FillterItem
              text={"Sale cuối hè"}
              images={"iconphan.png"}
              link={"Sale"}
            />
            <FillterItem
              text={"Deal ngon bổ rẻ"}
              images={"icon99k.png"}
              link={"Deal"}
            />
          </div>
          <div className=" hidden  md:max-lg:flex sm:max-md:flex overflow-x-auto overflow-y-hidden gap-2 p-2">
            <FillterItem text={"Gợi ý cho bạn"} images={"goiy.png"} link={""} />
            <FillterItem
              text={"Xả hàng giảm sốc"}
              images={"iconxahang.png"}
              link={"Xahang"}
            />
            <FillterItem
              text={"Sale cuối hè"}
              images={"iconphan.png"}
              link={"Sale"}
            />
            <FillterItem
              text={"Deal ngon bổ rẻ"}
              images={"icon99k.png"}
              link={"Deal"}
            />
          </div>
          <div className="grid grid-cols-6 gap-2 lg:max-xl:grid-cols-4 md:max-lg:grid-cols-3 sm:max-md:grid-cols-2 mt-2 flex-wrap">
            {loading ? (
              <Loading />
            ) : (
              <>
                {currentItemsProductfill?.length > 0 &&
                  currentItemsProductfill.map((items, index) => {
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
              </>
            )}
          </div>
          <Link to={path.PRODUCTALL} onClick={() => stroll()}>
            <button className="rounded-md shadow-25% text-[16px] text-center w-full mt-5 p-1 hover:shadow-red-500 hover:text-red">
              Xem tất cả
            </button>
          </Link>
        </div>
        <div>
          <ItemsContext text={"Điện thoại nổi bật"} left slug="đien-thoai" />
        </div>
        <div>
          <ItemsContext text={"Lattop hot"} right slug="may-tinh" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

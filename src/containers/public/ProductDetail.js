import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../ultils/icons";
import parse from "html-react-parser";

import ProductImagesSlider from "./ProductImagesSlider";
import ProductCategory from "./ProductCategory";
import { Cookies, useCookies } from "react-cookie";
import { apiUpdateProducts } from "../../services";

import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../../components";
import { path } from "../../ultils/constant";
import { numberWithCommas } from "../../ultils/Common/formatVietnameseToString";

const ProductDetail = () => {
  const [cookies, setCookie, getAll] = useCookies(["Cart"]);
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const { AiOutlineHome, GrNext, GrPrevious, AiFillStar, GiShoppingCart } =
    icons;
  const params = useParams();

  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let payload = params?.slug;
  const { dataDetail } = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);
  const { operas } = useSelector((state) => state.opera);

  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [params?.slug]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const fetchData = async () => {
    dispatch(actions.getProductDetail(payload));
    dispatch(actions.getBrand());
    dispatch(actions.getOpera());
  };

  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(
        <AiFillStar className="star-item" size={18} color="yellow" key={i} />
      );
    return stars;
  };
  const handleNumberIncreasing = (count) => {
    if (count < dataDetail?.number) {
      setCount(count + 1);
    }
  };
  const handleNumberReduce = (count) => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleOnchageInput = (e) => {
    if (e.target.value > dataDetail?.number) {
      setCount(dataDetail?.number);
    } else {
      setCount(e.target.value);
    }
  };

  const indexs = [0];

  const submitCart = async () => {
    let idCart = dataDetail?._id;
    let name = dataDetail?.name;
    let price =
      dataDetail?.pricesale > 0 ? dataDetail?.pricesale : dataDetail?.price;
    let number = count;
    let img = dataDetail?.images;
    let brands = dataDetail?.brands?.name;
    let Cartnumber = dataDetail?.number;
    // let images = img.filter((i, index) => indexs.some((i) => i === index))

    const cartArray = [
      {
        _id: idCart,
        name: name,
        price: price,
        number: number,
        images: img,
        brands: brands,
        Cartnumber: Cartnumber,
      },
    ];

    if (isLoggedIn) {
      if (dataDetail?.number >= number) {
        toast.success("Th??m v??o gi??? h??ng th??nh c??ng!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        let cart = "";
        let cartNumber = "";
        if (cookies.Cart) {
          let dataCart = cookies?.Cart?.find((item) => item?._id === idCart);
          let dataList = cookies?.Cart?.filter((item) => item?._id !== idCart);
          // console.log(dataCart);
          // console.log(dataList);
          if (dataCart) {
            cartNumber = {
              ...dataCart,
              number: parseInt(dataCart?.number) + parseInt(count),
            };
            // console.log("CartNumber:", cartNumber);
            if (dataList) {
              cart = dataList;
              // console.log("Cart:", cart);
            }
            // console.log("tole", [...cart, cartNumber]);
            setCookie("Cart", [...cart, cartNumber], { path: "/" });
          } else if (cartNumber === "") {
            setCookie("Cart", [...cookies.Cart, ...cartArray], { path: "/" });
          }
        } else {
          setCookie("Cart", cartArray, { path: "/" });
        }
        let dataNumberDetail = dataDetail?.number - parseInt(count);
        let img = dataDetail?.images;
        let description = dataDetail?.description;
        await apiUpdateProducts({
          ...dataDetail,
          description: description,
          images: img,
          number: dataNumberDetail,
        });
        fetchData();
      } else {
        toast.warn("Th??m v??o gi??? h??ng th???t b???i!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } else {
      toast.info("M???i b???n ????ng nh???p !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setTimeout(function () {
        goLogin(false);
      }, 1100);
    }
  };

  let itemBrand = brands?.filter((items) => items._id === dataDetail?.brandId);
  let itemOpera = operas?.filter((items) => items._id === dataDetail?.operaId);

  // console.log("");
  // console.log(itemBrand);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-[#f1f1f1] ">
            <div className="py-2  shadow-lg bg-white  ">
              <div className="w-[80%] mx-auto text-[13px] flex items-center gap-1 capitalize">
                <AiOutlineHome color="red" />
                Trang ch??? / {dataDetail?.name}
              </div>
            </div>
            <div className="bg-white w-[80%] mx-auto mt-4 p-4 md:max-lg:p-2 sm:max-md:p-2">
              <h2 className="font-medium capitalize text-[20px] py-2 md:max-lg:text-[13px] sm:max-md:text-[13px]">
                {dataDetail?.name}
              </h2>
              <div className="flex w-full gap-5 justify-between ">
                <div className="flex w-[70%] sm:max-md:w-full md:max-lg:w-[65%] gap-3 justify-between">
                  <div className="w-[40%] sm:max-md:w-[50%]  ">
                    <div className="flex w-full flex-col gap-5">
                      {dataDetail?.images && (
                        <ProductImagesSlider images={dataDetail?.images} />
                      )}
                    </div>
                  </div>
                  <div className="w-[60%]  sm:max-md:w-[48%] flex flex-col gap-5 sm:max-md:gap-1">
                    <div className="p-4 md:max-lg:p-2 sm:max-md:p-1 bg-gray-200 flex justify-start gap-2 rounded-md">
                      {dataDetail?.pricesale <= 0 ? (
                        <>
                          <span className="text-[20px] text-red-500 mt-1">
                            {numberWithCommas(parseInt(dataDetail?.price))}
                            <span className="underline">??</span>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="line-through mt-1">
                            {numberWithCommas(parseInt(dataDetail?.price))}
                            <span className="underline">??</span>
                          </span>
                          <span className="text-[20px] text-red-500 ">
                            {numberWithCommas(parseInt(dataDetail?.pricesale))}
                            <span className="underline">??</span>
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 items-center justify-start">
                      <span className="sm:max-md:text-[13px]">
                        ????nh gi??: Ch??a c??
                      </span>
                      <div className="flex items-center justify-start gap-1">
                        {handleStar(dataDetail?.star)}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="sm:max-md:text-[13px]">
                        S??? l?????ng c??n:
                      </span>
                      <span className="text-green-500">
                        {dataDetail?.number > 0 ? dataDetail?.number : 0}
                      </span>
                    </div>
                    <div className="flex gap-2 p-3  md:max-lg:p-1 sm:max-md:p-1">
                      <button
                        className="text-red-500 border w-[40px] h-[40px] rounded-lg hover:border-red-500"
                        onClick={() => handleNumberReduce(count)}
                      >
                        -
                      </button>
                      <button
                        className="text-red-500 border w-[40px] h-[40px] rounded-lg  hover:border-red-500"
                        onClick={() => handleNumberIncreasing(count)}
                      >
                        +
                      </button>
                      <input
                        type="number"
                        className="outline-none border rounded-lg w-[50px]"
                        value={count}
                        min="1"
                        max={dataDetail?.number}
                        onChange={(e) => handleOnchageInput(e)}
                      />
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                      {/* <button className="w-[70%] py-1 cursor-pointer relative img__hover2 overflow-hidden bg-red-600 rounded-lg text-white font-semibold">
                        <div className="bg-[#f2f2f2] w-full rounded-lg h-[58px]   absolute  bg__hover2"></div>
                        <span className="uppercase"> Mua ngay</span>
                        <br />
                        <span className="font-normal text-[10px]">
                          (mua ngay ho???c giao l???y t???i c???a h??ng)
                        </span>
                      </button> */}

                      <button
                        className="flex  justify-center items-center  gap-2 w-full py-2 text-[10px] rounded-lg text-red-600 hover:text-white bg-white hover:bg-red-600  border-2 border-red-600"
                        onClick={() => submitCart(dataDetail)}
                      >
                        <GiShoppingCart size={20} />
                        <span> Th??m v??o gi???</span>
                      </button>
                      <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                    </div>
                    <ul className="text-[12px] list-disc px-10 md:max-lg:hidden sm:max-md:hidden">
                      <li>
                        ????n ?????u th??? th??ch, b???t ph?? m???i t???a game - Chip MediaTek
                        Dimensity 920 5G 8 nh??n si??u m???nh m???
                      </li>
                      <li>
                        Kh??ng gian gi???i tr?? ?????nh cao - M??n h??nh AMOLED 6.67 inch
                        s???c n??t, t???n s??? qu??t 120Hz m?????t m??
                      </li>
                      <li>
                        S???c nhanh th???n t???c, tr??n ?????y n??ng l?????ng - Dung l?????ng pin
                        l???n 4500mAh, s???c nhanh ?????n 120W
                      </li>
                      <li>
                        Tr???i nghi???m nhi???p ???nh c???c ?????nh - Camera ch??nh 108MP, h???
                        tr??? nhi???u ch??? ????? ch???p linh ho???t
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-[30%] md:max-lg:w-[35%]  sm:max-md:hidden">
                  <div className="bg-[#fff3cd] text-[#856404] font-semibold p-6 md:max-lg:p-2 sm:max-md:hidden rounded-lg md:max-lg:text-[13px] sm:max-md:text-[10px]">
                    G???i ngay<span className="text-red-500"> 0824540872</span> ?????
                    ???????c t?? v???n t???t nh???t!
                  </div>
                  <ul className="border rounded-xl mt-4 p-4 md:max-lg:p-2 sm:max-md:p-1 sm:max-md:hidden">
                    <li>
                      T??nh tr???ng:
                      <span
                        className={
                          dataDetail?.number > 0
                            ? "text-green-500 px-2"
                            : "text-red-500 px-2"
                        }
                      >
                        {dataDetail?.number > 0 ? "C??n h??ng" : "H???t h??ng"}
                      </span>
                    </li>
                    <li>
                      Th????ng hi???u:
                      <span className="text-green-500 px-2 ">
                        {itemBrand[0]?.name || "Kh??ng c??"}
                      </span>
                    </li>
                    <li>
                      Lo???i:
                      <span className="text-green-500 px-2">
                        {itemOpera[0]?.name || "Kh??ng c??"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hidden sm:max-md:block ">
                <ul className="border rounded-xl mt-4 p-4 md:max-lg:p-2 sm:max-md:p-1">
                  <li>
                    T??nh tr???ng:
                    <span
                      className={
                        dataDetail?.number > 0
                          ? "text-green-500 px-2"
                          : "text-red-500 px-2"
                      }
                    >
                      {dataDetail?.number > 0 ? "C??n h??ng" : "H???t h??ng"}
                    </span>
                  </li>
                  <li>
                    Th????ng hi???u:
                    <span className="text-green-500 px-2 ">
                      {dataDetail?.brands?.name || "Kh??ng c??"}
                    </span>
                  </li>
                  <li>
                    Lo???i:
                    <span className="text-green-500 px-2">
                      {dataDetail?.operas?.name || "Kh??ng c??"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="w-[70%] mt-4 relative sm:max-md:w-full border-2 p-3 rounded-xl ">
                <h2 className="font-bold">Th??ng tin chi ti???t</h2>

                {!text && (
                  <div>
                    {dataDetail?.description &&
                      parse(dataDetail?.description[0].slice(0, 600))}
                    <button
                      onClick={() => setText(true)}
                      className="bg-white shadow-md absolute bottom-[-20px] px-4 py-2  right-[45%] rounded-md"
                    >
                      Xem t???t c???
                    </button>
                  </div>
                )}
                {text && (
                  <div>
                    {dataDetail?.description &&
                      parse(dataDetail?.description[0])}
                    <button
                      onClick={() => setText(false)}
                      className="bg-white shadow-md absolute bottom-[-20px] px-4 py-2  right-[45%] rounded-md"
                    >
                      Thu g???n
                    </button>
                  </div>
                )}
              </div>
              <div className="w-full mt-4 border-2 p-2   rounded-xl">
                <h2 className="font-semibold">S???n ph???m li??n quan</h2>
                <div>
                  <ProductCategory
                    categoryId={dataDetail?.categoryId}
                    productSlug={dataDetail?.slug}
                  />
                </div>
              </div>
            </div>
          </div>
          )
        </>
      )}
    </div>
  );
};

export default ProductDetail;

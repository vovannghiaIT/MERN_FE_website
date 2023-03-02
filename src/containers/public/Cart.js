import React, { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ItemsImg, NoProduct } from "../../components";
import { apiUpdateProducts } from "../../services";
import { numberWithCommas } from "../../ultils/Common/formatVietnameseToString";
import * as actions from "../../store/actions";
import { toast, ToastContainer } from "react-toastify";
import { path } from "../../ultils/constant";
const Cart = () => {
  const [cookies, setCookie] = useCookies(["Cart"]);

  const navigate = useNavigate();
  // console.log(cookies.Cart);

  const [dataCart, setDataCart] = useState();

  useEffect(() => {
    fetchData();
  }, [dataCart]);
  const fetchData = () => {
    setDataCart(cookies?.Cart);
  };
  // console.log(dataCart)

  const removeCartItem = async (items) => {
    if (cookies?.Cart) {
      let cart = dataCart?.filter((item) => item?._id !== items._id);
      let removeCart = dataCart?.find((item) => item?._id === items._id);
      let backNumber =
        parseInt(removeCart?.Cartnumber - parseInt(removeCart?.number)) +
        parseInt(removeCart?.number);
      let img = items?.images;
      setCookie("Cart", [...cart], { path: "/" });
      await apiUpdateProducts({ ...items, images: img, number: backNumber });
      setDataCart([...cart]);
    }
  };
  const backHome = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };
  const NumberUp = async (items) => {
    let cartNumber = dataCart?.find((item) => item?._id === items._id);

    let cart = dataCart?.filter((item) => item?._id !== items._id);

    let numberQty = {
      ...cartNumber,
      number: parseInt(cartNumber?.number) + 1,
      Cartnumber: parseInt(cartNumber?.Cartnumber) - 1,
    };
    // console.log("total", [...cart, numberQty]);
    if (cartNumber?.number < cartNumber?.Cartnumber) {
      toast.success("Tăng số lượng thành công!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setCookie("Cart", [numberQty, ...cart]);
      setDataCart([numberQty, ...cart]);
      let img = items?.images;

      // await apiUpdateProducts({
      //   ...cartNumber,
      //   images: img,
      //   number:
      //     parseInt(cartNumber?.Cartnumber) - (parseInt(items?.number) - 1) - 1,
      // });
    } else {
      toast.warn("Tăng số lượng thất bại!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };
  const NumberDown = (items) => {
    let cartNumber = dataCart?.find((item) => item?._id === items._id);

    let cart = dataCart?.filter((item) => item?._id !== items._id);

    let numberQty = {
      ...cartNumber,
      number: parseInt(cartNumber?.number) - 1,
      Cartnumber: parseInt(cartNumber?.Cartnumber) + 1,
    };
    // console.log("total", [...cart, numberQty]);
    if (cartNumber?.number > 0) {
      toast.success("Giảm số lượng thành công!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setCookie("Cart", [numberQty, ...cart]);
      setDataCart([numberQty, ...cart]);
      let img = items?.images;

      // await apiUpdateProducts({
      //   ...cartNumber,
      //   images: img,
      //   number:
      //     parseInt(cartNumber?.Cartnumber) - (parseInt(items?.number) - 1) - 1,
      // });
    } else {
      toast.warn("Tăng số lượng thất bại!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };
  // console.log(dataCart)
  let total = 0;
  const totalCart = () => {
    dataCart?.length > 0 &&
      dataCart?.map((item) => {
        return (total += item.price * item.number);
      });
    return numberWithCommas(total);
  };
  const indexs = [0];

  const handleSubmitDeleteCart = async () => {
    if (cookies?.Cart) {
      let cart = "";
      for (let i = 0; i < dataCart.length; i++) {
        cart = dataCart?.filter((items) => items?._id === dataCart[i]?._id);
        let backNumber = cart[0]?.Cartnumber;
        let img = cart[0]?.images;
        // console.log({ ...cart[0], images: img, number: backNumber }); // api
        await apiUpdateProducts({
          ...cart[0],
          images: img,
          number: backNumber,
        });
      }
      setCookie("Cart", "", { path: "/" });
      setDataCart("");
    }
  };
  return (
    <div>
      <div className=" mx-auto mt-2 w-full ">
        <div className="flex  sm:max-md:flex-col shadow-md my-2">
          <div className="w-3/4 md:max-lg:w-[80%] sm:max-md:w-full  sm:max-md:px-4 sm:max-md:py-2  bg-white px-10 py-2 md:max-lg:px-2">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl  sm:max-md:text-[13px]">
                Giỏ hàng
              </h1>
              <h2 className="font-semibold text-2xl  sm:max-md:text-[13px]">
                {" "}
                {cookies?.Cart?.length > 0 ? cookies?.Cart?.length : 0} sản phẩm
              </h2>
            </div>
            {dataCart?.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-2 mb-5  -mx-8 px-6 md:max-lg:px-2 md:max-lg:mb-2 text-center">
                <h3 className="font-semibold sm:max-md:text-[13px] text-gray-600 text-xs uppercase md:max-lg:text-[12px]">
                  sản phẩm
                </h3>
                <h3 className="font-semibold sm:max-md:text-[13px] text-center text-gray-600 text-xs uppercase  md:max-lg:text-[13px] ">
                  Số lượng
                </h3>
                <h3 className="font-semibold sm:max-md:text-[13px] text-center text-gray-600 text-xs uppercase md:max-lg:text-[13px]  ">
                  Giá
                </h3>
                <h3 className="font-semibold sm:max-md:text-[13px] text-center text-gray-600 text-xs uppercase  md:max-lg:text-[13px] ">
                  Tổng
                </h3>
              </div>
            )}

            {dataCart?.length > 0 &&
              dataCart?.map((items, index) => {
                return (
                  <div
                    className="grid grid-cols-4  gap-4 items-center hover:bg-gray-100 lg:max-xl:py-2 -mx-8 px-6 py-5 "
                    key={index}
                  >
                    <div className="flex  gap-2">
                      <div className=" w-[50px]  sm:max-md:hidden ">
                        {items?.images?.length > 0 &&
                          items?.images
                            .filter((i, index) =>
                              indexs.some((i) => i === index)
                            )
                            ?.map((i, index) => {
                              return (
                                <img
                                  key={index}
                                  className="object-cover h-[50px] "
                                  src={i}
                                  alt="images cart"
                                />
                              );
                            })}
                      </div>
                      <div className="flex flex-col gap-1 ">
                        <span className="font-bold text-sm  sm:max-md:text-[10px]">
                          {items?.name}
                        </span>
                        <span className="text-red-500 text-xs">
                          {items?.brands}
                        </span>
                        <button
                          onClick={() => removeCartItem(items)}
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs text-start  sm:max-md:text-[10px]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-center sm:max-md:row-span-2  sm:max-md:col-span-1 overflow-hidden ">
                      <button onClick={() => NumberDown(items)} className="p-2">
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>

                      <input
                        className="mx-2 border text-center w-12"
                        type="text"
                        value={items?.number}
                      />

                      <button onClick={() => NumberUp(items)} className="p-2">
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
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
                    <span className="text-center  font-semibold text-sm">
                      {numberWithCommas(items?.price)}
                    </span>
                    <span className="text-center font-semibold text-sm">
                      {numberWithCommas(items?.price * items?.number)}
                    </span>
                  </div>
                );
              })}
            {cookies?.Cart?.length <= 0 && <NoProduct />}
            <button
              onClick={() => backHome()}
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Tiếp tục mua sắm
            </button>
          </div>

          <div
            id="summary"
            className="w-1/4  sm:max-md:w-full  sm:max-md:py-2 px-2 py-10"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              {/* Order Summary */}
            </h1>
            {/* <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items 3</span>
              <span className="font-semibold text-sm">590$</span>
            </div> */}
            <div>
              {/* <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select> */}
            </div>
            <div className="py-10">
              <label className="font-semibold inline-block mb-3 text-sm uppercase">
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Tổng chi phí</span>

                <span>{totalCart()}</span>
              </div>
              <Link to={"/" + path.PAY}>
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                  Thanh Toán
                </button>
              </Link>
              <button
                onClick={() => handleSubmitDeleteCart()}
                className="mt-2 px-3 py-2 rounded-lg text-[16px] text-white bg-black hover:bg-slate-500 w-full"
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

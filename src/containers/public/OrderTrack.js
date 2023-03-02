import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultils/icons";
import * as actions from "../../store/actions";
import { NoProduct } from "../../components";

const OrderTrack = () => {
  const {
    AiOutlineHome,
    RiArrowUpSFill,
    RiArrowDropDownFill,
    AiFillCheckCircle,
  } = icons;
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { orderdetails } = useSelector((state) => state.orderdetail);
  const { currentData } = useSelector((state) => state.user);
  const [showOrder, setShowOrder] = useState(false);
  const [modalIndex, setModalIndex] = useState();
  const [dataOrder, setDataOrder] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(actions.getOrder());
    dispatch(actions.getOrderDetail());
    dispatch(actions.getCurrent());
  };

  useEffect(() => {
    fectchOrder();
  }, [orders]);

  const fectchOrder = () => {
    let data = orders?.filter((items) => items?.userId === currentData?._id);
    setDataOrder(data);
  };

  const toggleModals = (index) => {
    // console.log(index)
    setShowOrder(true);
    setModalIndex(index);
  };
  //   console.log("modalIndex", modalIndex);
  // console.log("dataOrder", dataOrder);
  return (
    <div className="bg-[#f1f1f1] w-full">
      <div className="py-1 shadow-lg ">
        <div className="w-[80%] mx-auto text-[13px] flex items-center gap-1">
          <AiOutlineHome color="red" />
          Trang chủ / theo dõi đơn hàng
        </div>
      </div>
      <div className="w-[80%]  md:max-lg:w-[96%] sm:max-md:w-full mx-auto items-center mt-5 bg-[#f1f1f1]">
        <div className="font-semibold text-lg p-2">
          Danh sách đơn hàng đã đặt
        </div>
        <div className="bg-white flex flex-col gap-4 rounded-md p-2">
          {dataOrder
            .filter((item) => item.status !== 0)
            .map((items, index) => {
              return (
                <div
                  className="shadow-4md   rounded-lg"
                  key={index}
                  onClick={() => toggleModals(index)}
                >
                  <div className=" p-4 w-full  rounded-lg grid grid-cols-4    gap-2">
                    <div className="flex flex-col gap-2">
                      <span className="sm:max-md:text-[12px]">Mã đơn hàng</span>
                      <span className="text-red-500 sm:max-md:text-[12px]">
                        {items?.code}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span>Người nhận hàng</span>
                      <span className="text-red-500">
                        {items?.deliveryname}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span>Trạng thái đơn hàng</span>
                      {items?.status === 1 && (
                        <span className="px-2  w-[60%] text-center text-xs  font-semibold rounded-full bg-red-100 text-red-800">
                          {items?.status === 1 && "đang chờ xác nhận"}
                        </span>
                      )}
                      {items?.status === 2 && (
                        <span className="px-2 w-[60%] text-center text-xs  font-semibold rounded-full bg-blue-100 text-blue-800">
                          {items?.status === 2 && "đang giao hàng"}
                        </span>
                      )}
                      {items?.status === 3 && (
                        <span className="px-2  w-[60%] text-center text-xs  font-semibold rounded-full bg-green-100 text-green-800">
                          {items?.status === 3 && "giao thành công"}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-2">
                        <span>Ngày đặt hàng</span>
                        <span className="text-red-500">
                          {items?.exportdate}
                        </span>
                      </div>
                      {/* <button
                        onClick={() => toggleModals(index)}
                        className="text-xs"
                      >
                        <RiArrowDropDownFill size={25} />
                      
                      </button> */}
                    </div>
                  </div>
                  {showOrder && modalIndex === index && (
                    <div className="text-center w-full flex justify-center items-center">
                      <div className="w-full">
                        <div className="w-[75%] mx-auto flex relative justify-between pt-2 px-8">
                          <span
                            className="  rounded-xl  w-6 h-6 order-tracking "
                            data-bg={`${
                              items?.status === 2 ? "green" : "#f7be16"
                            }`}
                          >
                            <AiFillCheckCircle size={24} color="green" />
                          </span>

                          <span
                            className=" rounded-xl w-6 h-6 order-trackingTwo "
                            data-bg={`${
                              items?.status === 3 ? "green" : "#f7be16"
                            }`}
                          >
                            <AiFillCheckCircle size={24} color="green" />
                          </span>
                          <span className=" rounded-xl w-6 h-6 ">
                            <AiFillCheckCircle size={24} color="green" />
                          </span>
                        </div>
                        <div className="w-full flex justify-between items-center pb-2 pt-0 px-2">
                          <span
                            className={`w-[33.33%]  ${
                              items?.status === 1 || items?.status === 2
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            Đang chờ xác nhận
                          </span>
                          <span
                            className={`w-[33.33%]  ${
                              items?.status === 2 || items?.status === 3
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            Đang giao hàng
                          </span>
                          <span
                            className={`w-[33.33%]  ${
                              items?.status === 3 ? "text-green-500" : ""
                            }`}
                          >
                            Đã giao
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          {dataOrder.length <= 0 && <NoProduct />}
        </div>
      </div>
    </div>
  );
};

export default OrderTrack;

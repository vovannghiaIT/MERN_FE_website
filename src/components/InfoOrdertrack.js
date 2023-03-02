import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../ultils/constant";
import * as action from "../store/actions";

const InfoOrdertrack = () => {
  const { currentData } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const [dataOrder, setDataOrder] = useState([]);

  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(action.getCurrent());
    dispatch(action.getOrder());
    dispatch(action.getCurrent());
  };

  useEffect(() => {
    fectchOrder();
  }, [orders]);

  const fectchOrder = () => {
    let data = orders?.filter((items) => items?.userId === currentData?._id);
    setDataOrder(data);
  };
  return (
    <Link
      to={"/" + path.ORDERTRACK}
      className="w-1/2 p-5 bg-white  flex flex-col gap-2 justify-center items-center relative shadow-10% rounded-xl"
    >
      <img
        src="./img/checklist.png"
        alt="checklist"
        className="object-cover w-7 h-7 "
      />
      <span className="font-semibold text-[14px] sm:max-md:text-[11px]">
        Lịch sử đơn hàng
      </span>
      <span>
        {dataOrder?.length > 0 &&
          dataOrder
            .filter((item) => item.status !== 0)
            .map((iCount, index) => {
              let count = 0;
              count = index + 1;
              return (
                <span
                  key={index}
                  className="absolute top-[40%] right-[45%] text-center bg-red-600 rounded-xl w-[20px] h-[20px] leading-[20px] text-white text-[9px] "
                >
                  {count}
                </span>
              );
            })}
        {dataOrder?.length <= 0 && (
          <span className="absolute top-[40%] right-[45%] text-center bg-red-600 rounded-xl w-[20px] h-[20px] leading-[20px] text-white text-[9px] ">
            0
          </span>
        )}
      </span>
    </Link>
  );
};

export default InfoOrdertrack;

import React, { useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { numberWithCommas } from "../../ultils/Common/formatVietnameseToString";

const HomeAdmin = () => {
  const { BsBag, MdOutlineAttachMoney, FaUsers } = icons;
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale
  );

  const dispatch = useDispatch();
  const date = new Date();
  const { orders } = useSelector((state) => state.order);
  const { orderdetails } = useSelector((state) => state.orderdetail);
  const { users } = useSelector((state) => state.user);
  const [fullYear, setFullYear] = useState("1");
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchData();
    totalCartMonth();
    totalCartYear();
    setFullYear("1");
    checkYear();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getOrder());
    dispatch(actions.getOrderDetail());
    dispatch(actions.getUserAll());
  };
  useEffect(() => {
    TopUser();
  }, [users]);

  let totalMonth = 0;
  let totalYear = 0;
  const totalCartMonth = () => {
    let month = date.getMonth() + 1;
    orderdetails?.length > 0 &&
      orderdetails
        .filter((items) => new Date(items.createdAt).getMonth() + 1 === month)
        .map((item) => {
          return (totalMonth += item.price * item.quantity);
        });
    return numberWithCommas(totalMonth);
  };
  const totalCartYear = () => {
    // let year = date.getFullYear();
    orderdetails?.length > 0 &&
      orderdetails
        // .filter((items) => new Date(items.createdAt).getFullYear() === year)
        .map((item) => {
          return (totalYear += item.price * item.quantity);
        });
    return numberWithCommas(totalYear);
  };

  totalCartMonth();
  totalCartYear();

  // chart
  let chartDataDate = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];
  let chartDataMonth = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  let chartDataYear = ["2022", "2023", "2024", "2025", "2026"];

  let check = "";
  const checkYear = () => {
    if (fullYear === "1") {
      return (check = chartDataDate);
    }
    if (fullYear === "2") {
      return (check = chartDataMonth);
    }
    if (fullYear === "3") {
      return (check = chartDataYear);
    }
  };
  checkYear();

  let sortable = [];

  const TopUser = () => {
    sortable = users.sort((first, last) => {
      return last.amount ? last.amount : 0 - first.amount;
    });

    // console.log("sortable", sortable);
  };
  TopUser();
  //PanginateProductFilter
  const [itemOffsetUserfill, setItemOffsetUserfill] = useState(0);
  const [itemsPerPageUserfill, setItemsPerPageUserfill] = useState(5);

  const endOffsetUserfill = itemOffsetUserfill + itemsPerPageUserfill;
  const currentItemsUserfill = sortable
    .filter((item) => item.status === 1)
    .slice(itemOffsetUserfill, endOffsetUserfill);

  let numberOrderProduct = 0;
  const numberProduct = () => {
    let arrayNumber = orderdetails?.map((items) => items?.quantity);
    // console.log(arrayNumber);
    for (let i = 0; i <= arrayNumber?.length; i++) {
      if (arrayNumber[i]) {
        numberOrderProduct = numberOrderProduct + parseInt(arrayNumber[i]);
      }
    }
  };
  numberProduct();
  return (
    <div className="w-[95%] mx-auto  mt-3 rounded-md p-2 ">
      <h1 className="font-semibold text-slate-800 bg-white p-2 rounded-md">
        Thống kê
      </h1>
      <div className="  mt-5 grid grid-cols-4 gap-4 ">
        <span className="bg-white rounded-md border border-l-blue-400 border-l-4  shadow-4md">
          <div className="flex  justify-center items-center gap-2 px-3 w-full py-4">
            <span className="w-[80%] h-full flex flex-col gap-2 justify-between ">
              <h1 className="uppercase text-sm text-blue-400">Người dùng</h1>
              <span>{users?.length}</span>
            </span>
            <span className="w-[20%]">
              <FaUsers size={30} color="blue" />
            </span>
          </div>
        </span>
        <span className="bg-white rounded-md border border-l-green-400 border-l-4  shadow-4md">
          <div className="flex justify-center items-center gap-2 px-3 w-full py-4">
            <span className="w-[80%] h-full flex flex-col gap-2 justify-between">
              <h1 className="uppercase text-sm text-green-400">Tổng tiền</h1>
              <span>
                {numberWithCommas(totalYear)}
                <sup>đ</sup>
              </span>
            </span>
            <span className="w-[20%]">
              <MdOutlineAttachMoney size={30} color="green" />
            </span>
          </div>
        </span>
        <span className="bg-white rounded-md border border-l-yellow-400 border-l-4  shadow-4md">
          <div className="flex justify-center items-center gap-2 px-3 w-full py-4">
            <span className="w-[80%] h-full flex flex-col gap-1 justify-between">
              <h1 className="uppercase text-sm text-yellow-400">
                sản phẩm đã bán
              </h1>
              <span>{numberOrderProduct} sản phẩm</span>
            </span>
            <span className="w-[20%]">
              <BsBag size={30} color="yellow" />
            </span>
          </div>
        </span>
        <span className="bg-white rounded-md border border-l-red-400 border-l-4  shadow-4md">
          <div className="flex justify-center items-center gap-2 px-3 w-full py-4">
            <span className="w-[80%] h-full flex flex-col gap-1 justify-between">
              <h1 className="uppercase text-sm text-red-400">
                đơn hàng đã đặt
              </h1>
              <span>{orders?.length} đơn hàng</span>
            </span>
            <span className="w-[20%]">
              <BsBag size={30} color="red" />
            </span>
          </div>
        </span>
      </div>
      <div className="bg-white mt-5 rounded-lg  shadow-md p-4 w-full">
        <div className="flex justify-end">
          <select
            className="w-[10%]"
            onChange={(e) => setFullYear(e.target.value)}
          >
            <option value={1}>Tuần</option>
            <option value={2}>Tháng</option>
            <option value={3}>Năm</option>
          </select>
        </div>
        <Line
          data={{
            labels: check,
            datasets: [
              {
                data: [1, 2, 3, 9, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false,
              },
            ],
          }}
          options={{
            responsive: true,
            interaction: {
              mode: "index",
              intersect: false,
            },
            stacked: false,
            plugins: {
              title: {
                display: true,
                text: `Biểu đồ Doanh thu theo ${
                  fullYear === "1"
                    ? "Tuần"
                    : fullYear === "2"
                    ? "Tháng"
                    : fullYear === "3"
                    ? "Năm"
                    : ""
                } `,
              },
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          }}
        />
      </div>
      <div className="mt-5 bg-white w-full rounded-md shadow-4md p-2">
        <h1 className="font-semibold text-red-500">Top người đặt hàng</h1>
        <div className="mt-4 grid grid-cols-5 gap-4">
          <h1 className="text-green-500 text-center font-semibold">
            Số thứ tự
          </h1>
          <h1 className="text-green-500 text-center font-semibold">Họ tên</h1>
          <h1 className="text-green-500 text-center font-semibold">Email</h1>
          <h1 className="text-green-500 text-center font-semibold">
            Số đơn hàng đã đặt
          </h1>
          <h1 className="text-green-500 text-center font-semibold">
            Tổng tiền đã mua
          </h1>
        </div>
        <div className="mt-3  ">
          {currentItemsUserfill?.length > 0 &&
            currentItemsUserfill.map((items, index) => {
              return (
                <div
                  className="shadow-4md rounded-md p-2 grid grid-cols-5 gap-4 mt-3 hover:text-red-500 cursor-pointer"
                  key={index}
                >
                  <h1 className="text-center">{index + 1}</h1>
                  <h1 className="text-center">
                    {items?.firstName + " "}
                    {items?.lastName}
                  </h1>
                  <h1 className="text-center">{items?.email}</h1>
                  <h1 className="text-center">
                    {items?.orders ? items?.orders : "Chưa đặt hàng"}
                  </h1>

                  <h1 className="text-center">
                    {items?.amount ? numberWithCommas(items?.amount) : 0}
                    <sup>đ</sup>
                  </h1>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;

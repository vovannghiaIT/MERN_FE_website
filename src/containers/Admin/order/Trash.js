import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../../ultils/icons";
import * as actions from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  apiDeleteOrder,
  apiDeleteOrderDetail,
  apiUpdateOrder,
} from "../../../services";

const Trash = () => {
  const { RiArrowGoBackFill } = icons;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);
  const { orderdetails } = useSelector((state) => state.orderdetail);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getOrder());
  };
  const submitTranshStatus = (items) => {
    Swal.fire({
      title: "Bạn muốn khôi phục? <br/>" + items?.code,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "vâng, chắc chắn rồi!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("khôi phục thành công!", "Bạn đã khôi phục.", "success");
        await apiUpdateOrder({ ...items, status: 1 });
        fetchData();
      }
    });
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);

  const fetchDataDetail = async () => {
    dispatch(actions.getOrderDetail());
  };

  const submitDelete = (items) => {
    let data = orderdetails?.filter((item) => item?.orderId === items?.id);
    Swal.fire({
      title: "Bạn muốn xóa? <br/>" + items?.code,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "vâng, chắc chắn rồi!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Xóa thành công!", "", "success");
        console.log({ ...items, id: items.id });
        await apiDeleteOrder({ ...items, id: items.id });
        for (let i = 0; i < data?.length; i++) {
          let id = data[i].id;

          await apiDeleteOrderDetail({ ...data[i], id: id });
        }
        fetchData();
        fetchDataDetail();
      }
    });
  };
  return (
    <>
      <div className="w-full mt-[50px]">
        <div className="w-[90%]  mx-auto">
          <div className="bg-white mt-12">
            <div className="w-full  bg-gray-100">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h1 className="text-3xl mt-7 font-bolder leading-tight text-gray-900">
                      Thùng rác
                    </h1>
                  </div>
                  <div className="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                    <div className="flex items-center py-2">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-searcg"
                        type="text"
                        placeholder="Search"
                      />
                    </div>
                    <div className="flex items-center py-2 gap-3">
                      <button
                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
                        onClick={() => navigate(-1)}
                      >
                        Trở về
                      </button>
                    </div>
                  </div>
                  <div className="my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200 bg-white leading-4 tracking-wider text-base text-gray-900">
                            <th
                              className="px-6 py-5 text-left bg-white w-full"
                              colSpan="12"
                            >
                              <input
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                type="checkbox"
                              />
                            </th>
                          </tr>
                          <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-3 text-left font-medium ">
                              <input
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                type="checkbox"
                              />
                            </th>
                            <th className="px-6 py-3 text-left font-medium">
                              Mã đơn hàng
                            </th>
                            <th className="px-6 py-3 text-left font-medium">
                              Người đặt hàng
                            </th>
                            <th className="px-6 py-3 text-left font-medium">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left font-medium">
                              Created
                            </th>
                            <th className="px-6 py-3 text-left font-medium">
                              Cpdated
                            </th>
                            <th className="px-6 py-3 text-left font-medium"></th>
                            <th className="px-6 py-3 text-left font-medium"></th>
                          </tr>
                        </thead>

                        <tbody className="bg-white">
                          {orders?.length > 0 &&
                            orders
                              .filter((item) => item.status === 0)
                              .map((items, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <input
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        type="checkbox"
                                      />
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {items?.code}
                                      </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {items?.deliveryname}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      {items.status === 1 && (
                                        <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                          {items?.status === 1 &&
                                            "đang chờ xác nhận"}
                                        </span>
                                      )}
                                      {items?.status === 2 && (
                                        <span className="px-2 text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                          {items?.status === 2 &&
                                            "đang giao hàng"}
                                        </span>
                                      )}
                                      {items?.status === 3 && (
                                        <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                          {items?.status === 3 &&
                                            "giao thành công"}
                                        </span>
                                      )}
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        {items.status === 0 && "delete"}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                      {new Date(
                                        items.created_at
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                      {new Date(
                                        items.updated_at
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4  whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                      <button
                                        className="text-indigo-600 px-2   hover:text-indigo-900 focus:outline-none focus:underline"
                                        onClick={() =>
                                          submitTranshStatus(items)
                                        }
                                      >
                                        <RiArrowGoBackFill />
                                      </button>
                                    </td>
                                    <td className="px-6 py-4  whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                      <button
                                        className="text-indigo-600  px-2 hover:text-indigo-900 focus:outline-none focus:underline"
                                        onClick={() => submitDelete(items)}
                                      >
                                        delete
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trash;

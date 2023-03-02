import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import icons from "../ultils/icons";
import * as actions from "../store/actions";
import { ToastContainer } from "react-toastify";

const InFoUser = () => {
  const {
    AiFillHome,
    AiOutlineHome,
    AiOutlineUser,
    GoLocation,
    FaExchangeAlt,
    SlLogout,
  } = icons;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <ul className="w-full p-5 mb-5  bg-white  flex flex-col gap-4 justify-start items-start relative shadow-10% rounded-xl">
      <li className="list-none flex  gap-4 cursor-pointer border-b-[1.2px] w-full  py-2 justify-start items-center">
        <AiOutlineUser />
        <NavLink
          to={"/tai-khoan"}
          className={({ isActive }) =>
            isActive
              ? " text-red-600  font-semibold hover:text-red-600"
              : " hover:text-red-600  "
          }
        >
          Thông tin tài khoản
        </NavLink>
      </li>
      <li className="list-none flex  gap-4 cursor-pointer border-b-[1.2px] w-full  py-2 justify-start items-center">
        <GoLocation />
        <NavLink
          to={"/dia-chi"}
          className={({ isActive }) =>
            isActive
              ? " text-red-600  font-semibold hover:text-red-600"
              : "  hover:text-red-600 "
          }
        >
          Quản lý địa chỉ
        </NavLink>
      </li>
      <li className="list-none flex  gap-4 cursor-pointer border-b-[1.2px] w-full  py-2 justify-start items-center">
        <FaExchangeAlt />
        <NavLink
          to={"/mat-khau"}
          className={({ isActive }) =>
            isActive
              ? " text-red-600  font-semibold hover:text-red-600"
              : "  hover:text-red-600 "
          }
        >
          Đổi mật khẩu
        </NavLink>
      </li>
      <li className="list-none flex  gap-4 cursor-pointer  w-full  py-2 justify-start items-center">
        <SlLogout />
        <button
          className="hover:text-red-600"
          onClick={() => {
            dispatch(actions.logout());
            navigate(-1);
          }}
        >
          Đăng xuất
        </button>
      </li>
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
    </ul>
  );
};

export default InFoUser;

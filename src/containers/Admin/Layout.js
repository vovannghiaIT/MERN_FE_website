import React, { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { path } from "../../ultils/constant";
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    fetchCurrent();
  }, []);

  useEffect(() => {
    !isLoggedIn && navigate(path.HOME);
    currentData.roles !== 1 && navigate(path.HOME);
  });
  const fetchCurrent = async () => {
    dispatch(actions.getCurrent());
  };
  const { currentData } = useSelector((state) => state.user);

  return (
    <>
      {isLoggedIn && currentData?.roles === 1 && (
        <div className="w-full flex flex-wrap ">
          <div className="bg-[#263544] w-[20%] text-white overflow-auto h-screen">
            <Header />
          </div>
          <div className="w-[80%] bg-gray-300 overflow-auto h-screen ">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;

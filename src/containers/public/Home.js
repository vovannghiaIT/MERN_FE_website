import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import * as actions from "../../store/actions";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getProduct());
    dispatch(actions.getBrand());
    dispatch(actions.getCategories());
    dispatch(actions.getOpera());
    dispatch(actions.getOpera());
    dispatch(actions.getOrder());
    dispatch(actions.getOrderDetail());
    dispatch(actions.getCurrent());
    dispatch(actions.getSearchProduct());
    dispatch(actions.getUserAll());
  };
  return (
    <div className="w-full ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;

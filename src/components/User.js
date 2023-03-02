import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../ultils/constant";
import * as actions from "../store/actions";

const User = () => {
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchCurrent();
  }, [isLoggedIn]);

  const fetchCurrent = async () => {
    dispatch(actions.getCurrent());
  };
  const { currentData } = useSelector((state) => state.user);

  // console.log(currentData);
  if (!currentData?.firstName) {
    fetchCurrent();
  }
  return (
    <div className="flex items-center gap-2 ">
      <div className="flex flex-col">
        {/* <img alt="avatar"/> */}
        <Link to={path.INFO}>
          Xin chào,
          <span className="font-semibold">
            {currentData?.firstName} {currentData?.lastName}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default User;

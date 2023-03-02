import React, { useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InfoOrdertrack, InFoUser, ItemsImg } from "../../components";
import data from "../../ultils/Common/data.json";
import { apiUpdateUsers, apiUpdateUsersOld } from "../../services";
import { toast } from "react-toastify";
import * as action from "../../store/actions";
import avatar from "../../assets/avatar.png";

const Address = () => {
  const { currentData } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  // address
  const [dataAddress, setDataAddress] = useState();
  const [dataCity, setDataCity] = useState();
  const [dataDistricts, setDataDistricts] = useState();
  const [IdDistricts, setIdDistricts] = useState();
  const [idWard, setIdWard] = useState();
  const [dataWards, setDataWards] = useState();

  const { AiOutlineHome } = icons;

  //address
  useEffect(() => {
    fectDataAddress();
    fetchData();
  }, []);

  useEffect(() => {
    fectDataDistrict();
  }, [dataCity]);
  useEffect(() => {
    fectDataWard();
  }, [IdDistricts]);

  const fetchData = async () => {
    dispatch(action.getCurrent());
  };

  const fectDataAddress = async () => {
    await setDataAddress(data);
  };

  const fectDataDistrict = async () => {
    let idCity = dataCity;
    let dataDistrict = data?.filter((item) => item?.Name === idCity);
    await setDataDistricts(dataDistrict[0]?.Districts);
  };

  const fectDataWard = async () => {
    if (IdDistricts) {
      let idWard = IdDistricts;
      let dataDistrict = dataDistricts?.filter((item) => item?.Name === idWard);

      await setDataWards(dataDistrict[0]?.Wards);
    }
  };

  const setDefaultvalue = (e) => {
    setDataCity(e.target.value);
    if (e.target.value === "DEFAULT") {
      setDataWards();
    }
  };

  const handleSubmitAddress = async () => {
    if (dataCity && IdDistricts && idWard && currentData) {
      let address = dataCity + "," + IdDistricts + "," + idWard;
      let img = currentData?.avatar || null;
      let gender = 0;
      // console.log(currentData);

      await apiUpdateUsersOld({
        ...currentData,
        gender: gender,
        avatar: img,
        address: address,
      });
      toast.success("Thêm địa chỉ thành công!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setModal(false);
    } else {
      toast.warn("vui lòng nhập địa chỉ!", {
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
  return (
    <div className="bg-[#f1f1f1] w-full">
      <div className="py-1 shadow-lg ">
        <div className="w-[80%] mx-auto text-[13px] flex items-center gap-1">
          <AiOutlineHome color="red" />
          Trang chủ / Tài khoản
        </div>
      </div>
      <div className="w-[80%] md:max-lg:w-[96%]  sm:max-md:w-[96%] mx-auto items-center mt-5 bg-[#f1f1f1]">
        <div className="flex justify-between  gap-5  sm:max-md:flex-col   sm:max-md:gap-2 ">
          <div className="flex flex-col gap-5 w-[70%] items-start  sm:max-md:gap-2  sm:max-md:w-[96%]  sm:max-md:mx-auto">
            <div className="flex gap-5  sm:max-md:gap-2 justify-center items-center w-full">
              <InfoOrdertrack />
              <div className="w-1/2 p-5 bg-white  flex flex-col gap-2 justify-center items-center relative shadow-10% rounded-xl">
                <span className="w-8 h-8">
                  {currentData?.avatar && currentData?.avatar.length > 0 ? (
                    <ItemsImg images={currentData?.avatar} />
                  ) : (
                    <img src={avatar} alt="avatar" />
                  )}
                </span>
                <span className="font-semibold text-[14px]  sm:max-md:text-[11px]">
                  {" "}
                  Xin chào {currentData?.firstName + currentData?.lastName}
                </span>
              </div>
            </div>
            <div className="w-full p-5 mb-5 bg-white  sm:max-md:mx-auto  flex flex-col justify-start items-start relative shadow-10% rounded-xl">
              {!modal && (
                <button
                  onClick={() => setModal(true)}
                  className="text-white bg-red-600 rounded-md px-2 py-1"
                >
                  Thêm địa chỉ
                </button>
              )}
              {modal && (
                <div className=" grid grid-cols-3  sm:max-md:grid-cols-1  sm:max-md:w-full gap-2  mt-4">
                  <div className=" relative">
                    <select
                      defaultValue={"DEFAULT"}
                      onChange={(e) => setDefaultvalue(e)}
                    >
                      <option value="DEFAULT" disabled>
                        ---
                      </option>
                      {dataAddress?.length > 0 &&
                        dataAddress.map((items) => {
                          return (
                            <option key={items.Id} value={items.Name}>
                              {items.Name}
                            </option>
                          );
                        })}
                    </select>
                    <label className="text-[12px] absolute top-[1px] left-2">
                      Tỉnh thành
                    </label>
                    {/* {!dataCity && (
                        <small className="text-red-500 italic ">
                          Bạn không được bỏ trống trường này.
                        </small>
                      )} */}
                  </div>
                  <div className=" relative">
                    <select
                      defaultValue={"DEFAULT"}
                      className={`${dataDistricts ? "" : "bg-gray-200  "}`}
                      onChange={(e) => setIdDistricts(e.target.value)}
                      disabled={!dataDistricts}
                    >
                      <option value="DEFAULT" disabled>
                        ---
                      </option>
                      {dataDistricts?.length > 0 &&
                        dataDistricts.map((items) => {
                          return (
                            <option key={items.Id} value={items.Name}>
                              {items.Name}
                            </option>
                          );
                        })}
                    </select>
                    <label className="text-[12px] absolute top-[1px] left-2">
                      Quận huyện(tùy chọn)
                    </label>
                    {/* {!IdDistricts && (
                        <small className="text-red-500 italic ">
                          Bạn không được bỏ trống trường này.
                        </small>
                      )} */}
                  </div>
                  <div className=" relative">
                    <select
                      defaultValue={"DEFAULT"}
                      className={`${dataWards ? "" : "bg-gray-200"}`}
                      onChange={(e) => setIdWard(e.target.value)}
                      disabled={!dataWards}
                    >
                      <option value="DEFAULT" disabled>
                        ---
                      </option>
                      {dataWards?.length > 0 &&
                        dataWards.map((items) => {
                          return (
                            <option key={items.Id} value={items.Name}>
                              {items.Name}
                            </option>
                          );
                        })}
                    </select>
                    <label className="text-[12px] absolute top-[1px] left-2">
                      Phường xã(tùy chọn)
                    </label>
                    {/* {!idWard && (
                        <small className="text-red-500 italic ">
                          Bạn không được bỏ trống trường này.
                        </small>
                      )} */}
                    <br />
                  </div>
                </div>
              )}
              {modal && (
                <button
                  onClick={() => {
                    handleSubmitAddress();
                  }}
                  className=" mt-2 text-white bg-red-600 rounded-md px-2 py-1"
                >
                  Thêm
                </button>
              )}
            </div>
          </div>
          <div className="w-[30%]  sm:max-md:w-[100%]  sm:max-md:mx-auto">
            <InFoUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

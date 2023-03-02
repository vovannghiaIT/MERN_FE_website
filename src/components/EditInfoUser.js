import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import icons from "../ultils/icons";
import * as action from "../store/actions";
import data from "../ultils/Common/data.json";
import {
  apiUpdateUsers,
  apiUpdateUsersOld,
  apiUploadImages,
} from "../services";
import Loading from "./Loading";
import { toast } from "react-toastify";

const EditInfoUser = ({ modal, setModal, dataEdit }) => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(action.getCurrent());
  };

  // address
  const [dataAddress, setDataAddress] = useState();
  const [dataCity, setDataCity] = useState();
  const [dataDistricts, setDataDistricts] = useState();
  const [IdDistricts, setIdDistricts] = useState();
  const [idWard, setIdWard] = useState();
  const [dataWards, setDataWards] = useState();
  //
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  // console.log(dataEdit);
  const [payload, setPayload] = useState(() => {
    const initData = {
      _id: "",
      firstName: dataEdit?.firstName || "",
      lastName: dataEdit?.lastName || "",
      address: dataEdit?.address || "",
      password: dataEdit?.password || "",
      email: dataEdit?.email || "",
      avatar: dataEdit?.avatar || "",
      phone: dataEdit?.phone || "",
      gender: 0,
      roles: dataEdit?.roles || 0,
      status: 1,
    };
    return initData;
  });

  // console.log(payload);
  useEffect(() => {
    if (modal === true) {
      setPayload({
        _id: "",
        firstName: dataEdit?.firstName || "",
        lastName: dataEdit?.lastName || "",
        address: dataEdit?.address || "",
        password: dataEdit?.password,
        email: dataEdit?.email || "",
        avatar: dataEdit?.avatar || "",
        phone: dataEdit?.phone || "",
      });
    }
  }, [dataEdit]);
  const { FaCamera, ImBin } = icons;

  //address
  useEffect(() => {
    fectDataAddress();
  }, []);

  useEffect(() => {
    fectDataDistrict();
  }, [dataCity]);
  useEffect(() => {
    fectDataWard();
  }, [IdDistricts]);

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

  const handleFile = async (e) => {
    e.stopPropagation();
    setLoading(true);
    const files = e.target.files;
    //biến imhg chứa link ảnh
    let images = [];
    const formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );
      const response = await apiUploadImages(formData);
      // console.log(response);
      if (response.status === 200) {
        images = [...images, response.data?.secure_url];
      }
      setLoading(false);
      setImagesPreview(images);
      setPayload((prev) => ({
        ...prev,
        avatar: images,
      }));
    }
  };
  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));

    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };
  const submitUpdate = async () => {
    let addressvalue = dataCity + "," + IdDistricts + "," + idWard;

    payload.address =
      dataCity && IdDistricts && idWard ? addressvalue : dataEdit?.address;
    let _id = dataEdit?._id;
    payload._id = _id;
    // console.log(payload)
    await apiUpdateUsersOld(payload);
    fetchData();
    setImagesPreview([]);
    setModal(false);
    toast.success("Sữa thông tin thành công!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };
  return (
    <div>
      {modal && (
        <div
          className="fixed z-10 overflow-auto top-0 w-full left-0  "
          onClick={(e) => {
            e.stopPropagation();
            setModal(false);
            setImagesPreview([]);
          }}
        >
          <div className="flex items-center justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity ">
              <div className="fixed inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="mt-[2%] inline-block align-center bg-white rounded-lg text-left  shadow-xl transform transition-all w-[90%] overflow-y-auto "
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="bg-white flex gap-5  px-4 pt-5">
                <div className="w-[60%]">
                  <label>FirstName</label>
                  <input
                    type="text"
                    id="name"
                    value={payload.firstName}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["firstName"]: e.target.value,
                      }))
                    }
                  />
                  <label>LastName</label>
                  <input
                    type="text"
                    id="name"
                    value={payload.lastName}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["lastName"]: e.target.value,
                      }))
                    }
                  />
                  <div className=" input-effect relative">
                    {/* <input
                  id="deliveryaddress"
                  className={`effect-16  has-content w-full`}
                  type="text"
                  placeholder=""
                  value={
                    payload.address ||
                    (dataCity ? dataCity : "") +
                      (dataCity && IdDistricts ? "," : "") +
                      (IdDistricts ? IdDistricts : " ") +
                      (IdDistricts && idWard ? "," : "") +
                      (idWard ? idWard : "")
                  }
                  disabled
                /> */}

                    <label>Địa chỉ(tùy chọn)</label>
                    <span className="focus-border"></span>
                  </div>
                  <div className=" flex gap-2 justify-between mt-4">
                    <div className="w-[33%] relative">
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
                    <div className="w-[33%] relative">
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
                    <div className="w-[33%] relative">
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

                  {/* <label>
                    Password
                    <span className="text-red-500"> *(mật khẩu mới)</span>
                  </label> */}
                  {/* <input
                    type="text"
                    id="name"
                    // value={payload.password}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["password"]: e.target.value,
                      }))
                    }
                  /> */}
                  <label>Email</label>
                  <input
                    type="text"
                    id="email"
                    value={payload.email}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["email"]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="w-[40%]">
                  <div className="w-full border-[3px] border-dashed  h-[150px] flex items-center justify-center   ">
                    {loading ? (
                      <Loading />
                    ) : (
                      <>
                        <label
                          htmlFor="avatar"
                          className="p-5 cursor-pointer flex items-center flex-col  justify-center gap-2"
                        >
                          <FaCamera size={50} color="blue" />
                          <span>Thêm ảnh</span>
                        </label>
                        <input
                          type="file"
                          hidden
                          id="avatar"
                          className="w-full bg-gray-100 p-2 mt-2"
                          onChange={handleFile}
                        />
                      </>
                    )}
                    {invalidFields.length > 0 &&
                      invalidFields.some((i) => i.name === "avatar") && (
                        <small className="text-red-500 italic ">
                          {
                            invalidFields.find((i) => i.name === "avatar")
                              ?.message
                          }
                        </small>
                      )}
                  </div>
                  {/* multiple chọn được nhìu hình */}
                  <div className="mt-2 ">
                    {imagesPreview?.map((item) => {
                      return (
                        <div key={item} className="relative w-1/3 h-1/3 ">
                          <img
                            src={item}
                            alt="preview"
                            className="w-10 h-10 object-cover rounded-md"
                          />
                          <span
                            title="Xóa"
                            onClick={() => handleDeleteImage(item)}
                            className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                          >
                            <ImBin />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <label>Phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={payload.phone}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["phone"]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={() => {
                    setModal(false);
                    setImagesPreview([]);
                  }}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => submitUpdate()}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                >
                  <i className="fas fa-plus"></i> Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditInfoUser;

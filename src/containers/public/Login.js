import React, { useState, useEffect } from "react";
import icons from "../../ultils/icons";
import bgLogin from "../../assets/img/bg_login.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import { apiRegister } from "../../services/auth";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiGetCurrent } from "../../services";

const Login = () => {
  const { FaFacebookF, AiOutlineGooglePlus, AiFillEye, AiFillEyeInvisible } =
    icons;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setisRegister] = useState(location.state?.flag);
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    status: 1,
  });
  const [invalidFields, setInvalidFields] = useState([]);

  useEffect(() => {
    isLoggedIn && fetchCurrent();
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn && navigate(-1);
  }, [isLoggedIn]);

  const fetchCurrent = async () => {
    // const response = await apiGetCurrent();
    // console.log(response);
    dispatch(actions.getCurrent());
  };

  // console.log(location);
  const handleFrom = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          email: payload.email,
          password: payload.password,
        };
    let invalids = validate(finalPayload);
    if (invalids === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
  };
  const handleFromKey = async (e) => {
    if (e.key === "Enter") {
      let finalPayload = isRegister
        ? payload
        : {
            email: payload.email,
            password: payload.password,
          };
      let invalids = validate(finalPayload);
      if (invalids === 0)
        isRegister
          ? dispatch(actions.register(payload))
          : dispatch(actions.login(payload));
    }
  };
  const handleSubmit = async () => {
    if (isRegister === true) {
      setisRegister(false);
    } else {
      setisRegister(true);
    }
  };

  // lấy gologin bên header
  useEffect(() => {
    setisRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    msg && Swal.fire("Oops !", msg, "error");
  }, [msg, update]);

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống trường này.",
          },
        ]);
        invalids++;
      }
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mật khẩu phải có tối thiểu 6 kí tự.",
              },
            ]);
            invalids++;
          }
          break;
        case "phone":
          if (!+item[1]) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Số điện thoại không hợp lệ.",
              },
            ]);
            invalids++;
          }
          break;

        default:
          break;
      }
    });
    return invalids;
  };
  return (
    <div className="w-full h-screen">
      <img
        src={bgLogin}
        alt="anh"
        className="w-full relative h-screen object-cover"
      />
      <div className="flex gap-4  flex-col absolute top-0 right-0 border border-orange-500 w-[35%] md:max-lg:w-[50%] sm:max-md:w-full bg-gray-900/75 text-white h-full overflow-y-auto overflow-x-hidden px-7 py-4">
        <h1 className="text-center font-semibold text-[20px]  ">
          {isRegister ? "Đăng ký tài khoản" : "Đăng nhập tài khoản"}
        </h1>
        <div className="text-[13px] text-center ">
          <Link
            to={path.HOME}
            className="px-2 cursor-pointer hover:text-yellow-300"
          >
            Trang chủ
          </Link>
          /
          <span className="px-1">
            {isRegister ? "Đăng ký tài khoản" : "Đăng nhập tài khoản"}
          </span>
        </div>

        {isRegister && (
          <>
            <input
              type="text"
              id="firstName"
              className=" rounded-2xl bg-gray-500 text-white placeholder-gray-50 outline-none py-2 mx-2 px-2"
              placeholder="Họ"
              value={payload.firstName}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  ["firstName"]: e.target.value,
                }))
              }
              onFocus={() => setInvalidFields([])}
            />
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "firstName") && (
                <small className="text-red-500 italic pl-4">
                  {invalidFields.find((i) => i.name === "firstName")?.message}
                </small>
              )}

            <input
              type="text"
              className=" rounded-2xl bg-gray-500 text-white placeholder-gray-50 outline-none py-2 mx-2 px-2"
              placeholder="tên"
              id="lastName"
              value={payload.lastName}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  ["lastName"]: e.target.value,
                }))
              }
              onFocus={() => setInvalidFields([])}
            />
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "lastName") && (
                <small className="text-red-500 italic pl-4">
                  {invalidFields.find((i) => i.name === "lastName")?.message}
                </small>
              )}
            <input
              type="phone"
              id="phone"
              className=" rounded-2xl bg-gray-500 text-white placeholder-gray-50 outline-none py-2 mx-2 px-2"
              placeholder="Số điện thoại"
              value={payload.phone}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  ["phone"]: e.target.value,
                }))
              }
              onFocus={() => setInvalidFields([])}
            />
            {invalidFields.length > 0 &&
              invalidFields.some((i) => i.name === "phone") && (
                <small className="text-red-500 italic pl-4">
                  {invalidFields.find((i) => i.name === "phone")?.message}
                </small>
              )}
          </>
        )}
        <input
          type="email"
          id="email"
          className=" rounded-2xl bg-gray-500 text-white placeholder-gray-50 outline-none py-2 mx-2 px-2"
          placeholder="E-mail"
          value={payload.email}
          onChange={(e) =>
            setPayload((prev) => ({
              ...prev,
              ["email"]: e.target.value,
            }))
          }
          onFocus={() => setInvalidFields([])}
        />
        {invalidFields.length > 0 &&
          invalidFields.some((i) => i.name === "email") && (
            <small className="text-red-500 italic pl-4">
              {invalidFields.find((i) => i.name === "email")?.message}
            </small>
          )}
        <div className="relative ">
          <input
            type={`${showPassword ? "text" : "password"}`}
            id="password"
            className=" rounded-2xl w-[96%]  bg-gray-500 text-white placeholder-gray-50 outline-none py-2 mx-2 px-2"
            placeholder="Mật khẩu"
            value={payload.password}
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                ["password"]: e.target.value,
              }))
            }
            onKeyDown={(e) => handleFromKey(e)}
            onFocus={() => setInvalidFields([])}
          />
          <span
            className="absolute right-5 top-[30%] cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword && <AiFillEye size={20} />}
            {!showPassword && <AiFillEyeInvisible size={20} />}
          </span>
        </div>

        {invalidFields.length > 0 &&
          invalidFields.some((i) => i.name === "password") && (
            <small className="text-red-500 italic pl-4">
              {invalidFields.find((i) => i.name === "password")?.message}
            </small>
          )}
        <div className="flex justify-between px-2">
          <button
            className={
              isRegister
                ? "bg-red-600 rounded-xl py-2 px-4 hover:bg-gray-700 w-full"
                : "bg-red-600 rounded-xl py-2 px-4 hover:bg-gray-700"
            }
            onClick={handleFrom}
          >
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>

          {!isRegister && (
            <span className="text-white hover:text-yellow-300 cursor-pointer">
              Quên mật khẩu?
            </span>
          )}
        </div>
        <div className="relative flex px-2 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink px-2  text-red-400 bg-white rounded-xl">
            Hoặc đăng nhập qua
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="flex px-6  sm:max-md:px-2 justify-between">
          <button className="flex items-center text-white bg-blue-800  px-3">
            <FaFacebookF size={14} color="white" className="mx-1" />
            <span className="border-l   border-gray-500 p-1 text-[13px] px-2 py-2">
              Facebook
            </span>
          </button>
          <button className="flex items-center text-white bg-red-500  px-3">
            <AiOutlineGooglePlus size={18} color="white" className="mx-1" />
            <span className="border-l   border-gray-500 p-1 text-[13px] px-2 py-2">
              Google
            </span>
          </button>
        </div>
        {!isRegister && (
          <>
            <h1 className="text-center font-semibold text-[20px]  ">Đăng Ký</h1>
            <div className="px-2 border  hover:text-yellow-300 hover:border-yellow-300">
              <p className="p-3 text-center">
                Tạo tài khoản để quản lý đơn hàng, và các thông tin thanh toán,
                gửi hàng một cách đơn giản hơn.
              </p>
            </div>
          </>
        )}

        <button
          className="text-center px-2 text-white bg-gray-500 py-2 rounded-2xl hover:bg-red-700"
          onClick={() => {
            handleSubmit();
            setPayload({
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              password: "",
              status: 1,
            });
            setShowPassword(false);
          }}
        >
          {isRegister ? "Đăng nhập" : "Tạo tài khoản"}
        </button>

        <Link
          to={path.HOME}
          className="text-center px-2 cursor-pointer text-white bg-gray-500 py-2 rounded-2xl hover:bg-red-700"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Login;

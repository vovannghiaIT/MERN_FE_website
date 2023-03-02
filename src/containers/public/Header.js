import React, { useCallback, useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import logo_mobi from "../../assets/img/logo_mobi.png";
import icons from "../../ultils/icons";
import { useNavigate, Link, createSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { User } from "../../components";
import { Cookies, useCookies } from "react-cookie";

const {
  FiSearch,
  HiOutlineUserCircle,
  FaShoppingCart,
  AiOutlinePhone,
  BsFillTelephoneFill,
  AiOutlineShoppingCart,
  HiOutlineUser,
} = icons;
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { categories } = useSelector((state) => state.category);
  const [cookies, setCookie] = useCookies(["Cart"]);

  const [valueSearch, setValueSearch] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const { currentData } = useSelector((state) => state.user);
  const fetchData = async () => {
    dispatch(actions.getCategories());
  };
  //Panginate
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const endOffset = itemOffset + itemsPerPage;
  const currentItemsCategories = categories
    .filter((item) => item.status === 1)
    .slice(itemOffset, endOffset);

  // console.log(currentItemsCategories);
  const submitSearch = () => {
    navigate({
      pathname: "search",
      search: createSearchParams({
        key: valueSearch,
      }).toString(),
    });
  };
  const submitSearchKey = (e) => {
    if (e.key === "Enter") {
      navigate({
        pathname: "search",
        search: createSearchParams({
          key: valueSearch,
        }).toString(),
      });
    }
  };

  const submitSearchValue = (e) => {
    setValueSearch(e.target.value);
  };
  const indexs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className="w-full bg-[#d70018] ">
      <div className="w-4/5 text-white mx-auto md:max-lg:w-full md:max-lg:px-2 sm:max-md:w-full sm:max-md:mx-0">
        <div className="flex pt-2  justify-between items-center gap-2 sm:max-md:p-2">
          <div className="flex w-[35%] gap-2 sm:max-md:w-[20%] justify-center items-center p-2">
            <Link to={"/"} className="w-1/2 sm:max-md:hidden">
              <img src={logo} alt="anh" className="w-[170px] " />
            </Link>
            <Link to={"/"} className=" hidden sm:max-md:block  ">
              <img src={logo_mobi} alt="anh" />
            </Link>
            <div className="text-[13px] sm:max-md:hidden lg:max-xl:text-[12px] w-1/2 hover:text-yellow-300 cursor-pointer ">
              Hệ thống cửa hàng
            </div>
          </div>
          <div className="flex w-[30%] sm:max-md:w-[80%]">
            <label
              // onSubmit={handleSearch}
              htmlFor="search"
              className="flex  "
            >
              <input
                type="text"
                id="search"
                value={valueSearch || ""}
                onChange={(e) => submitSearchValue(e)}
                placeholder="Tìm kiếm"
                onKeyDown={(e) => submitSearchKey(e)}
                className="py-2 px-2 text-sm border border-blue-lighter rounded-l outline-none text-black sm:max-md:w-full"
              />
              <button
                onClick={() => submitSearch()}
                className="w-10 flex items-center justify-center bg-white text-black border-t border-r border-b border-blue-lighter rounded-r text-blue-dark"
              >
                <FiSearch />
              </button>
            </label>
          </div>
          <div className="w-[25%] flex  items-center sm:max-md:hidden ">
            <span className="text-[13px] w-[100px] text-center pr-1 border-r-2 border-red-300 hover:text-yellow-300 cursor-pointer">
              24h
              <br /> Công nghệ
            </span>
            <span className="text-[13px] w-[50px] px-2 hover:text-yellow-300 cursor-pointer">
              News
            </span>
          </div>

          <div className="pr-1 flex  items-center text-[13px] w-[20%] sm:max-md:hidden">
            {!isLoggedIn && (
              <span className="px-1 md:max-lg:hidden">
                <HiOutlineUserCircle size={30} />
              </span>
            )}
            {!isLoggedIn && (
              <span>
                <span
                  className="hover:text-yellow-300 cursor-pointer"
                  onClick={() => goLogin(false)}
                >
                  Đăng nhập
                </span>
                <br />
                <span
                  className="hover:text-yellow-300 cursor-pointer"
                  onClick={() => goLogin(true)}
                >
                  Đăng Ký
                </span>
              </span>
            )}
            {isLoggedIn && (
              <span>
                {currentData?.roles === 1 && (
                  <Link to={path.ADMIN}>
                    <span className="hover:text-yellow-300 cursor-pointer">
                      Admin
                    </span>
                  </Link>
                )}
                <br />
                <span
                  className="hover:text-yellow-300 cursor-pointer"
                  onClick={() => {
                    dispatch(actions.logout());
                    navigate("/");
                  }}
                >
                  Đăng xuất
                </span>
                <br />
                <User />
              </span>
            )}
          </div>
          <div className="bg-red-500 w-[15%] md:max-lg:w-[7%] sm:max-md:hidden   lg:max-xl:w-[7%] px-2 py-2 rounded-md flex items-center  relative">
            <Link
              to={path.CART}
              className="px-2 text-[14px] hover:text-yellow-300 cursor-pointer flex justify-center items-center gap-2 "
            >
              <FaShoppingCart size={20} />
              <span className="md:max-lg:hidden  lg:max-xl:hidden">
                Giỏ hàng
              </span>
            </Link>

            <span className="absolute top-[-20%] right-[-10%] text-white w-[25px] h-[25px] text-center bg-red-700 rounded-full">
              {cookies?.Cart?.length > 0 ? cookies?.Cart?.length : 0}
            </span>
          </div>
        </div>
        <div className="flex w-full gap-10 py-1 cursor-pointer text-white sm:max-md:hidden">
          {currentItemsCategories?.length > 0 &&
            currentItemsCategories.map((items, index) => {
              return (
                <Link
                  to={"/category-product/" + items.slug}
                  key={index}
                  className="capitalize hover:text-yellow-300 lg:max-xl:text-[12px] md:max-lg:text-[11.5px]"
                >
                  {items.name}
                </Link>
              );
            })}
        </div>
        <div className="hidden text-black rounded-lg  sm:max-md:block w-full fixed z-50 bottom-0 left-0 right-0 h-[50px] bg-white">
          <div className="px flex justify-start w-full mt-2 gap-2  items-center text-[13px]  ">
            <div className="w-[30%] flex flex-col justify-center items-center">
              <AiOutlinePhone size={20} color="black" />
              <span> Liên hệ</span>
            </div>
            {!isLoggedIn && (
              <div
                className="w-[30%]  flex flex-col justify-center items-center"
                onClick={() => goLogin(false)}
              >
                <HiOutlineUser size={20} color="black" />
                <span> Tài khoản</span>
              </div>
            )}
            {isLoggedIn && (
              <Link
                to={path.INFO}
                className="w-[30%]  flex flex-col justify-center items-center"
                onClick={() => goLogin(false)}
              >
                <HiOutlineUser size={20} color="black" />
                <span> Tài khoản</span>
              </Link>
            )}
            <Link
              to={path.CART}
              className="w-[30%]  flex flex-col justify-center items-center"
            >
              <AiOutlineShoppingCart size={20} color="black" />
              <span> Giỏ hàng</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

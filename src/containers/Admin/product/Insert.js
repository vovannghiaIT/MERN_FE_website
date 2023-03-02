import React, { useState, useEffect } from "react";
import icons from "../../../ultils/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";

import { convertToHTML } from "draft-convert";
import { formatVietnameseToString } from "../../../ultils/Common/formatVietnameseToString";
import { apiInsertProducts, apiUploadImages } from "../../../services";

//CKEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Loading } from "../../../components";

const Insert = ({ modal, setModal }) => {
  const { ImBin, FaCamera } = icons;

  const dispatch = useDispatch();

  const [dataDescription, setDataDescription] = useState();

  const [sale, setSale] = useState(false);
  const [addCategory, setAddCategory] = useState([]);
  const [addBrand, setAddBrand] = useState([]);
  const [addOpera, setAddOpera] = useState([]);
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { operas } = useSelector((state) => state.opera);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [invalidFields, setInvalidFields] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getCategories());
    dispatch(actions.getBrand());
    dispatch(actions.getOpera());
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);
  const fetchDataProduct = async () => {
    dispatch(actions.getProduct());
  };
  const [payload, setPayload] = useState({
    name: "",
    categoryId: "",
    operaId: "",
    brandId: "",
    images: "",
    star: 0,
    slug: "",
    description: "",
    number: "",
    price: "",
    pricesale: 0,
    status: 1,
  });

  const handleAddCategory = (e) => {
    setAddCategory(e.target.value);
  };
  const handleAddBrands = (e) => {
    setAddBrand(e.target.value);
  };
  const handleAddOperas = (e) => {
    setAddOpera(e.target.value);
  };

  const handleSale = () => {
    sale ? setSale(false) : setSale(true);
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

      // console.log(formData);
      const response = await apiUploadImages(formData);

      if (response.status === 200) {
        images = [...images, response.data?.secure_url];
      }
      // console.log(images);
      setLoading(false);
      // console.log([...imagesPreview, ...images]);
      // setImagesPreview((prev) => [...prev, ...images]);
      setImagesPreview([...imagesPreview, ...images]);

      setPayload({
        ...payload,
        images: [...payload.images, ...images],
      });
      setLoading(false);
    }
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };

  const addProduct = async () => {
    console.log(addCategory);
    let categoryId = addCategory;
    payload.categoryId = categoryId;

    let brandId = addBrand;
    payload.brandId = brandId;

    let operaId = addOpera;
    payload.operaId = operaId;

    let description = dataDescription ? dataDescription : "";
    payload.description = description;

    let slug = formatVietnameseToString(payload.name);
    payload.slug = slug;

    // console.log(payload);
    let invalids = validate(payload);
    // console.log("invalids", invalids);
    console.log(payload);
    if (invalids === 0) {
      await apiInsertProducts(payload);
      setModal(false);
      fetchDataProduct();
      setImagesPreview([]);
      setPayload({
        name: "",
        categoryId: "",
        operaId: "",
        brandId: "",
        images: "",
        star: 0,
        slug: "",
        description: "",
        number: "",
        price: "",
        pricesale: 0,
        status: 1,
      });
    }
  };
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

    return invalids;
  };
  return (
    <div>
      {modal && (
        <div
          className="fixed z-10 overflow-auto top-0 w-full left-0  "
          onClick={(e) => {
            e.stopPropagation();
            setModal(false);
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
              className="mt-[2%] inline-block align-center bg-white rounded-lg text-left  shadow-xl transform transition-all w-[90%] overflow-y-auto h-[520px]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="bg-white flex gap-5  px-4 pt-5">
                <div className="w-[60%]">
                  <label>Name</label>
                  <input
                    type="text"
                    id="name"
                    onFocus={() => setInvalidFields([])}
                    className="w-full bg-gray-100 p-2 mt-2"
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["name"]: e.target.value,
                      }))
                    }
                  />
                  {invalidFields.length > 0 &&
                    invalidFields.some((i) => i.name === "name") && (
                      <small className="text-red-500 italic ">
                        {invalidFields.find((i) => i.name === "name")?.message}
                      </small>
                    )}

                  <div className="flex flex-col gap-2 mb-3">
                    <label>Danh mục sản phẩm</label>
                    <select
                      defaultValue={"DEFAULT"}
                      onChange={(e) => {
                        handleAddCategory(e);
                        setInvalidFields([]);
                      }}
                      className="cursor-pointer px-2 capitalize"
                    >
                      <option value="DEFAULT" disabled>
                        Chọn danh mục sản phẩm...
                      </option>
                      {categories?.length > 0 &&
                        categories
                          .filter((item) => item.status === 1)
                          .map((items, index) => {
                            return (
                              <option key={index} value={items._id}>
                                {items?.name}
                              </option>
                            );
                          })}
                    </select>
                    {invalidFields.length > 0 &&
                      invalidFields.some((i) => i.name === "categoryId") && (
                        <small className="text-red-500 italic ">
                          {
                            invalidFields.find((i) => i.name === "categoryId")
                              ?.message
                          }
                        </small>
                      )}
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <label>Thương hiệu sản phẩm</label>
                    <select
                      defaultValue={"DEFAULT"}
                      onChange={(e) => {
                        handleAddBrands(e);
                        setInvalidFields([]);
                      }}
                      className="cursor-pointer px-2 capitalize"
                    >
                      <option value="DEFAULT" disabled>
                        Chọn thương hiệu sản phẩm...
                      </option>
                      {brands?.length > 0 &&
                        brands
                          .filter((item) => item.status === 1)
                          .map((items, index) => {
                            return (
                              <option key={index} value={items._id}>
                                {items?.name}
                              </option>
                            );
                          })}
                    </select>
                    {invalidFields.length > 0 &&
                      invalidFields.some((i) => i.name === "brandId") && (
                        <small className="text-red-500 italic ">
                          {
                            invalidFields.find((i) => i.name === "brandId")
                              ?.message
                          }
                        </small>
                      )}
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <label>Hệ điều hành </label>
                    <select
                      defaultValue={"DEFAULT"}
                      onChange={(e) => {
                        handleAddOperas(e);
                        setInvalidFields([]);
                      }}
                      className="cursor-pointer px-2 capitalize"
                    >
                      <option value="DEFAULT" disabled>
                        Chọn Hệ điều hành...
                      </option>
                      {operas?.length > 0 &&
                        operas
                          .filter((item) => item.status === 1)
                          .map((items, index) => {
                            return (
                              <option key={index} value={items._id}>
                                {items?.name}
                              </option>
                            );
                          })}
                    </select>
                    {invalidFields.length > 0 &&
                      invalidFields.some((i) => i.name === "operaId") && (
                        <small className="text-red-500 italic ">
                          {
                            invalidFields.find((i) => i.name === "operaId")
                              ?.message
                          }
                        </small>
                      )}
                  </div>
                  <div>
                    <label>Description</label>
                    <div className=" border-2 h-[230px] overflow-auto">
                      <CKEditor
                        editor={ClassicEditor}
                        //data={payload?.description}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDataDescription(data);
                        }}
                      />
                      {invalidFields.length > 0 &&
                        invalidFields.some((i) => i.name === "description") && (
                          <small className="text-red-500 italic">
                            {
                              invalidFields.find(
                                (i) => i.name === "description"
                              )?.message
                            }
                          </small>
                        )}
                    </div>
                  </div>
                </div>
                <div className="w-[40%]">
                  <div className="w-full border-[3px] border-dashed  h-[150px] flex items-center justify-center   ">
                    {loading ? (
                      <Loading />
                    ) : (
                      <>
                        <label
                          htmlFor="images"
                          className="p-5 cursor-pointer flex items-center flex-col  justify-center gap-2"
                        >
                          <FaCamera size={50} color="blue" />
                          <span>Thêm ảnh</span>
                        </label>
                        <input
                          type="file"
                          hidden
                          id="images"
                          className="w-full bg-gray-100 p-2 mt-2"
                          onChange={handleFile}
                          multiple
                        />
                      </>
                    )}
                  </div>
                  {invalidFields.length > 0 &&
                    invalidFields.some((i) => i.name === "images") && (
                      <small className="text-red-500 italic ">
                        {
                          invalidFields.find((i) => i.name === "images")
                            ?.message
                        }
                      </small>
                    )}

                  {/* multiple chọn được nhìu hình */}
                  <div className="mt-2 h-[70px] flex gap-2   flex-wrap overflow-y-auto">
                    {imagesPreview?.map((item, index) => {
                      return (
                        <div key={item} className="relative w-1/3 h-1/3  ">
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
                  <label>Số lượng</label>
                  <input
                    type="number"
                    id="number"
                    onFocus={() => setInvalidFields([])}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["number"]: e.target.value,
                      }))
                    }
                  />
                  {invalidFields.length > 0 &&
                    invalidFields.some((i) => i.name === "number") && (
                      <small className="text-red-500 italic">
                        {
                          invalidFields.find((i) => i.name === "number")
                            ?.message
                        }
                      </small>
                    )}
                  <br />
                  <label>Giá</label>
                  <input
                    type="number"
                    id="price"
                    onFocus={() => setInvalidFields([])}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
                    onChange={(e) =>
                      setPayload((prev) => ({
                        ...prev,
                        ["price"]: e.target.value,
                      }))
                    }
                  />
                  {invalidFields.length > 0 &&
                    invalidFields.some((i) => i.name === "price") && (
                      <small className="text-red-500 italic ">
                        {invalidFields.find((i) => i.name === "price")?.message}
                      </small>
                    )}

                  <div className="flex gap-2 mb-2">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      onClick={() => handleSale()}
                    />
                    <span>Khuyến mãi</span>
                  </div>
                  {sale && (
                    <div>
                      <label>Giá khuyến mãi</label>
                      <input
                        type="number"
                        id="pricesale"
                        className="w-full bg-gray-100 p-2 mt-2 mb-3"
                        onChange={(e) =>
                          setPayload((prev) => ({
                            ...prev,
                            ["pricesale"]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={() => setModal(false)}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    addProduct();
                  }}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                >
                  <i className="fas fa-plus"></i> Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insert;

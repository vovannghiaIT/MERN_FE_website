import React, { useState, useEffect, useRef } from "react";
import icons from "../../../ultils/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";

import { apiUpdateProducts, apiUploadImages } from "../../../services";
import { formatVietnameseToString } from "../../../ultils/Common/formatVietnameseToString";
//CKEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Loading } from "../../../components";

const Edit = ({ modalEdit, setModalEdit, dataProductEdit }) => {
  const dispatch = useDispatch();

  const { FaCamera, ImBin } = icons;

  const [sale, setSale] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [invalidFields, setInvalidFields] = useState([]);
  const [addCategory, setAddCategory] = useState([]);
  const [addBrands, setAddBrands] = useState([]);
  const [addOperas, setAddOperas] = useState([]);
  const [dataDescription, setDataDescription] = useState();

  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { operas } = useSelector((state) => state.opera);
  const { products } = useSelector((state) => state.product);
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

  const handleAddCategory = (e) => {
    setAddCategory(e.target.value);
  };
  const handleAddBrands = (e) => {
    setAddBrands(e.target.value);
  };
  const handleAddOperas = (e) => {
    setAddOperas(e.target.value);
  };

  const handleSale = () => {};

  //console.log(convertedContent);
  const [payload, setPayload] = useState(() => {
    const initData = {
      _id: "",
      name: dataProductEdit?.name || "",
      categoryId: dataProductEdit?.categoryId,
      brandId: dataProductEdit?.brandId,
      operaId: dataProductEdit?.operaId,
      images: dataProductEdit?.images || "",
      star: dataProductEdit?.star || 0,
      slug: dataProductEdit?.slug || "",
      description: dataProductEdit?.description || "",
      number: dataProductEdit?.number || "",
      price: dataProductEdit?.price || "",
      pricesale: dataProductEdit?.pricesale || "",
      status: dataProductEdit?.status || 1,
    };
    return initData;
  });

  useEffect(() => {
    if (modalEdit === true) {
      if (dataProductEdit) {
        let img = dataProductEdit?.images;
        img && setImagesPreview(img);
      }
    }
  }, [dataProductEdit]);

  useEffect(() => {
    if (modalEdit === true) {
      setPayload({
        _id: "",
        name: dataProductEdit?.name || "",
        categoryId: dataProductEdit?.categoryId || "",
        brandId: dataProductEdit?.brandId || "",
        operaId: dataProductEdit?.operaId || "",
        images: dataProductEdit?.images || "",
        star: dataProductEdit?.star || 0,
        slug: dataProductEdit?.slug || "",
        description: dataProductEdit?.description || 0,
        number: dataProductEdit?.number || "",
        price: dataProductEdit?.price || "",
        pricesale: dataProductEdit?.pricesale || 0,
        status: dataProductEdit?.status || 1,
      });
      setAddCategory(dataProductEdit?.categories?.id || "");
      setAddBrands(dataProductEdit?.brands?.id || "");
      setAddOperas(dataProductEdit?.operas?.id || "");
    }
  }, [dataProductEdit]);

  const handleFile = async (e) => {
    e.stopPropagation();
    setLoading(true);
    //biến imhg chứa link ảnh
    let images = [];
    const files = e.target.files;
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

      setImagesPreview([...imagesPreview, ...images]);

      // setImagesPreview((prev) => [...prev, ...images]);
      // setPayload((prev) => ({
      //   ...prev,
      //   images: [...prev.images, ...images],
      // }));
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

  const submitUpdate = async () => {
    let _id = dataProductEdit?._id;
    payload._id = _id;
    console.log(addCategory);
    let categoryId = addCategory ? addCategory : dataProductEdit?.categoryId;
    payload.categoryId = categoryId;

    let brandId = addBrands ? addBrands : dataProductEdit?.brandId;
    payload.brandId = brandId;

    let operaId = addOperas ? addOperas : dataProductEdit?.operaId;
    payload.operaId = operaId;

    let description = dataDescription
      ? dataDescription
      : dataProductEdit?.description;
      
    payload.description = description;

    let slug = formatVietnameseToString(payload.name);
    payload.slug = slug;

    // console.log(payload);
    let invalids = validate(payload);
    if (invalids === 0) {
      await apiUpdateProducts(payload);
      setModalEdit(false);
      fetchDataProduct();
      setImagesPreview([]);
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
      {modalEdit && (
        <div
          className="fixed z-10 overflow-auto top-0 w-full left-0  "
          onClick={(e) => {
            e.stopPropagation();
            setModalEdit(false);
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
                    value={payload.name}
                    className="w-full bg-gray-100 p-2 mt-2 mb-3"
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
                      onChange={(e) => handleAddCategory(e)}
                      className="cursor-pointer px-2 capitalize"
                      defaultValue={dataProductEdit?.categories?._id}
                    >
                      <option value="DEFAULT" disabled>
                        Chọn danh mục sản phẩm...
                      </option>
                      {categories?.length > 0 &&
                        categories?.map((items, index) => {
                          return (
                            <option key={items._id} value={items._id}>
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
                      onChange={(e) => handleAddBrands(e)}
                      className="cursor-pointer px-2 capitalize"
                      defaultValue={dataProductEdit?.brands?._id}
                    >
                      <option value="DEFAULT" disabled>
                        Chọn thương hiệu sản phẩm...
                      </option>
                      {brands?.length > 0 &&
                        brands?.map((items, index) => {
                          return (
                            <option key={items._id} value={items._id}>
                              {items.name}
                            </option>
                          );
                        })}
                    </select>
                    {invalidFields.length > 0 &&
                      invalidFields.some((i) => i.name === "brandId") && (
                        <small className="text-red-500 italic ">
                          {
                            invalidFields.find((i) => i.name === "BrandId")
                              ?.message
                          }
                        </small>
                      )}
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <label>Hệ điều hành</label>
                    <select
                      onChange={(e) => handleAddOperas(e)}
                      className="cursor-pointer px-2 capitalize"
                      defaultValue={dataProductEdit?.operas?._id}
                    >
                      <option value="DEFAULT" disabled>
                        Chọn hệ điều hành...
                      </option>
                      {operas?.length > 0 &&
                        operas?.map((items, index) => {
                          return (
                            <option key={items._id} value={items._id}>
                              {items.name}
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
                        data={payload?.description[0]}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDataDescription(data);
                        }}
                      />
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
                    value={payload.number}
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
                      <small className="text-red-500 italic ">
                        {
                          invalidFields.find((i) => i.name === "number")
                            ?.message
                        }
                      </small>
                    )}

                  <label>Giá</label>
                  <input
                    type="number"
                    id="price"
                    value={payload.price}
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
                    <>
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        defaultChecked={checked}
                        onChange={() => {
                          setChecked(!checked);
                          setPayload((prev) => ({
                            ...prev,
                            ["pricesale"]: "",
                          }));
                        }}
                      />

                      <span>Khuyến mãi</span>
                    </>
                  </div>
                  {checked && (
                    <div>
                      <label>Giá khuyến mãi</label>
                      <input
                        type="number"
                        id="pricesale"
                        value={payload.pricesale}
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
                  onClick={() => {
                    setModalEdit(false);
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

export default Edit;

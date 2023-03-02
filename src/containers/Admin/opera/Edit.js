import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiUpdateOpera } from "../../../services";
import * as actions from "../../../store/actions";
import { formatVietnameseToString } from "../../../ultils/Common/formatVietnameseToString";

const Edit = ({ modalEdit, setModalEdit, dataOperaEdit }) => {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState(() => {
    const initData = {
      _id: "",
      name: dataOperaEdit?.name || "",
      slug: dataOperaEdit?.slug || "",
      status: dataOperaEdit?.status || 1,
    };
    return initData;
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    dispatch(actions.getOpera());
  };
  useEffect(() => {
    if (modalEdit === true) {
      setPayload({
        _id: "",
        name: dataOperaEdit?.name,
        slug: dataOperaEdit?.slug,
        status: dataOperaEdit?.status,
      });
    }
  }, [dataOperaEdit]);

  const submitUpdate = async () => {
    let _id = dataOperaEdit?._id;
    payload._id = _id;

    let slug = formatVietnameseToString(payload.name);
    payload.slug = slug;
    await apiUpdateOpera(payload);
    setModalEdit(false);
    fetchData();
  };
  const submitUpdateKey = async (e) => {
    if (e.key === "Enter") {
      let _id = dataOperaEdit?._id;
      payload._id = _id;

      let slug = formatVietnameseToString(payload.name);
      payload.slug = slug;
      await apiUpdateOpera(payload);
      setModalEdit(false);
      fetchData();
    }
  };

  return (
    <div>
      {modalEdit && (
        <div
          className="fixed z-10 overflow-y-auto top-0 w-full left-0 "
          onClick={(e) => {
            e.stopPropagation();
            setModalEdit(false);
          }}
        >
          <div className="flex items-center justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div
              className="mt-[100px] inline-block align-center bg-white rounded-lg text-left  shadow-xl transform transition-all w-[40%]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="bg-white flex gap-5  px-4 pt-5">
                <div className="w-full">
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
                    onKeyDown={(e) => {
                      submitUpdateKey(e);
                    }}
                  />
                </div>
                {/* <div className="w-[60%]">
              <div className="w-full border-[3px] border-dashed  h-[150px] flex items-center justify-center   ">
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
                  className="w-full bg-gray-100 p-2 mt-2 mb-3"
                  onChange={handleFile}
                  multiple
                />
              </div>
         
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
            </div> */}
              </div>
              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={() => setModalEdit(false)}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                  onClick={() => submitUpdate()}
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

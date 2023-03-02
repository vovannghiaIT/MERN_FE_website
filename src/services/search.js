import axiosConfig from "../axiosConfig";

export const apiSearchProduct = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/search",
        params: { key: payload },
      });
      // console.log(payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

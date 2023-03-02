import axios from "../axiosConfig";

export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/current/get-current",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllUsers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateUsers = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: "/api/v1/user/updatehash",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateUsersOld = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: "/api/v1/user/update",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "delete",
        url: "/api/v1/user/delete",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

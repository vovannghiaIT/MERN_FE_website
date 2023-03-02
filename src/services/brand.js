import axios from "axios";
import axiosConfig from "../axiosConfig";

export const apiGetBrands = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/brand/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateBrands = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/brand/update",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiInsertBrands = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/brand/insert",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteBrands = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: "/api/v1/brand/delete",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

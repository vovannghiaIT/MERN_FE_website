import axios from "axios";
import axiosConfig from "../axiosConfig";

export const apiGetProducts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/product/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetDetailSlugProducts = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/product/detail/` + payload,
        params: { slug: payload },
      });
      // console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetProductCategory = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/product/productcategory/` + payload,
        params: { categoryId: payload },
      });
      // console.log(payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiInsertProducts = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/product/insert",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateProducts = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/product/update",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteProduct = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: "/api/v1/product/delete",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import axios from "axios";
import config from "../config";

export default function createRequest(headers = {}, options = {}) {
  const objects = Object.assign({}, { baseURL: `${config.API_GATEWAYS_ENDPOINT}` }, options);

  const request = axios.create({
    headers,
    ...objects,
  });
  request.interceptors.response.use(
    (res: any): any => {
      if (res.status >= 200 && res.status < 300) {
        if (!res.data?.data) {
          return Promise.resolve({ data: res.data });
        }
        return Promise.resolve({ data: res.data?.data });
      }
      return Promise.resolve({
        errors: {
          status: res.status,
          message: res.errors?.message,
        },
      });
    },
    error => {
      const res = error.response;
      if (!res) {
        return Promise.resolve({
          errors: {
            status: 400,
            message: "Request Failed",
          },
        });
      }
      const message = res.data?.errors?.message || res.statusText;
      return Promise.resolve({
        errors: {
          status: res.status,
          message,
        },
      });
    }
  );
  return request;
}

// Base Services
export const createAccountsRequest = token => createRequest({ Authorization: token }, { baseURL: `${config.API_ACCOUNTS_ENDPOINT}` });

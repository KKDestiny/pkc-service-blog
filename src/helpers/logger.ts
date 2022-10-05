/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import winstonInstance from "../config/winston";

export default (type = "info", message = "") => {
  winstonInstance.log(type, `[${new Date().toLocaleString()}]`, message);
};

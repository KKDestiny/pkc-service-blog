/*
 * @Date: 2021-06-01 23:23:09
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import APIError from "../utils/apierror.util";
import { createAccountsRequest } from "../helpers/request";

export default async function (req, res, next) {
  try {
    const reqClient = createAccountsRequest(req.headers.authorization);
    const result: { data: any; errors: any } = await reqClient.get("/mine/profile");
    if (result.data) {
      req.user = result.data;
      return next();
    }

    throw new APIError("没有权限", 401);
  } catch (err) {
    res.status(err.status).json({ errors: { message: err.message } });
  }
}

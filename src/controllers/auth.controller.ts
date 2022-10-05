/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Request, Response } from "express";

import { IAccount } from "../interfaces/account.interface";
import APIError from "../utils/apierror.util";
import accountModel from "../repositories/account.repository";

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, password } = req.body;
    const result: IAccount = await accountModel.load({ criteria: { name } });
    if (!result) {
      throw new APIError("account is not existed", 400);
    }

    if (password !== result.password) {
      throw new APIError("login failed", 401);
    }

    return res.status(200).json({
      data: {
        token: "abcdefg12345678",
        name,
        result,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  login,
};

/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Response } from "express";

import { IRequest } from "../interfaces/comm.interface";
import { UserType } from "../interfaces/user.interface";

import userRepo from "../repositories/user.repository";

/**
 * 获取书籍列表
 */
async function getBooks(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { name: login } = req.user;
    const user: UserType = await userRepo.load({ criteria: { login } });
    if (!user) {
      return res.status(400).json({ errors: "找不到用户数据" });
    }

    const collections = (user.collections || []).reduce((temp, item) => {
      if (item.status === "deleted") return temp;
      temp.push(item);
      return temp;
    }, []);

    return res.status(200).json({
      data: collections,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  getBooks,
};

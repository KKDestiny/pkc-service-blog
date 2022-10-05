/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Request, Response } from "express";

async function listArticles(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).json({
      data: [],
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  listArticles,
};

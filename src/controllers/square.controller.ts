/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Request, Response } from "express";

import articleRepo from "../repositories/articles.repository";
import categoryRepo from "../repositories/categories.repository";

import { simpleFieldsArticle } from "./commons";

const simpleFields = simpleFieldsArticle;

async function index(req: Request, res: Response, next: NextFunction) {
  try {
    // 文章
    const articles = await articleRepo.list({ criteria: { status: "released", ispublished: "yes" }, limit: 20, select: simpleFields });

    // 栏目
    const categories = await categoryRepo.list({ criteria: { status: { $ne: "deleted" } } });
    return res.status(200).json({
      data: { articles, categories },
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  index,
};

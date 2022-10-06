/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Request, Response } from "express";

import articleRepo from "../repositories/articles.repository";
import { simpleFieldsArticle } from "./commons";

const simpleFields = simpleFieldsArticle;

async function listArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const { simplify = "yes", privateCategorieid, limit: _limit } = req.query;

    const select = simplify === "yes" ? simpleFields : undefined;
    const limit = _limit ? parseInt(String(_limit), 10) : undefined;
    const criteria = { status: { $ne: "deleted" } };
    if (privateCategorieid) {
      Object.assign(criteria, { private_categorieid: privateCategorieid });
    }

    const list = await articleRepo.list({ select, limit, criteria });
    return res.status(200).json({
      data: list,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  listArticles,
};

/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces/comm.interface";

import articleRepo from "../repositories/articles.repository";
import { simpleFieldsArticle } from "./commons";

const simpleFields = simpleFieldsArticle;

async function listArticles(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { simplify = "yes", privateCategorieid, limit: _limit, page: _page } = req.query;
    const { name } = req.user;

    let limit;
    if (_limit && !isNaN(Number(_limit))) {
      limit = Number(_limit);
    }
    let page = 0;
    if (_limit && !isNaN(Number(page))) {
      page = Number(_page);
    }

    const select = simplify === "yes" ? simpleFields : undefined;
    const criteria = { login: name, status: { $ne: "deleted" } };
    if (privateCategorieid) {
      Object.assign(criteria, { private_categorieid: privateCategorieid });
    }

    const result = await Promise.allSettled([articleRepo.list({ limit, page, criteria, select }), articleRepo.count(criteria)]);
    const articles = result[0].status === "fulfilled" ? result[0].value : [];
    const total = result[1].status === "fulfilled" ? result[1].value : 0;
    return res.status(200).json({
      data: { page, limit, total, list: articles },
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  listArticles,
};

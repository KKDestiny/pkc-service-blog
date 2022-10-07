/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import fs from "fs-extra";
import { NextFunction, Response } from "express";
import dayjs from "dayjs";

import config from "../config";

import { IRequest } from "../interfaces/comm.interface";
import { ArticleType } from "../interfaces/article.interface";

import articleRepo from "../repositories/articles.repository";
import { simpleFieldsArticle } from "./commons";
import { generateSerial } from "../utils/string.util";

const simpleFields = simpleFieldsArticle;

/**
 * 获取文章列表
 */
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

/**
 * 创建一篇文章
 */
async function create(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { title = "无标题", tag, privateCategorieid = "default", editor = "markdown", content = "# 标题\r\n\r\n从这里开始..." } = req.body;
    const dirname = generateSerial();
    const headimg = "favicon.ico";

    const url = `${dirname}/${dirname}`;
    const article: ArticleType = {
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      title: title,
      author: req.user.name,
      author_url: headimg,
      tag,
      status: "saved", // // 状态： released(发布) | saved(保存、未发布) | deleted(删除)
      abstract: "无",
      private_categorieid: privateCategorieid,
      editor,

      version: "1",
      releasedversion: "0",
      categorieid: "default",
      publishto: "default",
      settop: "no",
      ispublished: "no",
      url, // 以 server.articleRoot 为根目录
      readnum: 0,
    };

    const _createContentFile = async () => {
      const rootPath = config.APP_ARTICLE_ROOT;
      const ext = config.APP_ARTICLE_EXT;
      const dirPath = `${rootPath}/${dirname}`;
      const fullPath = `${rootPath}/${url}_v${article.version}${ext}`.replace(/\\/g, "/");

      await fs.mkdirs(dirPath);
      await fs.writeFile(fullPath, content, "utf8");
    };

    const result = await Promise.allSettled([articleRepo.create(article), _createContentFile()]);
    const articleRes = result[0].status === "fulfilled" ? result[0].value : null;
    return res.status(200).json({
      data: articleRes,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  listArticles,
  create,
};

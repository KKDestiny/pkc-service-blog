/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Request, Response } from "express";
import fs from "fs";

import { ArticleType } from "../interfaces/article.interface";

import config from "../config";
import articleRepo from "../repositories/articles.repository";
import categoryRepo from "../repositories/categories.repository";

import { simpleFieldsArticle } from "./commons";

const simpleFields = simpleFieldsArticle;

/**
 * 广场
 */
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

/**
 * 获取文章数据
 */
async function getArticleInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const { articleId } = req.params;
    const article = await articleRepo.load({ criteria: { _id: articleId, status: "released" } });
    return res.status(200).json({
      data: article,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 获取文章内容
 */
async function getArticleContent(req: Request, res: Response, next: NextFunction) {
  try {
    // 文章
    const { articleId } = req.params;
    const article: ArticleType = await articleRepo.load({ criteria: { _id: articleId, status: "released" } });
    const { isencrypted } = article;
    if (isencrypted) {
      // 加密文章不允许直接查看
      return res.status(200).json({ data: null });
    }

    // 获取文章内容
    const rootPath = config.APP_ARTICLE_ROOT;
    const { releasedversion: version, url: articleFile } = article;
    const ext = config.APP_ARTICLE_EXT;
    const fullPath = `${rootPath}/${articleFile}_v${version}${ext}`;
    if (!fs.existsSync(fullPath)) {
      return res.status(400).json({ errors: { message: "content lost" } });
    }
    const content = fs.readFileSync(fullPath, "utf8");
    return res.status(200).json({
      data: content,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 获取某个专栏的文章列表
 */
async function listArticlesInACategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { categoryId } = req.params;
    const articles = await articleRepo.list({ criteria: { categorieid: categoryId, status: "released", ispublished: "yes" }, select: simpleFields });

    return res.status(200).json({
      data: articles,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  index,

  getArticleInfo,
  getArticleContent,

  listArticlesInACategory,
};

/*
 * @Date: 2020-06-11 11:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Response } from "express";
import fs from "fs-extra";
import { pick } from "lodash";

import config from "../config";

import { IRequest } from "../interfaces/comm.interface";
import { ArticleType } from "../interfaces/article.interface";

import articleRepo from "../repositories/articles.repository";
import { simpleFieldsArticle } from "./commons";
import { generateSerial, getDeviceAgent, getDatetime } from "../utils/string.util";

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
    const { name } = req.user;

    const url = `${dirname}/${dirname}`;
    const article: ArticleType = {
      date: getDatetime(),
      title: title,
      author: req.user.name,
      author_url: headimg,
      login: name,
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

/**
 * 删除一篇文章
 */
async function deleteAnArticle(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { articleId } = req.params;
    const { forceDelete } = req.query;
    const { name } = req.user;
    const criteria = { _id: articleId, login: name };

    // 查看文章内容
    const article = await articleRepo.load({ criteria });
    if (!article) {
      return res.status(400).json({
        errors: { message: "找不到文章" },
      });
    }

    if (forceDelete !== "yes") {
      // 仅移入回收站、不物理删除
      const updates = {
        status: "deleted",
        date_delete: getDatetime(),
      };
      const result = await articleRepo.findByIdAndUpdate(criteria, updates);
      return res.status(200).json({
        data: pick(result, simpleFields),
      });
    }

    // 物理删除
    const rootPath = config.APP_ARTICLE_ROOT;
    const dirname = article.url.replace(/\\/g, "/").split("/")[0];
    const dirpath = `${rootPath}/${dirname}`;
    const result = await Promise.allSettled([articleRepo.remove(criteria), fs.rmdir(dirpath, { recursive: true })]);
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 更新文章的基础信息
 */
async function updateAnArticle(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { articleId } = req.params;
    const { name } = req.user;
    const updates = pick(req.body, ["title", "tag", "editor", "original", "privateCategorieid"]);
    updates.private_categorieid = req.body.privateCategorieid || "default";

    const result = await articleRepo.findByIdAndUpdate({ _id: articleId, login: name }, updates);
    return res.status(200).json({
      data: pick(result, simpleFields),
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 更新文章的正文内容
 */
async function updateAnArticleContent(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { articleId } = req.params;
    const { name } = req.user;
    const criteria = { _id: articleId, login: name };

    // 查看文章内容
    const article = await articleRepo.load({ criteria });
    if (!article)
      return res.status(400).json({
        errors: { message: "找不到文章" },
      });

    // Checking
    const { version, title, content, abstract, imgUrl, savetype } = req.body;
    if (!version || typeof version !== "string") {
      return res.status(400).json({ errors: { message: "version is required as string" } });
    }
    if (parseInt(article.version) >= parseInt(version)) {
      return res.status(400).json({
        errors: { message: "您在其他终端进行了编辑。请先备份好当前的文章，重新刷新页面！" },
      });
    }

    // 更新文章内容
    const rootPath = config.APP_ARTICLE_ROOT;
    const ext = config.APP_ARTICLE_EXT;
    const fullPath = `${rootPath}/${article.url}_v${version}${ext}`.replace(/\\/g, "/");
    await fs.writeFile(fullPath, content, "utf8");

    // history
    const devicetype = getDeviceAgent(req);
    const history = {
      _id: generateSerial(),
      date: getDatetime(),
      version,
      devicetype,
      savetype,
    };

    // 文章信息
    const updates = { version };
    if (title !== article.title) {
      Object.assign(updates, { title });
    }
    if (abstract !== article.abstract) {
      Object.assign(updates, { abstract });
    }
    if (imgUrl !== article.img_url) {
      Object.assign(updates, { img_url: imgUrl });
    }
    const result = await articleRepo.findByIdAndUpdate(criteria, { $set: updates, $addToSet: { history } });
    return res.status(200).json({
      data: pick(result, simpleFields),
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 发布文章
 */
async function releaseAnArticle(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { articleId } = req.params;
    const { name } = req.user;
    const { releasedversionName, releaseInfo } = req.body;
    const criteria = { _id: articleId, login: name };

    if (!releasedversionName || typeof releasedversionName !== "string") {
      return res.status(400).json({ errors: { message: "releasedversionName is required as string" } });
    }
    if (!releaseInfo || typeof releaseInfo !== "string") {
      return res.status(400).json({ errors: { message: "releaseInfo is required as string" } });
    }

    // 查看文章内容
    const article = await articleRepo.load({ criteria });
    if (!article) {
      return res.status(400).json({
        errors: { message: "找不到文章" },
      });
    }
    if (article.status === "released") {
      return res.status(400).json({
        errors: { message: "文章已发布，不可重复操作" },
      });
    }

    const datetime = getDatetime();
    const updates = {
      date_release: datetime,
      status: "released",
      releasedversion: article.version, // 发布时文章的版本号
      releasedversionName: releasedversionName, // 自定义的发布版本号
    };

    const releaseLog = {
      id: generateSerial(),
      date: datetime,
      version: article.version,
      releasedversion: releasedversionName, // 自定义的发布版本号
      content: releaseInfo,
      author: name,
    };

    const result = await articleRepo.findByIdAndUpdate(criteria, { $set: updates, $addToSet: { release_log: releaseLog } });
    return res.status(200).json({
      data: pick(result, simpleFields),
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * 取消发布文章
 */
async function cancelReleaseAnArticle(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { articleId } = req.params;
    const { name } = req.user;
    const criteria = { _id: articleId, login: name };

    // 查看文章内容
    const article = await articleRepo.load({ criteria });
    if (!article) {
      return res.status(400).json({
        errors: { message: "找不到文章" },
      });
    }
    if (article.status === "saved") {
      return res.status(400).json({
        errors: { message: "文章未发布，不可重复操作" },
      });
    }

    const updates = {
      status: "saved",
    };

    const result = await articleRepo.findByIdAndUpdate(criteria, updates);
    return res.status(200).json({
      data: pick(result, simpleFields),
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  listArticles,
  create,
  deleteAnArticle,
  updateAnArticle,
  updateAnArticleContent,
  releaseAnArticle,
  cancelReleaseAnArticle,
};

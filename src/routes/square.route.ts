/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";
import controller from "../controllers/square.controller";

const router = express.Router({ mergeParams: true });

router.get("/", controller.index);

router.get("/articles", controller.getArticleList);
router.get("/articles/:articleId", controller.getArticleInfo);
router.get("/articles/:articleId/content", controller.getArticleContent);

router.get("/categories/:categoryId/articles", controller.listArticlesInACategory);

export default router;

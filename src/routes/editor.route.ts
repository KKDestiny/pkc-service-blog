/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";
import controller from "../controllers/editor.controller";

const router = express.Router({ mergeParams: true });

router.get("/articles", controller.listArticles);
router.post("/articles", controller.create);
router.put("/articles/:articleId", controller.updateAnArticle);
router.put("/articles/:articleId/content", controller.updateAnArticleContent);

export default router;

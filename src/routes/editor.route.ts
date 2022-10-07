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
router.delete("/articles/:articleId", controller.deleteAnArticle);
router.post("/articles/:articleId", controller.recoverAnArticle);

router.put("/articles/:articleId/content", controller.updateAnArticleContent);

router.put("/articles/:articleId/release", controller.releaseAnArticle);
router.delete("/articles/:articleId/release", controller.cancelReleaseAnArticle);

router.post("/articles/:articleId/lock", controller.lockAnArticle);
router.put("/articles/:articleId/lock", controller.resetLockAnArticle);
router.delete("/articles/:articleId/lock", controller.unlockAnArticle);

export default router;

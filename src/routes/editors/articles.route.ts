/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";
import controller from "../../controllers/articles.controller";

const router = express.Router({ mergeParams: true });

router.get("/", controller.listArticles);
router.post("/", controller.create);

router.put("/:articleId", controller.updateAnArticle);
router.delete("/:articleId", controller.deleteAnArticle);
router.post("/:articleId", controller.recoverAnArticle);

router.put("/:articleId/content", controller.updateAnArticleContent);

router.put("/:articleId/release", controller.releaseAnArticle);
router.delete("/:articleId/release", controller.cancelReleaseAnArticle);

router.post("/:articleId/lock", controller.lockAnArticle);
router.put("/:articleId/lock", controller.resetLockAnArticle);
router.delete("/:articleId/lock", controller.unlockAnArticle);

export default router;

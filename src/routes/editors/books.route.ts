/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";

import controller from "../../controllers/books.controller";

const router = express.Router({ mergeParams: true });

router.get("/", controller.getBooks);
router.post("/", controller.createABook);
router.put("/:bookId", controller.updateABook);
router.put("/:bookId/parent", controller.moveABook);
router.delete("/:bookId", controller.deleteABook);

export default router;

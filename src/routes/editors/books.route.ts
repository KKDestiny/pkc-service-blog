/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";

import controller from "../../controllers/books.controller";

const router = express.Router({ mergeParams: true });

router.get("/", controller.getBooks);

export default router;

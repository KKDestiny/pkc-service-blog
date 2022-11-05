/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";

import articlesRoute from "./articles.route";
import booksRoute from "./books.route";

const router = express.Router({ mergeParams: true });

router.use("/articles", articlesRoute);
router.use("/books", booksRoute);

export default router;

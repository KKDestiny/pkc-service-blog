/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";

import squareRoute from "./square.route";
import editorRoute from "./editor.route";
import auth from "../middlewares/auth.middleware";

const router = express.Router({ mergeParams: true });

router.use("/square", squareRoute);

router.use(auth);
router.use("/editor", editorRoute);

export default router;

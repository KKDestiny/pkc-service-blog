/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";

import authRoute from "./auth.route";
import demoMiddleware from "../middlewares/demo.middleware";

const router = express.Router({ mergeParams: true });

router.use("/auth", demoMiddleware, authRoute);

export default router;

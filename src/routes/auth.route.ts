/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";
import controller from "../controllers/auth.controller";

const router = express.Router({ mergeParams: true });

router.post("/login", controller.login);

export default router;

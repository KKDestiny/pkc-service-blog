/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";

const router = express.Router({ mergeParams: true });

const notDefined = (req, res) => {
  res.status(400).json({ errors: "not ready" });
};

router.get("/", notDefined);

export default router;

/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import mongoose, { Schema } from "mongoose";

export const schema = new Schema(
  {
    name: {
      type: String,
      description: "名称",
    },
    level: {
      type: String,
      description: "级别",
    },
    date: {
      type: Date,
      description: "创建日期",
    },
    icon: {
      type: String,
      description: "图标地址",
    },
    parentid: {
      type: String,
      description: "上级id",
    },
    intro: {
      type: String,
      description: "简述",
    },

    bgcolor: {
      type: String,
      description: "背景色",
    },
    color: {
      type: String,
      description: "文字颜色",
    },
    imgurl: {
      type: String,
      description: "封面图片地址",
    },
    status: {
      type: String,
      description: "状态",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);
schema.method({});

const CategoryModel = mongoose.model("category", schema);

export default CategoryModel;

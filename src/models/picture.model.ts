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
      description: "图片地址",
    },
    sha1: {
      type: String,
      description: "图片的SHA1摘要",
    },
    size: {
      type: Number,
      description: "图片大小(Byte)",
    },
    author: {
      type: String,
      description: "图片上传者",
    },
    status: {
      type: String,
      enum: ["valid", "invalid"],
      description: "状态",
    },
    refLog: {
      type: [
        new Schema({
          date: {
            type: String,
            description: "引用日期",
          },
          author: {
            type: String,
            description: "作者",
          },
          title: {
            type: String,
            description: "文章标题",
          },
        }),
      ],
      description: "引用文章",
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

const CategoryModel = mongoose.model("picture", schema);

export default CategoryModel;

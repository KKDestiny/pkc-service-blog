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
      description: "用户名",
    },
    login: {
      type: String,
      description: "登录名",
    },
    collections: {
      type: [
        new Schema({
          id: {
            type: String,
            description: "书籍id",
          },
          name: {
            type: String,
            description: "书籍名称",
          },
          intro: {
            type: String,
            description: "书籍简介",
          },
          preface: {
            type: String,
            description: "书籍封面地址",
          },
          lastdate: {
            type: String,
            description: "最后编辑日期",
          },
          parent: {
            type: String,
            description: "上级书籍",
          },
          status: {
            type: String,
            description: "状态",
          },
        }),
      ],
      description: "书籍",
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

const UserModel = mongoose.model("user", schema);

export default UserModel;

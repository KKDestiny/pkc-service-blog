/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import { saveTypes } from "../../config/constants";

const tags = ["2. 编辑器"];
const produces = ["application/json"];
const consumes = ["application/json"];

export default {
  paths: {
    "/editor/articles": {
      get: {
        tags,
        summary: "获取文章数据",
        produces,
        consumes,
        parameters: [
          {
            name: "simplify",
            in: "query",
            type: "string",
            example: "yes",
            enum: ["yes", "", "no"],
            description: "获取简化的信息",
          },
          {
            name: "privateCategorieid",
            in: "query",
            type: "string",
            example: "cid1",
            description: "私人文集id",
          },
          {
            name: "limit",
            in: "query",
            type: "string",
            example: "200",
            description: "最大查看数量",
          },
          {
            name: "page",
            in: "query",
            type: "string",
            example: "0",
            description: "页码",
          },
        ],
        responses: {
          200: {
            description: "获取成功",
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    page: {
                      type: "number",
                      example: 400,
                      description: "页码",
                    },
                    limit: {
                      type: "number",
                      example: 400,
                      description: "每页文档数量",
                    },
                    total: {
                      type: "number",
                      example: 400,
                      description: "文档总数",
                    },
                    list: {
                      type: "object",
                      description: "文章列表",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "获取失败",
            schema: {
              type: "object",
              properties: {
                errors: {
                  type: "object",
                  properties: {
                    status: {
                      type: "number",
                      example: 400,
                    },
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags,
        summary: "创建一篇文章",
        produces,
        consumes,
        parameters: [
          {
            name: "content",
            in: "body",
            type: "string",
            example: "# 标题\r\n\r\n从这里开始...",
            default: "# 标题\r\n\r\n从这里开始...",
            description: "文章内容",
          },
          {
            name: "title",
            in: "body",
            type: "string",
            example: "新文章",
            default: "无标题",
            description: "文章标题",
          },
          {
            name: "tag",
            in: "body",
            type: "string",
            example: "标签1",
            description: "标签",
          },
          {
            name: "editor",
            in: "body",
            type: "string",
            example: "markdown",
            default: "markdown",
            description: "编辑器类型",
          },
          {
            name: "privateCategorieid",
            in: "body",
            type: "string",
            example: "pcid0001",
            default: "default",
            description: "文集id，文章将被放在该文集中",
          },
        ],
        responses: {
          200: {
            description: "成功",
            schema: {
              type: "object",
            },
          },
          400: {
            description: "失败",
            schema: {
              type: "object",
              properties: {
                errors: {
                  type: "object",
                  properties: {
                    status: {
                      type: "number",
                      example: 400,
                    },
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/editor/articles/{articleId}": {
      put: {
        tags,
        summary: "更新文章基础信息",
        produces,
        consumes,
        parameters: [
          {
            name: "title",
            in: "body",
            type: "string",
            example: "新文章",
            default: "无标题",
            description: "文章标题",
          },
          {
            name: "tag",
            in: "body",
            type: "string",
            example: "标签1",
            description: "标签",
          },
          {
            name: "editor",
            in: "body",
            type: "string",
            example: "markdown",
            default: "markdown",
            description: "编辑器类型",
          },
          {
            name: "privateCategorieid",
            in: "body",
            type: "string",
            example: "pcid0001",
            default: "default",
            description: "文集id，文章将被放在该文集中",
          },
        ],
        responses: {
          200: {
            description: "成功",
            schema: {
              type: "object",
            },
          },
          400: {
            description: "失败",
            schema: {
              type: "object",
              properties: {
                errors: {
                  type: "object",
                  properties: {
                    status: {
                      type: "number",
                      example: 400,
                    },
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/editor/articles/{articleId}/content": {
      put: {
        tags,
        summary: "更新文章正文内容",
        produces,
        consumes,
        parameters: [
          {
            name: "version",
            in: "body",
            type: "string",
            example: "8",
            required: true,
            description: "新的版本号",
          },
          {
            name: "title",
            in: "body",
            type: "string",
            example: "新文章",
            default: "无标题",
            description: "文章标题",
          },
          {
            name: "abstract",
            in: "body",
            type: "string",
            example: "新文章",
            default: "无标题",
            description: "文章摘要",
          },
          {
            name: "imgUrl",
            in: "body",
            type: "string",
            example: "新文章",
            default: "无标题",
            description: "文章封面图片地址",
          },
          {
            name: "savetype",
            in: "body",
            type: "string",
            example: "autosave",
            default: "autosave",
            enum: saveTypes,
            description: "保存方式",
          },

          {
            name: "content",
            in: "body",
            type: "string",
            example: "# 标题\r\n\r\n从这里开始...",
            default: "# 标题\r\n\r\n从这里开始...",
            description: "文章内容",
          },
        ],
        responses: {
          200: {
            description: "成功",
            schema: {
              type: "object",
            },
          },
          400: {
            description: "失败",
            schema: {
              type: "object",
              properties: {
                errors: {
                  type: "object",
                  properties: {
                    status: {
                      type: "number",
                      example: 400,
                    },
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

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
            in: "body",
            name: "body",
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  example: "# 标题\r\n\r\n从这里开始...",
                  default: "# 标题\r\n\r\n从这里开始...",
                  description: "文章内容",
                },
                title: {
                  type: "string",
                  example: "新文章",
                  default: "无标题",
                  description: "文章标题",
                },
                tag: {
                  type: "string",
                  example: "标签1",
                  description: "标签",
                },
                editor: {
                  type: "string",
                  example: "markdown",
                  default: "markdown",
                  description: "编辑器类型",
                },
                privateCategorieid: {
                  type: "string",
                  example: "pcid0001",
                  default: "default",
                  description: "文集id，文章将被放在该文集中",
                },
              },
            },
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
            in: "body",
            name: "body",
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "新文章",
                  default: "无标题",
                  description: "文章标题",
                },
                tag: {
                  type: "string",
                  example: "标签1",
                  description: "标签",
                },
                editor: {
                  type: "string",
                  example: "markdown",
                  default: "markdown",
                  description: "编辑器类型",
                },
                privateCategorieid: {
                  type: "string",
                  example: "pcid0001",
                  default: "default",
                  description: "文集id，文章将被放在该文集中",
                },
                original: {
                  type: "string",
                  example: "yes",
                  enum: ["yes", "no", null, "", "translate"],
                  description: "原创标识",
                },
              },
            },
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
      delete: {
        tags,
        summary: "删除一篇文章",
        produces,
        consumes,
        parameters: [
          {
            name: "forceDelete",
            in: "query",
            type: "string",
            example: "yes",
            enum: ["no", "yes"],
            description: "是否物理删除，默认只会移入回收站、文件内容不会物理删除（可恢复）",
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
      post: {
        tags,
        summary: "从回收站中恢复一篇文章",
        produces,
        consumes,
        parameters: [
          {
            in: "body",
            name: "body",
            schema: {
              type: "object",
              properties: {
                privateCategorieid: {
                  type: "string",
                  example: "pcid0001",
                  default: "default",
                  description: "恢复后要把文章放在哪个文集中，默认不改变文章所在文集",
                },
              },
            },
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
            in: "body",
            name: "body",
            schema: {
              type: "object",
              properties: {
                version: {
                  type: "string",
                  example: "8",
                  required: true,
                  description: "新的版本号",
                },
                title: {
                  type: "string",
                  example: "新文章",
                  default: "无标题",
                  description: "文章标题",
                },
                abstract: {
                  type: "string",
                  example: "新文章",
                  default: "无标题",
                  description: "文章摘要",
                },
                imgUrl: {
                  type: "string",
                  example: "新文章",
                  default: "无标题",
                  description: "文章封面图片地址",
                },
                savetype: {
                  type: "string",
                  example: "autosave",
                  default: "autosave",
                  enum: saveTypes,
                  description: "保存方式",
                },

                content: {
                  type: "string",
                  example: "# 标题\r\n\r\n从这里开始...",
                  default: "# 标题\r\n\r\n从这里开始...",
                  description: "文章内容",
                },
              },
            },
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
    "/editor/articles/{articleId}/release": {
      put: {
        tags,
        summary: "发布文章",
        produces,
        consumes,
        parameters: [
          {
            in: "body",
            name: "body",
            schema: {
              type: "object",
              properties: {
                releasedversionName: {
                  type: "string",
                  example: "v1.0",
                  required: true,
                  description: "自定义的发布版本号",
                },
                releaseInfo: {
                  type: "string",
                  example: "发布正式版本",
                  required: true,
                  description: "发布说明",
                },
              },
            },
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
      delete: {
        tags,
        summary: "取消发布文章",
        produces,
        consumes,
        parameters: [],
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
    "/editor/articles/{articleId}/lock": {
      post: {
        tags,
        summary: "为文章加锁",
        produces,
        consumes,
        parameters: [
          {
            in: "body",
            name: "body",
            schema: {
              type: "object",
              properties: {
                passwd: {
                  type: "string",
                  example: "abc123",
                  required: false,
                  description: "设置密码，如果不提供则使用随机字符串作为密码",
                },
              },
            },
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
      put: {
        tags,
        summary: "重置文章锁",
        produces,
        consumes,
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
      delete: {
        tags,
        summary: "取消文章锁",
        produces,
        consumes,
        parameters: [],
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

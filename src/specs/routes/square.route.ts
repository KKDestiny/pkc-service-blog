/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
const tags = ["1. 广场"];
const produces = ["application/json"];
const consumes = ["application/json"];

export default {
  paths: {
    "/square": {
      get: {
        tags,
        summary: "获取广场数据",
        produces,
        consumes,
        responses: {
          200: {
            description: "获取成功",
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
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
    },
    "/square/articles": {
      get: {
        tags,
        summary: "获取已发布文章列表",
        produces,
        consumes,
        parameters: [
          {
            name: "ispublished",
            in: "query",
            type: "string",
            example: "yes",
            enum: ["yes", "no", ""],
            description: "只看被专栏收录的文章，默认为yes",
          },
          {
            name: "limit",
            in: "query",
            type: "string",
            example: "200",
            description: "最大查看数量（最大值为2000）",
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
    },
    "/square/articles/{articleId}": {
      get: {
        tags,
        summary: "获取某一篇文章数据",
        description: "文章必须已发布，且未加密",
        produces,
        consumes,
        parameters: [
          {
            name: "articleId",
            in: "path",
            type: "string",
            example: "581047797628141c0fbfb0ed",
            description: "文章id",
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
    },
    "/square/articles/{articleId}/content": {
      get: {
        tags,
        summary: "获取某一篇文章正文内容",
        description: "文章必须已发布，且未加密",
        produces,
        consumes,
        parameters: [
          {
            name: "articleId",
            in: "path",
            type: "string",
            example: "581047797628141c0fbfb0ed",
            description: "文章id",
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
    },
    "/square/categories/{categoryId}/articles": {
      get: {
        tags,
        summary: "获取某个专栏的文章列表",
        produces,
        consumes,
        parameters: [
          {
            name: "categoryId",
            in: "path",
            type: "string",
            example: "category1",
            description: "专栏Id",
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
    },
  },
};

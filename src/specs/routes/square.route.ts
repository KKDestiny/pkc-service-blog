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

/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
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
            example: "100",
            description: "最大数量",
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

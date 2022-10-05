/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
const tags = ["1. 权限认证"];
const produces = ["application/json"];
const consumes = ["application/json"];

export default {
  paths: {
    "/auth/login": {
      post: {
        tags,
        summary: "登录",
        produces,
        consumes,
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            properties: {
              name: {
                type: "string",
                required: true,
                example: "用户1",
                description: "用户名",
              },
              password: {
                type: "string",
                required: true,
                example: "12345678",
                description: "登录密码",
              },
            },
          },
        ],
        responses: {
          200: {
            description: "登录成功",
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      example: "jfdklshfjasdhfj1212234",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "登录失败",
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
                      example: "密码错误",
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

/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
export default {
  definitions: {
    Account: {
      properties: {
        name: {
          description: "用户名",
          type: "string",
        },
        email: {
          description: "email",
          type: "string",
        },
        password: {
          description: "登录密码",
          type: "string",
        },
        id: {},
      },
    },
  },
};

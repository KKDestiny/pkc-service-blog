export default {
  definitions: {
    Categories: {
      properties: {
        name: {
          example: "string",
          type: "string",
          description: "名称",
        },
        level: {
          example: "string",
          type: "string",
          description: "级别",
        },
        date: {
          example: "2022-10-08T08:51:33.575Z",
          type: "string",
          format: "datetime",
          description: "创建日期",
        },
        icon: {
          example: "string",
          type: "string",
          description: "图标地址",
        },
        parentid: {
          example: "string",
          type: "string",
          description: "上级id",
        },
        intro: {
          example: "string",
          type: "string",
          description: "简述",
        },
        bgcolor: {
          example: "string",
          type: "string",
          description: "背景色",
        },
        color: {
          example: "string",
          type: "string",
          description: "文字颜色",
        },
        imgurl: {
          example: "string",
          type: "string",
          description: "封面图片地址",
        },
        status: {
          example: "string",
          type: "string",
          description: "状态",
        },
      },
    },
  },
};

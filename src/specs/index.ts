/*
 * @Author: linxiaozhou.com
 * @Date: 2020-11-13 16:06:07
 * @LastEditTime: 2020-12-17 18:12:49
 * @LastEditors: linxiaozhou.com
 */
import fs from "fs";
import path from "path";
import { sortBy } from "lodash";

import config from "../config";

const swaggerConfigs = {
  // 根目录
  directories: ["./routes", "./schemas"],

  // 标签
  tags: {
    // 从定义路由的json文件中汇总全部tags，并合并到默认tag列表中
    mergeFromRoutes: true,

    // 默认tag列表
    defaultTags: [],
  },
};

const swaggerOptions = {
  // 基本配置
  swagger: "2.0",
  info: {
    title: config.APP_NAME,
    version: config.APP_VERSION,
    description: `Endpoints to test the ${config.APP_NAME} service`,
  },
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ bearerAuth: [] }],
  externalDocs: {
    description: "Documents for Developers",
    url: "https://www.linxiaozhou.com",
  },
  produces: ["application/json"],

  // 跟路由
  basePath: config.APP_ROUTE,

  // 标签列表(如果不定义，则会从每个路由的tags中获取)
  tags: swaggerConfigs.tags.defaultTags,

  // 路由
  paths: {},

  // Schema
  definitions: {},
};

// 获取全部路由和schema描述文件
for (const dirPath of swaggerConfigs.directories) {
  const fullPath = path.join(__dirname, `/${dirPath}`);
  if (!fs.existsSync(fullPath)) {
    continue;
  }
  const files = fs.readdirSync(fullPath);
  for (const file of files) {
    const jsonData = require(path.join(__dirname, `/${dirPath}/${file}`));
    if (jsonData && jsonData.default) {
      const { paths, definitions } = jsonData.default;
      if (paths) {
        Object.assign(swaggerOptions.paths, paths);
      }
      if (definitions) {
        Object.assign(swaggerOptions.definitions, definitions);
      }
    }
  }
}

// 重新生成Tags列表
if (swaggerConfigs.tags.mergeFromRoutes) {
  const routes = swaggerOptions.paths;
  Object.values(routes).reduce((tags, route) => {
    return Object.values(route).reduce((temp, method) => {
      if (method.tags instanceof Array) {
        if (method.tags.length > 0) {
          // 合并不同的tag
          const tag = method.tags[0];
          const newTag = temp.reduce((temp0, curr = {}) => {
            if (curr.name === tag) {
              return null;
            }
            return temp0;
          }, tag);
          if (newTag) {
            temp.push({
              name: tag,
            });
          }
        }
      }
      return temp;
    }, tags);
  }, swaggerOptions.tags);
}
// Tag排序
swaggerOptions.tags = sortBy(swaggerOptions.tags, ["name", "description"]);

export default swaggerOptions;

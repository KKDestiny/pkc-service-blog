/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 将swaggerJson转换为PostmanJson数据，该数据支持Postman、insomnia等支持OpenAPI2.0规范的工具
 */
import { v4 as uuidv4 } from "uuid";
import { sortBy } from "lodash";

import config from "../../config";

const appNameRaw = config.APP_NAME || "";
const appPort = config.APP_PORT || 3000;
const appName = appNameRaw.replace("service-", "");
const ENDPOINT = `${appName}_endpoint`;
const ENDPOINT_VALUE = `http://localhost:${appPort}/${appName}`;

const commonHeaderAuth = {
  key: "Authorization",
  value: "{{TOKEN}}",
  type: "text",
};
const commonHeaderJson = {
  key: "Content-Type",
  value: "application/json",
  type: "text",
};

class PostmanConverterClass {
  constructor(
    options = {
      useUrlAsRequestName: false, // 使用url做为请求名称
    },
  ) {
    this.useUrlAsRequestName = options.useUrlAsRequestName;
  }

  /**
   * 重构tags
   * @param {*} swaggerOptions swagger的json对象数据
   */
  rebuildTags(swaggerOptions) {
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

  /**
   * 将 swagger的body数据 转为 postman的body数据
   * @param {*} schema swagger的body数据
   */
  convertSwaggerBody2PostmanBody(schema) {
    const _this = this;

    if (!schema) {
      return schema;
    }

    // 如果有示例，直接使用示例、不需要继续解析schema
    const example = schema.example;
    if (example) {
      return example;
    }

    // 没有示例，需要根据不同类型进行解析
    const type = schema.type;
    if (type === "object") {
      const properties = schema.properties || {};
      return Object.entries(properties).reduce((temp, [key, value]) => {
        const objValue = _this.convertSwaggerBody2PostmanBody(value);
        Object.assign(temp, {
          [key]: objValue,
        });
        return temp;
      }, {});
    } else if (type === "array") {
      return [_this.convertSwaggerBody2PostmanBody(schema.items)];
    } else if (type === "number") {
      return 1;
    } else if (type === "string") {
      if (schema.enum) {
        return schema.enum[0] || "string";
      }
      if (schema.format === "date") {
        return "2020-11-12";
      }
      return "string";
    } else if (type === "boolean") {
      return true;
    }
    return undefined;
  }

  /**
   * 根据标签名称获取所有item的数组
   * @param {*} paths swagger的paths对象
   * @param {*} tag 标签名称
   */
  getItemArrViaTag(paths = {}, tag) {
    const _this = this;

    const tagName = tag.name;
    const filteredItems = Object.entries(paths).reduce((temp, [url, route]) => {
      const methods = Object.entries(route).reduce((items, [smethod, data]) => {
        const sTags = data.tags || [];
        if (tagName !== sTags[0]) {
          return items;
        }

        const method = smethod.toUpperCase();
        const sParameters = data.parameters;
        const query = sParameters.reduce((tempQuery, sParam) => {
          if (sParam.in !== "query") {
            return tempQuery;
          }
          const pParam = {
            key: sParam.name,
          };
          if (sParam.example) {
            Object.assign(pParam, {
              value: sParam.example,
            });
          } else if (sParam.enum) {
            Object.assign(pParam, {
              value: sParam.enum[0],
            });
          }
          if (sParam.description) {
            Object.assign(pParam, {
              description: sParam.description,
            });
          }
          tempQuery.push(pParam);
          return tempQuery;
        }, []);
        const reqName = _this.useUrlAsRequestName ? url : data.summary || url;
        const newUrl = url.replace(/{/g, "{{").replace(/}/g, "}}");
        const sRequest = {
          name: reqName,
          request: {
            // 方法
            method,
            // Http Header
            header: [commonHeaderAuth, commonHeaderJson],
            // Http Body
            // body,
            // URL、Query、Params
            url: {
              raw: `{{${ENDPOINT}}}${newUrl}`,
              host: `{{${ENDPOINT}}}`,
              path: newUrl.split(),
              query,
            },
            description: data.description || data.summary,
          },
          response: [],
        };

        if (method === "PUT" || method === "POST") {
          const body = {};
          for (const sParam of sParameters) {
            if (sParam.in === "body") {
              Object.assign(body, {
                mode: "raw",
                raw: JSON.stringify(_this.convertSwaggerBody2PostmanBody(sParam.schema), null, 2),
              });
              break;
            }
            // For Swagger2.0
            // Unlike OpenAPI 2.0, Open API 3.0 does not have the file type.
            if (sParam.in === "formData") {
              Object.assign(body, {
                mode: "formdata",
                formdata: [
                  {
                    key: sParam.name,
                    type: sParam.type,
                    src: [],
                  },
                ],
              });
              break;
            }
          }
          sRequest.request.body = body;
        }

        items.push(sRequest);
        return items;
      }, []);
      temp = temp.concat(methods);
      return temp;
    }, []);

    return {
      name: tagName,
      item: filteredItems,
    };
  }

  generate(swaggerOptions) {
    const _this = this;

    // 构建tags
    _this.rebuildTags(swaggerOptions);
    swaggerOptions.tags = sortBy(swaggerOptions.tags, ["name", "description"]);

    const { info, paths, tags } = swaggerOptions;
    const itemArr = tags.reduce((temp, tag) => {
      temp = temp.concat(_this.getItemArrViaTag(paths, tag));
      return temp;
    }, []);

    return {
      // 基本信息
      info: {
        _postman_id: uuidv4(),
        name: info.title,
        description: info.description,
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      },

      // 全局环境变量
      variable: [
        // Host
        {
          id: uuidv4(),
          key: ENDPOINT,
          value: ENDPOINT_VALUE,
        },
      ],

      event: [],
      protocolProfileBehavior: {},

      // 文件夹/APIs
      item: itemArr,
    };
  }
}

export default PostmanConverterClass;

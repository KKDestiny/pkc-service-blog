/* eslint-disable class-methods-use-this */
/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: Mongoose Version >= v5.13.5
 */
import { Schema, Types as MongooseTypes } from "mongoose";
import chalk from "chalk";
import dayjs from "dayjs";

// 通用字段
const commonFieldsInfo = {
  _id: {
    description: "文档ID",
  },
  id: {
    description: "文档ID",
  },
  updatedAt: {
    description: "更新时间",
  },
  createdAt: {
    description: "创建时间",
  },
};

// 基本数据类型
const basicTypes = {
  ObjectId: "ObjectId",
  String: "String",
  Boolean: "Boolean",
  Number: "Number",
  Date: "Date",
};
// 自定义数据类型
const selfDefTypes = {
  Integer: "Int32",
  Double: "Double",
  Schedule: "Schedule",
};
const basicFullTypes = {
  // 基本数据类型
  ...basicTypes,

  // 自定义数据类型
  ...selfDefTypes,
};
// 特殊数据类型
const complexTypes = {
  Schema: "Schema",
  Array: "Array",
  Map: "Map",
  Embedded: "Embedded",
  Mixed: "Mixed",
};

const TYPES = {
  // 基本数据类型
  ...basicFullTypes,
  // 特殊数据类型
  ...complexTypes,
};

/**
 * 解析时不需要进一步处理的字段
 */
const simpleSchedule = { 2021: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] };
const randomSchedule = simpleSchedule; // genRandomSchedule(2021, 2021);
const randomValue = 100; // parseInt(10000 * Math.random() * 10);

function isBasicType(type) {
  if (!type) return null;

  for (const simple of Object.values(basicFullTypes)) {
    if (simple.toLowerCase() === type.toLowerCase()) {
      return simple;
    }
  }
  return null;
}
function isComplexType(type) {
  if (!type) return null;

  for (const complex of Object.values(complexTypes)) {
    if (complex.toLowerCase() === type.toLowerCase()) {
      return complex;
    }
  }
  return null;
}

function isDefinedType(schematypeName) {
  if (isBasicType(schematypeName) !== null) return true;
  if (isComplexType(schematypeName) !== null) return true;

  return false;
}

function assignFieldOptions(fieldValue, schematype = {}) {
  if (schematype.options) {
    // 字段的选项
    const { defaultValue, example, description } = schematype.options;
    if (defaultValue !== undefined) Object.assign(fieldValue, { default: defaultValue });
    if (example !== undefined) Object.assign(fieldValue, { example });
    if (description !== undefined) Object.assign(fieldValue, { description });
  }
  return fieldValue;
}

export class SchemaParser {
  constructor(raw) {
    this.modelName = "Schema";
    if (!this.isSchema(raw)) {
      if (raw.model && raw.model.name === "model") {
        this.modelName = raw.modelName;
        this.schema = raw.schema;
      } else {
        this.schema = new Schema(raw);
      }
    } else {
      this.schema = raw;
    }

    this.reset();
  }

  reset() {
    this.swagger = null;
  }

  run() {
    this.reset();
    this.swagger = this.getSwaggerJson(this.schema);
    // console.log("result", JSON.stringify(this.swagger, null, 2));
  }

  setSwagger(swagger = {}) {
    this.swagger = swagger;
  }

  /**
   * 获取swagger Object
   */
  getSwaggerJsonObject() {
    return this.swagger;
  }

  /**
   * 获取swagger json(字符串)
   */
  getSwaggerJsonString() {
    const swaggerJson = {
      [this.modelName]: this.swagger || {},
    };
    return `export default ${JSON.stringify(swaggerJson, null, 2)};`;
  }

  /**
   * 判断是否为Mongoose的Schema类型
   * @param {*} schema
   * @returns
   */
  isSchema(schema) {
    if (Object.keys(basicFullTypes).includes(schema.instance)) {
      return false;
    }
    return schema instanceof Schema;
  }

  /**
   * 获取字符串示例
   * @param {*} value
   * @returns
   */
  getStringExample(type, value) {
    // 优先使用example值
    if (value.example) return value.example;

    // 优先使用default值
    if (value.default) return value.default;

    let defaultValue = "string";
    if (type === TYPES.Date) {
      if (value.format === "date") {
        defaultValue = dayjs().format("YYYY-MM-DD");
      } else {
        defaultValue = new Date();
      }
    } else if (value.format === "MongoId") {
      defaultValue = MongooseTypes.ObjectId();
    } else if (value.enum && Array.isArray(value.enum)) {
      defaultValue = value.enum[0];
    } else {
      // console.log(currKey, value);
    }

    return defaultValue;
  }

  /**
   * 根据数据类型返回一个示例, 仅支持基本数据类型
   * @param {*} type
   * @returns
   */
  getExampleByType(type, value) {
    switch (type) {
      case TYPES.ObjectId:
        return "5ecf253fd0a9e800113a76fb";
      case TYPES.Mixed:
        return {};
      case TYPES.String:
        return this.getStringExample(type, value);
      case TYPES.Boolean:
        return false;
      case TYPES.Number:
        return randomValue;
      case TYPES.Date:
        return this.getStringExample(type, value);

      case TYPES.Integer:
        return randomValue;
      case TYPES.Double:
        return 100.0;
      case TYPES.Schedule:
        return randomSchedule;

      default:
        break;
    }

    return undefined;
  }

  /**
   * 获取基本类型的说明
   * @param {*} type
   * @param {*} format
   * @returns
   */
  getBasicTypeSwagger(type, value) {
    const example = this.getExampleByType(type, value);
    const result = { example };

    switch (type) {
      case basicFullTypes.Mixed:
        Object.assign(result, {
          type: "Mixed",
        });
        break;
      case basicFullTypes.ObjectId:
        Object.assign(result, {
          type: "string",
          format: "MongoId",
        });
        break;
      case basicFullTypes.String:
        Object.assign(result, {
          type: "string",
        });
        break;
      case basicFullTypes.Boolean:
        Object.assign(result, {
          type: "boolean",
        });
        break;
      case basicFullTypes.Number:
        Object.assign(result, {
          type: "number",
        });
        break;
      case basicFullTypes.Date:
        Object.assign(result, {
          type: "string",
          format: value?.format || "datetime",
        });
        break;

      // 自定义数据类型
      case basicFullTypes.Integer:
        Object.assign(result, {
          type: "number",
          format: "integer",
        });
        break;
      case basicFullTypes.Double:
        Object.assign(result, {
          type: "number",
          format: "double",
        });
        break;
      case basicFullTypes.Schedule:
        Object.assign(result, {
          type: "Schedule",
        });
        break;

      default:
        break;
    }

    return result;
  }

  getDesciption(key, value) {
    if (value.description) return value.description;
    if (commonFieldsInfo[key]) return commonFieldsInfo[key].description;

    return;
  }

  /**
   * 解析某个字段的数据
   * @param {Schema} schema Schema
   * @param {*} destData 字段名
   */
  parseSchema(schema, destData) {
    const _this = this;

    const temp = {};
    schema.eachPath((pathname, schematype) => {
      Object.assign(temp, {
        [pathname]: schematype,
      });
    });
    const result = Object.entries(temp).reduce((prev, [field, schematype]) => {
      if (Object.keys(commonFieldsInfo).includes(field)) return prev;
      if (field.indexOf(".$*") > -1) return prev;

      // 普通类型
      const simpleType = isBasicType(schematype.instance);
      if (simpleType !== null) {
        // 字段类型
        Object.assign(prev, {
          [field]: {
            ..._this.getBasicTypeSwagger(simpleType, schematype.options),
            ...assignFieldOptions({}, schematype),
          },
        });
        return prev;
      }

      // 其他类型 complexTypes
      const complex = isComplexType(schematype.instance);
      if (complex !== null) {
        switch (complex) {
          // 嵌套文档 Embedded Document
          case complexTypes.Embedded:
            if (schematype.schema instanceof Schema) {
              const tempData = {};
              _this.parseSchema(schematype.schema, tempData);
              Object.assign(prev, {
                [field]: {
                  type: "object",
                  ...assignFieldOptions({}, schematype),
                  properties: tempData,
                },
              });
            } else {
              console.log(chalk.redBright("INVALID SCHEMA TYPE(-Embedded-)!!!!"), field, schematype.instance);
            }
            break;

          // 数组Array
          case complexTypes.Array:
            if (schematype.schema instanceof Schema) {
              // 定义了Schema
              const tempData = {};
              _this.parseSchema(schematype.schema, tempData);
              Object.assign(prev, {
                [field]: {
                  type: "array",
                  ...assignFieldOptions({}, schematype),
                  items: tempData,
                },
              });
            } else {
              // 普通类型或未声明为schema
              if (schematype.options && schematype.options.type && schematype.options.type[0]) {
                // 未声明为schema的类型
                // { demoArray: [ type: { field1: String, field2: Number } ] }
                const schemaName = schematype.options.type[0].schemaName || (schematype.options.type[0].type && schematype.options.type[0].type.schemaName);
                if (!isDefinedType(schemaName)) {
                  const tempData = {};
                  _this.parseSchema(new Schema(schematype.options.type[0]), tempData);
                  Object.assign(prev, {
                    [field]: {
                      type: "array",
                      ...assignFieldOptions({}, schematype),
                      items: tempData,
                    },
                  });
                } else {
                  // 普通类型数组
                  Object.assign(prev, {
                    [field]: {
                      type: "array",
                      ...assignFieldOptions({}, schematype),
                      items: {
                        ..._this.getBasicTypeSwagger(schemaName),
                        ...assignFieldOptions({}, schematype.options.type[0]),
                      },
                    },
                  });
                }
              }
            }
            break;

          // Map
          case complexTypes.Map:
            {
              const realBody = temp[`${field}.$*`];
              if (!realBody) {
                console.log(chalk.redBright("INVALID SCHEMA TYPE(-MAP1-)!!!!"), field, schematype.instance);
                return prev;
              }

              if (realBody.schema instanceof Schema) {
                const tempData = {};
                _this.parseSchema(realBody.schema, tempData);
                let realData = {
                  type: "object",
                  properties: tempData,
                };
                if (realBody.instance === "Array") {
                  realData = {
                    type: "array",
                    items: realData,
                  };
                }
                Object.assign(prev, {
                  [field]: {
                    type: "object",
                    ...assignFieldOptions({}, schematype),
                    additionalProperties: realData,
                  },
                });
              } else {
                // 普通类型或未声明为schema
                if (realBody.options && realBody.options.type) {
                  // 未声明为schema的类型
                  // { demoObj: { type: { field1: String, field2: Number } } }
                  const schemaName = realBody.options.type.schemaName;
                  if (!isDefinedType(schemaName)) {
                    const tempData = {};
                    _this.parseSchema(new Schema(realBody.options.type), tempData);
                    Object.assign(prev, {
                      [field]: {
                        type: "object",
                        ...assignFieldOptions({}, realBody),
                        additionalProperties: {
                          type: "object",
                          properties: tempData,
                        },
                      },
                    });
                  } else {
                    // 普通Map类型
                    Object.assign(prev, {
                      [field]: {
                        ..._this.getBasicTypeSwagger(schemaName),
                        ...assignFieldOptions({}, realBody),
                      },
                    });
                  }
                }
              }
            }
            break;

          // 混合Mixed
          case complexTypes.Mixed:
            // 普通类型或未声明为schema
            if (schematype.options && schematype.options.type) {
              // 未声明为schema的类型
              // { demoObj: { type: { field1: String, field2: Number } } }
              const schemaName = schematype.options.type.schemaName;
              if (!isDefinedType(schemaName)) {
                const tempData = {};
                _this.parseSchema(new Schema(schematype.options.type), tempData);
                Object.assign(prev, {
                  [field]: {
                    type: "object",
                    ...assignFieldOptions({}, schematype),
                    properties: tempData,
                  },
                });
              } else {
                // 普通Mixed类型
                Object.assign(prev, {
                  [field]: {
                    type: "object",
                    ...assignFieldOptions({}, schematype),
                  },
                });
              }
            }
            break;

          default:
            console.log(chalk.bgYellow("DEFAULT SCHEMA TYPE!!!!"), field, schematype.instance);
            break;
        }
        return prev;
      }

      // 无效类型
      console.log(chalk.bgRedBright("INVALID SCHEMA TYPE!!!!"), field, schematype.instance);

      return prev;
    }, {});

    Object.assign(destData, result);
  }

  getSwaggerJson(schema) {
    const result = {};
    this.parseSchema(schema, result);
    return result;
  }
}

/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import Joi from "joi";
import dotenv from "dotenv";
import readPkg from "read-pkg";

dotenv.config({ path: ".env" });

const pkginfo = readPkg.sync();

const schema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "experiment", "test").default("development"),

  APP_PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().default("service-demo"),
  APP_ROUTE: Joi.string().default("/"),
  APP_VERSION: Joi.string().default(`v${pkginfo.version || "1.0.0"}`),

  APP_MONGO_DEBUG_MODE: Joi.boolean().default(false),
  APP_MONGO_HOST: Joi.string().default("127.0.0.1"),
  APP_MONGO_NAME: Joi.string().default("demo"),
  APP_MONGO_PORT: Joi.number().default(27017),
  APP_MONGO_AUTH: Joi.string().default(""),
  APP_MONGO_USER: Joi.string().default(""),
  APP_MONGO_PASS: Joi.string().default(""),

  APP_REDIS_HOST: Joi.string().default("127.0.0.1"),
  APP_REDIS_PORT: Joi.number().default(6379),
  APP_REDIS_PASS: Joi.string().default(""),

  LOG_LEVEL: Joi.string().default("info"),

  ENABLE_LOGDB: Joi.boolean().default(false),

  LOG_MONGO_HOST: Joi.string().default("127.0.0.1"),
  LOG_MONGO_NAME: Joi.string().default("loggers"),
  LOG_MONGO_PORT: Joi.number().default(27017),
  LOG_MONGO_AUTH: Joi.string().default(""),
  LOG_MONGO_USER: Joi.string().default(""),
  LOG_MONGO_PASS: Joi.string().default(""),
})
  .unknown()
  .required();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default value;

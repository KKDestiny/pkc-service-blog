/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import config from "./index";

const { APP_MONGO_HOST, APP_MONGO_PORT, APP_MONGO_NAME, APP_MONGO_AUTH, APP_MONGO_USER, APP_MONGO_PASS } = config;

const authOptions =
  APP_MONGO_AUTH !== "" && APP_MONGO_PASS !== ""
    ? {
        auth: {
          authSource: APP_MONGO_AUTH,
          user: APP_MONGO_USER,
          password: APP_MONGO_PASS,
        },
      }
    : {};

const mongooseConfig = {
  url: `mongodb://${APP_MONGO_HOST}:${APP_MONGO_PORT}/${APP_MONGO_NAME}`,
  options: {
    ...authOptions,
    keepAlive: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
};

export default mongooseConfig;

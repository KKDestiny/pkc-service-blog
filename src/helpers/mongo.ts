/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import mongoose from "mongoose";
import chalk from "chalk";

import config from "../config";
import mongooseConfig from "../config/mongoose";

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.set("debug", config.APP_MONGO_DEBUG_MODE);
  mongoose.connect(mongooseConfig.url, mongooseConfig.options, err => {
    if (!err) {
      console.log(chalk.green(`[Mongoose] ${mongooseConfig.url}`));
    } else {
      console.error(chalk.red("[Mongoose] Error in database connection: " + err));
      mongoose.disconnect();
    }
    if (config.APP_MONGO_DEBUG_MODE) {
      console.log(chalk.gray(`[Mongoose Configs] ${JSON.stringify(mongooseConfig)}`));
    }
  });
  return mongoose.connection;
};

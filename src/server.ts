/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import chalk from "chalk";
import createDatabase from "./helpers/mongo";
import config from "./config";
import app from "./app";

createDatabase();

app.listen(config.APP_PORT, () => {
  console.log(chalk.green(`[Visit] http://localhost:${config.APP_PORT}`));
  console.log(chalk.green(`[Documentation] http://localhost:${config.APP_PORT}/doc`));
});

export default app;

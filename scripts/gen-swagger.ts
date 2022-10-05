/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 导出项目swagger数据
 */
import { genSwagger as run } from "../src/specs/tools/swagger.tool";

async function exec() {
  console.log(`===================== Begin Generate Swagger =====================`);
  await run();
  console.log(`====================== End Generate Swagger ======================\n\n`);
}
exec();

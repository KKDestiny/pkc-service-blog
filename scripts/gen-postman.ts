/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 导出seeder
 */
import { run } from "../src/specs/tools/postman.tool";

async function exec() {
  console.log(`===================== Begin Generate Postman =====================`);
  await run();
  console.log(`====================== End Generate Postman ======================\n\n`);
}
exec();

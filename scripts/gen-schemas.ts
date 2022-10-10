/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 导出项目swagger数据
 */ import { run } from "../src/specs/tools/schemas.tool";

async function exec() {
  console.log(`===================== Begin Generate Schemas =====================`);
  await run();
  console.log(`====================== End Generate Schemas ======================\n\n`);
}
exec();

/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 导出项目swagger数据
 */
import { run } from "../src/specs/tools/schemas.tool";

import { schema as articlesSchema } from "../src/models/articles.model";
import { schema as categoriesSchema } from "../src/models/categories.model";

const schemas = [
  {
    filename: "articles",
    schemaName: "Articles",
    schema: articlesSchema,
  },
  {
    filename: "categories",
    schemaName: "Categories",
    schema: categoriesSchema,
  },
];

async function exec() {
  console.log(`===================== Begin Generate Schemas =====================`);
  await run(schemas);
  console.log(`====================== End Generate Schemas ======================\n\n`);
}
exec();

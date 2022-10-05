/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 将swaggerjson转为Postman支持的json数据并写入指定路径
 */
import fs from "fs-extra";

import swaggerOptions from "../index";
import PostmanConverterClass from "../core/postman.class";

const swaggerPath = `./docs/exports/postman`;
const postmanFile = `postman_collection.json`;

export const run = async () => {
  const postmanInstance = new PostmanConverterClass({
    useUrlAsRequestName: true,
  });
  const postmanJson = postmanInstance.generate(swaggerOptions);

  const exists = await fs.pathExists(swaggerPath);
  if (!exists) {
    await fs.mkdirs(swaggerPath);
  }

  const exportPath = `${swaggerPath}/${postmanFile}`;
  fs.writeFileSync(`${swaggerPath}/${postmanFile}`, JSON.stringify(postmanJson, null, 2), "utf8");
  console.log(`✨ Export Postman json file to: ${exportPath}`);
};

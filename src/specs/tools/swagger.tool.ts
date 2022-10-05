/*
 * @Author: linxiaozhou.com
 * @Date: 2020-11-13 16:06:07
 * @LastEditTime: 2021-07-21 15:38:47
 * @LastEditors: linxiaozhou.com
 */
import fs from "fs-extra";
import swaggerOptions from "../index";

const swaggerPath = `./docs/exports/swagger`;
const swaggerFile = `swagger.json`;

export const genSwagger = async () => {
  const swaggerJson = Object.assign(swaggerOptions || {}, {
    "x-tagGroups": [
      {
        name: "APIS",
        tags: ["projects"],
      },
      {
        name: "ADMINS",
        tags: ["admins"],
      },
      {
        name: "Models",
        tags: ["Project"],
      },
    ],
  });
  const exists = await fs.pathExists(swaggerPath);
  if (!exists) {
    await fs.mkdirs(swaggerPath);
  }

  const exportPath = `${swaggerPath}/${swaggerFile}`;
  fs.writeFileSync(exportPath, JSON.stringify(swaggerJson, null, 2), "utf8");
  console.log(`✨ Exported Swagger json file to: ${exportPath}`);
};

export default swaggerOptions;

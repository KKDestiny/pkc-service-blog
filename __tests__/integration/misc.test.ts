/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import request from "supertest";
import app from "../../src/app";
import config from "../../src/config";

describe("Misc", () => {
  describe("GET /health-check", () => {
    test("should return ok", async () => {
      const res = await request(app).get("/health-check");

      expect(res.text).toEqual(`ok-${config.APP_NAME}`);
    });
  });
});

/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
module.exports = {
  apps: [
    {
      name: "setup-service",
      script: "dist/server.js",
      watch: false,
      instances: 1,
      autorestart: true,
      ignore_watch: [".git", "node_modules", "__tests__", "docs", "dist", "uploads", "logs"],
      max_memory_restart: "1G",
      output: "logs/server-out.log",
      error: "logs/server-error.log",
      log: "logs/server-combined.outerr.log",
    },
  ],
};

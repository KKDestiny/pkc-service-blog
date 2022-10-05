import winston, { format } from "winston";
import "winston-daily-rotate-file";

const formatter = format.combine(
  format.colorize(),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.splat(),
  format.printf(info => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
  })
);

export default winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "trace" : "error",
  levels: { trace: 5, debug: 4, info: 3, warn: 2, error: 1, fatal: 0 },
  transports: [
    process.env.NODE_ENV === "development"
      ? new winston.transports.Console({
          format: format.combine(format.colorize(), format.simple()),
          level: "error",
        })
      : new winston.transports.DailyRotateFile({
          format: formatter,
          maxFiles: "14d",
          level: "error",
          dirname: "logs",
          datePattern: "YYYY-MM-DD",
          filename: "%DATE%-debug.log",
        }),
  ],
});

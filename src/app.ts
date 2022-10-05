/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import expressWinston from "express-winston";
import swagger from "swagger-ui-express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import config from "./config";
import routes from "./routes";
import specs from "./specs";
import winstonInstance from "./config/winston";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(helmet({ hsts: false, contentSecurityPolicy: false }));

if (config.NODE_ENV === "production") {
  expressWinston.requestWhitelist.push("body");
  expressWinston.responseWhitelist.push("body");
  app.use(
    expressWinston.logger({
      winstonInstance,
      meta: true,
      msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    })
  );
}

if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(
    `${config.APP_ROUTE}/doc`,
    swagger.serve,
    swagger.setup(specs, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: config.APP_NAME,
    })
  );
}

app.get("/favicon.ico", (req, res) => res.status(204));
app.get(`${config.APP_ROUTE}health-check`, (req, res) => res.send(`ok-${config.APP_NAME}`));
app.get(`${config.APP_ROUTE}`, (req, res) =>
  res.status(200).json({
    name: config.APP_NAME,
    version: config.APP_VERSION,
  })
);

// mount all routes on / path
app.use(config.APP_ROUTE, routes);

// log error in winston transports except when executing test suite
if (config.NODE_ENV !== "test") {
  app.use(
    expressWinston.errorLogger({
      winstonInstance,
    })
  );
}

// request not match any route -> 404
app.use((req, res) => {
  const status = 404;
  res.status(404).json({
    errors: {
      message: "Not Found",
    },
  });
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    errors: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    },
  });
});

export default app;

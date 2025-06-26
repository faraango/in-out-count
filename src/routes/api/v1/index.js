const Router = require("koa-router");
const HttpStatusCodes = require("../../../constants/HttpStatusCodes");

const hikvision = require("./hikvision");

const app = new Router();

app.get("/", (ctx) => {
  ctx.body = "POS the BOSS";
  ctx.response.status = HttpStatusCodes.SUCCESS;
});

app.get("/health", (ctx) => {
  ctx.body = "ok";
  ctx.response.status = HttpStatusCodes.SUCCESS;
});

module.exports = {app,
  hikvision,
};

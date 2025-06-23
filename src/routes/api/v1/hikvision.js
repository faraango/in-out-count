const Router = require("koa-router");

const { v1 } = require("../../../constants/RouterConstants");

const { verifyEvents } = require("../../../controllers/hikvisionController");
const router = new Router({ prefix: v1.hikvision });

router.post("/accessEvent", verifyEvents);

module.exports = router;

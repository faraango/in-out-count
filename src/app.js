require("dotenv").config();
console.log("ENV", process.env.NODE_ENV);

const Koa = require("koa");
const koaBody = require("koa-body");
const routes = require("./routes");


const cors = require("@koa/cors");
const logger = require("koa-logger");

const PORT = 8070;

const app = new Koa();
app.use(logger());
app.use(cors());



app.use(koaBody({ multipart: true }));
routes.createRoute(app);

// dailyNotification()

app.listen(process.env.PORT || PORT, () => {
  console.log("Running in PORT: %s", process.env.PORT || PORT);
});

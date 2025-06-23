const HttpStatusCodes = require("../constants/HttpStatusCodes");
const { spawn } = require("child_process");
const { get } = require("lodash");
const { DEVICE_IN_NAME, DEVICE_OUT_NAME } = require("../../config");
const CACHE = {
  [DEVICE_IN_NAME]: 0,
  [DEVICE_OUT_NAME]: 0,
};
const formatData = (data) => {
  const major = get(data, "AccessControllerEvent.majorEventType");
  const minor = get(data, "AccessControllerEvent.subEventType");
  const deviceName = get(data, "AccessControllerEvent.deviceName", "");
  const formatData = get(data, "AccessControllerEvent", {});
  const deviceData = {
    ipAddress: get(data, "ipAddress"),
    portNo: get(data, "portNo"),
    macAddress: get(data, "macAddress"),
    dateTime: get(data, "dateTime"),
    deviceName,
  };
  if (
    (major === 5 && minor === 75) ||
    (major === 5 && minor === 1) ||
    (major === 5 && minor === 38)
  ) {
    const options = {
      ...formatData,
      ...deviceData,
    };
    return options;
  }
};

const verifyEvents = (ctx) => {
  try {
    const { body } = ctx.request;

    const withoutLineBreaks = JSON.parse(
      get(body, "event_log", "{}").replace(/[\r\n\t]/, "")
    );

    const formattedObject = formatData(withoutLineBreaks);
    console.log(formattedObject, "FORMATTED OBJECT");
    const currentDeviceName = get(formattedObject, "ipAddress");
    if (currentDeviceName === DEVICE_IN_NAME) {
      console.log("iin device name", currentDeviceName);
      CACHE[DEVICE_IN_NAME] = CACHE[DEVICE_IN_NAME] + 1;
      // CACHE[DEVICE_OUT_NAME] - 1 >= 0
      //   ? (CACHE[DEVICE_OUT_NAME] = CACHE[DEVICE_OUT_NAME] - 1)
      //   : 0;
    } else if (currentDeviceName === DEVICE_OUT_NAME) {
      console.log("out device name", currentDeviceName);
      CACHE[DEVICE_OUT_NAME] = CACHE[DEVICE_OUT_NAME + 1];
      // CACHE[DEVICE_IN_NAME] - 1 >= 0
      //   ? (CACHE[DEVICE_IN_NAME] = CACHE[DEVICE_IN_NAME] - 1)
      //   : 0;
    }
    const python = spawn("python3", [
      "display.py",
      JSON.stringify(CACHE),
      DEVICE_IN_NAME,
      DEVICE_OUT_NAME,
    ]);
    python.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    python.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`);
    });

    python.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
    });
    console.log(CACHE, "CACHE STATUS");
    ctx.body = "ok";
    ctx.response.status = HttpStatusCodes.SUCCESS;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  verifyEvents,
};

const HttpStatusCodes = require("../constants/HttpStatusCodes");
const { spawn } = require("child_process");
const { get } = require("lodash");
const fs=require("fs")
const { DEVICE_IN_NAME, DEVICE_OUT_NAME } = require("../../config");
const CACHE = {
  [DEVICE_IN_NAME]: 0,
  [DEVICE_OUT_NAME]: 0,
};
let DEVICE_IN_DETAILS={} 
let DEVICE_OUT_DETAILS={}
let pythonProcess=spawn("python3", [
      "index.py",
      JSON.stringify(CACHE),
      DEVICE_IN_NAME,
      DEVICE_OUT_NAME,
    ])
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
const resetCache=async (ctx)=>{
CACHE[DEVICE_IN_NAME]=0
CACHE[DEVICE_OUT_NAME]=0
DEVICE_IN_DETAILS={}
DEVICE_OUT_DETAILS={}
displayNumber()
ctx.body = "ok";
    ctx.response.status = HttpStatusCodes.SUCCESS;
}
const verifyEvents = async(ctx) => {
  try {
    const { body } = ctx.request;

    const withoutLineBreaks = JSON.parse(
      get(body, "event_log", "{}").replace(/[\r\n\t]/, "")
    );

    const formattedObject = formatData(withoutLineBreaks);
    console.log(formattedObject,withoutLineBreaks, "FORMATTED OBJECT WITHOUT LINE BREAKS");
     if(!formattedObject) {
    ctx.body = "ok";
    ctx.response.status = HttpStatusCodes.SUCCESS;
    return;
    };
    const currentDeviceName = get(formattedObject, "ipAddress");
    const currentEmployeeId=get(formattedObject,"employeeNoString")
    if (currentDeviceName === DEVICE_IN_NAME && !DEVICE_IN_DETAILS[currentEmployeeId]) {
    DEVICE_IN_DETAILS[currentEmployeeId]=1
    DEVICE_OUT_DETAILS[currentEmployeeId]=null
      console.log("in device name", currentDeviceName);
      CACHE[DEVICE_IN_NAME] = CACHE[DEVICE_IN_NAME] + 1;
    } else if (currentDeviceName === DEVICE_OUT_NAME && !DEVICE_OUT_DETAILS[currentEmployeeId]) {
    DEVICE_OUT_DETAILS[currentEmployeeId]=1
    DEVICE_IN_DETAILS[currentEmployeeId]=null
      console.log("out device name", currentDeviceName);
      CACHE[DEVICE_OUT_NAME] = CACHE[DEVICE_OUT_NAME]+1;
    }
    
   
   displayNumber()
   
    ctx.body = "ok";
    ctx.response.status = HttpStatusCodes.SUCCESS;
  } catch (e) {
    console.log(e);
  }
};
function displayNumber(){
if(pythonProcess){
pythonProcess.kill("SIGKILL")
}
console.log(DEVICE_IN_DETAILS,'DEVICE IN DETAILS')
console.log(DEVICE_OUT_DETAILS,'DEVICE OUT DETAILS')
console.log(CACHE,'CACHE DETAILS')
 pythonProcess = spawn("python3", [
      "index.py",
      JSON.stringify(CACHE),
      DEVICE_IN_NAME,
      DEVICE_OUT_NAME,
    ]);
    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
    });
}
module.exports = {
  verifyEvents,
  resetCache,
};

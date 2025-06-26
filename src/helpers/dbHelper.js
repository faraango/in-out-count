const chalk = require("chalk");
const fs = require("fs");
const DEFAULT_DATA = {
  count: 0,
  details: {},
};
const path = require("path");
const updateInCount = async (count) => {
  try {
    const pathName = path.join(__dirname, "in.json");
    const data = JSON.parse(fs.readFileSync(pathName));

    data.count = count;
    fs.writeFileSync(pathName, JSON.stringify({ ...data }));
  } catch (err) {
    console.log(chalk.red("Error while updating in count"), err);
  }
};
const getInCount = () => {
  try {
    const pathName = path.join(__dirname, "in.json");
    const data = JSON.parse(fs.readFileSync(pathName));

    return data.count || 0;
  } catch (err) {
    console.log(chalk.red("Error while reading in count"), err);
  }
};
const getOutCount = () => {
  try {
    const pathName = path.join(__dirname, "out.json");
    const data = JSON.parse(fs.readFileSync(pathName));

    return data.count || 0;
  } catch (err) {
    console.log(chalk.red("Error while reading out count"), err);
  }
};
const updateInDetails = async (details) => {
  try {
    const pathName = path.join(__dirname, "in.json");
    const data = JSON.parse(fs.readFileSync(pathName));
    const keys = Object.keys(data.details);

    if (keys.length >= 10) {
      const oldestKey = keys[0];
      delete data.details[oldestKey];
    }
    data.details = details;
    fs.writeFileSync(pathName, JSON.stringify({ ...data }));
  } catch (err) {
    console.log(chalk.red("Error while updating in details"), err);
  }
};
const getInDetails = () => {
  try {
    const pathName = path.join(__dirname, "in.json");
    const data = JSON.parse(fs.readFileSync(pathName));
    return data.details || {};
  } catch (err) {
    console.log(chalk.red("Error while reading in details"), err);
  }
};
const getOutDetails = () => {
  try {
    const pathName = path.join(__dirname, "out.json");
    const data = JSON.parse(fs.readFileSync(pathName));
    return data.details || {};
  } catch (err) {
    console.log(chalk.red("Error while reading out details"), err);
  }
};
const updateOutCount = async (count) => {
  try {
    const pathName = path.join(__dirname, "out.json");
    const data = JSON.parse(fs.readFileSync(pathName));

    data.count = count;
    fs.writeFileSync(pathName, JSON.stringify({ ...data }));
  } catch (err) {
    console.log(chalk.red("Error while updating out count"), err);
  }
};
const updateOutDetails = async (details) => {
  try {
    const pathName = path.join(__dirname, "out.json");
    const data = JSON.parse(fs.readFileSync(pathName));
    const keys = Object.keys(data.details);

    if (keys.length >= 10) {
      const oldestKey = keys[0];
      delete data.details[oldestKey];
    }
    data.details = details;
    fs.writeFileSync(pathName, JSON.stringify({ ...data }));
  } catch (err) {
    console.log(chalk.red("Error while updating out details"), err);
  }
};
const resetInData = async () => {
  try {
    const pathName = path.join(__dirname, "in.json");
    fs.writeFileSync(pathName, JSON.stringify(DEFAULT_DATA));
  } catch (err) {
    console.log(chalk.red("Error while reseting in data"), err);
  }
};
const resetOutData = async () => {
  try {
    const pathName = path.join(__dirname, "out.json");
    fs.writeFileSync(pathName, JSON.stringify(DEFAULT_DATA));
  } catch (err) {
    console.log(chalk.red("Error while reseting out data"), err);
  }
};
module.exports = {
  updateInCount,
  updateInDetails,
  updateOutCount,
  resetInData,
  resetOutData,
  updateOutDetails,
  getInCount,
  getOutCount,
  getInDetails,
  getOutDetails,
};

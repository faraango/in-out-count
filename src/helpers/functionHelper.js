const db = require("../models");
const Role = db.role;
const log = console.log;
const _ = require("lodash");
const chalk = require("chalk");
const {
  ERR_SBEE_0992,
  ERR_SBEE_0991,
} = require("../constants/ApplicationErrorConstants");
const { format } = require("date-fns");

const sumByKey = (arr, key, value) => {
  const map = new Map();
  for (const obj of arr) {
    const currSum = map.get(obj[key]) || 0;
    map.set(obj[key], currSum + obj[value]);
  }
  const res = Array.from(map, ([k, v]) => ({ [key]: k, [value]: v }));
  return res;
};

const sumByMultipleKeys = (arr) => {
  var helper = {};
  var result = arr.reduce(function (r, o) {
    var key = o.productId + "-" + o.unit;
    if (!helper[key]) {
      helper[key] = Object.assign({}, o); // create a copy of o
      r.push(helper[key]);
    } else {
      helper[key].quantity += o.quantity;
      // helper[key].instances += o.instances;
    }
    return r;
  }, []);
  return result;
};

const renameProp = async (arr) => {
  let result = await arr.map((obj) => {
    let renamedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/ /g, "");
        renamedObj[newKey] = obj[key];
      }
    }
    return renamedObj;
  });
  return result;
};

var array = [
  { Phase: "Phase 1", Step: "Step 1", Value1: "15", Value2: "5" },
  { Phase: "Phase 1", Step: "Step 2", Value1: "20", Value2: "10" },
  { Phase: "Phase 2", Step: "Step 1", Value1: "25", Value2: "15" },
  { Phase: "Phase 2", Step: "Step 2", Value1: "30", Value2: "20" },
  { Phase: "Phase 1", Step: "Step 1", Value1: "35", Value2: "25" },
  { Phase: "Phase 1", Step: "Step 2", Value1: "40", Value2: "30" },
  { Phase: "Phase 2", Step: "Step 1", Value1: "45", Value2: "35" },
  { Phase: "Phase 2", Step: "Step 2", Value1: "50", Value2: "40" },
];
var result = Object.values(
  array.reduce((acc, { Value1, Value2, ...rest }) => {
    const key = Object.values(rest).join("|");
    acc[key] = acc[key] || { ...rest, Value1: 0, Value2: 0 };
    acc[key].Value1 += +Value1;
    acc[key].Value2 += +Value2;
    return acc;
  }, {})
);

const roleCheck = async (role) => {
  let rolecheck = await Role.findOne({
    where: {
      name: role,
    },
  });
  if (!rolecheck) {
    return Promise.reject({ message: ERR_SBEE_0992 });
  }
  let roleId = rolecheck.id;
  return roleId;
};

const errorHelper = async (error) => {
  return Promise.reject({ message: error });
};

// const fruits = ["apple", "banana", "grapes", "mango", "orange"];

/**
 * Filter array items based on search criteria (query)
 */
const filterItems = (arr, query) => {
  return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
};

// console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
// console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']

function fDateTime(date, newFormat) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}
function fTodayStartEnd() {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(now);
  endOfDay.setUTCHours(23, 59, 59, 999);
  let startDate = startOfDay.toISOString();
  let endDate = endOfDay.toISOString();
  return { startDate, endDate };
}

module.exports = {
  sumByKey,
  sumByMultipleKeys,
  filterItems,
  renameProp,
  roleCheck,
  errorHelper,
  fDateTime,
  fTodayStartEnd,
};

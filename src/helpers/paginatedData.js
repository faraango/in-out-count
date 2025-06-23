const { isEmpty } = require("lodash");

function paginateData(formatD, page, size) {
  if (isEmpty(formatD)) return [];
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedData = formatD.slice(startIndex, endIndex);
  return paginatedData;
}
module.exports = { paginateData };

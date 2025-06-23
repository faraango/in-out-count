const dateFormatter = (originalTimestamp) => {
  const date = new Date(originalTimestamp);

  // Extract the date and time components
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  // Format the components as a new string
  const formattedTimestamp = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}+00`;

  return formattedTimestamp;
};

const endDateFormatter = (originalTimestamp) => {
  const date = new Date(originalTimestamp);
  date.getUTCHours(23, 59, 59, 999);
  // Extract the date and time components
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed
  const day = date.getUTCDate();
  // Format the components as a new string
  const formattedTimestamp = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} 23:59:59+00`;

  return formattedTimestamp;
};
module.exports = { dateFormatter,endDateFormatter };

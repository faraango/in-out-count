function checkDuration(startDate, checkInSeconds) {
  try {
    if (!startDate) return false;

    // Parse startDate as UTC
    var time1 = new Date(Date.parse(startDate));
    console.log(time1);
    // Get the current time in UTC
    var time2 = new Date();

    // Calculate the difference in milliseconds
    var difference = time2.getTime() - time1.getTime();

    // Convert the difference to seconds
    const seconds = Math.floor(difference / 1000);

    console.log(seconds);

    if (checkInSeconds < seconds) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    return false;
  }
}
module.exports = { checkDuration };

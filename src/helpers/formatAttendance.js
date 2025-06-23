const { isEmpty, forEach } = require("lodash");

function formatAttendance(punchData) {
  if (isEmpty(punchData)) return [];
  try {
    const groupedData = {};

    forEach(punchData, (record) => {
      const empCode = record.emp_code;
      const punchDate = record.punch_time.toLocaleDateString()

      if (!groupedData[empCode]) {
        groupedData[empCode] = {};
      }
      if (!groupedData[empCode][punchDate]) {
        groupedData[empCode][punchDate] = {...record,
          punch_date: punchDate,
          emp_code: empCode,
          firstIn: null,
          lastOut: null,
        };
      }

      const punchTime = new Date(String(record.punch_time)).getTime();
      if (
        !groupedData[empCode][punchDate].firstIn ||
        punchTime < groupedData[empCode][punchDate].firstIn
      ) {
        groupedData[empCode][punchDate].firstIn = punchTime;
      }

      if (
        !groupedData[empCode][punchDate].lastOut ||
        punchTime > groupedData[empCode][punchDate].lastOut
      ) {
        groupedData[empCode][punchDate].lastOut = punchTime;
      }
    });
    const result = [];

    for (const empCode in groupedData) {
      for (const punchDate in groupedData[empCode]) {
        result.push({
          ...groupedData[empCode][punchDate],
          firstIn: new Date(groupedData[empCode][punchDate].firstIn),
          lastOut:
            groupedData[empCode][punchDate].firstIn !==
            groupedData[empCode][punchDate].lastOut
              ? new Date(groupedData[empCode][punchDate].lastOut)
              : null,
        });
      }
    }

    return result;
  } catch (e) {
    console.log(e);
  }
}
module.exports = { formatAttendance };

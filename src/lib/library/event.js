/**
 * Get Today
 *
 * @description Create a formatted date string for the
 * current day.
 *
 * @function getToday
 * @returns {String} formatted date string
 */
export const getToday = () => {
  let date = new Date().toLocaleDateString();
  let dateSplit = date.split("/");
  let month = dateSplit[0];
  let day = dateSplit[1];
  let year = dateSplit[2];

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  let todayFormatted = `${year}-${month}-${day}`;

  return todayFormatted;
};

/**
 * Get Future Date
 *
 * @description Takes in a string indicating the
 * number of days forward from the current date and
 * generates that future date
 *
 * @function getFutureDate
 * @param {String} interval The number of days forward
 * @returns {String} formatted date string
 */
export const getFutureDate = (interval) => {
  const date = new Date();
  let intervalDate = date.setDate(date.getDate() + interval);
  let newDate = new Date(intervalDate).toLocaleDateString();

  let newDateSplit = newDate.split("/");
  let month = newDateSplit[0];
  let day = newDateSplit[1];
  let year = newDateSplit[2];

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  let futureFormatted = `${year}-${month}-${day}`;

  return futureFormatted;
};

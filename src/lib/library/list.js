import { months } from "../data/calendarData";

/**
 * Date to Named Month string
 *
 * @description Takes in a date (yyyy-mm-dd) and length.
 * Converts the date to a named month format (MMM dd, yyyy).
 * The length determines the number of letters to use
 * as an abbreviation for the month.
 *
 * @function dateToNamedMonth
 * @param {String} date date to convert
 * @param {Number} length number of letters from month name to use
 * @returns {String} formatted date string
 */
export const dateToNamedMonth = (date, length) => {
  let splitDate = date.split("-");
  let year = splitDate[0];
  let month = months[splitDate[1] - 1].slice(0, length);
  let day = splitDate[2];
  if (day < 10) {
    day = day.charAt(1);
  }

  return `${month} ${day}, ${year}`;
};

/**
 * Calendar Library Module
 */
import { weekdays, months } from "../data/calendarData";

/**
 * Convert Date String
 *
 * @description Takes a date string generted by the
 * Javascript Date function and converts it into an
 * app date string.
 *
 * @function convertDateString
 * @param {String} date
 * @returns {String} formatted date string
 */
export const convertDateString = (date) => {
  let [month, day, year] = date.split("/");
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

/**
 * Day String
 *
 * @description Takes in calendar parameters and
 * returns a formatted date string
 *
 * @function dayString
 * @param {Number} i index
 * @param {String} year year
 * @param {String} month month
 * @param {String} paddingDays calendar padding days for the month
 * @returns {String} A formatted date string
 */
export const dayString = (i, year, month, paddingDays) => {
  let monthString;

  month = month + 1;

  if (month < 10) {
    monthString = `0${month}`;
  } else {
    monthString = `${month}`;
  }
  // if (month == 11) {
  //   monthString == "12";
  // }
  let dayString = `${year}-${monthString}-${
    i - paddingDays < 10 ? `0${i - paddingDays}` : `${i - paddingDays}`
  }`;
  return dayString.trim();
};

/**
 * Is It Today?
 *
 * @description Takes in two date strings and
 * determines if they are the same.
 *
 * @function isItToday
 * @param {String} day a formatted date string for selected day
 * @param {String} today a formatted date string for current day
 * @returns {Boolean}
 */
export const isItToday = (day, today) => {
  if (day.trim() == today.trim()) {
    return true;
  } else {
    return false;
  }
};

/**
 * Calculate and format today's date
 *
 * @function getTodaysDate
 * @returns {string} dayString
 */
export const getTodaysDate = () => {
  let todaysDate = new Date();
  let day = todaysDate.getDate();
  let month = todaysDate.getMonth();
  let year = todaysDate.getFullYear();

  month = month + 1;

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  let dayString = `${year}-${month}-${day}`;
  return dayString;
};

/**
 * Build the Calendar for Selected Month and Year
 *
 * @function buildCalendar
 * @param {object} dt today's date object
 * @param {string} year selected year
 * @param {string} month selected month
 * @returns {object} results
 */
export const buildCalendar = (dt, year, month) => {
  // Get first day of month
  let firstDayOfMonth = new Date(year, month, 1);

  // Get number of days in month
  // Get this by going to the next month (month + 1)
  // and using a zero to get day before first day of month.
  // Example: If the current month is October, get
  // the date for November 1, day zero, which is
  // October 31. 31 is last day of October and also
  // the number of days in October
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create date string from first day of month with
  // this format: Saturday, 10/1/2022
  let dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // To get padding days get the index of the weekday
  // found by spliting the datestring above
  let paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  // Get month for display
  let calendarMonthAndYear = `${dt.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;

  // Build results object
  let results = {
    calendarMonthAndYear: calendarMonthAndYear,
    paddingDays: paddingDays,
    daysInMonth: daysInMonth,
    month: month,
    year: year,
    weekdays: weekdays,
    firstDayOfMonth: firstDayOfMonth,
    todaysDate: convertDateString(new Date().toLocaleDateString()),
  };

  // Return results object
  return results;
};

/**
 * Render the Calendar
 *
 * @function renderCalendar
 * @param {Number} index month index relative to current month
 * @returns {Object} calendar
 */
export const renderCalendar = (index) => {
  // Get current date
  let dt = new Date();

  // Set day of month to first day
  dt.setDate(1);

  // Set month to current month + index
  dt.setMonth(new Date().getMonth() + index);

  // Get month and year
  let month = dt.getMonth();
  let year = dt.getFullYear();

  // Build calendar
  let calendar = buildCalendar(dt, year, month);

  return calendar;
};

/**
 * Calendar Spaces
 *
 * @description Builds an array of numbers that
 * corresponds to number of spaces need for a month's
 * calendar
 *
 * @function calendarSpaces
 * @param {Number} paddingDays number of day squares to render before the first day of the month
 * @param {Number} daysInMonth Number of days in the month
 * @returns {Array} Array of numbers to loop through when building calendar
 */
export const calendarSpaces = (paddingDays, daysInMonth) => {
  return Array.from(Array(paddingDays + daysInMonth + 1).keys());
};

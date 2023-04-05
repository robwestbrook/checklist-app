import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

import { months, weekdays } from "../data/calendarData";

/**
 * Planner Calculations
 *
 * @description Takes in the calendar object and
 * generates a planner object containing the
 * week's data
 *
 * @function plannerCalculations
 * @param {Object} calendar calendar object
 * @returns {Object} object with the weeks's data
 */
export const plannerCalculations = (calendar) => {
  let week = [];
  let date;
  let firstDayOfWeek;
  let dayOfWeek;
  let day;
  let month;
  let year;

  if (calendar.today) {
    date = dayjs();

    dayOfWeek = dayjs(date).day();
    firstDayOfWeek = dayjs(date).subtract(dayOfWeek, "day");

    for (let i = 0; i < 7; i++) {
      let temp = {};
      let tempDate = dayjs(firstDayOfWeek).add(i, "day");

      year = dayjs(tempDate).year();
      month = dayjs(tempDate).month();
      day = dayjs(tempDate).date();

      temp["month"] = months[month];
      month = month + 1;

      if (month < 10) {
        month = `0${month}`;
      }

      if (day < 10) {
        day = `0${day}`;
      }

      temp["date"] = `${year}-${month}-${day}`;
      temp["year"] = year;
      temp["name"] = weekdays[i];
      week.push(temp);
    }

    return week;
  } else {
    date = dayjs(calendar.firstDayOfMonth);

    dayOfWeek = dayjs(date).day();
    firstDayOfWeek = dayjs(date).subtract(dayOfWeek, "day");

    for (let i = 0; i < 7; i++) {
      let temp = {};
      let tempDate = dayjs(firstDayOfWeek).add(i, "day");

      year = dayjs(tempDate).year();
      month = dayjs(tempDate).month();
      day = dayjs(tempDate).date();

      temp["month"] = months[month];
      month = month + 1;

      if (month < 10) {
        month = `0${month}`;
      }

      if (day < 10) {
        day = `0${day}`;
      }

      temp["date"] = `${year}-${month}-${day}`;
      temp["year"] = year;
      temp["name"] = weekdays[i];
      week.push(temp);
    }
    return week;
  }
};

/**
 * Planner Refresh
 *
 * @description Takes in the date clicked in the
 * calendar and generates that's date's week data.
 *
 * @function plannerRefresh
 * @param {String} clickedDate
 * @returns {Object} object with the weeks's data
 */
export const plannerRefresh = (clickedDate) => {
  let date = dayjs(clickedDate);
  let week = [];

  let dayOfWeek = dayjs(date).day();
  let firstDayOfWeek = dayjs(date).subtract(dayOfWeek, "day");

  for (let i = 0; i < 7; i++) {
    let temp = {};
    let tempDate = dayjs(firstDayOfWeek).add(i, "day");

    let year = dayjs(tempDate).year();
    let month = dayjs(tempDate).month();
    let day = dayjs(tempDate).date();

    temp["month"] = months[month];
    month = month + 1;

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    temp["date"] = `${year}-${month}-${day}`;
    temp["year"] = year;
    temp["name"] = weekdays[i];
    week.push(temp);
  }

  return week;
};

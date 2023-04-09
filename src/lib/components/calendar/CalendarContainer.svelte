<script>
  /**
   * Calendar Container Component
   */

  // Import calendar functions from library
  import {
    getTodaysDate,
    renderCalendar,
    calendarSpaces,
  } from "../../library/calendar";

  // Import components
  import Calendar from "./Calendar.svelte";
  import PlannerContainer from "../planner/PlannerContainer.svelte";
  import EventTableContainer from "../event/EventTableContainer.svelte";

  // Import planner functions from library
  import { plannerCalculations, plannerRefresh } from "../../library/planner";

  // Initialize month index
  /** @type {Number}*/
  let monthIndex = 0;

  // Get today's date formatted
  /**@type {String}*/
  let today = getTodaysDate();

  // Initialize calendar object
  /**@type {Object}*/
  let calendar;

  // Initialize calendar sixe
  /**@type {Array}*/
  let calendarSize;

  // Initialize planner data
  /**@type {Object}*/
  let plannerData;

  // Generate calendar and planner data
  calendar = renderCalendar(monthIndex);
  calendar["today"] = true;
  plannerData = plannerCalculations(calendar);
  plannerData["currentDay"] = today;

  calendarSize = calendarSpaces(calendar.paddingDays, calendar.daysInMonth);

  /**
   * Previous Month
   *
   * @description Rebuilds calendar to previous month
   * when the previous month button is clicked
   *
   * @function previousMonth
   * @param {Object} e event object
   */
  const previousMonth = (e) => {
    monthIndex = monthIndex - 1;
    calendar = renderCalendar(monthIndex);
    calendar["today"] = false;
    calendarSize = calendarSpaces(calendar.paddingDays, calendar.daysInMonth);
    plannerData = plannerCalculations(calendar);
    plannerData["currentDay"] = today;
  };

  /**
   * Next Month
   *
   * @description Rebuild calendar to next month when
   * next month button is clicked
   *
   * @function nextMonth
   * @param {Object} e event object
   */
  const nextMonth = (e) => {
    monthIndex = monthIndex + 1;
    calendar = renderCalendar(monthIndex);
    calendar["today"] = false;
    calendarSize = calendarSpaces(calendar.paddingDays, calendar.daysInMonth);
    plannerData = plannerCalculations(calendar);
    plannerData["currentDay"] = today;
  };

  /**
   * Go to Today
   *
   * @description Rebuild calendar to current month when
   * the today button is clicked
   *
   * @function goToToday
   */
  const goToToday = () => {
    monthIndex = 0;
    calendar = renderCalendar(monthIndex);
    calendar["today"] = true;
    calendarSize = calendarSpaces(calendar.paddingDays, calendar.daysInMonth);
    plannerData = plannerCalculations(calendar);
    plannerData["currentDay"] = today;
  };

  /**
   * Go to Date
   *
   * @description When a day is clicked in the calendar,
   * refresh the planner for that day's week
   *
   * @function goToDate
   * @param {Object} e event object
   */
  const goToDate = (e) => {
    plannerData = plannerRefresh(e.detail);
    plannerData["currentDay"] = e.detail;
  };
</script>

<!--
  Calendar Component
  Receives the props:
    - calendar
    - calendarSize
    - today
  Dispatches the events:
    - previous
    - next
    - today
    - goToDay
-->
<Calendar
  {calendar}
  {calendarSize}
  {today}
  on:previous={previousMonth}
  on:next={nextMonth}
  on:today={goToToday}
  on:goToDay={goToDate}
/>

<!--
  Planner Container Component
  Receives the props:
    - plannerData
-->
<PlannerContainer {plannerData} />

<!--
  Event Table Component
-->
<EventTableContainer />

<script>
  /**
   * Calendar Component
   */

  import {
    getTodaysDate,
    renderCalendar,
    calendarSpaces,
  } from "../../library/calendar";

  import Calendar from "./Calendar.svelte";
  import PlannerContainer from "../planner/PlannerContainer.svelte";
  import EventTableContainer from "../event/EventTableContainer.svelte";

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

  calendar = renderCalendar(monthIndex);
  calendar["today"] = true;
  plannerData = plannerCalculations(calendar);
  plannerData["currentDay"] = today;

  calendarSize = calendarSpaces(calendar.paddingDays, calendar.daysInMonth);

  // Rebuild calendar to previous month when
  // previous month button is clicked
  const previousMonth = (e) => {
    monthIndex = monthIndex - 1;
    calendar = renderCalendar(monthIndex);
    calendar["today"] = false;
    calendarSize = calendarSpaces(calendar.paddingDays, calendar.daysInMonth);
    plannerData = plannerCalculations(calendar);
    plannerData["currentDay"] = today;
  };

  // Rebuild calendar to next month when
  // next month button is clicked
  const nextMonth = (e) => {
    monthIndex = monthIndex + 1;
    calendar = renderCalendar(monthIndex);
    calendar["today"] = false;
    calendarSize = calendarSpaces(calendar.paddingDays, calendar.daysInMonth);
    plannerData = plannerCalculations(calendar);
    plannerData["currentDay"] = today;
  };

  // Rebuild calendar to current month when
  // today button is clicked
  const goToToday = () => {
    monthIndex = 0;
    calendar = renderCalendar(monthIndex);
    calendar["today"] = true;
    calendarSize = calendarSpaces(calendar.paddingDays, calendar.daysInMonth);
    plannerData = plannerCalculations(calendar);
    plannerData["currentDay"] = today;
  };

  // When a day is clicked in the calendar, refresh
  // the planner for that day's week
  const goToDate = (e) => {
    plannerData = plannerRefresh(e.detail);
    plannerData["currentDay"] = e.detail;
  };
</script>

<Calendar
  {calendar}
  {calendarSize}
  {today}
  on:previous={previousMonth}
  on:next={nextMonth}
  on:today={goToToday}
  on:goToDay={goToDate}
/>
<PlannerContainer {plannerData} />

<EventTableContainer />

"use strict";
import { Timetable } from "./timetable";

// @ts-ignore
window.getTimetable = function() {
  return new Timetable();
};

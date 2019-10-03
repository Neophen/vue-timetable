import { TimetableEvent, Timetable } from "./timetable";
import { getDurationHours } from "./utils";

export class EventRenderer {
  timetable: Timetable;
  scopeDurationHours!: number;

  constructor(timetable: Timetable) {
    this.timetable = timetable;
  }

  setHours() {
    this.scopeDurationHours = getDurationHours(
      this.timetable.scope.hourStart,
      this.timetable.scope.hourEnd
    );
  }

  renderEvent(event: TimetableEvent, node: HTMLLIElement) {
    var eventNode = node.appendChild(document.createElement("div"));
    if (typeof event.html === "string") {
      eventNode.innerHTML = event.html;
    } else {
      eventNode.appendChild(event.html);
    }

    eventNode.className = "time-entry";

    eventNode.style.width = this.computeEventBlockWidth(event);
    eventNode.style.left = this.computeEventBlockOffset(event);
  }

  computeEventBlockWidth({ startDate, endDate }: TimetableEvent) {
    const start = startDate;
    const end = endDate;
    const durationHours = this.computeDurationInHours(start, end);
    return (durationHours / this.scopeDurationHours) * 100 + "%";
  }

  computeDurationInHours(start: Date, end: Date) {
    return (end.getTime() - start.getTime()) / 1000 / 60 / 60;
  }

  computeEventBlockOffset(event: TimetableEvent) {
    const scopeStartHours = this.timetable.scope.hourStart;
    const eventStartHours =
      event.startDate.getHours() + event.startDate.getMinutes() / 60;
    const hoursBeforeEvent = getDurationHours(scopeStartHours, eventStartHours);
    return (hoursBeforeEvent / this.scopeDurationHours) * 100 + "%";
  }
}

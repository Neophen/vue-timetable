//@ts-nocheck
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
    var hasOptions = event.options !== undefined;
    var hasURL,
      hasAdditionalClass,
      hasDataAttributes,
      hasClickHandler = false;

    if (hasOptions) {
      hasURL = event.options!.url !== undefined;
      hasAdditionalClass = event.options!.class !== undefined;
      hasDataAttributes = event.options!.data !== undefined;
      hasClickHandler = event.options!.onClick !== undefined;
    }

    var elementType = hasURL ? "a" : "span";
    var eventNode = node.appendChild(document.createElement(elementType));
    var smallNode = eventNode.appendChild(document.createElement("small"));
    eventNode.title = event.name;

    if (hasURL) {
			// @ts-ignore
      eventNode.href = event.options!.url;
    }

    if (hasDataAttributes) {
      for (var key in event.options!.data) {
        eventNode.setAttribute("data-" + key, String(event.options!.data[key]));
      }
    }

    if (hasClickHandler) {
      eventNode.addEventListener("click", e => {
        // @ts-ignore
        event.options!.onClick(event, this.timetable, e);
      });
    }

    eventNode.className = hasAdditionalClass
      ? "time-entry " + event.options!.class
      : "time-entry";

    eventNode.style.width = this.computeEventBlockWidth(event);
    eventNode.style.left = this.computeEventBlockOffset(event);
    smallNode.textContent = event.name;
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

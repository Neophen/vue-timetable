import * as syncscroll from "./syncscroll";
import { Timetable, TimetableEvent } from "./timetable";
import { prettyFormatHour, getDurationHours, emptyNode } from "./utils";
import { EventRenderer } from "./eventRenderer";

export class Renderer {
  timetable: Timetable;
  eventRenderer: EventRenderer;

  constructor(timetable: Timetable) {
    this.timetable = timetable;
    this.eventRenderer = new EventRenderer(timetable);
  }

  draw(selector: string) {
    this.eventRenderer.setHours();
    let container = document.querySelector<HTMLElement>(selector)!;
    this.checkContainerPrecondition(container);
    container = emptyNode(container);
    this.appendTimetableAside(container);
    this.appendTimetableSection(container);
    syncscroll.reset();
  }

  checkContainerPrecondition(container: Element) {
    if (!container) {
      throw new Error("Timetable container not found");
    }
  }

  appendTimetableAside(container: Element) {
    const asideNode = container.appendChild(document.createElement("aside"));
    const asideULNode = asideNode.appendChild(document.createElement("ul"));
    this.appendRowHeaders(asideULNode);
  }

  appendRowHeaders(ulNode: HTMLUListElement) {
    this.timetable.locations.forEach(location => {
      const liNode = ulNode.appendChild(document.createElement("li"));
      const spanNode = liNode.appendChild(document.createElement("span"));
      spanNode.className = "row-heading";
      spanNode.textContent = location;
    });
  }

  appendTimetableSection(container: Element) {
    const sectionNode = container.appendChild(
      document.createElement("section")
    );
    const headerNode = this.appendColumnHeaders(sectionNode);
    const timeNode = sectionNode.appendChild(document.createElement("time"));
    timeNode.className = "syncscroll";
    timeNode.setAttribute("name", "scrollheader");
    const width = headerNode.scrollWidth + "px";
    this.appendTimeRows(timeNode, width);
  }

  appendColumnHeaders(node: HTMLElement) {
    const headerNode = node.appendChild(document.createElement("header"));
    headerNode.className = "syncscroll";
    headerNode.setAttribute("name", "scrollheader");
    const headerULNode = headerNode.appendChild(document.createElement("ul"));

    let completed = false;
    let looped = false;

    for (let hour = this.timetable.scope.hourStart; !completed; ) {
      const liNode = headerULNode.appendChild(document.createElement("li"));
      const spanNode = liNode.appendChild(document.createElement("span"));
      spanNode.className = "time-label";
      spanNode.textContent = prettyFormatHour(
        hour,
        this.timetable.usingTwelveHour
      );

      if (
        hour === this.timetable.scope.hourEnd &&
        (this.timetable.scope.hourStart !== this.timetable.scope.hourEnd ||
          looped)
      ) {
        completed = true;
      }
      if (++hour === 24) {
        hour = 0;
        looped = true;
      }
    }
    return headerNode;
  }

  appendTimeRows(node: HTMLTimeElement, width: string) {
    const ulNode = node.appendChild(document.createElement("ul"));
    ulNode.style.width = width;
    ulNode.className = "room-timeline";

    this.timetable.locations.forEach(location => {
      const liNode = ulNode.appendChild(document.createElement("li"));
      this.appendLocationEvents(location, liNode);
    });
  }

  appendLocationEvents(location: string, node: HTMLLIElement) {
    this.timetable.events
      .filter(event => event.location === location)
      .forEach(event => this.eventRenderer.renderEvent(event, node));
  }
}

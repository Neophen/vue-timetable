import {isValidHourRange, isValidTimeRange} from "./utils";
import { Renderer } from './renderer';

export interface TimetableEvent {
	name: string;
	location: string;
	startDate: Date;
	endDate: Date;
	info?: string;
	infoSmall?: string;
	options?: {
		url?: string;
		class?: string;
		data?: {
			[key:string]: unknown;
		};
		onClick?: Function;
	}
	iconUrl?: string;
	extraEvent?: {
		name: string;
		url: string;
		iconUrl: string;
	}
}


export class Timetable {
	scope = {
		hourStart: 9,
		hourEnd: 17,
	}

	usingTwelveHour = false;
	locations: string[] = [];
	events: TimetableEvent[] = [];
	renderer: Renderer;

	constructor() {
		this.renderer = new Renderer(this);
	}

	setScope(start:number, end: number) {
		if(isValidHourRange(start, end)){
			this.scope.hourStart = start;
			this.scope.hourEnd = end;
		} else {
			throw new RangeError('Timetable scope should consist of (start, end) in whole hours from 0 to 23');
		}
		return this;
	}

	useTwelveHour() {
		this.usingTwelveHour = true;
	}

	addLocations( newLocations: string[] )
	{
		newLocations.forEach((location) => {
			if(!this.locations.includes(location)) {
				this.locations.push(location);
			} else {
				throw new Error('Location already exists');
			}
		});

		return this;
	}
	addEvent(event: TimetableEvent) {
		if (!this.locations.includes(event.location)) {
			throw new Error('Unknown location');
		}

		if (!isValidTimeRange(event.startDate, event.endDate)) {
			throw new Error('Invalid time range: ' + JSON.stringify([event.startDate, event.endDate]));
		}

		this.events.push(event);

		return this;
	}
};

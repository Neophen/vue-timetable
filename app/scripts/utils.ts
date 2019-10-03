export const isInHourRange= (number: number) => {
	return number >= 0 && number < 24;
}

export const isValidHourRange = (start: number, end: number) => {
	return isInHourRange(start) && isInHourRange(end);
}

export const locationExistsIn= (loc: string, locs: string[]) => {
	return locs.indexOf(loc) !== -1;
}
export const isValidTimeRange= (start: Date, end: Date) => {
	return start < end;
}
export const getDurationHours = (startHour: number, endHour: number) => {
	return endHour >= startHour ? endHour - startHour : 24 + endHour - startHour;
}


export const prettyFormatHour = (hour:number, usingTwelveHour: boolean) => {
	var prettyHour;
		if(usingTwelveHour) {
				var period = hour >= 12 ? 'PM':'AM';
				prettyHour = ((hour + 11) % 12 + 1) + ':00' + period;
		} else {
				var prefix = hour < 10 ? '0' : '';
				prettyHour = prefix + hour + ':00';
		}
	return prettyHour;
}

export const emptyNode = (node: HTMLElement) => {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
	return node;
}

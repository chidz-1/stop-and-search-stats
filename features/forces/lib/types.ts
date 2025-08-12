export interface Force {
	id: string;
	name: string;
}

export interface ForceWithMostRecentStopPublishDate extends Force {
	mostRecentStopsDate: string;
}

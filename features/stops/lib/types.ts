interface StopStreet {
	id: number;
	name: string;
}

interface StopLocation {
	latitude: string;
	street: StopStreet;
	longitude: string;
}

interface SearchReason {
	id: string;
	name: string;
}

export interface Stop {
	age_range: string;
	officer_defined_ethnicity: string;
	involved_person: boolean;
	self_defined_ethnicity: string;
	gender: string;
	legislation: string;
	outcome_linked_to_object_of_search: boolean;
	datetime: string;
	outcome_object: SearchReason;
	location: StopLocation;
	object_of_search: string;
	operation: null;
	outcome: string;
	type: string;
	operation_name: string;
	removal_of_more_than_outer_clothing: boolean;
}

export interface StopsAvailabilityEntry {
	date: string;
	"stop-and-search": string[];
}

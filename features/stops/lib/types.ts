import { NullablePoliceApiData } from "@/lib/types";

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

export interface BaseStop {
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

// 💭 Seen some inconsistencies in the nullishness of data in the API docs
//  assume they all could be
export type Stop = NullablePoliceApiData<BaseStop>;

export type QualitativeStop = Pick<
	Stop,
	| "outcome"
	| "self_defined_ethnicity"
	| "gender"
	| "outcome_linked_to_object_of_search"
	| "removal_of_more_than_outer_clothing"
	| "outcome_object"
	| "operation_name"
	| "involved_person"
>;

export interface StopsAvailabilityEntry {
	date: string;
	"stop-and-search": string[];
}

export type StopKeys = keyof Stop;

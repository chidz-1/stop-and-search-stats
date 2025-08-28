import { ChartConfig } from "@/components/ui/chart";
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
export type Stop = NullablePoliceApiData;

export type QualitativeStop = Pick<
	Stop,
	| "datetime"
	| "age_range"
	| "outcome"
	| "gender"
	| "outcome_linked_to_object_of_search"
	| "removal_of_more_than_outer_clothing"
	| "outcome_object"
	| "operation_name"
	| "involved_person"
>;

export type SortableStopKeys = "datetime";

export type StopFormattedByEthnicity = Pick<Stop, "self_defined_ethnicity">;
export type StopFormattedByAgeRange = Pick<Stop, "age_range">;

export interface StopsAvailabilityEntry {
	date: string;
	"stop-and-search": string[];
}

export type StopKeys = keyof Stop;

export interface StopsCategoryChartConfig {
	chartData: { [dataKey: string]: string | number }[];
	chartConfig: { [configKey: string]: { label: string; color?: string } };
}

// 📊 Chart related types

export type StopCategoryKeys = "self_defined_ethnicity" | "age_range";

export type CategoryBasedChartStop =
	| StopFormattedByEthnicity
	| StopFormattedByAgeRange;

export type StopsChartConfigHelperFn<
	S extends Record<C, S[C]>,
	C extends string
> = (stopData: S[], category: C) => Promise<StopsChartDataCategoryConfig>;

export type StopsChartDataWeightedCategoryList = {
	category: string;
	count: number;
}[];

export interface StopsChartDataCategoryConfig {
	[category: string]: number;
}

export type StopAndSearchSubPageParams = Promise<{
	forceId: string;
	date: string;
	page: string;
}>;

export type RechartCategoryBasedChartData = {
	[key: string]: string | number;
};

export interface ChartConfigProduct {
	chartPlottableData: RechartCategoryBasedChartData[];
	chartConfig: ChartConfig;
}

export interface ChartConfigBuilder {
	createChartConfig(): void;
	createPlottableData(): void;
	getFullConfig(): ChartConfigProduct;
}

// Stops table related types 📅

export type StopsTableSortAscOrDesc = "asc" | "desc";
export type StopsTableSortQueryParamValue =
	`${SortableStopKeys},${StopsTableSortAscOrDesc}`;
export interface StopsTableRequestParsedQueryParams {
	date: string;
	force: string;
	page: string;
	sortBy?: StopsTableSortQueryParamValue;
}

export interface StopsTableReducerState {
	force: string;
	date: string;
	page: number;
	pageSize: number;
}

export type StopsTableReducerActions =
	| { type: "BACK_ONE" }
	| { type: "BACK_TO_FIRST" }
	| { type: "FORWARDS_ONE" }
	| { type: "FORWARD_TO_END" };

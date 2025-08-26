import { ColumnDef } from "@tanstack/react-table";

import { QualitativeStop } from "./types";

export const STOP_AND_SEARCH_ROUTE_SEGMENT = "stop-and-search";
export const STOPS_FETCH_REVALIDATION_SECS = 30 * 24 * 60 * 60; // One month
export const STOPS_TABLE_TARGET_COLUMNS: (keyof QualitativeStop)[] = [
	"datetime",
	"age_range",
	"outcome",
	"gender",
	"outcome_linked_to_object_of_search",
	"removal_of_more_than_outer_clothing",
	"outcome_object",
	"operation_name",
	"involved_person",
];

// Table config

export const columns: ColumnDef<QualitativeStop>[] = [
	{
		accessorKey: "datetime",
		header: "Date",
	},
	{
		accessorKey: "location",
		header: "Location",
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
];

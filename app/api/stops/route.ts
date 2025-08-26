import { STOPS_TABLE_TARGET_COLUMNS } from "@/features/stops/lib/config";
import StopsTableDataBuilder from "@/features/stops/lib/StopsTableDataBuilder";
import {
	SortableStopKeys,
	StopsTableRequestParsedQueryParams,
	StopsTableSortAscOrDesc,
	StopsTableSortQueryParamValue,
} from "@/features/stops/lib/types";
import { PoliceApiResponseDirector } from "@/lib/PoliceApiResponseDirector";
import { NextRequest, NextResponse } from "next/server";

import qs from "qs";

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const { date, force, page, sortBy } = qs.parse(
		searchParams.toString()
	) as unknown as StopsTableRequestParsedQueryParams; // FIXME: time for zod? 🤔

	// Allow sortBy to be an optional query param - if not present, I sort by datetime descending to the most recent
	// stop being at the top of the table 🔝
	const finalSortBy = (sortBy ??
		"datetime,desc") satisfies StopsTableSortQueryParamValue;

	const [sortColumn, sortDirection] = finalSortBy.split(",") as [
		SortableStopKeys,
		StopsTableSortAscOrDesc
	]; // FIXME: 👆 same as above - zod would help here

	const stopsTablePageApiDirector = new PoliceApiResponseDirector(
		new StopsTableDataBuilder(
			date,
			force,
			parseInt(page), // Initial table data will start at the first page (client will handle navigation between pages)
			STOPS_TABLE_TARGET_COLUMNS,
			sortColumn,
			sortDirection
		)
	);

	const tableDataResponse =
		await stopsTablePageApiDirector.constructApiResponse();

	return NextResponse.json(tableDataResponse);
}

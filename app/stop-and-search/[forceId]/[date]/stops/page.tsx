import StopsTableDataBuilder from "@/features/stops/lib/StopsTableDataBuilder";
import {
	QualitativeStop,
	StopAndSearchSubPageParams,
} from "@/features/stops/lib/types";
import { PoliceApiResponseDirector } from "@/lib/PoliceApiResponseDirector";

interface StopsTablePageProps {
	params: StopAndSearchSubPageParams;
}

export default async function StopsTablePage({ params }: StopsTablePageProps) {
	// FIXME: validate use cache here 🙏
	const { forceId, date } = await params;

	const stopsTablePageApiDirector = new PoliceApiResponseDirector(
		new StopsTableDataBuilder(
			date,
			forceId,
			1, // Initial table data will start at the first page (client will handle navigation between pages)
			[
				"datetime",
				"age_range",
				"outcome",
				"gender",
				"outcome_linked_to_object_of_search",
				"removal_of_more_than_outer_clothing",
				"outcome_object",
				"operation_name",
				"involved_person",
			],
			"datetime",
			"desc"
		)
	);

	const { data: initialTableData, metadata } =
		await stopsTablePageApiDirector.constructApiResponse(); // TODO: destructor error and handle a fallback

	const qualitativeStopData = initialTableData as QualitativeStop[];

	return (
		<>
			<h1>Welcome to the stops page</h1>
			<pre>{JSON.stringify(qualitativeStopData, null, 4)}</pre>
			<pre>{JSON.stringify(metadata, null, 4)}</pre>
		</>
	);
}

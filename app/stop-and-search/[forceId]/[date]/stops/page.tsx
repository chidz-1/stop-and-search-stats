import { StopsDataBuilder } from "@/features/stops/lib/StopsTableDataBuilder";
import { QualitativeStop, Stop } from "@/features/stops/lib/types";
import { PoliceApiResponseDirector } from "@/lib/PoliceApiResponseDirector";

interface StopsTablePageProps {
	params: Promise<{ forceId: string; date: string; page: string }>;
}

export default async function StopsTablePage({ params }: StopsTablePageProps) {
	const { forceId, date } = await params;

	const stopsTablePageApiDirector = new PoliceApiResponseDirector(
		new StopsDataBuilder(forceId, date, [
			"outcome",
			"self_defined_ethnicity",
			"gender",
			"outcome_linked_to_object_of_search",
			"removal_of_more_than_outer_clothing",
			"outcome_object",
			"operation_name",
			"involved_person",
		])
	);

	const { data } = await stopsTablePageApiDirector.constructApiResponse(); // TODO: destructor error

	const qualitativeStopData = data as QualitativeStop[];

	return (
		<>
			<h1>Welcome to the stops page</h1>
			<pre>{JSON.stringify(qualitativeStopData, null, 4)}</pre>
		</>
	);
}

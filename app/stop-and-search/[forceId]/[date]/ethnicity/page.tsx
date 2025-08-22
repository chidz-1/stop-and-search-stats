import CategoryChartConfigFactory from "@/features/stops/lib/CategoryChartConfigFactory";
import { StopsDataBuilder } from "@/features/stops/lib/StopsDataBuilder";
import { PoliceApiResponseDirector } from "@/lib/PoliceApiResponseDirector";
import {
	StopAndSearchSubPageParams,
	StopFormattedByEthnicity,
} from "@/features/stops/lib/types";
import PieChartClient from "@/features/stops/components/PieChartClient";

interface StopEthnicityDemographicsPageProps {
	params: StopAndSearchSubPageParams;
}

export default async function StopEthnicityDemographicsPage({
	params,
}: StopEthnicityDemographicsPageProps) {
	const { forceId, date } = await params;

	// 🤏 Limit the size of the response to only the fields we're concerned with

	const stopsTablePageApiDirector = new PoliceApiResponseDirector(
		new StopsDataBuilder(forceId, date, ["self_defined_ethnicity"])
	);

	const { data: stopsByOnlyEthnicityResponse } =
		await stopsTablePageApiDirector.constructApiResponse(); // FIXME: destructor error and handle a fallback

	const factory = await new CategoryChartConfigFactory(
		stopsByOnlyEthnicityResponse as StopFormattedByEthnicity[],
		"self_defined_ethnicity"
	).getConfig();

	return (
		<>
			<h1>Stops: Ethnicity pie chart:</h1>
			<PieChartClient
				dataConfig={factory}
				dataKey="stops"
				nameKey="selfReportedEthnicity"
			/>
			<pre>{JSON.stringify(factory, null, 4)}</pre>
		</>
	);
}

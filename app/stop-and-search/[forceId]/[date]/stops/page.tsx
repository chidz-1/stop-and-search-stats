import StopsTable from "@/features/stops/components/StopsTable";
import { STOPS_TABLE_TARGET_COLUMNS } from "@/features/stops/lib/config";
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
			STOPS_TABLE_TARGET_COLUMNS,
			"datetime",
			"desc"
		)
	);

	const { data: initialTableData, metadata } =
		await stopsTablePageApiDirector.constructApiResponse(); // TODO: destructor error and handle a fallback

	const qualitativeStopData = initialTableData as QualitativeStop[];

	// await new Promise((res) =>
	// 	setTimeout(() => {
	// 		res("🧪🔬: Artificial promise delay completed! [5 secs]");
	// 	}, 5000)
	// ).then((labResults) => console.log(labResults));

	return (
		<>
			<h1>Welcome to the stops page</h1>
			<StopsTable
				suppliedData={qualitativeStopData}
				suppliedDate={date}
				suppliedForce={forceId}
				suppliedPage={1}
				suppliedPageSize={metadata?.pagination?.pageSize || 1}
			/>
			<pre>{JSON.stringify(metadata, null, 4)}</pre>
		</>
	);
}

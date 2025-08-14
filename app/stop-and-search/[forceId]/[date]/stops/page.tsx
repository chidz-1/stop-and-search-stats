import { StopsTableDataBuilder } from "@/features/stops/lib/StopsTableDataBuilder";
import { PoliceApiResponseDirector } from "@/lib/PoliceApiResponseDirector";

interface StopsTablePageProps {
	params: Promise<{ forceId: string; date: string; page: string }>;
}

export default async function StopsTablePage({ params }: StopsTablePageProps) {
	const { forceId, date } = await params;

	const stopsTablePageApiDirector = new PoliceApiResponseDirector(
		new StopsTableDataBuilder(forceId, date)
	);

	const { data } = await stopsTablePageApiDirector.constructApiResponse(); // TODO: destructor error

	return (
		<>
			<h1>Welcome to the stops page</h1>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</>
	);
}

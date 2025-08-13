import { fetchForces } from "@/features/forces/lib/fetchForces";
import ForcesPaginationBuilder from "@/features/forces/lib/ForcesPaginationBuilder";
import { ForceWithMostRecentStopPublishDate } from "@/features/forces/lib/types";
import {
	getForcesPageMarkup,
	getForcesPaginationPageCount,
} from "@/features/forces/utils";
import { PoliceApiResponseDirector } from "@/lib/PoliceApiResponseDirector";
import { parsePageUrlParam } from "@/utils";

interface ForcesPageProps {
	params: Promise<{ pageNumber: string }>;
}

export async function generateStaticParams() {
	const forcesData = await fetchForces();
	const pageCount = getForcesPaginationPageCount(forcesData.length); // TODO: Genericize, this currently could apply to any type of api data
	return Array.from({ length: pageCount }, (_, index) => ({
		pageNumber: (index + 1).toString(),
	}));
}

export default async function ForcesPage({ params }: ForcesPageProps) {
	console.log(`♻️ [in ForcesPage] Rendering`);

	const { pageNumber } = await params;

	const currentPage = parsePageUrlParam(pageNumber);

	const forcesPageApiDirector = new PoliceApiResponseDirector(
		new ForcesPaginationBuilder(currentPage)
	);

	const { data, error, metadata } =
		await forcesPageApiDirector.constructApiResponse();

	const forcesDataWithRecentStopsDate =
		data as ForceWithMostRecentStopPublishDate[];

	return (
		<div>
			<h1>Forces - page {currentPage}</h1>
			<h2>Forces Data response:</h2>
			{error
				? "TODO: Fallback message"
				: getForcesPageMarkup(forcesDataWithRecentStopsDate)}
			<pre>{JSON.stringify(forcesDataWithRecentStopsDate, null, 4)}</pre>
			<pre>{JSON.stringify(metadata, null, 4)}</pre>
		</div>
	);
}

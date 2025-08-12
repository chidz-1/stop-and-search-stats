import { fetchForces } from "@/features/forces/lib/fetchForces";
import ForcesPaginationBuilder from "@/features/forces/lib/ForcesPaginationBuilder";
import { getForcesPaginationPageCount } from "@/features/forces/utils";
import { PoliceApiResponseDirector } from "@/lib/PoliceApiResponseDirector";

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
	const { pageNumber } = await params;
	const currentPage = parseInt(pageNumber) || 1; // TODO: 🥇 util to do a validity check ... Infinite check? instead?

	const forcesPageApiDirector = new PoliceApiResponseDirector(
		new ForcesPaginationBuilder(currentPage)
	);
	const response = await forcesPageApiDirector.constructApiResponse();

	console.log(`♻️ [in ForcesPage] Rendering`);
	return (
		<div>
			<h1>Forces - page {currentPage}</h1>
			<h2>Forces Data response:</h2>
			<pre>{JSON.stringify(response, null, 4)}</pre>
		</div>
	);
}

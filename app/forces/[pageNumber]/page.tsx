import { fetchForces } from "@/features/forces/lib/fetchForces";
import { getForcesPaginationPageCount } from "@/features/forces/utils";

interface ForcesPageProps {
	params: Promise<{ pageNumber: string }>;
}

export async function generateStaticParams() {
	const forcesData = await fetchForces();
	const pageCount = getForcesPaginationPageCount(forcesData.length);
	return Array.from({ length: pageCount }, (_, index) => ({
		pageNumber: index.toString(),
	})).slice(1);
}

export default async function ForcesPage({ params }: ForcesPageProps) {
	const { pageNumber } = await params;
	const paginationNumber = parseInt(pageNumber) || 1; // TODO: 🥇 util to do a validity check ... Infinite check? instead?
	console.log(`♻️ [in ForcesPage] Rendering`);
	return <h1>Forces - page {paginationNumber}</h1>;
}

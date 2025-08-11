interface ForcesPageProps {
	params: Promise<{ pageNumber: string }>;
}

export const generateStaticParams = () => [
	{ pageNumber: "1" },
	{ pageNumber: "2" },
];

export default async function ForcesPage({ params }: ForcesPageProps) {
	const { pageNumber } = await params;
	const paginationNumber = parseInt(pageNumber) || 1; // TODO: Infinite check? instead?
	return <h1>Forces - page {paginationNumber}</h1>;
}

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonStopEthnicityDemographicsPieChart() {
	return (
		<>
			<h1>Stops: Ethnicity pie chart:</h1>
			<div className="mx-auto aspect-square max-h-[600px] px-2">
				{/* The pie chart */}
				<Skeleton className="aspect-square rounded-full w-1/2 h-1/2 mx-auto mb-5" />
				{/* The legend */}
				<div className="flex flex-col sm:flex-row flex-wrap justify-center *:justify-center gap-3">
					<Skeleton className="rounded-full h-[16px] w-[200px]" />
					<Skeleton className="rounded-full h-[16px] w-[200px]" />
					<Skeleton className="rounded-full h-[16px] w-[200px]" />
					<Skeleton className="rounded-full h-[16px] w-[200px]" />
					<Skeleton className="rounded-full h-[16px] w-[200px]" />
				</div>
			</div>
		</>
	);
}

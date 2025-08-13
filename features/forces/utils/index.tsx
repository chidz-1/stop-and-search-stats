import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { PAGINATION_PAGE_SIZE } from "@/lib/config";
import { PoliceApiResponseTypes } from "@/lib/types";
import { Force, ForceWithMostRecentStopPublishDate } from "../lib/types";
import { ForcesCard } from "../Components/ForcesCard";
import { ForcesGrid } from "../Components/ForcesGrid";

export default function RedirectToPaginatedForcesPage() {
	redirect("/forces/1");
}

export function getForcesPaginationPageCount(numberOfForces: number) {
	return Math.ceil(numberOfForces / PAGINATION_PAGE_SIZE);
}

export function isForcesApiData(data: PoliceApiResponseTypes): data is Force[] {
	return data.length > 0 && "name" in data[0];
}

export function getForcesPageMarkup(
	forces: ForceWithMostRecentStopPublishDate[]
): ReactNode {
	return (
		<ForcesGrid>
			{forces.map(({ id: forceId, mostRecentStopsDate, name: forceName }) => (
				<ForcesCard
					key={forceId}
					forceId={forceId}
					mostRecentStopsDate={mostRecentStopsDate}
					forceName={forceName}
				/>
			))}
		</ForcesGrid>
	);
}

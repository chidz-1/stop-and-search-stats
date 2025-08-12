import { redirect } from "next/navigation";

import { PAGINATION_PAGE_SIZE } from "@/lib/config";
import { PoliceApiResponseTypes } from "@/lib/types";
import { Force } from "../lib/types";

export default function RedirectToPaginatedForcesPage() {
	redirect("/forces/1");
}

export function getForcesPaginationPageCount(numberOfForces: number) {
	return Math.ceil(numberOfForces / PAGINATION_PAGE_SIZE);
}

export function isForcesApiData(data: PoliceApiResponseTypes): data is Force[] {
	return data.length > 0 && "name" in data[0];
}

import { redirect } from "next/navigation";

import { PAGINATION_PAGE_SIZE } from "@/lib/config";

export default function RedirectToPaginatedForcesPage() {
	redirect("/forces/1");
}

export function getForcesPaginationPageCount(numberOfForces: number) {
	return Math.ceil(numberOfForces / PAGINATION_PAGE_SIZE);
}

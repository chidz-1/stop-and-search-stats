import { redirect } from "next/navigation";
import { FORCES_PAGINATION_PAGE_SIZE } from "../lib/config";

export default function RedirectToPaginatedForcesPage() {
	redirect("/forces/1");
}

export function getForcesPaginationPageCount(numberOfForces: number) {
	return Math.ceil(numberOfForces / FORCES_PAGINATION_PAGE_SIZE);
}

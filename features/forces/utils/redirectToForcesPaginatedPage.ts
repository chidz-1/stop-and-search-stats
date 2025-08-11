import { redirect } from "next/navigation";

export default function RedirectToPaginatedForcesPage() {
	redirect("/forces/1");
}

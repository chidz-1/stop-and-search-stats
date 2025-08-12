import { redirect } from "next/navigation";

import {
	checkEnv,
	errorLogEmojiConfig,
	formatBadResponseErrorText,
} from "@/utils/errorHelpers";

import { Force } from "../lib/types";
import { FORCES_PAGINATION_PAGE_SIZE } from "../lib/config";

export async function fetchForces(): Promise<Force[]> {
	// 💭 Additionally, If I had control over the API I would use a Webhook to call the next.tag
	// to revalidate if a new force was added.
	try {
		const policeApiOrigin = checkEnv(process.env.POLICE_API_ORIGIN);
		const response = await fetch(`${policeApiOrigin}/api/forces`, {
			cache: "force-cache",
		});

		if (!response.ok) {
			const { status, statusText } = response;
			throw new Error(formatBadResponseErrorText(status, statusText));
		}

		return await response.json();
	} catch (e) {
		console.error(
			`${errorLogEmojiConfig.fetchError}: Couldn't fetch api/forces data`
		);
		throw e;
	}
}

export default function RedirectToPaginatedForcesPage() {
	redirect("/forces/1");
}

export function getForcesPaginationPageCount(numberOfForces: number) {
	return Math.ceil(numberOfForces / FORCES_PAGINATION_PAGE_SIZE);
}

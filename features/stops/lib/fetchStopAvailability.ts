import {
	checkEnv,
	errorLogEmojiConfig,
	formatBadResponseErrorText,
} from "@/utils/errorHelpers";

import { StopsAvailabilityEntry } from "./types";
import { FORCES_AVAILABILITY_FETCH_REVALIDATION_SECS } from "@/features/forces/lib/config";

export async function fetchStopAvailability(): Promise<
	StopsAvailabilityEntry[]
> {
	// 💭 Additionally, If I had control over the API I would use a Webhook to call the next.tags
	// to revalidate the moment the availability is updated
	try {
		const policeApiOrigin = checkEnv(process.env.POLICE_API_ORIGIN);
		const response = await fetch(`${policeApiOrigin}/api/crimes-street-dates`, {
			cache: "force-cache",
			next: { revalidate: FORCES_AVAILABILITY_FETCH_REVALIDATION_SECS },
		});

		if (!response.ok) {
			const { status, statusText } = response;
			throw new Error(formatBadResponseErrorText(status, statusText));
		}

		return await response.json();
	} catch (e) {
		console.error(
			`${errorLogEmojiConfig.fetchError}: Couldn't fetch api/crimes-street-dates data`
		);
		throw e;
	}
}

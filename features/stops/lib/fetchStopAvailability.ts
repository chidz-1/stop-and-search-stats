import {
	checkEnv,
	errorLogEmojiConfig,
	formatBadResponseErrorText,
} from "@/utils/errorHelpers";

import { StopsAvailabilityEntry } from "./types";

export async function fetchStopAvailability(): Promise<
	StopsAvailabilityEntry[]
> {
	// 💭 Additionally, If I had control over the API I would use a Webhook to call the next.tag
	// to revalidate the moment the availability is updated
	try {
		const policeApiOrigin = checkEnv(process.env.POLICE_API_ORIGIN);
		const response = await fetch(`${policeApiOrigin}/api/crimes-street-dates`, {
			cache: "force-cache",
			next: { revalidate: 10 }, // TODO: revalidate daily (test)
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

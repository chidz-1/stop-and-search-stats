import {
	checkEnv,
	errorLogEmojiConfig,
	formatBadResponseErrorText,
} from "@/utils/errorHelpers";
import { Stop } from "./types";

export async function fetchStops(
	date: string,
	forceId: string
): Promise<Stop[]> {
	try {
		const policeApiOrigin = checkEnv(process.env.POLICE_API_ORIGIN);
		const response = await fetch(
			`${policeApiOrigin}/api/stops-force?date=${date}&force=${forceId}`,
			{
				cache: "force-cache", // Hard cache, once a month has been published, it's done.
			}
		);

		if (!response.ok) {
			const { status, statusText } = response;
			throw new Error(formatBadResponseErrorText(status, statusText));
		}

		return await response.json();
	} catch (e) {
		console.error(
			`${errorLogEmojiConfig.fetchError}: Couldn't fetch /api/stops-force data`
		);
		throw e;
	}
}

import {
	checkEnv,
	errorLogEmojiConfig,
	formatBadResponseErrorText,
} from "@/utils/errorHelpers";

export async function fetchForces() {
	// 💭 If I had control over the API I would use a Webhook to call the next.tag
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

import { assert } from "node:console";

import {
	errorLogEmojiConfig,
	formatBadResponseErrorText,
} from "@/utils/errorHelpers";

import { Force } from "../lib/types";

export async function fetchForces(): Promise<Force[]> {
	// 💭 Additionally, If I had control over the API I would use a Webhook to call the next.tag
	// to revalidate if a new force was added.
	try {
		assert(
			process.env.POLICE_API_ORIGIN,
			`${errorLogEmojiConfig.missingEnv}: Missing env variable, refer to README.md for usage`
		);

		const response = await fetch(
			`${process.env.POLICE_API_ORIGIN}/api/forces`,
			{
				cache: "force-cache",
			}
		);

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

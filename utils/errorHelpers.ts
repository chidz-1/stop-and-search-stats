// To have error logs have recognizable emojis for faster interpretation
export const errorLogEmojiConfig = {
	fetchError: "🐶❌",
	badApiResponse: "❌⬅️",
	missingEnv: "🌱❓",
	patternMisuse: "🤚🛑",
};

export function formatBadResponseErrorText(status: number, statusText: string) {
	return `${errorLogEmojiConfig.badApiResponse}: Bad response - ${status} > ${statusText}`;
}

export function checkEnv(envVariable: string | undefined): string | never {
	if (!envVariable) {
		throw new Error(
			`${errorLogEmojiConfig.missingEnv}: Missing env variable, refer to README.md for usage`
		);
	}

	return envVariable;
}

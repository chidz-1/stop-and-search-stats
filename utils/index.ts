export function parsePageUrlParam(pageParamValue: string) {
	if (pageParamValue) {
		// If it's ben provided, ensure it's valid
		const pageNumber = parseInt(pageParamValue);
		if (isFinite(pageNumber) && pageNumber > 0) {
			return pageNumber;
		}
	}

	return 1; // Set to the beginning in all other cases
}

export const isClient = () => typeof window !== "undefined";

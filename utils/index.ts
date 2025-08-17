import { Stop } from "@/features/stops/lib/types";
import { ChartConfigHelperFn } from "@/lib/types";

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

// Chart Config helpers

export const getConfigForPieChart: ChartConfigHelperFn = (stopData: Stop[]) => {
	// FIXME: when g2g 👉 "use cache"
	return "";
};

export const getConfigForBarChart: ChartConfigHelperFn = (stopData: Stop[]) => {
	// FIXME: when g2g 👉 "use cache"
	return "";
};

import { StopCategoryKeys } from "@/features/stops/lib/types";
import { getConfigForPieChart } from "../utils";

// i.e. Bar chart, pie chart...

export default class CategoryChartConfigFactory<
	S extends Record<StopCategoryKeys, string>,
	K extends StopCategoryKeys
> {
	constructor(private stopData: S[], private stopCategory: K) {}

	// FIXME: final return type is StopsCategoryChartConfig
	getConfig() {
		switch (this.stopCategory) {
			case "self_defined_ethnicity":
				return getConfigForPieChart(this.stopData, "self_defined_ethnicity");
			case "age_range":
				return getConfigForPieChart(this.stopData, "age_range");
			default:
				((_: never) => {
					throw new Error(
						`[in CategoryChartConfigFactory > getConfig()] Unreachable case on ${_}`
					);
				})(this.stopCategory);
		}
	}
}

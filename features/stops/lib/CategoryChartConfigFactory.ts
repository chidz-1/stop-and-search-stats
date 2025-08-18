import { CategoryBasedChartStop } from "@/features/stops/lib/types";
import { getConfigForPieChart } from "../utils";
import { KeysOfUnion } from "@/lib/types";

// i.e. Bar chart, pie chart...

export default class CategoryChartConfigFactory<
	S extends CategoryBasedChartStop = CategoryBasedChartStop,
	K extends KeysOfUnion<S> = KeysOfUnion<S>
> {
	constructor(private stopData: S[], private stopCategory: K) {}

	// FIXME: final return type is StopsCategoryChartConfig
	getConfig() {
		switch (this.stopCategory) {
			case "self_defined_ethnicity":
				return getConfigForPieChart(this.stopData, this.stopCategory);
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

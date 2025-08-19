import { getConfigForPieChart } from "../utils";
import {
	CategoryBasedChartStop,
	StopCategoryKeys,
	StopFormattedByAgeRange,
	StopFormattedByEthnicity,
} from "./types";

// i.e. Bar chart, pie chart...

export default class CategoryChartConfigFactory {
	constructor(
		private stopData: CategoryBasedChartStop[],
		private stopCategory: StopCategoryKeys
	) {}

	// FIXME: final return type is StopsCategoryChartConfig onc i've finalized the data 👍
	async getConfig() {
		switch (this.stopCategory) {
			case "self_defined_ethnicity":
				return await getConfigForPieChart(
					this.stopData as StopFormattedByEthnicity[],
					"self_defined_ethnicity"
				);
			case "age_range":
				return await getConfigForPieChart(
					this.stopData as StopFormattedByAgeRange[],
					"age_range"
				);
			default:
				((_: never) => {
					throw new Error(
						`[in CategoryChartConfigFactory > getConfig()] Unreachable case on ${_}`
					);
				})(this.stopCategory);
		}
	}
}

import { ChartConfig } from "@/components/ui/chart";
import {
	ChartConfigBuilder,
	ChartConfigProduct,
	RechartCategoryBasedChartData,
	StopsChartDataCategoryConfig,
} from "./types";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";

export default class RechartPieChartConfigBuilder
	implements ChartConfigBuilder
{
	private chartConfig: ChartConfig | null = null;
	private plottableChartData: RechartCategoryBasedChartData[] | null = null;

	constructor(
		private rawCategorizedData: StopsChartDataCategoryConfig,
		private dataKey: string
	) {}

	createChartConfig(): void {
		this.chartConfig = Object.keys(this.rawCategorizedData).reduce(
			(accConfig, category, categoryIndex) => {
				categoryIndex = categoryIndex + 1;
				return {
					...accConfig,
					[`category-${categoryIndex}`]: {
						label: category,
						color: `var(--chart-${categoryIndex})`,
					},
				};
			},
			{}
		);
	}

	createPlottableData(): void {
		this.plottableChartData = Object.entries(this.rawCategorizedData).map(
			([, count], index) => {
				index = index + 1;

				return {
					selfReportedEthnicity: `category-${index}`,
					[this.dataKey]: count,
					fill: `var(--chart-${index})`,
				};
			}
		);
	}

	getFullConfig(): ChartConfigProduct {
		if (!this.chartConfig || !this.plottableChartData) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: [in getFullConfig()] call steps createChartConfig() then createPlottableData() first`
			);
		}

		return {
			chartConfig: this.chartConfig,
			chartPlottableData: this.plottableChartData,
		};
	}
}

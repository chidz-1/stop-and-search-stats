import { getConfigForBarChart, getConfigForPieChart } from "@/utils";
import { Stop } from "@/features/stops/lib/types";

type ChartType = "bar" | "pie";

export class ChartConfigFactory {
	constructor(private chartType: ChartType, private stopData: Stop[]) {}

	getConfig() {
		switch (this.chartType) {
			case "pie":
				return getConfigForPieChart(this.stopData);
			case "bar":
				return getConfigForBarChart(this.stopData);
			default:
				((_: never) => {
					throw new Error(
						`Unreachable exhaustive check on this.chartType = ${_}`
					);
				})(this.chartType);
		}
	}
}

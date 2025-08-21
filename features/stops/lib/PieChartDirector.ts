import { ChartConfigBuilder, ChartConfigProduct } from "./types";

export default class PieChartDirector {
	constructor(private pieChartBuilder: ChartConfigBuilder) {}

	getChartConfig(): ChartConfigProduct {
		this.pieChartBuilder.createChartConfig();
		this.pieChartBuilder.createPlottableData();
		return this.pieChartBuilder.getFullConfig();
	}
}

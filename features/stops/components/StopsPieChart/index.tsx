"use client";

import { Pie, PieChart } from "recharts";
import { ChartConfigProduct } from "../../lib/types";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";

interface StopsPieChartProps {
	dataConfig: ChartConfigProduct;
	dataKey: string;
	nameKey: string;
}

export default function StopsPieChart({
	dataConfig: { chartConfig, chartPlottableData },
	dataKey,
	nameKey,
}: StopsPieChartProps) {
	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square max-h-[600px]"
		>
			<PieChart>
				<Pie data={chartPlottableData} dataKey={dataKey} />
				<ChartLegend
					content={<ChartLegendContent nameKey={nameKey} />}
					className="flex flex-col sm:flex-row flex-wrap justify-center *:justify-center -translate-y-4"
				/>
			</PieChart>
		</ChartContainer>
	);
}

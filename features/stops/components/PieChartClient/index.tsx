"use client";

import dynamic from "next/dynamic";

import type { StopsPieChartProps } from "../StopsPieChart";
import React from "react";

type PieChartClient = StopsPieChartProps;

// Essentially lazy-load the pie-chart to reduce the size of the client bundle 👍
const CodeSplitPieChart = dynamic(
	() => import("@/features/stops/components/StopsPieChart"),
	{ ssr: false }
);

const PieChartClient = ({ dataConfig, dataKey, nameKey }: PieChartClient) => {
	return (
		<CodeSplitPieChart
			dataConfig={dataConfig}
			dataKey={dataKey}
			nameKey={nameKey}
		/>
	);
};

// Memoize the whole component for good measure - rendering that chart can take it's toll on the client👍
export default React.memo(PieChartClient);

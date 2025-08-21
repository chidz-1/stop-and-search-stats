"use client";

import dynamic from "next/dynamic";
import React from "react";

import SkeletonStopEthnicityDemographicsPieChart from "@/app/stop-and-search/[forceId]/[date]/ethnicity/loading";

import type { StopsPieChartProps } from "../StopsPieChart";

type PieChartClient = StopsPieChartProps;

// Essentially lazy-load the pie-chart to reduce the size of the client bundle 👍
const CodeSplitPieChart = dynamic(
	() => import("@/features/stops/components/StopsPieChart"),
	// N.B. Re-use the pie chart skeleton so I don't get a layout shift AFTER
	// Next.js completes the *streamed* HTML + flight response
	// (client-component's always leave a bailout void 🕳️) 👍
	{ ssr: false, loading: () => <SkeletonStopEthnicityDemographicsPieChart /> }
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

import { PoliceApiResponseTypes } from "@/lib/types";
import { Stop, StopKeys, StopsChartDataCategoryConfig } from "../lib/types";

export function isStopsApiData(data: PoliceApiResponseTypes): data is Stop[] {
	return data.length > 0 && "age_range" in data[0];
}

export function pickSpecificFieldsFromAStop<F extends StopKeys>(
	stopObj: Stop,
	fields: F[]
) {
	return Object.fromEntries(
		fields.map((field) => [field, stopObj[field]])
	) as Pick<Stop, F>;
}

export function getStopsCategoryCountReducerFn<
	S extends Record<C, S[C]>,
	C extends string
>(categoryKey: C) {
	return (
		accCategoryConfig: StopsChartDataCategoryConfig,
		currentStopObj: S
	) => {
		const categoryValue = currentStopObj[categoryKey];

		if (!categoryValue) {
			// if it's *null* then skip by returning the accCategoryConfig
			return accCategoryConfig;
		}

		return {
			// if the value doesn't exist in the accCategoryConfig add it and initialize it's value to 0
			// otherwise increment it's value
			...accCategoryConfig,
			[categoryValue]: (accCategoryConfig[categoryValue] ?? 0) + 1,
		};
	};
}

export async function getConfigForPieChart<
	S extends Record<C, S[C]>,
	C extends string
>(stopData: S[], category: C) {
	"use cache";
	console.log(
		`💵 [using cache in getConfigForPieChart], timestamp = ${new Date()}`
	);
	return stopData.reduce(getStopsCategoryCountReducerFn(category), {});
}

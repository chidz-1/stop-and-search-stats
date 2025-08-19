import { PoliceApiResponseTypes } from "@/lib/types";
import {
	Stop,
	StopCategoryKeys,
	StopKeys,
	StopsChartConfigHelperFn,
	StopsChartDataCategoryConfig,
} from "../lib/types";

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

export function stopsCategoryCountReducerFn<
	S extends Record<StopCategoryKeys, string>,
	K extends StopCategoryKeys
>(categoryKey: K) {
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

export const getConfigForPieChart: StopsChartConfigHelperFn = async (
	stopData,
	category
) => {
	"use cache";
	return stopData.reduce(stopsCategoryCountReducerFn(category), {});
};

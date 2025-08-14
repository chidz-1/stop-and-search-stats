import { PoliceApiResponseTypes } from "@/lib/types";
import { Stop, StopKeys } from "../lib/types";

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

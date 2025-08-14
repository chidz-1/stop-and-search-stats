import { PoliceApiResponseTypes } from "@/lib/types";
import { Stop } from "../lib/types";

export function isStopsApiData(data: PoliceApiResponseTypes): data is Stop[] {
	return data.length > 0 && "age_range" in data[0];
}

import type {
	PoliceApiResponseComponent,
	PoliceAPiResponseData,
	PoliceApiResponseTypes,
} from "./types";

// Concrete component - The starting point for the decoration of Police API response data
export class PoliceApiBaseResponseComponent
	implements PoliceApiResponseComponent
{
	constructor(private rawApiData: PoliceApiResponseTypes) {}
	envelopData(): PoliceAPiResponseData {
		return {
			data: this.rawApiData,
			error: this.rawApiData.length > 1 ? false : true,
			metadata: null,
		};
	}
}

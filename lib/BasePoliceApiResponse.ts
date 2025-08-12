import type {
	PoliceApiResponseComponent,
	PoliceAPiResponseData,
} from "./types";

// A concrete component
export class BasePoliceApiResponse<T> implements PoliceApiResponseComponent<T> {
	constructor(private rawApiData: T) {}
	envelopData(): PoliceAPiResponseData<T> {
		return {
			data: this.rawApiData,
			error: false,
		};
	}
}

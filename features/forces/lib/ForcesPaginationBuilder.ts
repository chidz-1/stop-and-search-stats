import { PoliceAPiResponseData, type PoliceApiBuilder } from "@/lib/types";

import { Force } from "./types";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";
import { BasePoliceApiResponse } from "@/lib/BasePoliceApiResponse";
import { fetchForces } from "./fetchForces";
import type { StopsAvailabilityEntry } from "@/features/stops/lib/types";
import { fetchStopAvailability } from "@/features/stops/lib/fetchStopAvailability";

export default class ForcesPaginationBuilder
	implements PoliceApiBuilder<Force[]>
{
	private rawForcesApiData: Force[] | null = null;
	private stopsAvailabilityApiData: StopsAvailabilityEntry[] | null = null;
	private finalDataProduct: PoliceAPiResponseData<Force[]> | null = null;

	async fetchData(): Promise<void> {
		// TODO: try/catch is valid here now, i'll implement it or error boundary component catch?? 🤔 I think that might be better
		this.rawForcesApiData = await fetchForces();
		this.stopsAvailabilityApiData = await fetchStopAvailability();
	}

	formatData(): void {
		if (!this.rawForcesApiData || !this.stopsAvailabilityApiData) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: call fetchData() first`
			);
		}

		const baseForcesData = new BasePoliceApiResponse(this.rawForcesApiData);
		// const withPagination = TODO: Decorate with pagination
	}

	getDataProduct(): PoliceAPiResponseData<Force[]> {
		if (!this.finalDataProduct) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: call fetchData() then formatData()`
			);
		}

		return this.finalDataProduct;
	}
}

import { PoliceAPiResponseData, type PoliceApiBuilder } from "@/lib/types";

import { Force } from "./types";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";
import { PoliceApiBaseResponseComponent } from "@/lib/PoliceApiBaseResponseComponent";
import { fetchForces } from "./fetchForces";
import type { StopsAvailabilityEntry } from "@/features/stops/lib/types";
import { fetchStopAvailability } from "@/features/stops/lib/fetchStopAvailability";
import { WithPagination } from "@/lib/WithPagination";
import { WithMostRecentStopsDate } from "./WithMostRecentStopsDate";

export default class ForcesPaginationBuilder implements PoliceApiBuilder {
	private rawForcesApiData: Force[] | null = null;
	private stopsAvailabilityApiData: StopsAvailabilityEntry[] | null = null;
	private finalDataProduct: PoliceAPiResponseData | null = null;

	constructor(private currentPage: number) {}

	async fetchData(): Promise<void> {
		// TODO: try/catch is valid here now, i'll implement it or error boundary component catch?? 🤔 I think that might be better
		this.rawForcesApiData = await fetchForces();
		this.stopsAvailabilityApiData = await fetchStopAvailability();
	}

	formatData(): void {
		if (!this.rawForcesApiData || !this.stopsAvailabilityApiData) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: [in ForcesPaginationBuilder] call fetchData() first`
			);
		}

		// Decorate! 🫳 🧂
		const baseForcesData = new PoliceApiBaseResponseComponent(
			this.rawForcesApiData
		);

		const withPagination = new WithPagination(baseForcesData, this.currentPage);

		const withMostRecentStops = new WithMostRecentStopsDate(
			withPagination,
			this.stopsAvailabilityApiData
		);

		// Finished 👌
		this.finalDataProduct = withMostRecentStops.envelopData();
	}

	getDataProduct(): PoliceAPiResponseData {
		if (!this.finalDataProduct) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: [in ForcesPaginationBuilder] call fetchData() then formatData()`
			);
		}

		return this.finalDataProduct;
	}
}

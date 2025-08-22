import { PoliceApiBuilder, PoliceAPiResponseData } from "@/lib/types";
import { fetchStops } from "./fetchStops";
import { Stop } from "./types";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";

export default class StopsTableDataBuilder implements PoliceApiBuilder {
	constructor(
		private date: string,
		private forceId: string,
		private pageNumber: number,
		private sortByColumnName: string = "datetime",
		private sortDirection: "asc" | "desc" = "asc",
		private rawStopsApiData: null | Stop[] = null
	) {}

	async fetchData(): Promise<void> {
		this.rawStopsApiData = await fetchStops(this.date, this.forceId);
	}

	formatData(): void {
		if (!this.rawStopsApiData) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: [in StopsTableDataBuilder] call fetchData() first`
			);
		}

		// TODO: 🫳 🧂 decorate with *withSort* & *withPagination*
		throw new Error("Method not implemented.");
	}

	getDataProduct(): PoliceAPiResponseData {
		throw new Error("Method not implemented.");
	}
}

import { PoliceApiBuilder, PoliceAPiResponseData } from "@/lib/types";
import { fetchStops } from "./fetchStops";
import { SortableStopKeys, Stop, StopKeys } from "./types";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";
import WithSort from "@/lib/WithSort";
import { PoliceApiBaseResponseComponent } from "@/lib/PoliceApiBaseResponseComponent";
import { WithPagination } from "@/lib/WithPagination";
import { WithOnlySpecificStopFields } from "./WithOnlySpecificStopFields";

export default class StopsTableDataBuilder implements PoliceApiBuilder {
	constructor(
		private date: string,
		private forceId: string,
		private pageNumber: number,
		private fieldsToPick: StopKeys[],
		private sortByColumnName: SortableStopKeys = "datetime",
		private sortDirection: "asc" | "desc" = "asc",
		private rawStopsApiData: null | Stop[] = null,
		private finalFormattedData: null | PoliceAPiResponseData = null
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

		// 🫳🧂 Decorate with
		// 1. a truncated set of fields (ultimately reduce the fight props size)
		// 2. sorting
		// 3. pagination

		const baseDataProduct = new PoliceApiBaseResponseComponent(
			this.rawStopsApiData
		);

		const withOnlySpecificStopFields = new WithOnlySpecificStopFields(
			baseDataProduct,
			this.fieldsToPick
		);

		const withSortingApplied = new WithSort(
			withOnlySpecificStopFields,
			this.sortByColumnName,
			this.sortDirection
		);

		const finallyWithPagination = new WithPagination(
			withSortingApplied,
			this.pageNumber
		);

		this.finalFormattedData = finallyWithPagination.envelopData();
	}

	getDataProduct(): PoliceAPiResponseData {
		if (!this.finalFormattedData) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: [in StopsTableDataBuilder] call fetchData() & formatData() first`
			);
		}

		return this.finalFormattedData;
	}
}

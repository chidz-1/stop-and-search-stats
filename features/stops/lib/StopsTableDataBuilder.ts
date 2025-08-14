import { PoliceApiBuilder, PoliceAPiResponseData } from "@/lib/types";
import { Stop, StopKeys } from "./types";
import { fetchStops } from "./fetchStops";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";
import { WithOnlySpecificStopFields } from "./WithOnlySpecificStopFields";
import { PoliceApiBaseResponseComponent } from "@/lib/PoliceApiBaseResponseComponent";

export class StopsDataBuilder implements PoliceApiBuilder {
	private rawStopsApiData: Stop[] | null = null;
	private finalDataProduct: PoliceAPiResponseData | null = null;

	constructor(
		private forceId: string,
		private date: string,
		private fieldsToPick: StopKeys[]
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

		// Decorate
		const baseForcesData = new PoliceApiBaseResponseComponent(
			this.rawStopsApiData
		);

		const decoratedWithOnlyQuantitativeFields = new WithOnlySpecificStopFields(
			baseForcesData,
			this.fieldsToPick
		);

		this.finalDataProduct = decoratedWithOnlyQuantitativeFields.envelopData();
	}

	getDataProduct(): PoliceAPiResponseData {
		if (!this.finalDataProduct) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: [in StopsTableDataBuilder] call fetchData() then formatData()`
			);
		}

		return this.finalDataProduct;
	}
}

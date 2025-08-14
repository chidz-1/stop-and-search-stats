import { PoliceApiBuilder, PoliceAPiResponseData } from "@/lib/types";
import { Stop } from "./types";
import { fetchStops } from "./fetchStops";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";
import { WithOnlyQuantitativeFields } from "./WithOnlyQuantitativeFields";
import { PoliceApiBaseResponseComponent } from "@/lib/PoliceApiBaseResponseComponent";

export class StopsTableDataBuilder implements PoliceApiBuilder {
	private rawStopsApiData: Stop[] | null = null;
	private finalDataProduct: PoliceAPiResponseData | null = null;

	constructor(private forceId: string, private date: string) {}

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

		const decoratedWithOnlyQuantitativeFields = new WithOnlyQuantitativeFields(
			baseForcesData
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

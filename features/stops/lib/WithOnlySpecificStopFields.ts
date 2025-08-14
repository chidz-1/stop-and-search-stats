import { PoliceApiBaseResponseDecorator } from "@/lib/PoliceApiResponseDecorator";
import { PoliceApiResponseComponent, PoliceAPiResponseData } from "@/lib/types";
import { isStopsApiData, pickSpecificFieldsFromAStop } from "../utils";
import { StopKeys } from "./types";

export class WithOnlySpecificStopFields extends PoliceApiBaseResponseDecorator {
	constructor(
		protected componentToDecorate: PoliceApiResponseComponent,
		private fieldsToPick: StopKeys[]
	) {
		super(componentToDecorate);
	}

	envelopData(): PoliceAPiResponseData {
		const prevDecoration = super.envelopData();

		if (prevDecoration.error || !isStopsApiData(prevDecoration.data)) {
			// Don't decorate, just propagate to the highest callee (the director) and let it decide on a fallback
			return prevDecoration;
		}

		const stopDataWithSpecificFields = prevDecoration.data.map((stopObj) =>
			pickSpecificFieldsFromAStop(stopObj, this.fieldsToPick)
		);

		return {
			...prevDecoration,
			data: stopDataWithSpecificFields,
		};
	}
}

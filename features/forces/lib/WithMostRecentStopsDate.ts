import { StopsAvailabilityEntry } from "@/features/stops/lib/types";
import { PoliceApiBaseResponseDecorator } from "@/lib/PoliceApiResponseDecorator";
import { PoliceApiResponseComponent, PoliceAPiResponseData } from "@/lib/types";
import { isForcesApiData } from "../utils";
import { ForceWithMostRecentStopPublishDate } from "./types";

export class WithMostRecentStopsDate extends PoliceApiBaseResponseDecorator {
	constructor(
		protected componentToDecorate: PoliceApiResponseComponent,
		private availabilityApiData: StopsAvailabilityEntry[]
	) {
		super(componentToDecorate);
	}

	envelopData(): PoliceAPiResponseData {
		const prevDecoration = super.envelopData();

		if (!prevDecoration.error || !isForcesApiData(prevDecoration.data)) {
			// Don't decorate, just propagate to the highest callee (the director) and let it decide on a fallback
			return prevDecoration;
		}

		const forcesDataWithAvailabilityDates = prevDecoration.data.reduce(
			(accArray, currentForce) => {
				const { id: forceId } = currentForce;

				const matchingAvailabilityObj = this.availabilityApiData.find(
					(singleAvailabilityObj) =>
						singleAvailabilityObj["stop-and-search"].includes(forceId)
				);

				if (!matchingAvailabilityObj) {
					// If the force doesn't have any available data, drop it from the list
					// This overcomes the various cited data issues in the api
					// See README.md > Police API shortfalls
					return accArray;
				}

				// Add the Force object decorated with most recent stop date 📅
				const forceEntryWithMostRecentStopDate: ForceWithMostRecentStopPublishDate =
					{
						...currentForce,
						mostRecentStopsDate: matchingAvailabilityObj.date,
					};

				return [...accArray, forceEntryWithMostRecentStopDate];
			},
			[] as ForceWithMostRecentStopPublishDate[]
		);

		return {
			...prevDecoration,
			data: forcesDataWithAvailabilityDates,
		};
	}
}

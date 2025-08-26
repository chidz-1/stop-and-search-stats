import { SortableStopKeys, Stop } from "@/features/stops/lib/types";
import { PoliceApiBaseResponseDecorator } from "./PoliceApiResponseDecorator";
import { PoliceApiResponseComponent, PoliceAPiResponseData } from "./types";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";

export default class WithSort<
	T extends Stop,
	K extends SortableStopKeys & keyof T
> extends PoliceApiBaseResponseDecorator {
	constructor(
		protected componentToDecorate: PoliceApiResponseComponent,
		private sortByField: K,
		private sortDirection: "asc" | "desc"
	) {
		super(componentToDecorate);
	}

	envelopData(): PoliceAPiResponseData {
		const { data: dataToSort, ...otherFieldsToReattachAfterSort } =
			super.envelopData();

		const sortedData = (dataToSort as T[]).sort((a, b) => {
			const objAValue = a[this.sortByField];
			const objBValue = b[this.sortByField];

			if (objAValue == null || objBValue == null) {
				// Don't bother sorting on potential null values from the api
				return 0;
			}

			// Compliment the upcoming string assertion with a runtime check - FIXME: zod??
			if (typeof objAValue !== "string" || typeof objBValue !== "string") {
				throw new Error(
					`${errorLogEmojiConfig}: 'WithSort' decorator sorts on string fields only`
				);
			}

			if (this.sortDirection === "asc") {
				return (objAValue as string).localeCompare(objBValue as string);
			}

			// desc order 👉 3️⃣2️⃣1️⃣
			return (objBValue as string).localeCompare(objAValue as string);
		});

		return {
			data: sortedData,
			...otherFieldsToReattachAfterSort,
		};
	}
}

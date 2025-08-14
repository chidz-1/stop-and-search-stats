import { PoliceApiBaseResponseDecorator } from "@/lib/PoliceApiResponseDecorator";
import { PoliceApiResponseComponent, PoliceAPiResponseData } from "@/lib/types";
import { isStopsApiData } from "../utils";
import { QualitativeStop } from "./types";

export class WithOnlyQuantitativeFields extends PoliceApiBaseResponseDecorator {
	constructor(protected componentToDecorate: PoliceApiResponseComponent) {
		super(componentToDecorate);
	}

	envelopData(): PoliceAPiResponseData {
		const prevDecoration = super.envelopData();

		if (prevDecoration.error || !isStopsApiData(prevDecoration.data)) {
			// Don't decorate, just propagate to the highest callee (the director) and let it decide on a fallback
			return prevDecoration;
		}

		const qualitativeFieldsOnly: QualitativeStop[] = prevDecoration.data.map(
			({
				outcome,
				self_defined_ethnicity,
				gender,
				outcome_linked_to_object_of_search,
				removal_of_more_than_outer_clothing,
				outcome_object,
				operation_name,
				involved_person,
			}) => ({
				outcome,
				self_defined_ethnicity,
				gender,
				outcome_linked_to_object_of_search,
				removal_of_more_than_outer_clothing,
				outcome_object,
				operation_name,
				involved_person,
			})
		);

		return {
			...prevDecoration,
			data: qualitativeFieldsOnly,
		};
	}
}

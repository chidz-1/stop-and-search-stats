import type {
	PoliceApiResponseComponent,
	PoliceAPiResponseData,
} from "./types";

export abstract class PoliceApiBaseResponseDecorator
	implements PoliceApiResponseComponent
{
	constructor(protected componentToDecorate: PoliceApiResponseComponent) {}
	envelopData(): PoliceAPiResponseData {
		return this.componentToDecorate.envelopData();
	}
}

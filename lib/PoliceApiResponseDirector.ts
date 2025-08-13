import { PoliceApiBuilder, PoliceAPiResponseData } from "./types";

export class PoliceApiResponseDirector {
	constructor(private builder: PoliceApiBuilder) {}

	async constructApiResponse(): Promise<PoliceAPiResponseData> {
		await this.builder.fetchData();
		this.builder.formatData();
		return this.builder.getDataProduct();
	}
}

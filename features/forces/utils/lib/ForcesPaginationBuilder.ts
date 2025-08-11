import { type PoliceAPiBuilder } from "@/lib/types";

export default class ForcesPaginationBuilder implements PoliceAPiBuilder {
	fetchData(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	formatData(): void {
		throw new Error("Method not implemented.");
	}
	getDataProduct(): unknown {
		throw new Error("Method not implemented.");
	}
}

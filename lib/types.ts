import { Force } from "@/features/forces/lib/types";
import { Stop } from "@/features/stops/lib/types";

export type PoliceApiResponseTypes = Force[] | Stop[];
export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

// Builders
export interface PoliceApiBuilder {
	fetchData(): Promise<void>;
	formatData(): void;
	getDataProduct(): PoliceAPiResponseData;
}

// ✉️ Enveloping of the police api responses for consistency and to facilitate "decoration"
export interface PoliceAPiResponseData {
	data: PoliceApiResponseTypes;
	error: boolean;
	metadata: null | { pagination?: Pagination };
}

// Components (The base for decorators)
export interface PoliceApiResponseComponent {
	envelopData(): PoliceAPiResponseData;
}

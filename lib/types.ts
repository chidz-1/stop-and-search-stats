import {
	Force,
	ForceWithMostRecentStopPublishDate,
} from "@/features/forces/lib/types";
import { QualitativeStop, Stop } from "@/features/stops/lib/types";

export type PoliceApiResponseTypes =
	| Force[]
	| ForceWithMostRecentStopPublishDate[]
	| Stop[]
	| QualitativeStop[];

export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

// ✉️ Enveloping of the police api responses for consistency and to facilitate decoration
export interface PoliceAPiResponseData {
	data: PoliceApiResponseTypes;
	error: boolean;
	metadata: null | { pagination?: Pagination };
}

// Builders
export interface PoliceApiBuilder {
	fetchData(): Promise<void>;
	formatData(): void;
	getDataProduct(): PoliceAPiResponseData;
}

// Components (The base for decorators)
export interface PoliceApiResponseComponent {
	envelopData(): PoliceAPiResponseData;
}

export type NullablePoliceApiData<T> = {
	[K in keyof T]: T[K] | null;
};

export type KeysOfUnion<T> = T extends unknown ? keyof T : never;

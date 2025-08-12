import type { Force } from "@/features/forces/lib/types";
import type { Stop } from "@/features/stops/lib/types";

interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

// Builders

export interface PoliceApiBuilder<D> {
	fetchData(): Promise<void>;
	formatData(): void;
	getDataProduct(): PoliceAPiResponseData<D>;
}

// ✉️ Enveloping of the police api responses for consistency and to facilitate "decoration"
export interface PoliceAPiResponseData<D> {
	data: D;
	error: boolean;
	metadata?: Pagination;
}

// Components (The base for decorators)
export interface PoliceApiResponseComponent<T> {
	envelopData(): PoliceAPiResponseData<T>;
}

// Decorators
export abstract class PoliceApiResponseDecorator<D extends Force[] | Stop[]>
	implements PoliceApiResponseComponent<D>
{
	constructor(protected componentToDecorate: PoliceApiResponseComponent<D>) {}
	envelopData(): PoliceAPiResponseData<D> {
		throw new Error("Method not implemented.");
	}
}

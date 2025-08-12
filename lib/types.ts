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

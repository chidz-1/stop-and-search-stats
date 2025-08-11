export interface PoliceAPiBuilder {
	fetchData(): Promise<void>;
	formatData(): void;
	getDataProduct(): unknown; // FIXME: Create product type that is a decorator component "PoliceAPiResponseData<T>"
}

// ✉️ Enveloping of the police api responses for consistency and to facilitate decorators
export interface PoliceAPiResponseData<D> {
	data: D[];
	metadata: unknown; // FIXME: should be an interface with *optional* decorated keys or null, will make this interface asap
	error: boolean;
}

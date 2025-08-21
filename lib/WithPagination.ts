import { PAGINATION_PAGE_SIZE } from "./config";
import { PoliceApiBaseResponseDecorator } from "./PoliceApiResponseDecorator";
import {
	Pagination,
	PoliceApiResponseComponent,
	PoliceAPiResponseData,
} from "./types";

export class WithPagination extends PoliceApiBaseResponseDecorator {
	constructor(
		protected componentToDecorate: PoliceApiResponseComponent,
		private currentPage: number
	) {
		super(componentToDecorate);
	}

	envelopData(): PoliceAPiResponseData {
		const prevDecoration = super.envelopData();

		if (prevDecoration.error) {
			// Don't decorate, just propagate to the director (callee) and let it decide on a fallback
			return prevDecoration;
		}

		let page = this.currentPage;
		const totalNumberOfResults = prevDecoration.data.length;
		const pageCount = Math.ceil(totalNumberOfResults / PAGINATION_PAGE_SIZE);

		if (page > pageCount) {
			// Cap the requested page to the pageCount limit 👍
			page = pageCount;
		}

		// 1. Replace the actual results truncated to the page
		const startIndex = (page - 1) * PAGINATION_PAGE_SIZE;
		const endIndex = startIndex + PAGINATION_PAGE_SIZE;
		const newRecords = prevDecoration.data.slice(startIndex, endIndex);

		// 2. Build the pagination metadata object
		const pagination: Pagination = {
			page,
			pageSize: PAGINATION_PAGE_SIZE,
			pageCount,
			total: prevDecoration.data.length,
		};

		// 3. Merge in 👍
		const metadata = {
			...(prevDecoration.metadata ?? {}),
			pagination,
		};

		return {
			data: newRecords,
			error: prevDecoration.error,
			metadata,
		};
	}
}

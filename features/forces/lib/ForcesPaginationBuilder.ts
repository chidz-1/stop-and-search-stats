import { PoliceAPiResponseData, type PoliceApiBuilder } from "@/lib/types";

import { Force } from "./types";
import { fetchForces } from "../utils";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";
import { BasePoliceApiResponse } from "@/lib/BasePoliceApiResponse";

export default class ForcesPaginationBuilder
	implements PoliceApiBuilder<Force[]>
{
	private rawForcesApiData: Force[] | null = null;
	private finalDataProduct: PoliceAPiResponseData<Force[]> | null = null;

	async fetchData(): Promise<void> {
		// Deliberately don't catch at caller level as this is a dependency of
		// the production build - i'm SSG'ing the forces page.
		// The build should fail so let the exception rise all the way up.
		this.rawForcesApiData = await fetchForces();
	}

	formatData(): void {
		if (!this.rawForcesApiData) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: Fetch forces data first before formatting it`
			);
		}

		const baseForcesData = new BasePoliceApiResponse(this.rawForcesApiData);
		// const withPagination = TODO: Decorate with pagination
	}

	getDataProduct(): PoliceAPiResponseData<Force[]> {
		if (!this.finalDataProduct) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: Fetch forces data first AND format it before requesting it`
			);
		}

		return this.finalDataProduct;
	}
}

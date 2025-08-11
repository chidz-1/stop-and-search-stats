import { type PoliceAPiBuilder } from "@/lib/types";

import { Force } from "./types";
import { fetchForces } from "../utils/fetchForces";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";

export default class ForcesPaginationBuilder implements PoliceAPiBuilder {
	private forcesApiData: Force[] | null = null;

	async fetchData(): Promise<void> {
		// Deliberately don't catch at caller level as this is a dependency of
		// the production build - i'm SSG'ing the forces page.
		// The build should fail so let the exception rise all the way up.
		this.forcesApiData = await fetchForces();
	}

	formatData(): void {
		if (!this.forcesApiData) {
			throw new Error(
				`${errorLogEmojiConfig.patternMisuse}: Fetch forces data first before formatting it`
			);
		}

		// TODO: Create the component PoliceAPiResponseData<T> 👍
	}

	getDataProduct(): unknown {
		throw new Error("Method not implemented.");
	}
}

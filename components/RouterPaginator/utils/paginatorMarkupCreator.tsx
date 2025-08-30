import { PaginatorFactory } from "@/components/lib/types";
import PaginatorButtons, {
	type PaginatorButtonsProps,
} from "@/components/PaginatorButtons";
import PaginatorLinks, {
	type PaginatorLinksProps,
} from "@/components/PaginatorLinks";
import { errorLogEmojiConfig } from "@/utils/errorHelpers";

export const paginatorMarkupCreator: PaginatorFactory = (
	type,
	componentProps
) => {
	switch (type) {
		case "link":
			return <PaginatorLinks {...(componentProps as PaginatorLinksProps)} />;
		case "button":
			return (
				<PaginatorButtons {...(componentProps as PaginatorButtonsProps)} />
			);
		default:
			return ((_: never) => {
				throw new Error(
					`${errorLogEmojiConfig.patternMisuse}: [in paginatorMarkupCreator] Exhaustive check fail on ${_}`
				);
			})(type);
	}
};

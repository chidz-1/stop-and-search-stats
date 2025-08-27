import {
	ArrowLeft,
	ArrowLeftToLine,
	ArrowRight,
	ArrowRightToLine,
} from "lucide-react";

import { PAGINATION_DIRECTIONAL_COMPONENT_STYLES } from "@/lib/config";
import { PaginatorDirectionalComponent } from "../lib/types";

export interface PaginatorButtonsProps extends PaginatorDirectionalComponent {
	pageCallback: VoidFunction;
	skipPageCallback: VoidFunction;
}

export default function PaginatorButtons({
	direction,
	pageCallback,
	skipPageCallback,
}: PaginatorButtonsProps) {
	if (direction === "left") {
		return (
			<>
				<button
					className={PAGINATION_DIRECTIONAL_COMPONENT_STYLES}
					onClick={skipPageCallback}
				>
					<ArrowLeftToLine className="w-6 h-6" aria-hidden="true" />
					<span className="sr-only">First page</span>
				</button>
				<button
					className={PAGINATION_DIRECTIONAL_COMPONENT_STYLES}
					onClick={pageCallback}
				>
					<ArrowLeft className="w-6 h-6" aria-hidden="true" />
					<span className="sr-only">Previous page</span>
				</button>
			</>
		);
	}

	// Forwards and last past page arrows (▶️ & ⏯️)
	return (
		<>
			<button
				className={PAGINATION_DIRECTIONAL_COMPONENT_STYLES}
				onClick={pageCallback}
			>
				<ArrowRight className="w-6 h-6" aria-hidden="true" />
				<span className="sr-only">Next page</span>
			</button>
			<button
				className={PAGINATION_DIRECTIONAL_COMPONENT_STYLES}
				onClick={skipPageCallback}
			>
				<ArrowRightToLine className="w-6 h-6" aria-hidden="true" />
				<span className="sr-only">Last page</span>
			</button>
		</>
	);
}

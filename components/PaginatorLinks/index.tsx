import {
	ArrowLeft,
	ArrowLeftToLine,
	ArrowRight,
	ArrowRightToLine,
} from "lucide-react";
import Link from "next/link";

import { PAGINATION_DIRECTIONAL_COMPONENT_STYLES } from "@/lib/config";
import { PaginatorDirectionalComponent } from "../lib/types";

export interface PaginatorLinksProps extends PaginatorDirectionalComponent {
	pageUrl: string;
	skipPageUrl: string;
}

export default function PaginatorLinks({
	direction,
	pageUrl,
	skipPageUrl,
}: PaginatorLinksProps) {
	if (direction === "left") {
		return (
			<>
				<Link
					className={PAGINATION_DIRECTIONAL_COMPONENT_STYLES}
					href={skipPageUrl}
				>
					<ArrowLeftToLine className="w-6 h-6" aria-hidden="true" />
					<span className="sr-only">First page</span>
				</Link>
				<Link
					className={PAGINATION_DIRECTIONAL_COMPONENT_STYLES}
					href={pageUrl}
				>
					<ArrowLeft className="w-6 h-6" aria-hidden="true" />
					<span className="sr-only">Previous page</span>
				</Link>
			</>
		);
	}

	// Forwards and last past page arrows (▶️ & ⏯️)
	return (
		<>
			<Link className={PAGINATION_DIRECTIONAL_COMPONENT_STYLES} href={pageUrl}>
				<ArrowRight className="w-6 h-6" aria-hidden="true" />
				<span className="sr-only">Next page</span>
			</Link>
			<Link
				className={PAGINATION_DIRECTIONAL_COMPONENT_STYLES}
				href={skipPageUrl}
			>
				<ArrowRightToLine className="w-6 h-6" aria-hidden="true" />
				<span className="sr-only">Last page</span>
			</Link>
		</>
	);
}

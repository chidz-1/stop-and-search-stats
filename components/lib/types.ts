import type { Pagination as PaginationApiType } from "@/lib/types";
import { PaginatorLinksProps } from "../PaginatorLinks";
import { PaginatorButtonsProps } from "../PaginatorButtons";

export type PaginatorDiscriminator = "link" | "button";

export interface PaginatorDirectionalComponent {
	direction: "left" | "right";
}

export type PaginatorFactory = <
	D extends PaginatorDiscriminator,
	A extends D extends "link" ? PaginatorLinksProps : PaginatorButtonsProps
>(
	type: D,
	componentProps: A
) => React.ReactNode;

export interface PaginatorProps {
	currentParamPage: number;
	paginationConfig: PaginationApiType;
	pathToNavigateTo: string;
	className?: string;
	pageCallback?: VoidFunction;
	skipPageCallback?: VoidFunction;
}

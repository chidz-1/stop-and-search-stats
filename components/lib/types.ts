import { PaginatorLinksProps } from "../PaginatorLinks";
import { PaginatorButtonsProps } from "../PaginatorButtons";
import React from "react";

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
	currentPage: number;
	pageCount: number;
	className?: string;
}

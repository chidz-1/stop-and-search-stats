"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Pagination as PaginationApiType } from "@/lib/types";
import { usePagination } from "./hooks";
import Link from "next/link";

export interface PaginatorProps {
	currentParamPage: number;
	paginationConfig: PaginationApiType;
	pathToNavigateTo: string;
}

interface PaginatorLinkProps {
	direction: "left" | "right";
	page: string;
}

function PaginatorLink({ direction, page }: PaginatorLinkProps) {
	let childrenElements = null;

	if (direction === "left") {
		childrenElements = [
			<ChevronLeft key="left" />,
			<span key="previous">previous</span>,
		];
	} else {
		childrenElements = [
			<span key="next">next</span>,
			<ChevronRight key="right" />,
		];
	}

	return <Link href={page}>{childrenElements}</Link>;
}

export default function Paginator({
	currentParamPage,
	paginationConfig,
	pathToNavigateTo,
}: PaginatorProps) {
	const { handleNumberInputSubmission, inputValue, setInputValue } =
		usePagination({
			currentParamPage,
			pathToNavigateTo,
		});

	const { page, pageCount } = paginationConfig;

	return (
		<div>
			{/* ⬅️ Previous Link */}
			{page > 1 ? (
				<PaginatorLink
					direction="left"
					page={`${pathToNavigateTo}/${(page - 1).toString()}`}
				/>
			) : null}
			<div>
				<span>Page</span>
				<form onSubmit={handleNumberInputSubmission}>
					<input
						type="number"
						min={1}
						max={pageCount}
						defaultValue={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</form>
				<span>of {pageCount}</span>
			</div>
			{/* Next Link ➡️ */}
			{page < pageCount ? (
				<PaginatorLink
					direction="right"
					page={`${pathToNavigateTo}/${(page + 1).toString()}`}
				/>
			) : null}
		</div>
	);
}

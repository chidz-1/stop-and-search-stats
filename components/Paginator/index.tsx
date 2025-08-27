"use client";

import { usePagination } from "./hooks";
import { cn } from "@/lib/utils";
import { paginatorMarkupCreator } from "./utils/paginatorMarkupCreator";
import { PaginatorProps } from "../lib/types";

export default function Paginator({
	currentParamPage,
	paginationConfig,
	pathToNavigateTo,
	className,
}: PaginatorProps) {
	const { handleNumberInputSubmission, inputValue, setInputValue } =
		usePagination({
			currentParamPage,
			pathToNavigateTo,
		});

	const { page, pageCount } = paginationConfig;

	return (
		<div className={cn("flex items-center justify-center gap-4", className)}>
			{/* ⬅️ Previous Links */}
			{page > 1
				? paginatorMarkupCreator("link", {
						direction: "left",
						pageUrl: `${pathToNavigateTo}/${(page - 1).toString()}`,
						skipPageUrl: `${pathToNavigateTo}/1`,
				  })
				: null}
			<div className="flex gap-4 items-center">
				<span>Page</span>
				<form onSubmit={handleNumberInputSubmission}>
					<input
						className="w-15 h-10 rounded outline-2 outline-gray-200 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:outline-primary"
						type="number"
						min={1}
						max={pageCount}
						defaultValue={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</form>
				<span>of {pageCount}</span>
			</div>
			{/* Next Links ➡️ */}
			{page < pageCount
				? paginatorMarkupCreator("link", {
						direction: "right",
						pageUrl: `${pathToNavigateTo}/${(page + 1).toString()}`,
						skipPageUrl: `${pathToNavigateTo}/${pageCount.toString()}`,
				  })
				: null}
		</div>
	);
}

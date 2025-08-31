"use client";

import { usePaginationRouterNavigation } from "./hooks";
import PaginatorInput from "../PaginatorInput";
import PaginatorLinks from "../PaginatorLinks";
import { cn } from "@/lib/utils";
import { PaginatorProps } from "../lib/types";
interface RouterPaginatorProps extends PaginatorProps {
	pathToNavigateTo: string;
}

export default function RouterPaginator({
	currentPage,
	pageCount,
	pathToNavigateTo,
	className,
}: RouterPaginatorProps) {
	const { handleNumberInputSubmission, inputValue, setInputValue } =
		usePaginationRouterNavigation(currentPage, pathToNavigateTo);

	return (
		<div className={cn("flex items-center justify-center gap-4", className)}>
			{/* ⬅️ Previous Links */}
			{currentPage > 1 && (
				<PaginatorLinks
					direction="left"
					pageUrl={`${pathToNavigateTo}/${(currentPage - 1).toString()}`}
					skipPageUrl={`${pathToNavigateTo}/1`}
				/>
			)}

			<PaginatorInput
				currentPage={currentPage}
				pageCount={pageCount}
				onChange={(e) => setInputValue(e.target.value)}
				handleSubmit={handleNumberInputSubmission}
				value={inputValue}
			/>

			{/* Next Links ➡️ */}
			{currentPage < pageCount && (
				<PaginatorLinks
					direction="right"
					pageUrl={`${pathToNavigateTo}/${(currentPage + 1).toString()}`}
					skipPageUrl={`${pathToNavigateTo}/${pageCount.toString()}`}
				/>
			)}
		</div>
	);
}

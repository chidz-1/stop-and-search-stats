"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Pagination as PaginationApiType } from "@/lib/types";
import { usePagination } from "./hooks";
import Link from "next/link";

export interface PaginatorProps {
	currentParamPage: number;
	paginationConfig: PaginationApiType;
	pathToNavigateTo: string;
	className?: string;
}

interface PaginatorLinkProps {
	direction: "left" | "right";
	page: string;
}

function PaginatorLink({ direction, page }: PaginatorLinkProps) {
	let childrenElements = null;

	if (direction === "left") {
		childrenElements = [
			<ArrowLeft className="w-6 h-6" key="left" />,
			<span className="sr-only" key="previous">
				previous
			</span>,
		];
	} else {
		childrenElements = [
			<span className="sr-only" key="right">
				next
			</span>,
			<ArrowRight className="w-6 h-6" key="next" />,
		];
	}

	return (
		<Link
			className="inline-block p-2 bg-secondary hover:bg-gray-200 focus:bg-gray-200 rounded text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:outline-primary [backface-visibility:hidden]"
			href={page}
		>
			{childrenElements}
		</Link>
	);
}

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
		<div
			className={`flex items-center justify-center gap-4 ${className ?? ""}`}
		>
			{/* ⬅️ Previous Link */}
			{page > 1 ? (
				<PaginatorLink
					direction="left"
					page={`${pathToNavigateTo}/${(page - 1).toString()}`}
				/>
			) : null}
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

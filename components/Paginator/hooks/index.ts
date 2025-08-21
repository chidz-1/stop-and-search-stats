import { PaginatorProps } from "..";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type usePaginationProps = Omit<PaginatorProps, "paginationConfig">;

export function usePagination({
	currentParamPage,
	pathToNavigateTo,
}: usePaginationProps) {
	const nextRouter = useRouter();
	const [inputValue, setInputValue] = useState(currentParamPage.toString());

	// Performs the actual navigation 🏹
	const navigateToPage = (pageNumber: number) => {
		if (pageNumber > 0) {
			nextRouter.push(`${pathToNavigateTo}/${pageNumber}`);
		}
	};

	const handleNumberInputSubmission = (e: React.FormEvent) => {
		e.preventDefault();

		const inputPageNumber = parseInt(inputValue);
		if (isFinite(inputPageNumber)) {
			return navigateToPage(inputPageNumber);
		}
	};

	// Provide handlers for the consumer
	return {
		inputValue,
		setInputValue,
		handleNumberInputSubmission,
	};
}

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function usePaginationRouterNavigation(
	currentPage: number,
	pathToNavigateTo: string
) {
	const nextRouter = useRouter();
	const [inputValue, setInputValue] = useState(currentPage.toString());

	// Performs the actual Next router navigation 🏹
	const navigateToPage = (pageNumber: number) => {
		nextRouter.push(`${pathToNavigateTo}/${pageNumber}`);
	};

	const handleNumberInputSubmission = (e: React.FormEvent) => {
		e.preventDefault();

		const inputPageNumber = parseInt(inputValue);
		navigateToPage(inputPageNumber);
	};

	// Provide handlers for the consumer
	return {
		inputValue,
		setInputValue,
		handleNumberInputSubmission,
	};
}

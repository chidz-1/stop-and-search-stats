"use client";

import qs from "qs";

import { QualitativeStop } from "../../lib/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useReducer } from "react";
import { stopsTableReducer } from "../../utils";
import PaginatorButtons from "@/components/PaginatorButtons";

interface StopsTableProps {
	suppliedData: QualitativeStop[];
	suppliedDate: string;
	suppliedForce: string;
	suppliedPage: number;
	suppliedPageSize: number;
}

export default function StopsTable({
	suppliedData,
	suppliedDate,
	suppliedForce,
	suppliedPage,
	suppliedPageSize,
}: StopsTableProps) {
	const [{ date, force, page }, dispatchTableAction] = useReducer(
		stopsTableReducer,
		{
			date: suppliedDate,
			force: suppliedForce,
			page: suppliedPage,
			pageSize: suppliedPageSize,
		}
	);

	const forwardOnePageCB = useCallback(() => {
		dispatchTableAction({ type: "FORWARDS_ONE" });
	}, []);

	const forwardToEndPageCB = useCallback(() => {
		dispatchTableAction({ type: "FORWARD_TO_END" });
	}, []);

	const backOnePageCB = useCallback(() => {
		dispatchTableAction({ type: "BACK_ONE" });
	}, []);

	const backToTheFirstPageCB = useCallback(() => {
		dispatchTableAction({ type: "BACK_TO_FIRST" });
	}, []);

	// Use qs to format the api query params 📦
	const stopsApiQueryParams = qs.stringify({
		date,
		force,
		page,
	});

	// FIXME: Handle error scenario 🙏
	const { data, isError, error } = useQuery({
		queryKey: [date, force, page],
		queryFn: () =>
			fetch(
				`${process.env.PUBLIC_NEXT_API_ORIGIN}/api/stops?${stopsApiQueryParams}`
			).then((response) => response.json()),
		placeholderData: (prevTableData) => prevTableData,
		initialData:
			// off the bat, cache whats coming in as flight props via the parent page ✈️
			date === suppliedDate && force === suppliedForce && page === suppliedPage
				? suppliedData
				: undefined,
	});

	return (
		<>
			<PaginatorButtons
				direction="left"
				pageCallback={backOnePageCB}
				skipPageCallback={backToTheFirstPageCB}
			/>
			{"📅"}
			<PaginatorButtons
				direction="right"
				pageCallback={forwardOnePageCB}
				skipPageCallback={forwardToEndPageCB}
			/>
		</>
	);
}

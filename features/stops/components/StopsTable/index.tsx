"use client";

import qs from "qs";

import { QualitativeStop } from "../../lib/types";
import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { stopsTableReducer } from "../../utils";
import PaginatorButtons from "@/components/PaginatorButtons";
import { isClient } from "@/utils/";

interface StopsTableProps {
	initialData: QualitativeStop[];
	initialDate: string;
	initialForce: string;
	initialPage: number;
	initialPageSize: number;
}

export default function StopsTable({
	initialData,
	initialDate,
	initialForce,
	initialPage,
	initialPageSize,
}: StopsTableProps) {
	const [{ date, force, page }, dispatchTableAction] = useReducer(
		stopsTableReducer,
		{
			date: initialDate,
			force: initialForce,
			page: initialPage,
			pageSize: initialPageSize,
		}
	);

	// FIXME: The useCallbacks are overkill, need to remove these 👍

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
				`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/stops?${stopsApiQueryParams}`
			).then((response) => response.json()),
		placeholderData: (prevTableData) => prevTableData,
		initialData:
			// off the bat, cache whats coming in as flight props via the parent page ✈️
			date === initialDate && force === initialForce && page === initialPage
				? initialData
				: undefined,
		enabled: isClient, // Only enable on the client side
	});

	return (
		<>
			<PaginatorButtons
				direction="left"
				pageCallback={() => dispatchTableAction({ type: "BACK_ONE" })}
				skipPageCallback={() => dispatchTableAction({ type: "BACK_TO_FIRST" })}
			/>
			{<pre>{JSON.stringify(data, null, 3)}</pre>}
			{"📅"}
			<PaginatorButtons
				direction="right"
				pageCallback={() => dispatchTableAction({ type: "FORWARDS_ONE" })}
				skipPageCallback={() => dispatchTableAction({ type: "FORWARD_TO_END" })}
			/>
		</>
	);
}

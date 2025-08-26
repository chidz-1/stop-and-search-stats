"use client";

import qs from "qs";

import { QualitativeStop } from "../../lib/types";
import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { stopsTableReducer } from "../../utils";

interface StopsTableProps {
	initialData: QualitativeStop;
	initialDate: string;
	initialForce: string;
	initialPage: number;
}

export default function StopsTable({
	initialData,
	initialDate,
	initialForce,
	initialPage,
}: StopsTableProps) {
	const [{ date, force, page }, dispatchTableAction] = useReducer(
		stopsTableReducer,
		{
			date: initialDate,
			force: initialForce,
			page: initialPage,
		}
	);

	// Use qs to format the api query params 📦
	const stopsApiQueryParams = qs.stringify({
		date,
		force,
		page,
	});

	const { data, isError, error } = useQuery({
		queryKey: [date, force, page],
		queryFn: () =>
			fetch(
				`${process.env.PUBLIC_NEXT_API_ORIGIN}/api/stops?${stopsApiQueryParams}`
			).then((response) => response.json()),
		placeholderData: (prevTableData) => prevTableData,
		initialData:
			// off the bat, cache whats coming in as flight props via the parent page ✈️
			date === initialDate && force === initialForce && page === initialPage
				? initialData
				: undefined,
	});
}

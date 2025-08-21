import { ColumnDef } from "@tanstack/react-table";
import { QualitativeStop } from "../../lib/types";

// interface StopsTableProps {}

export const columns: ColumnDef<QualitativeStop>[] = [
	{
		accessorKey: "datetime",
		header: "Date",
	},
	{
		accessorKey: "location",
		header: "Location",
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
];

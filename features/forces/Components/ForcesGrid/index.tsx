import { ReactNode } from "react";

interface ForcesGridProps {
	children: ReactNode;
}

export function ForcesGrid({ children }: ForcesGridProps) {
	// FIXME: sort out responsiveness of the grid
	return (
		<ul
			className="list-none grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 md:gap-8"
			aria-label="Latest stop and search data by individual police force"
		>
			{children}
		</ul>
	);
}

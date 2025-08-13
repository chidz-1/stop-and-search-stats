import { ReactNode } from "react";
import Link from "next/link";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ForcesCardProps {
	forceId: string;
	forceName: string;
	mostRecentStopsDate: string;
}

export function ForcesCard({
	forceId,
	forceName,
	mostRecentStopsDate,
}: ForcesCardProps): ReactNode {
	return (
		<li>
			<Card>
				<CardHeader>
					{/* TODO: Include psudeo avatar here 👍 */}
					<h2>{forceName}</h2>
				</CardHeader>
				<CardFooter>
					<Button asChild>
						<Link href="/">Read</Link>
					</Button>
					<Badge variant={"secondary"}>
						{/* TODO: Confirm if needs formatting 🤔 */}
						<time dateTime={mostRecentStopsDate}>
							Latest: {mostRecentStopsDate}
						</time>
					</Badge>
				</CardFooter>
			</Card>
		</li>
	);
}

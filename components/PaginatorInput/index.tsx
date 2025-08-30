import React, {
	ChangeEventHandler,
	type FormEventHandler,
	type InputHTMLAttributes,
} from "react";

export type PaginatorInputControlledProps = {
	currentPage: number;
	pageCount: number;
	handleSubmit: FormEventHandler<HTMLButtonElement>;
	onChange: ChangeEventHandler<HTMLInputElement>;
	value: Exclude<InputHTMLAttributes<"value">, undefined>;
};

type PaginatorInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"type" | "className" | "min" | "max"
> &
	PaginatorInputControlledProps;

export default function PaginatorInput({
	currentPage,
	pageCount,
	handleSubmit,
	onChange,
	value,
	...restProps
}: PaginatorInputProps) {
	return (
		<div className="flex gap-4 items-center">
			<form>
				<input
					{...restProps}
					className="w-15 h-10 rounded outline-2 outline-gray-200 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:outline-primary"
					type="number"
					onChange={onChange}
					value={value}
					min={1}
					max={pageCount}
				/>
				<button type="submit" onClick={handleSubmit}>
					Go
				</button>
			</form>
			<p>
				Page {currentPage} of {pageCount}
			</p>
		</div>
	);
}

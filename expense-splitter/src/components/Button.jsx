import React from "react";

export default function Button({ children, variant, onClick, className }) {
	const buttonStyles =
		variant === "small"
			? "bg-slate-500 text-slate-200 py-1 px-[0.7rem] rounded-[0.25rem] hover:bg-slate-700 text-sm font-medium"
			: "bg-slate-500 text-slate-200 py-1 px-5 rounded-md hover:bg-slate-700";

	return (
		<button className={`${buttonStyles} ${className}`} onClick={onClick}>
			{children}
		</button>
	);
}

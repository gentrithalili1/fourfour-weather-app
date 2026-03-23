import * as React from "react";

import { cn } from "@/core/utils/shadcn-utils";

function Field({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="field" className={cn("grid gap-1.5", className)} {...props} />;
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="field-label"
			className={cn("text-sm font-medium leading-none", className)}
			{...props}
		/>
	);
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p data-slot="field-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
	);
}

export { Field, FieldDescription, FieldLabel };

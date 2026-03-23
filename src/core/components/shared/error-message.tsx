import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/core/components/ui/alert";
import { getErrorMessage } from "@/core/utils/get-error-message";

type ErrorMessageProps = {
	error?: Error | null;
};

export function ErrorMessage({ error }: ErrorMessageProps) {
	const errorText = getErrorMessage(error);

	if (!error) return null;

	return (
		<Alert variant="destructive" className="bg-red-500/10 border-red-500/40 text-red-200">
			<AlertTriangle className="text-red-300" aria-hidden />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription className="text-red-200/90">{errorText}</AlertDescription>
		</Alert>
	);
}
